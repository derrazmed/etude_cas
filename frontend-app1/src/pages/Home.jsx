import React, { useEffect, useState } from 'react';

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7183/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Failed to fetch events:', err));
  }, []);

  return (
    <div>
      <h1>Upcoming Events</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {events.map(event => (
          <div key={event.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', width: '300px' }}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <small>{new Date(event.date).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
