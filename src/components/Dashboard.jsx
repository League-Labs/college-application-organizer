import { useState } from 'react';
import SchoolCard from './SchoolCard';
import AddSchoolModal from './AddSchoolModal';
import ProgressBar from './ProgressBar';
import { getOverallProgress, STATUS_OPTIONS } from '../utils';

const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'deadline', label: 'Deadline' },
  { value: 'status', label: 'Status' },
];

export default function Dashboard({ schools, onAddSchool, onDeleteSchool, onSelectSchool }) {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('deadline');

  const overallProgress = getOverallProgress(schools);

  const STATUS_ORDER = ['Not Started', 'In Progress', 'Submitted', 'Waitlisted', 'Accepted', 'Rejected'];

  const filtered = schools
    .filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'All' || s.status === filterStatus;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'deadline') {
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return a.deadline.localeCompare(b.deadline);
      }
      if (sortBy === 'status') {
        return STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
      }
      return 0;
    });

  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = schools.filter(sc => sc.status === s).length;
    return acc;
  }, {});

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="app-title">🎓 College Application Organizer</h1>
          <p className="app-subtitle">Track every deadline, essay, and requirement in one place</p>
        </div>
        <button className="btn btn-primary add-school-btn" onClick={() => setShowModal(true)}>
          + Add School
        </button>
      </div>

      {schools.length > 0 && (
        <div className="overall-progress-section">
          <ProgressBar
            value={overallProgress}
            label={`Overall Progress — ${schools.length} school${schools.length !== 1 ? 's' : ''}`}
          />
          <div className="status-chips">
            {STATUS_OPTIONS.filter(s => counts[s] > 0).map(s => (
              <span
                key={s}
                className={`filter-chip ${filterStatus === s ? 'active' : ''}`}
                onClick={() => setFilterStatus(filterStatus === s ? 'All' : s)}
              >
                {s} ({counts[s]})
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="toolbar">
        <input
          className="search-input"
          type="search"
          placeholder="Search schools…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search schools"
        />
        <div className="sort-wrap">
          <label className="sort-label" htmlFor="sort-select">Sort:</label>
          <select
            id="sort-select"
            className="field-input sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {schools.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏫</div>
          <h2>No schools added yet</h2>
          <p>Start tracking your college applications by adding your first school.</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Your First School</button>
        </div>
      ) : filtered.length === 0 ? (
        <p className="empty-msg">No schools match your search or filter.</p>
      ) : (
        <div className="schools-grid">
          {filtered.map(school => (
            <SchoolCard
              key={school.id}
              school={school}
              onClick={() => onSelectSchool(school.id)}
              onDelete={onDeleteSchool}
            />
          ))}
        </div>
      )}

      {showModal && (
        <AddSchoolModal
          onAdd={onAddSchool}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
