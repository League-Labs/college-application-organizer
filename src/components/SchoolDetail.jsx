import { useState } from 'react';
import { STATUS_OPTIONS, STATUS_COLORS, formatDate, daysUntil, getChecklistProgress } from '../utils';
import Checklist from './Checklist';
import EssayTracker from './EssayTracker';
import Notes from './Notes';
import ProgressBar from './ProgressBar';

const TABS = ['Overview', 'Checklist', 'Essays', 'Notes'];

export default function SchoolDetail({ school, onUpdate, onBack }) {
  const [activeTab, setActiveTab] = useState('Overview');

  function update(field, value) {
    onUpdate({ ...school, [field]: value });
  }

  const { completed, total } = getChecklistProgress(school.checklist);
  const checklistPct = Math.round((completed / total) * 100);
  const days = daysUntil(school.deadline);
  const statusColor = STATUS_COLORS[school.status] || '#94a3b8';

  function deadlineBadge() {
    if (days === null) return null;
    if (days < 0) return <span className="deadline-chip deadline-overdue">{Math.abs(days)} days overdue</span>;
    if (days === 0) return <span className="deadline-chip deadline-today">Due today!</span>;
    if (days <= 7) return <span className="deadline-chip deadline-soon">{days} days left</span>;
    return <span className="deadline-chip deadline-ok">{days} days left</span>;
  }

  return (
    <div className="school-detail">
      <button className="btn btn-back" onClick={onBack}>← Back to Dashboard</button>

      <div className="detail-hero">
        <div className="detail-hero-left">
          <h1 className="detail-school-name">{school.name}</h1>
          <div className="detail-meta">
            <span className="status-badge" style={{ background: statusColor }}>{school.status}</span>
            <span className="meta-item">📅 {formatDate(school.deadline)}</span>
            {deadlineBadge()}
          </div>
        </div>
        <div className="detail-hero-right">
          <ProgressBar value={checklistPct} label="Checklist completion" />
        </div>
      </div>

      <nav className="tab-nav" role="tablist">
        {TABS.map(tab => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="tab-content">
        {activeTab === 'Overview' && (
          <div className="overview-tab">
            <section className="form-section">
              <h2 className="section-title">School Details</h2>
              <label className="field-label">
                School Name
                <input
                  className="field-input"
                  type="text"
                  value={school.name}
                  onChange={e => update('name', e.target.value)}
                />
              </label>
              <label className="field-label">
                Application Deadline
                <input
                  className="field-input"
                  type="date"
                  value={school.deadline}
                  onChange={e => update('deadline', e.target.value)}
                />
              </label>
              <label className="field-label">
                Application Status
                <select
                  className="field-input"
                  value={school.status}
                  onChange={e => update('status', e.target.value)}
                >
                  {STATUS_OPTIONS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
            </section>

            <section className="form-section">
              <h2 className="section-title">Progress Summary</h2>
              <div className="summary-grid">
                <div className="summary-card">
                  <span className="summary-num">{completed}/{total}</span>
                  <span className="summary-label">Checklist Items</span>
                </div>
                <div className="summary-card">
                  <span className="summary-num">{school.essays.length}</span>
                  <span className="summary-label">Essays</span>
                </div>
                <div className="summary-card">
                  <span className="summary-num">{school.notes.trim() ? '✓' : '—'}</span>
                  <span className="summary-label">Notes</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'Checklist' && (
          <Checklist
            checklist={school.checklist}
            onChange={val => update('checklist', val)}
          />
        )}

        {activeTab === 'Essays' && (
          <EssayTracker
            essays={school.essays}
            onChange={val => update('essays', val)}
          />
        )}

        {activeTab === 'Notes' && (
          <Notes
            notes={school.notes}
            onChange={val => update('notes', val)}
          />
        )}
      </div>
    </div>
  );
}
