import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  useEffect(() => {
    // If user is already logged in, redirect them
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setSuccess(data.message || 'Success! Redirecting...');
        
        setTimeout(() => {
          // If the redirect path is a full PHP script path from legacy redirects (e.g. apply.php),
          // redirect to client-side dashboard or profile
          if (redirectPath.includes('apply.php')) {
            navigate('/dashboard?action=apply');
          } else {
            navigate(redirectPath);
          }
          window.location.reload(); // Refresh navbar status
        }, 1000);
      } else {
        throw new Error(data.message || 'Authentication failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Server error. Please verify your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '460px', display: 'flex', flexDirection: 'column', minHeight: '60vh', justifyContent: 'center' }}>
      <div style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '36px 30px',
        boxShadow: 'var(--shadow-md)'
      }}>
        {/* Toggle Headers */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '28px' }}>
          <button 
            onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              paddingBottom: '12px',
              fontFamily: 'var(--font-title)',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: isLogin ? 'var(--primary-color)' : 'var(--text-muted)',
              borderBottom: isLogin ? '2.5px solid var(--primary-color)' : 'none',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button 
            onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              paddingBottom: '12px',
              fontFamily: 'var(--font-title)',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: !isLogin ? 'var(--primary-color)' : 'var(--text-muted)',
              borderBottom: !isLogin ? '2.5px solid var(--primary-color)' : 'none',
              cursor: 'pointer'
            }}
          >
            Register
          </button>
        </div>

        {error && (
          <div style={{
            padding: '10px 14px',
            backgroundColor: '#ffe6e6',
            color: '#dc3545',
            border: '1px solid #f5c6cb',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.88rem',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            padding: '10px 14px',
            backgroundColor: '#e6ffe6',
            color: '#28a745',
            border: '1px solid #c3e6cb',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.88rem',
            marginBottom: '20px'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {!isLogin && (
            <div>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500 }}>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-light)',
                  color: 'var(--text-main)',
                  outline: 'none',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500 }}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-light)',
                color: 'var(--text-main)',
                outline: 'none',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500 }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-light)',
                color: 'var(--text-main)',
                outline: 'none',
                fontSize: '0.95rem'
              }}
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="role" style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 500 }}>
                I am a:
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-light)',
                  color: 'var(--text-main)',
                  outline: 'none',
                  fontSize: '0.95rem'
                }}
              >
                <option value="student">Student looking for a room</option>
                <option value="landlord">Property Owner / Landlord</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '10px' }}
          >
            {isSubmitting 
              ? (isLogin ? 'Signing In...' : 'Registering...') 
              : (isLogin ? 'Sign In' : 'Create Account')
            }
          </button>
        </form>

        {isLogin && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Demo Account: </span>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>student@resplek.com</span>
            <span style={{ color: 'var(--text-muted)' }}> / password: </span>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>student123</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default Login;
