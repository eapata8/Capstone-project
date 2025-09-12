import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // 🔑 Connexion Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User logged in:', user);

      // 🔥 Mettre à jour Redux avec les infos utilisateur
      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        profileImage: user.photoURL || null,
        role: 'user', // tu pourras remplacer par un champ venant de Firestore
      }));

      // 🚀 Redirection après login
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setMessage(error.message || 'Please provide a valid email and password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Login</h2>
        <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
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
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="my-5 italic text-sm text-center">
          Don’t have an account?{' '}
          <Link to="/register" className="text-red-700 px-1 underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
