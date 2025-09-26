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
    setTimeout(() => {
      setLoading(false);

      if (confirmedItems.length === items.length) {
        dispatch(clearCart());
      } else {
        confirmedItems.forEach((it) => {
          dispatch(removeFromCart({ id: it.id }));
        });
      }

      // Optionally send totalsConfirmed + form to backend here
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
    <div className="max-w-6xl mx-auto p-6 items-start pt-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* LEFT: Client + Payment */}
        <div className="md:w-2/3 bg-white shadow-sm ring-1 ring-gray-200 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-1">Informations client</h2>
          <p className="text-sm text-gray-600 mb-4">Vos informations resteront confidentielles.</p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Identité */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Ex. John Doe"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-gray-400">(optionnel)</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="exemple@domaine.com"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Paiement */}
            <div className="pt-2">
              <h3 className="text-lg font-medium">Paiement</h3>
              <p className="text-xs text-gray-500 mb-3">Saisissez les informations de votre carte.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom sur la carte <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="cardName"
                    name="cardName"
                    value={form.cardName}
                    onChange={handleChange}
                    placeholder="Comme indiqué sur la carte"
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                    autoComplete="cc-name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro de carte <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 font-mono tracking-widest text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    maxLength={19} // 16 digits + spaces
                  />
                  <p className="mt-1 text-xs text-gray-500">N’entrez pas de tirets, les espaces sont ok.</p>
                </div>

                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration (MM/AA) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="expiry"
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    placeholder="MM/AA"
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    maxLength={5}
                  />
                </div>

                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                    CVC <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="cvc"
                    name="cvc"
                    value={form.cvc}
                    onChange={handleChange}
                    placeholder="123"
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>

            {/* Erreurs & actions */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-2">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <Link to="/shop" className="text-sm text-gray-600 hover:text-gray-800 hover:underline">
                Continuer vos achats
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-lg bg-pink-600 text-white px-4 py-2 font-medium hover:bg-pink-700 disabled:opacity-60"
              >
                {loading ? 'Traitement…' : `Payer ${formatMoney(confirmedTotals.grand)}`}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT: Order summary */}
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
                    <div className="text-sm font-medium">
                      ${formatMoney((p.price || 0) * (p.quantity || 1))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Sous-total (confirmés)</span>
              <span>${formatMoney(confirmedTotals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>${formatMoney(confirmedTotals.tax)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total à payer</span>
              <span>${formatMoney(confirmedTotals.grand)}</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={removeUnconfirmedFromCart} className="bg-pink-600 text-white px-3 py-2 rounded text-sm">
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
