import { useState } from 'react';
import { createSchool } from '../utils';

export default function AddSchoolModal({ onAdd, onClose }) {
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError('School name is required.');
      return;
    }
    onAdd(createSchool(name.trim(), deadline));
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add a School</h2>
          <button className="btn-icon" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="field-label">
            School Name *
            <input
              className="field-input"
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setError(''); }}
              placeholder="e.g. MIT, Stanford University…"
              autoFocus
            />
          </label>
          {error && <p className="field-error">{error}</p>}
          <label className="field-label">
            Application Deadline
            <input
              className="field-input"
              type="date"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
            />
          </label>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add School</button>
          </div>
        </form>
      </div>
    </div>
  );
}
