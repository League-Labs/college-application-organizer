export default function ProgressBar({ value, label, color, showLabel = true }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className="progress-wrap">
      {showLabel && (
        <div className="progress-meta">
          <span className="progress-label">{label}</span>
          <span className="progress-value">{pct}%</span>
        </div>
      )}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${pct}%`, background: color || 'var(--accent)' }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
