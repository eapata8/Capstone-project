import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { clearCart, removeFromCart } from '../../redux/features/cart/cartSlice';

const formatMoney = (n) => Number(n || 0).toFixed(2);

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((s) => s.cart || {});
  const items = cart.products || [];
  const taxRate = cart.taxRate ?? 0.15;

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    // adresse supprimée
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // confirmation map: id -> boolean (true = confirmed)
  const [confirmedMap, setConfirmedMap] = useState({});

  useEffect(() => {
    // initialize map when items change
    const map = {};
    items.forEach((p) => {
      if (p.id != null) map[p.id] = true;
    });
    setConfirmedMap(map);
  }, [items]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const computeConfirmedTotals = (confirmedItems) => {
    const subtotal = confirmedItems.reduce((s, p) => s + (p.price || 0) * (p.quantity || 0), 0);
    const tax = Math.round((subtotal * taxRate + Number.EPSILON) * 100) / 100;
    const grand = Math.round((subtotal + tax + Number.EPSILON) * 100) / 100;
    return { subtotal, tax, grand };
  };

  const validate = (confirmedCount) => {
    if (!form.fullName) { setError('Nom complet requis.'); return false; }

    // Card fields required
    if (!form.cardName) { setError('Nom sur la carte requis.'); return false; }
    if (!form.cardNumber) { setError('Numéro de carte requis.'); return false; }
    if (!form.expiry) { setError("Date d'expiration (MM/AA) requise."); return false; }
    if (!form.cvc) { setError('CVC requis.'); return false; }

    if (confirmedCount === 0) { setError('Veuillez confirmer au moins un article pour le paiement.'); return false; }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmedItems = items.filter((p) => confirmedMap[p.id] !== false);
    if (!validate(confirmedItems.length)) return;

    const totalsConfirmed = computeConfirmedTotals(confirmedItems);

    setLoading(true);

    // Simuler envoi de commande -> remplacer par appel API réel si présent
    setTimeout(() => {
      setLoading(false);

      // Si tous les articles ont été confirmés -> vider le panier
      if (confirmedItems.length === items.length) {
        dispatch(clearCart());
      } else {
        // Supprimer uniquement les articles confirmés afin de garder les non-confirmés
        confirmedItems.forEach((it) => {
          dispatch(removeFromCart({ id: it.id }));
        });
      }

      // Vous pouvez envoyer totalsConfirmed et form au backend ici
      navigate('/order-success', { replace: true });
    }, 900);
  };

  const toggleConfirm = (id) => {
    setConfirmedMap((m) => ({ ...m, [id]: !m[id] }));
  };

  const removeUnconfirmedFromCart = () => {
    const unconfirmed = items.filter((p) => confirmedMap[p.id] === false);
    if (unconfirmed.length === 0) {
      setError('Aucun article non confirmé à supprimer.');
      return;
    }
    unconfirmed.forEach((it) => dispatch(removeFromCart({ id: it.id })));
    setError('');
  };

  const confirmedItems = items.filter((p) => confirmedMap[p.id] !== false);
  const confirmedTotals = computeConfirmedTotals(confirmedItems);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">Informations client</h2>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Nom complet *" className="input" />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email (optionnel)" className="input" />
            </div>

            <h3 className="text-lg font-medium mt-4">Paiement (requis)</h3>
            <input name="cardName" value={form.cardName} onChange={handleChange} placeholder="Nom sur la carte *" className="input" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="Numéro de carte *" className="input" />
              <div className="grid grid-cols-2 gap-3">
                <input name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/AA *" className="input" />
                <input name="cvc" value={form.cvc} onChange={handleChange} placeholder="CVC *" className="input" />
              </div>
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div className="flex items-center justify-between mt-4">
              <Link to="/shop" className="text-sm text-gray-600 hover:underline">Continuer vos achats</Link>
              <button type="submit" disabled={loading} className="bg-primary text-white px-4 py-2 rounded disabled:opacity-60">
                {loading ? 'Traitement…' : `Payer ${formatMoney(confirmedTotals.grand)}`}
              </button>
            </div>
          </form>
        </div>

        <div className="md:w-1/3 bg-white shadow p-6 rounded">
          <h3 className="text-lg font-semibold mb-4">Résumé de la commande</h3>
          <div className="space-y-3 max-h-64 overflow-auto">
            {items.length === 0 ? (
              <div className="text-gray-600">Aucun article</div>
            ) : (
              items.map((p, i) => (
                <div key={p.id ?? i} className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded" />
                  <div className="flex-1">
                    <div className="text-sm font-medium line-clamp-1">{p.name}</div>
                    <div className="text-xs text-gray-500">Qty: {p.quantity}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={confirmedMap[p.id] !== false}
                        onChange={() => toggleConfirm(p.id)}
                      />
                      <span>{confirmedMap[p.id] === false ? 'Non confirmé' : 'Confirmé'}</span>
                    </label>
                    <div className="text-sm font-medium">${formatMoney((p.price || 0) * (p.quantity || 1))}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Sous-total (confirmés)</span><span>${formatMoney(confirmedTotals.subtotal)}</span></div>
            <div className="flex justify-between"><span>Taxes</span><span>${formatMoney(confirmedTotals.tax)}</span></div>
            <div className="flex justify-between font-semibold"><span>Total à payer</span><span>${formatMoney(confirmedTotals.grand)}</span></div>
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={removeUnconfirmedFromCart} className="bg-red-500 text-white px-3 py-2 rounded text-sm">
              Supprimer les articles non confirmés
            </button>
            <button
              onClick={() => {
                const allConfirmed = items.every((p) => confirmedMap[p.id] !== false);
                const map = {};
                items.forEach((p) => { map[p.id] = !allConfirmed; });
                setConfirmedMap(map);
              }}
              className="bg-gray-200 text-gray-800 px-3 py-2 rounded text-sm"
            >
              {items.every((p) => confirmedMap[p.id] !== false) ? 'Tout décocher' : 'Tout cocher'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;