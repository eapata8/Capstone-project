import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { clearCart } from '../../redux/features/cart/cartSlice';

const formatMoney = (n) => Number(n || 0).toFixed(2);

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((s) => s.cart || {});
  const items = cart.products || [];
  const totals = {
    totalPrice: cart.totalPrice ?? items.reduce((sum, p) => sum + (p.price || 0) * (p.quantity || 0), 0),
    tax: cart.tax ?? 0,
    grandTotal: cart.grandTotal ?? 0,
  };

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postal: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.fullName || !form.address || !form.city || !form.postal) {
      setError('Veuillez renseigner le nom et l’adresse de livraison.');
      return false;
    }
    if (items.length === 0) {
      setError('Votre panier est vide.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    // Simuler envoi de commande -> remplacer par appel API réel si présent
    setTimeout(() => {
      setLoading(false);
      dispatch(clearCart());
      navigate('/order-success', { replace: true });
    }, 900);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">Détails de livraison</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Nom complet" className="input" />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email (optionnel)" className="input" />
            </div>

            <input name="address" value={form.address} onChange={handleChange} placeholder="Adresse" className="input" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input name="city" value={form.city} onChange={handleChange} placeholder="Ville" className="input" />
              <input name="postal" value={form.postal} onChange={handleChange} placeholder="Code postal" className="input" />
              <input name="country" value={form.country} onChange={handleChange} placeholder="Pays" className="input" />
            </div>

            <h3 className="text-lg font-medium mt-4">Paiement</h3>
            <input name="cardName" value={form.cardName} onChange={handleChange} placeholder="Nom sur la carte" className="input" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="Numéro de carte" className="input" />
              <div className="grid grid-cols-2 gap-3">
                <input name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/AA" className="input" />
                <input name="cvc" value={form.cvc} onChange={handleChange} placeholder="CVC" className="input" />
              </div>
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div className="flex items-center justify-between mt-4">
              <Link to="/shop" className="text-sm text-gray-600 hover:underline">Continuer vos achats</Link>
              <button type="submit" disabled={loading} className="bg-primary text-white px-4 py-2 rounded disabled:opacity-60">
                {loading ? 'Traitement…' : `Payer ${formatMoney(totals.grandTotal || totals.totalPrice)}`}
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
                  <div className="text-sm font-medium">${formatMoney((p.price || 0) * (p.quantity || 1))}</div>
                </div>
              ))
            )}
          </div>

          <div className="border-t mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Sous-total</span><span>${formatMoney(totals.totalPrice)}</span></div>
            <div className="flex justify-between"><span>Taxes</span><span>${formatMoney(totals.tax)}</span></div>
            <div className="flex justify-between font-semibold"><span>Total</span><span>${formatMoney(totals.grandTotal || totals.totalPrice)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;