const ITEMS = [
  { key: 'essays', label: '📝 Essays', description: 'Personal statement and supplemental essays' },
  { key: 'transcripts', label: '📄 Transcripts', description: 'High school transcripts sent' },
  { key: 'recommendations', label: '✉️ Recommendations', description: 'Letters of recommendation requested/submitted' },
  { key: 'testScores', label: '🎯 Test Scores', description: 'SAT/ACT scores sent to school' },
];

export default function Checklist({ checklist, onChange }) {
  function toggle(key) {
    onChange({ ...checklist, [key]: !checklist[key] });
  }

  const completed = Object.values(checklist).filter(Boolean).length;
  const total = ITEMS.length;

  return (
    <div className="checklist">
      <div className="checklist-progress-label">
        {completed} of {total} completed
      </div>
      <ul className="checklist-list">
        {ITEMS.map(item => (
          <li
            key={item.key}
            className={`checklist-item ${checklist[item.key] ? 'checked' : ''}`}
            onClick={() => toggle(item.key)}
            role="checkbox"
            aria-checked={checklist[item.key]}
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && toggle(item.key)}
          >
            <span className="checkbox">
              {checklist[item.key] ? '✓' : ''}
            </span>
            <div className="checklist-text">
              <span className="checklist-item-label">{item.label}</span>
              <span className="checklist-item-desc">{item.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
