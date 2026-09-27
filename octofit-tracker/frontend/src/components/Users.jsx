import { useEffect, useState } from 'react';

const getBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${getBaseUrl()}/api/users/`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load users', error);
        setUsers([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4">Users</h2>
      {loading ? (
        <div className="empty-state">Loading users...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Goal</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.length ? (
                users.map((user) => (
                  <tr key={user.email || user.name}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.goal}</td>
                    <td>{user.team}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">No users available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
