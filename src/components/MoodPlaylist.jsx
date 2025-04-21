
import React, { useState } from 'react';

const MoodPlaylist = () => {
  const [input, setInput] = useState('');
  const [mood, setMood] = useState(null);
  const [playlistId, setPlaylistId] = useState(null);

  const handleGenerate = async () => {
    const res = await fetch('http://localhost:5000/api/mood', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    });
    const data = await res.json();
    setMood(data.mood);
    setPlaylistId(data.playlistId);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h1 className="text-2xl font-bold mb-4">🎵 Mood Playlist Generator</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="How are you feeling today?"
        className="w-full p-3 border border-gray-300 rounded mb-4"
        rows={4}
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
      >
        Generate Playlist
      </button>
      {mood && (
        <div className="mt-6">
          <p className="text-lg mb-2">Detected mood: <strong>{mood}</strong></p>
          <iframe
            className="w-full h-64"
            src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="YouTube Playlist"
          />
        </div>
      )}
    </div>
  );
};

export default MoodPlaylist;
