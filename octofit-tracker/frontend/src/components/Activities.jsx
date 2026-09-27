import { useEffect, useState } from 'react';

const getBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${getBaseUrl()}/api/activities/`)
      .then((response) => response.json())
      .then((data) => {
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load activities', error);
        setActivities([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4">Activities</h2>
      {loading ? (
        <div className="empty-state">Loading activities...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.length ? (
                activities.map((activity) => (
                  <tr key={`${activity.user}-${activity.date}`}>
                    <td>{activity.user}</td>
                    <td>{activity.type}</td>
                    <td>{activity.duration} min</td>
                    <td>{activity.calories}</td>
                    <td>{activity.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No activities available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
