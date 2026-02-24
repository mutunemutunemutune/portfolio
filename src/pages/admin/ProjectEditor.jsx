import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import Icon from '../../components/AppIcon';

export default function ProjectEditor() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewSrc, setPreviewSrc] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: true });
    if (error) console.error(error);
    else setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  async function handleUpload(file) {
    const filePath = `project-images/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from('project-images').upload(filePath, file, { upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from('project-images').getPublicUrl(filePath);
    return data.publicUrl;
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value || 'Uncategorized';
    const technologies = form.technologies.value ? form.technologies.value.split(',').map(s => s.trim()) : [];
    let image_url = null;
    const file = form.image.files[0];
    if (file) image_url = await handleUpload(file);

    const { data, error } = await supabase.from('projects').insert([{ title, description: form.description.value, category, technologies, image_url }]);
    if (error) return alert(error.message);
    fetchProjects();
    form.reset();
    setPreviewSrc(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete project?')) return;
    await supabase.from('projects').delete().eq('id', id);
    fetchProjects();
  };

  const handleToggleFeature = async (id, current) => {
    const { error } = await supabase.from('projects').update({ featured: !current }).eq('id', id);
    if (error) return alert(error.message);
    fetchProjects();
  };

  if (loading) return <div className="p-8 text-center">Loading…</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-card p-4 rounded">
        <h3 className="text-lg font-semibold mb-3">Create Project</h3>
        <form onSubmit={handleCreate} className="flex flex-col gap-3">
          <input name="title" placeholder="Title" className="w-full p-2 border border-border rounded" required />
          <input name="category" placeholder="Category (Web Application)" className="w-full p-2 border border-border rounded" />
          <input name="technologies" placeholder="Techs (comma separated)" className="w-full p-2 border border-border rounded" />
          <textarea name="description" placeholder="Short description" className="w-full p-2 border border-border rounded h-28" />
          <input name="image" type="file" accept="image/*" onChange={(e) => {
            const f = e.target.files[0];
            if (f) setPreviewSrc(URL.createObjectURL(f));
            else setPreviewSrc(null);
          }} />
          {previewSrc && <img src={previewSrc} alt="preview" className="w-full h-40 object-cover rounded" />}
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded">Create</button>
            <button type="button" onClick={() => { setPreviewSrc(null); document.querySelector('input[name=image]').value = ''; }} className="px-4 py-2 bg-muted rounded">Clear</button>
          </div>
        </form>
      </div>

      <div className="lg:col-span-2">
        <h3 className="text-lg font-semibold mb-3">Projects</h3>
        <div className="space-y-4">
          {projects.map(p => (
            <div key={p.id} className="bg-card p-4 rounded flex gap-4 items-start">
              <div className="w-32 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                {p.image_url ? <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" /> : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{p.title}</h4>
                    <div className="text-sm text-muted">{p.category}</div>
                    <div className="text-xs mt-2 text-muted-foreground">{p.technologies?.join(', ')}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleToggleFeature(p.id, p.featured)} className={`px-3 py-1 rounded ${p.featured ? 'bg-yellow-400 text-black' : 'bg-card border'}`}>
                      {p.featured ? 'Featured' : 'Feature'}
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-destructive text-white rounded">Delete</button>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
