import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      alert(error.message || 'Sign in failed');
      return;
    }

    // Verify the signed-in user is an admin (exists in public.admins)
    try {
      const session = data?.session || null;
      const userId = session?.user?.id;
      if (!userId) {
        setLoading(false);
        alert('Unable to read user session after sign in.');
        return;
      }
      const { data: adminRow, error: adminErr } = await supabase.from('admins').select('id').eq('id', userId).single();
      setLoading(false);
      if (adminErr || !adminRow) {
        // not an admin
        await supabase.auth.signOut();
        alert('You are not authorized to access the admin dashboard.');
        return;
      }
      // authorized
      navigate('/admin/dashboard');
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert('An unexpected error occurred while verifying admin access.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleLogin} className="w-full max-w-md p-6 bg-card rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <label className="block mb-2">
          <span className="text-sm ">Email</span>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full mt-1 p-2 text-black border border-border rounded" />
        </label>
        <label className="block mb-4">
          <span className="text-sm text-muted-foreground">Password</span>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full text-black mt-1 p-2 border border-border rounded" />
        </label>
        <button type="submit" className="w-full py-2 bg-primary text-primary-foreground rounded">
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto" />
          ) : (
            'Sign in'
          )}
        </button>
        <p className="mt-3 text-sm text-muted-foreground">If you don't have an admin account yet, create a user in Supabase Auth and add their UUID to <code>public.admins</code>.</p>
      </form>
    </div>
  );
}
