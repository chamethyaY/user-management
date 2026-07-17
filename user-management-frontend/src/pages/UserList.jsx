import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', email: '', password: '' });

    const fetchUsers = () => {
        api.get('/users')
            .then(response => setUsers(response.data))
            .catch(() => setError('Failed to load users.'));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await api.delete(`/users/${id}`);
            fetchUsers();
        } catch {
            setError('Failed to delete user.');
        }
    };

    const startEdit = (user) => {
        setEditingUser(user.id);
        setEditForm({ name: user.name, email: user.email, password: user.password });
    };

    const cancelEdit = () => {
        setEditingUser(null);
    };

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const saveEdit = async (id) => {
        try {
            await api.put(`/users/${id}`, editForm);
            setEditingUser(null);
            fetchUsers();
        } catch {
            setError('Failed to update user.');
        }
    };

    // ---- Shared styles pulled from the Register page look ----
    const pageStyle = {
        minHeight: '100vh',
        backgroundColor: '#0f1220',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '60px 20px',
        fontFamily: 'inherit',
    };

    const cardStyle = {
        width: '100%',
        maxWidth: '900px',
        backgroundColor: '#1a1f30',
        borderRadius: '16px',
        padding: '48px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
    };

    const titleStyle = {
        textAlign: 'center',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '20px',
    };

    const linkStyle = {
        display: 'block',
        textAlign: 'center',
        color: '#8b7ffb',
        fontSize: '1.1rem',
        marginBottom: '30px',
        textDecoration: 'underline',
    };

    const thStyle = {
        textAlign: 'left',
        padding: '14px 16px',
        borderBottom: '2px solid #2e3450',
        color: '#a9b0d4',
        fontSize: '1.05rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    };

    const tdStyle = {
        padding: '16px',
        fontSize: '1.15rem',
        color: '#e8e9f3',
        borderBottom: '1px solid #262b42',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        fontSize: '1rem',
        borderRadius: '8px',
        border: '1px solid #333a58',
        backgroundColor: '#12162a',
        color: '#fff',
        outline: 'none',
    };

    const baseButtonStyle = {
        padding: '10px 18px',
        fontSize: '1rem',
        fontWeight: 600,
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        marginRight: '8px',
    };

    const editButtonStyle = {
        ...baseButtonStyle,
        backgroundColor: '#3a3f5c',
        color: '#fff',
    };

    const deleteButtonStyle = {
        ...baseButtonStyle,
        backgroundColor: '#e05a5a',
        color: '#fff',
    };

    const saveButtonStyle = {
        ...baseButtonStyle,
        backgroundColor: '#6c5ce7',
        color: '#fff',
    };

    const cancelButtonStyle = {
        ...baseButtonStyle,
        backgroundColor: '#3a3f5c',
        color: '#fff',
    };

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <h1 style={titleStyle}>User List</h1>
                <Link to="/dashboard" style={linkStyle}>Back to Dashboard</Link>

                {error && (
                    <p style={{ color: '#ff8080', textAlign: 'center', fontSize: '1.1rem' }}>
                        {error}
                    </p>
                )}

                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                    <tr>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            {editingUser === user.id ? (
                                <>
                                    <td style={tdStyle}>
                                        <input
                                            name="name"
                                            value={editForm.name}
                                            onChange={handleEditChange}
                                            style={inputStyle}
                                        />
                                    </td>
                                    <td style={tdStyle}>
                                        <input
                                            name="email"
                                            value={editForm.email}
                                            onChange={handleEditChange}
                                            style={inputStyle}
                                        />
                                    </td>
                                    <td style={tdStyle}>
                                        <button style={saveButtonStyle} onClick={() => saveEdit(user.id)}>
                                            Save
                                        </button>
                                        <button style={cancelButtonStyle} onClick={cancelEdit}>
                                            Cancel
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td style={tdStyle}>{user.name}</td>
                                    <td style={tdStyle}>{user.email}</td>
                                    <td style={tdStyle}>
                                        <button style={editButtonStyle} onClick={() => startEdit(user)}>
                                            Edit
                                        </button>
                                        <button style={deleteButtonStyle} onClick={() => handleDelete(user.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;