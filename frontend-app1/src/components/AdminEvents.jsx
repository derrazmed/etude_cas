import React, { useEffect, useState } from 'react';

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', date: '' });

  const fetchEvents = async () => {
    const res = await fetch('https://localhost:7183/api/events');
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    await fetch('https://localhost:7183/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    fetchEvents();
    setForm({ title: '', description: '', date: '' });
  };

  const handleDelete = async (id) => {
    await fetch(`https://localhost:7183/api/events/${id}`, { method: 'DELETE' });
    fetchEvents();
  };

  return (
    <div>
      <h2>Manage Events</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <input name="date" type="date" value={form.date} onChange={handleChange} />
      <button onClick={handleCreate}>Add Event</button>

      <ul>
        {events.map(ev => (
          <li key={ev.id}>
            <strong>{ev.title}</strong> - {ev.date}
            <button onClick={() => handleDelete(ev.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminEvents;
