import { useEffect, useState } from 'react';

const getBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${getBaseUrl()}/api/teams/`)
      .then((response) => response.json())
      .then((data) => {
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load teams', error);
        setTeams([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4">Teams</h2>
      {loading ? (
        <div className="empty-state">Loading teams...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Sport</th>
                <th>Members</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {teams.length ? (
                teams.map((team) => (
                  <tr key={team.name}>
                    <td>{team.name}</td>
                    <td>{team.sport}</td>
                    <td>{team.members}</td>
                    <td>{team.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">No teams available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
