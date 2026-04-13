import { useState } from 'react';
import { createEssay, countWords } from '../utils';

export default function EssayTracker({ essays, onChange }) {
  const [expandedId, setExpandedId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPrompt, setNewPrompt] = useState('');
  const [newWordLimit, setNewWordLimit] = useState(650);

  function addEssay() {
    if (!newPrompt.trim()) return;
    const essay = createEssay(newPrompt.trim(), Number(newWordLimit) || 650);
    onChange([...essays, essay]);
    setNewPrompt('');
    setNewWordLimit(650);
    setShowAddForm(false);
    setExpandedId(essay.id);
  }

  function updateEssay(id, field, value) {
    onChange(essays.map(e => e.id === id ? { ...e, [field]: value } : e));
  }

  function deleteEssay(id) {
    onChange(essays.filter(e => e.id !== id));
    if (expandedId === id) setExpandedId(null);
  }

  return (
    <div className="essay-tracker">
      {essays.length === 0 && !showAddForm && (
        <p className="empty-msg">No essays added yet. Click below to add a prompt.</p>
      )}

      {essays.map(essay => {
        const words = countWords(essay.draft);
        const limit = essay.wordLimit || 650;
        const pct = Math.min(100, Math.round((words / limit) * 100));
        const over = words > limit;
        const isOpen = expandedId === essay.id;

        return (
          <div key={essay.id} className={`essay-card ${isOpen ? 'open' : ''}`}>
            <div className="essay-card-header" onClick={() => setExpandedId(isOpen ? null : essay.id)}>
              <div className="essay-prompt-preview">
                <span className="essay-toggle">{isOpen ? '▾' : '▸'}</span>
                <span className="essay-prompt-text">{essay.prompt || 'Untitled Prompt'}</span>
              </div>
              <div className="essay-meta-right">
                <span className={`word-count ${over ? 'over-limit' : ''}`}>
                  {words}/{limit} words
                </span>
                <button
                  className="btn-icon delete-btn"
                  title="Delete essay"
                  onClick={e => { e.stopPropagation(); deleteEssay(essay.id); }}
                  aria-label="Delete essay"
                >
                  ✕
                </button>
              </div>
            </div>

            {isOpen && (
              <div className="essay-body">
                <label className="field-label">
                  Prompt
                  <input
                    className="field-input"
                    type="text"
                    value={essay.prompt}
                    onChange={e => updateEssay(essay.id, 'prompt', e.target.value)}
                    placeholder="Enter essay prompt…"
                  />
                </label>
                <label className="field-label">
                  Word Limit
                  <input
                    className="field-input word-limit-input"
                    type="number"
                    min={1}
                    max={5000}
                    value={essay.wordLimit}
                    onChange={e => updateEssay(essay.id, 'wordLimit', Number(e.target.value))}
                  />
                </label>
                <label className="field-label">
                  Draft
                  <textarea
                    className="field-textarea"
                    rows={10}
                    value={essay.draft}
                    onChange={e => updateEssay(essay.id, 'draft', e.target.value)}
                    placeholder="Paste or type your essay draft here…"
                  />
                </label>
                <div className="word-count-bar">
                  <div className="word-count-track">
                    <div
                      className="word-count-fill"
                      style={{
                        width: `${pct}%`,
                        background: over ? '#ef4444' : pct >= 90 ? '#f59e0b' : 'var(--accent)',
                      }}
                    />
                  </div>
                  <span className={`word-count-label ${over ? 'over-limit' : ''}`}>
                    {words} / {limit} words {over ? `(${words - limit} over)` : `(${pct}%)`}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {showAddForm ? (
        <div className="add-essay-form">
          <label className="field-label">
            Essay Prompt
            <input
              className="field-input"
              type="text"
              value={newPrompt}
              onChange={e => setNewPrompt(e.target.value)}
              placeholder="e.g. Describe a challenge you've overcome…"
              autoFocus
            />
          </label>
          <label className="field-label">
            Word Limit
            <input
              className="field-input word-limit-input"
              type="number"
              min={1}
              max={5000}
              value={newWordLimit}
              onChange={e => setNewWordLimit(e.target.value)}
            />
          </label>
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={addEssay}>Add Essay</button>
          </div>
        </div>
      ) : (
        <button className="btn btn-outline add-essay-btn" onClick={() => setShowAddForm(true)}>
          + Add Essay Prompt
        </button>
      )}
    </div>
  );
}
