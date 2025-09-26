import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // 1️⃣ Crée l'utilisateur avec Email/Password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Ajoute le username dans Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email: email,
        createdAt: serverTimestamp()
      });

      alert('Inscription réussie !');
      navigate('/login');
    } catch (error) {
      console.error(error);
      setMessage(error.message || 'Échec de l’inscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Please Register</h2>
        <form onSubmit={handleRegister} className="space-y-5 max-w-sm mx-auto pt-8">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          {message && <p className="text-red-500">{message}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-5 bg-indigo-600 text-white hover:bg-indigo-500 font-medium py-3 rounded-md"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="my-5 italic text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-red-700 px-1 underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
