'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';

interface AdminPasswordGateProps {
  children: React.ReactNode;
}

export function AdminPasswordGate({ children }: AdminPasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError('');

      try {
        const res = await fetch('/api/admin/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setError('Pogrešna lozinka');
        }
      } catch {
        setError('Greška pri autentifikaciji');
      } finally {
        setIsLoading(false);
      }
    },
    [password]
  );

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="font-heading text-2xl font-bold text-teal mb-6 text-center">
          Admin pristup
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-teal mb-2">
              Lozinka
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-teal/20 focus:border-lime focus:outline-none transition-colors"
              placeholder="Unesite admin lozinku"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
            {isLoading ? 'Provjera...' : 'Prijava'}
          </Button>
        </form>
      </div>
    </div>
  );
}
