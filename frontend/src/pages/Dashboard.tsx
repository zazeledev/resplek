import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [course, setCourse] = useState('B.Com Accounting Science');
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [searchResult, setSearchResult] = useState('');

  useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    if (!cachedUser) {
      navigate('/login?redirect=/dashboard');
    } else {
      setUser(JSON.parse(cachedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;

    if (searchVal.toLowerCase().includes('stelle')) {
      setSearchResult('Found 2 verified properties in Stellenbosch (Bergzicht Plaza, Die Berke).');
    } else if (searchVal.toLowerCase().includes('cape')) {
      setSearchResult('Found 1 verified property in Cape Town (Shared Room in Cape Town).');
    } else if (searchVal.toLowerCase().includes('durban') || searchVal.toLowerCase().includes('joburg') || searchVal.toLowerCase().includes('johan')) {
      setSearchResult(`Found properties matching "${searchVal}"! Visit Listings to view.`);
    } else {
      setSearchResult('No properties found matching your search. Try "Stellenbosch" or "Cape Town".');
    }
  };

  if (!user) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <p>Loading your student portal...</p>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: '800px' }}>
      <div style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '40px 32px',
        boxShadow: 'var(--shadow-md)',
        position: 'relative'
      }}>
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '96px',
            height: '96px',
            margin: '0 auto 16px auto',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid var(--primary-color)',
            boxShadow: 'var(--shadow-sm)',
            backgroundColor: 'var(--bg-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem'
          }}>
            👤
          </div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '6px' }}>Welcome, {user.name}</h2>
          <span style={{
            backgroundColor: 'rgba(40, 167, 69, 0.15)',
            color: '#28a745',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '0.85rem',
            fontWeight: 600,
            border: '1px solid rgba(40, 167, 69, 0.2)'
          }}>
            Verified {user.role === 'student' ? 'Student Profile' : 'Landlord Profile'}
          </span>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.02rem' }}>
            Manage your accommodation requests, check flatmates, and update settings.
          </p>
        </div>

        {/* Info Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '36px' }}>
          
          {/* Application Status Card */}
          <div style={{
            backgroundColor: 'var(--bg-light)',
            padding: '20px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--secondary-color)', marginBottom: '12px', fontWeight: 600 }}>
              Housing Application Status
            </h4>
            <ul style={{ listStyleType: 'none', padding: 0, fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Active Submission:</strong> Bergzicht Plaza Studio Apartment</li>
              <li><strong>Current Status:</strong> <span style={{ color: 'var(--accent-color)', fontWeight: 600 }}>Awaiting Provider Approval</span></li>
              <li><strong>Next Step:</strong> Provider will contact you for a virtual tour confirmation.</li>
            </ul>
          </div>

          {/* Profile Card */}
          <div style={{
            backgroundColor: 'var(--bg-light)',
            padding: '20px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--secondary-color)', marginBottom: '12px', fontWeight: 600 }}>
              Your Personal Details
            </h4>
            <ul style={{ listStyleType: 'none', padding: 0, fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><strong>Full Name:</strong> {user.name}</li>
              <li><strong>Email Address:</strong> {user.email}</li>
              <li>
                <strong>Academic Course: </strong>
                {isEditingCourse ? (
                  <div style={{ display: 'inline-flex', gap: '8px', marginTop: '4px' }}>
                    <input
                      type="text"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      style={{
                        padding: '4px 8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '4px',
                        fontSize: '0.9rem'
                      }}
                    />
                    <button 
                      onClick={() => setIsEditingCourse(false)}
                      className="btn-primary"
                      style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <span>{course} </span>
                    <button 
                      onClick={() => setIsEditingCourse(true)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary-color)',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      (Edit)
                    </button>
                  </>
                )}
              </li>
            </ul>
          </div>

          {/* Search Listings in Portal */}
          <div style={{
            backgroundColor: 'var(--bg-light)',
            padding: '20px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--secondary-color)', marginBottom: '12px', fontWeight: 600 }}>
              Quick Property Lookup
            </h4>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
              <input
                type="text"
                placeholder="Search location (e.g., Stellenbosch)"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.9rem' }}>
                Search
              </button>
            </form>
            {searchResult && (
              <div style={{
                fontSize: '0.9rem',
                color: 'var(--text-main)',
                backgroundColor: 'var(--card-bg)',
                padding: '8px 12px',
                borderRadius: '4px',
                borderLeft: '4px solid var(--primary-color)'
              }}>
                {searchResult}
              </div>
            )}
          </div>

          {/* Action Links */}
          <div style={{
            backgroundColor: 'var(--bg-light)',
            padding: '20px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--secondary-color)', marginBottom: '12px', fontWeight: 600 }}>
              Quick Actions
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <Link to="/listings" style={{ fontSize: '0.95rem', color: 'var(--primary-color)', fontWeight: 500 }}>
                🔍 Browse All Listings
              </Link>
              <Link to="/flatmate" style={{ fontSize: '0.95rem', color: 'var(--primary-color)', fontWeight: 500 }}>
                👫 Find Flatmates
              </Link>
              <Link to="/contact" style={{ fontSize: '0.95rem', color: 'var(--primary-color)', fontWeight: 500 }}>
                ✉️ Support Helpdesk
              </Link>
            </div>
          </div>

        </div>

        {/* Logout button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={handleLogout} className="logout-btn">
            Log Out Portal
          </button>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
