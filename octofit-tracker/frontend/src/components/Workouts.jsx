import { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';
};

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getApiUrl())
      .then((response) => response.json())
      .then((data) => {
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load workouts', error);
        setWorkouts([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4">Workouts</h2>
      {loading ? (
        <div className="empty-state">Loading workouts...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Focus</th>
                <th>Duration</th>
                <th>Intensity</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length ? (
                workouts.map((workout) => (
                  <tr key={workout.name}>
                    <td>{workout.name}</td>
                    <td>{workout.focus}</td>
                    <td>{workout.duration} min</td>
                    <td>{workout.intensity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">No workouts available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
