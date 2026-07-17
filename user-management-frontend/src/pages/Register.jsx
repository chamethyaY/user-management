import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [generalError, setGeneralError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');
        setGeneralError('');

        try {
            const response = await api.post('/register', formData);
            localStorage.setItem('user', JSON.stringify(response.data));
            setSuccessMessage('Registration successful! Redirecting to dashboard...');
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data);
            } else if (error.response && error.response.status === 409) {
                setGeneralError(error.response.data);
            } else {
                setGeneralError('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>Register</h1>

                {successMessage && <p style={styles.success}>{successMessage}</p>}
                {generalError && <p style={styles.error}>{generalError}</p>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.field}>
                        <label style={styles.label}>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        {errors.name && <p style={styles.fieldError}>{errors.name}</p>}
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        {errors.email && <p style={styles.fieldError}>{errors.email}</p>}
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        {errors.password && <p style={styles.fieldError}>{errors.password}</p>}
                    </div>

                    <button type="submit" style={styles.button}>Register</button>
                </form>

                <p style={styles.footerText}>
                    Already have an account?{' '}
                    <Link to="/" style={styles.link}>Login here</Link>
                </p>
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
        maxWidth: '420px',
        padding: '40px',
        backgroundColor: '#1f2937',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    },
    title: {
        fontSize: '32px',
        fontWeight: 700,
        textAlign: 'center',
        color: '#f9fafb',
        marginBottom: '32px',
    },
    success: {
        color: '#4ade80',
        fontSize: '15px',
        textAlign: 'center',
        marginBottom: '16px',
    },
    error: {
        color: '#f87171',
        fontSize: '15px',
        textAlign: 'center',
        marginBottom: '16px',
    },
    fieldError: {
        color: '#f87171',
        fontSize: '13px',
        marginTop: '4px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        fontSize: '16px',
        fontWeight: 500,
        color: '#d1d5db',
    },
    input: {
        fontSize: '16px',
        padding: '12px 14px',
        borderRadius: '8px',
        border: '1px solid #374151',
        backgroundColor: '#111827',
        color: '#f9fafb',
        outline: 'none',
    },
    button: {
        marginTop: '10px',
        fontSize: '17px',
        fontWeight: 600,
        padding: '12px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#4f46e5',
        color: '#ffffff',
        cursor: 'pointer',
    },
    footerText: {
        marginTop: '24px',
        fontSize: '15px',
        textAlign: 'center',
        color: '#9ca3af',
    },
    link: {
        color: '#818cf8',
        fontWeight: 500,
        textDecoration: 'none',
    },
};

export default Register;