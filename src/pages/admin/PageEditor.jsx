import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

// Section editor: each page contains content: { sections: [ { id, title, type, body, image_url } ] }
export default function PageEditor({ slug, title }) {
  const [page, setPage] = useState({ sections: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState(0);

  const fetchPage = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('site_pages').select('*').eq('slug', slug).single();
    if (error && error.code !== 'PGRST116') {
      console.error(error);
    }
    if (data) {
      // Support legacy pages that stored content.body as a single string
      const content = data.content || {};
      if (!content.sections && content.body) {
        setPage({ sections: [{ id: 'legacy-' + Date.now(), title: 'Body', type: 'html', body: content.body }] });
      } else {
        setPage(content || { sections: [] });
      }
    } else {
      setPage({ sections: [] });
    }
    setLoading(false);
  };

  useEffect(() => { fetchPage(); }, [slug]);

  const handleSave = async () => {
    setSaving(true);
    const payload = { slug, content: page, updated_at: new Date().toISOString() };
    const { error } = await supabase.from('site_pages').upsert(payload, { onConflict: ['slug'] });
    setSaving(false);
    if (error) { alert('Save failed: ' + error.message); return; }
    alert('Saved');
  };

  const addSection = () => {
    const s = { id: Date.now().toString(), title: 'New section', type: 'text', body: '' };
    setPage(p => ({ sections: [...p.sections, s] }));
    setSelected(page.sections.length);
  };

  const updateSection = (idx, patch) => {
    setPage(p => {
      const sections = [...p.sections];
      sections[idx] = { ...sections[idx], ...patch };
      return { ...p, sections };
    });
  };

  const deleteSection = (idx) => {
    if (!confirm('Delete this section?')) return;
    setPage(p => ({ sections: p.sections.filter((_, i) => i !== idx) }));
    setSelected(0);
  };

  const moveSection = (from, to) => {
    setPage(p => {
      const sections = [...p.sections];
      const [m] = sections.splice(from, 1);
      sections.splice(to, 0, m);
      return { ...p, sections };
    });
    setSelected(to);
  };

  async function uploadImage(file) {
    if (!file) return null;
    const filePath = `page-assets/${slug}/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from('project-images').upload(filePath, file, { upsert: false });
    if (error) { console.error(error); throw error; }
    const { data } = supabase.storage.from('project-images').getPublicUrl(filePath);
    return data.publicUrl;
  }

  const handleImageChange = async (e, idx) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const url = await uploadImage(f);
      updateSection(idx, { image_url: url });
    } catch (err) {
      alert('Upload failed');
    }
  };

  if (loading) return <div className="p-6">Loading {title}...</div>;

  const sections = page.sections || [];
  const current = sections[selected] || null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside className="md:col-span-1 bg-surface p-4 rounded border border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold">{title} sections</h4>
          <button onClick={addSection} className="px-2 py-1 bg-primary text-primary-foreground rounded">Add</button>
        </div>
        <div className="space-y-2">
          {sections.length === 0 && <div className="text-sm text-muted-foreground">No sections yet. Add one.</div>}
          {sections.map((s, i) => (
            <div key={s.id} className={`p-2 rounded cursor-pointer ${i === selected ? 'bg-primary/5 border border-primary/10' : 'bg-card'}`} onClick={() => setSelected(i)}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{s.title || 'Untitled'}</div>
                  <div className="text-xs text-muted-foreground">{s.type}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <button title="Move up" disabled={i===0} onClick={(e)=>{e.stopPropagation(); if(i>0) moveSection(i,i-1);}} className="px-2 py-1 text-xs bg-ghost rounded">↑</button>
                  <button title="Move down" disabled={i===sections.length-1} onClick={(e)=>{e.stopPropagation(); if(i<sections.length-1) moveSection(i,i+1);}} className="px-2 py-1 text-xs bg-ghost rounded">↓</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <div className="md:col-span-3 bg-card p-4 rounded">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Editing: {current ? current.title : 'No section selected'}</h3>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 bg-primary text-primary-foreground rounded" disabled={saving}>{saving ? 'Saving...' : 'Save page'}</button>
            <button onClick={fetchPage} className="px-4 py-2 bg-ghost rounded">Reload</button>
          </div>
        </div>

        {!current && <div className="text-sm text-muted-foreground">Select a section to edit or add a new one.</div>}

        {current && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input value={current.title} onChange={(e)=>updateSection(selected,{ title: e.target.value })} className="w-full p-2 border border-border rounded" />
            </div>

            <div>
              <label className="block text-sm mb-1">Type</label>
              <select value={current.type} onChange={(e)=>updateSection(selected,{ type: e.target.value })} className="p-2 border border-border rounded">
                <option value="text">Text</option>
                <option value="html">HTML</option>
                <option value="markdown">Markdown</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Body</label>
              <textarea value={current.body} onChange={(e)=>updateSection(selected,{ body: e.target.value })} className="w-full p-2 border border-border rounded h-40" />
            </div>

            <div>
              <label className="block text-sm mb-1">Image (optional)</label>
              <input type="file" accept="image/*" onChange={(e)=>handleImageChange(e, selected)} />
              {current.image_url && <img src={current.image_url} alt="section" className="mt-2 w-48 h-24 object-cover rounded" />}
            </div>

            <div className="flex gap-2">
              <button onClick={()=>deleteSection(selected)} className="px-3 py-2 bg-destructive text-white rounded">Delete section</button>
              <button onClick={()=>{updateSection(selected,{ title: current.title+' (copy)'}); setPage(p=>({ sections: [...p.sections, {...current, id: Date.now().toString()}]}));}} className="px-3 py-2 bg-ghost rounded">Duplicate</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
