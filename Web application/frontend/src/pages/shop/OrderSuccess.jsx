import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg p-8 rounded max-w-xl text-center">
        <h1 className="text-2xl font-semibold mb-2">Paiement accepté</h1>
        <p className="text-gray-600 mb-6">Merci d'avoir magasiné avec ChaseCart!.</p>
        <Link to="/" className="bg-primary text-white px-4 py-2 rounded">Retour à l’accueil</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;