'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Key, Loader2, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (data.user) {
        router.push('/admin');
        router.refresh();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#12291E] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#FDFBF7] rounded-3xl p-8 border border-[#C5A059]/30 shadow-2xl space-y-6">
        
        {/* Brand Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#1B3B2B] text-[#C5A059] flex items-center justify-center mx-auto mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#1B3B2B]">
            Mantra Acupuncture CMS
          </h1>
          <p className="text-xs text-[#586962]">
            Authorized Administrator Access Only
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#586962] absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mantraacupuncture.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-sm text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-[#586962] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-sm text-[#2C3531] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-full bg-[#1B3B2B] hover:bg-[#12291E] text-white text-sm font-medium transition-all shadow-md flex items-center justify-center gap-2 focus:ring-2 focus:ring-[#C5A059] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <span>Sign In to Admin Portal</span>
            )}
          </button>
        </form>

        <p className="text-[11px] text-[#586962] text-center italic">
          If you are an administrator requiring initial access setup, please consult `README.md` for Supabase user app_metadata configuration.
        </p>

      </div>
    </div>
  );
}
