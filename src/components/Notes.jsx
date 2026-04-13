export default function Notes({ notes, onChange }) {
  return (
    <div className="notes-section">
      <p className="notes-hint">
        Jot down anything important: contact info, interview dates, scholarship details, etc.
      </p>
      <textarea
        className="field-textarea notes-textarea"
        rows={10}
        value={notes}
        onChange={e => onChange(e.target.value)}
        placeholder="Add notes about this school…"
      />
    </div>
  );
}
