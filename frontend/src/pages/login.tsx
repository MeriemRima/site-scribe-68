import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
    navigate("/pages")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Connexion
        </h1>
        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Adresse e-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="Entrez votre e-mail"
              className="w-full px-4 py-2 mt-1 text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              placeholder="Entrez votre mot de passe"
              className="w-full px-4 py-2 mt-1 text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Se connecter
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Vous n'avez pas de compte ?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Inscrivez-vous
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;