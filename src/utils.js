export const STATUS_OPTIONS = [
  'Not Started',
  'In Progress',
  'Submitted',
  'Accepted',
  'Rejected',
  'Waitlisted',
];

export const STATUS_COLORS = {
  'Not Started': '#94a3b8',
  'In Progress': '#3b82f6',
  'Submitted': '#8b5cf6',
  'Accepted': '#22c55e',
  'Rejected': '#ef4444',
  'Waitlisted': '#f59e0b',
};

export const DEFAULT_CHECKLIST = {
  essays: false,
  transcripts: false,
  recommendations: false,
  testScores: false,
};

export function createSchool(name, deadline) {
  return {
    id: Date.now().toString(),
    name,
    deadline: deadline || '',
    status: 'Not Started',
    checklist: { ...DEFAULT_CHECKLIST },
    essays: [],
    notes: '',
  };
}

export function createEssay(prompt, wordLimit) {
  return {
    id: Date.now().toString() + Math.random().toString(36).slice(2),
    prompt: prompt || '',
    wordLimit: wordLimit || 650,
    draft: '',
  };
}

export function countWords(text) {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

export function getChecklistProgress(checklist) {
  const items = Object.values(checklist);
  const completed = items.filter(Boolean).length;
  return { completed, total: items.length };
}

export function getOverallProgress(schools) {
  if (!schools.length) return 0;
  const weights = {
    'Not Started': 0,
    'In Progress': 0.25,
    'Submitted': 0.5,
    'Accepted': 1,
    'Rejected': 1,
    'Waitlisted': 0.75,
  };
  const total = schools.reduce((sum, school) => sum + (weights[school.status] ?? 0), 0);
  return Math.round((total / schools.length) * 100);
}

export function formatDate(dateStr) {
  if (!dateStr) return 'No deadline';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function daysUntil(dateStr) {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(dateStr + 'T00:00:00');
  const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  return diff;
}
