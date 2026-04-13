import { STATUS_COLORS, formatDate, daysUntil, getChecklistProgress } from '../utils';

export default function SchoolCard({ school, onClick, onDelete }) {
  const { completed, total } = getChecklistProgress(school.checklist);
  const checklistPct = Math.round((completed / total) * 100);
  const days = daysUntil(school.deadline);
  const statusColor = STATUS_COLORS[school.status] || '#94a3b8';

  function deadlineLabel() {
    if (days === null) return { text: 'No deadline', cls: 'deadline-none' };
    if (days < 0) return { text: `${Math.abs(days)}d overdue`, cls: 'deadline-overdue' };
    if (days === 0) return { text: 'Due today!', cls: 'deadline-today' };
    if (days <= 7) return { text: `${days}d left`, cls: 'deadline-soon' };
    return { text: `${days}d left`, cls: 'deadline-ok' };
  }

  const dl = deadlineLabel();

  return (
    <div className="school-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}>
      <div className="school-card-header">
        <h3 className="school-name">{school.name}</h3>
        <button
          className="btn-icon delete-btn"
          title="Delete school"
          onClick={e => { e.stopPropagation(); onDelete(school.id); }}
          aria-label={`Delete ${school.name}`}
        >
          ✕
        </button>
      </div>

      <span className="status-badge" style={{ background: statusColor }}>
        {school.status}
      </span>

      <div className="school-card-meta">
        <span className="meta-item">📅 {formatDate(school.deadline)}</span>
        <span className={`meta-item deadline-chip ${dl.cls}`}>{dl.text}</span>
      </div>

      <div className="checklist-summary">
        <span className="checklist-label">Checklist: {completed}/{total}</span>
        <div className="mini-bar">
          <div className="mini-bar-fill" style={{ width: `${checklistPct}%` }} />
        </div>
      </div>
    </div>
  );
}
