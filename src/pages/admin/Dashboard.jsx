import React, { useState, useEffect } from 'react';
import AdminGuard from '../../components/AdminGuard';
import PageEditor from './PageEditor';
import { supabase } from '../../utils/supabaseClient';
import Icon from '../../components/AppIcon';

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Dashboard() {
  const [active, setActive] = useState('home');
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session || null;
      if (mounted && session) setUser(session.user);
    })();
    return () => (mounted = false);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // small redirect to login
    window.location.href = '/admin/login';
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="col-span-1 bg-card rounded-lg p-4 shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center">
                <Icon name="Settings" size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold">Admin</div>
                <div className="text-xs text-muted-foreground">Manage site content</div>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`text-left w-full px-3 py-2 rounded flex items-center gap-3 hover:bg-primary/5 transition ${active===t.id ? 'bg-primary/5 border border-primary/10' : ''}`}
                >
                  <span className="font-medium">{t.label}</span>
                </button>
              ))}
              <div className="border-t my-3" />
              <button onClick={() => setActive('projects')} className="w-full px-3 py-2 rounded bg-emerald-600 text-white">Open Projects Editor</button>
            </nav>

            <div className="mt-6 text-xs text-muted-foreground">
              <div>Documentation: <a href="/" className="text-primary">View site</a></div>
            </div>
          </aside>

          {/* Main */}
          <main className="col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Edit content for the public site quickly and safely.</p>
              </div>
              <div className="flex items-center gap-4">
                {user && (
                  <div className="text-sm text-right">
                    <div className="font-medium">{user.email}</div>
                    <div className="text-xs text-muted-foreground">{user.id}</div>
                  </div>
                )}
                <button onClick={handleSignOut} className="px-3 py-2 bg-card border border-border rounded">Sign out</button>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow">
              <PageEditor slug={active} title={tabs.find(t => t.id === active).label} />
            </div>
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
