import { useState } from 'react';
import Dashboard from './components/Dashboard';
import SchoolDetail from './components/SchoolDetail';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

function App() {
  const [schools, setSchools] = useLocalStorage('cao-schools', []);
  const [selectedId, setSelectedId] = useState(null);

  const selectedSchool = schools.find(s => s.id === selectedId) || null;

  function handleAddSchool(school) {
    setSchools(prev => [...prev, school]);
  }

  function handleDeleteSchool(id) {
    if (window.confirm('Remove this school and all its data?')) {
      setSchools(prev => prev.filter(s => s.id !== id));
      if (selectedId === id) setSelectedId(null);
    }
  }

  function handleUpdateSchool(updated) {
    setSchools(prev => prev.map(s => s.id === updated.id ? updated : s));
  }

  return (
    <div className="app-container">
      {selectedSchool ? (
        <SchoolDetail
          school={selectedSchool}
          onUpdate={handleUpdateSchool}
          onBack={() => setSelectedId(null)}
        />
      ) : (
        <Dashboard
          schools={schools}
          onAddSchool={handleAddSchool}
          onDeleteSchool={handleDeleteSchool}
          onSelectSchool={setSelectedId}
        />
      )}
    </div>
  );
}

export default App;
