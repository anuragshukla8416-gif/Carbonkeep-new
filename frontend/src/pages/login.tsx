import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // API Call Mock
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    if (data.token) {
      setAuth(data.user, data.token);
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form onSubmit={handleLogin} className="p-8 bg-slate-800 rounded-xl shadow-2xl w-full max-w-md border border-emerald-500/20">
        <h1 className="text-3xl font-bold mb-6 text-emerald-400">SCOPE <span className="text-slate-400 font-light">by CarbonKeep</span></h1>
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 focus:border-emerald-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 focus:border-emerald-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded font-bold transition-all shadow-lg shadow-emerald-900/20">
            Sign In
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-400 text-center">
          New to CarbonKeep? <span className="text-emerald-400 cursor-pointer">Register your hotel</span>
        </p>
      </form>
    </div>
  );
}
