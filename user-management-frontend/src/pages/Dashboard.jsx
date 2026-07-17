import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    if (!user) {
        navigate('/');
        return null;
    }

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>Welcome, {user.name}</h1>
                <p style={styles.subtitle}>Manage your account and users below.</p>

                <div style={styles.buttonRow}>
                    <Link to="/users" style={{ textDecoration: 'none' }}>
                        <button style={styles.primaryButton}>View Users</button>
                    </Link>
                    <button style={styles.secondaryButton} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111827',
        fontFamily: 'Segoe UI, Arial, sans-serif',
    },
    card: {
        width: '100%',
        maxWidth: '480px',
        padding: '40px',
        backgroundColor: '#1f2937',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        textAlign: 'center',
    },
    title: {
        fontSize: '30px',
        fontWeight: 700,
        color: '#f9fafb',
        marginBottom: '12px',
    },
    subtitle: {
        fontSize: '16px',
        color: '#9ca3af',
        marginBottom: '32px',
    },
    buttonRow: {
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
    },
    primaryButton: {
        fontSize: '16px',
        fontWeight: 600,
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#4f46e5',
        color: '#ffffff',
        cursor: 'pointer',
    },
    secondaryButton: {
        fontSize: '16px',
        fontWeight: 600,
        padding: '12px 24px',
        borderRadius: '8px',
        border: '1px solid #374151',
        backgroundColor: 'transparent',
        color: '#d1d5db',
        cursor: 'pointer',
    },
};

export default Dashboard;