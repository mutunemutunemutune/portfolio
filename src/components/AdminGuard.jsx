import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AdminGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }
      const { data } = await supabase.from('admins').select('id').eq('id', session.user.id).single();
      if (mounted) {
        if (data) setIsAdmin(true);
        else {
          alert('Not authorized');
          await supabase.auth.signOut();
          navigate('/');
        }
      }
      setLoading(false);
    };
    check();
    return () => (mounted = false);
  }, []);

  if (loading) return <div className="p-8 text-center">Checking access…</div>;
  if (!isAdmin) return null;
  return children;
}
