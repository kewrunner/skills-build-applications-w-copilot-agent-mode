import { useEffect, useState } from 'react';

const getBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${getBaseUrl()}/api/leaderboard/`)
      .then((response) => response.json())
      .then((data) => {
        setLeaderboard(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load leaderboard', error);
        setLeaderboard([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4">Leaderboard</h2>
      {loading ? (
        <div className="empty-state">Loading leaderboard...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Streak</th>
                <th>Badge</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length ? (
                leaderboard.map((entry, index) => (
                  <tr key={entry.name}>
                    <td>{index + 1}</td>
                    <td>{entry.name}</td>
                    <td>{entry.score}</td>
                    <td>{entry.streak} days</td>
                    <td>{entry.badge}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No leaderboard entries available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
