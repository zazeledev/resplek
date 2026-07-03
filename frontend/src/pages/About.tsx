import React from 'react';

export const About: React.FC = () => {
  const values = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: 'Safety First',
      description: 'We prioritize the well-being of our users through rigorous property verification, secure systems, and reliable, transparent in-app interactions.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Equal Opportunity',
      description: 'Our platform is designed to offer equal access to high-quality housing for all students, fostering a diverse, supportive, and inclusive community.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      title: 'Absolute Integrity',
      description: 'We maintain honest and transparent interactions. Every listed room, booking, and transaction is conducted with high ethical standards.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
          <line x1="9" y1="18" x2="15" y2="18"/>
          <line x1="10" y1="22" x2="14" y2="22"/>
        </svg>
      ),
      title: 'Continuous Innovation',
      description: 'By continuously embracing modern web frameworks and matchmaking algorithms, we make the housing search simple and stress-free.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
          <circle cx="12" cy="12" r="3"/>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        </svg>
      ),
      title: 'Complete Transparency',
      description: 'Clear, accurate, and accessible details are at the heart of our platform, ensuring students make well-informed housing decisions.'
    }
  ];

  const team = [
    {
      name: 'Thuso Pejane',
      role: 'Founder & CEO',
      bio: 'With a strong background in Accounting and Real Estate, Thuso’s vision is the driving force behind our innovative approach.'
    },
    {
      name: 'CTO Lead',
      role: 'Technology Lead',
      bio: 'Focused on keeping our platform secure, intuitive, scalable, and ahead of modern technological trends.'
    },
    {
      name: 'COO Lead',
      role: 'Operations & Relations',
      bio: 'Manages day-to-day operations, ensuring that both students and landlords enjoy seamless service and support.'
    },
    {
      name: 'CMO Lead',
      role: 'Marketing & Student Outreach',
      bio: 'Crafts strategies to boost our reach and engagement, connecting our platform with student communities.'
    }
  ];

  const studentIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
    </svg>
  );

  const landlordIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
    </svg>
  );

  const userAvatarSvg = (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  return (
    <div style={{ backgroundColor: 'var(--bg-light)', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Editorial Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, var(--secondary-color), var(--primary-color))',
        color: '#ffffff',
        padding: '80px 4% 60px 4%',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#fff', fontSize: '3rem', marginBottom: '16px' }}>About ResPlek</h2>
        <p style={{ fontSize: '1.25rem', color: '#cbd5e1', fontWeight: 300 }}>
          Transforming student accommodation in South Africa
        </p>
      </div>

      <div className="page-container" style={{ maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '80px', marginTop: '20px' }}>
        
        {/* Pitch / Story Grid */}
        <section className="grid-cols-2" style={{ gap: '40px', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Our Mission</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '16px' }}>
              At ResPlek, we are on a mission to transform the student accommodation experience in South Africa. We built our platform with one goal in mind—to create a safe, transparent, and efficient way for students to find and book the perfect home, and for landlords to connect with a niche, motivated market.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
              We set out to replace the frustrations of word-of-mouth searches and unverified listings with a single point of trust.
            </p>
          </div>
          <div style={{ 
            backgroundColor: 'var(--card-bg)', 
            border: '1px solid var(--border-color)', 
            borderRadius: 'var(--radius-md)', 
            padding: '30px', 
            boxShadow: 'var(--shadow-md)' 
          }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Our Story</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '12px' }}>
              ResPlek was born from the need for a more reliable and streamlined solution in a market where over 40,000 students face significant challenges finding quality, verified housing. 
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>
              Frustrated with unreliable leads of social media, our founder, <strong>Thuso Pejane</strong>, envisioned a dedicated application that puts safety, transparency, and ease of use at the forefront of every interaction. Today, ResPlek stands as the first-ever student accommodation platform in South Africa—a single point of trust.
            </p>
          </div>
        </section>

        {/* Who We Serve - Asymmetrical Split Layout */}
        <section className="about-split">
          <div className="about-split-left">
            <h3 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--secondary-color)' }}>
              Who We Serve
            </h3>
            <div style={{ width: '40px', height: '4px', backgroundColor: 'var(--primary-color)', marginBottom: '24px' }}></div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Providing a secure and integrated bridge for the entire student housing ecosystem in South Africa.
            </p>
          </div>
          
          <div className="about-split-right">
            <div style={{ 
              backgroundColor: 'var(--card-bg)', 
              borderLeft: '4px solid var(--primary-color)',
              borderTop: '1px solid var(--border-color)',
              borderRight: '1px solid var(--border-color)',
              borderBottom: '1px solid var(--border-color)',
              padding: '24px 28px',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {studentIcon}
                </div>
                <h4 style={{ color: 'var(--secondary-color)', fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>
                  For Students
                </h4>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                We simplify the journey of finding, comparing, and booking student accommodation with accurate and up-to-date information, verified listings, and easy-to-use search and match filters.
              </p>
            </div>

            <div style={{ 
              backgroundColor: 'var(--card-bg)', 
              borderLeft: '4px solid var(--secondary-color)',
              borderTop: '1px solid var(--border-color)',
              borderRight: '1px solid var(--border-color)',
              borderBottom: '1px solid var(--border-color)',
              padding: '24px 28px',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {landlordIcon}
                </div>
                <h4 style={{ color: 'var(--secondary-color)', fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>
                  For Landlords
                </h4>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                We offer a highly targeted property portal that increases exposure, guarantees qualified student inquiries, and helps fill rooms quickly with verified student profiles.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values - Timeline/List Layout */}
        <section className="about-split">
          <div className="about-split-left">
            <h3 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--secondary-color)' }}>
              Our Core Values
            </h3>
            <div style={{ width: '40px', height: '4px', backgroundColor: 'var(--primary-color)', marginBottom: '24px' }}></div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
              The standards and principles that drive our engineering and community operations.
            </p>
          </div>

          <div className="about-split-right" style={{ gap: '0' }}>
            <div className="about-values-list">
              {values.map((v, i) => (
                <div key={i} className="about-value-item">
                  <div className="about-value-icon">
                    {v.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--secondary-color)', marginBottom: '8px' }}>
                      {v.title}
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                      {v.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Team - Cardless Column Grid */}
        <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '60px' }}>
          <h3 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '16px', color: 'var(--secondary-color)' }}>
            Meet Our Team
          </h3>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px auto' }}>
            ResPlek is led by dedicated professionals committed to ensuring a safe, easy, and reliable housing journey for students.
          </p>
          
          <div className="about-team-grid">
            {team.map((member, i) => (
              <div key={i} className="about-team-member">
                <div className="about-team-avatar">
                  {userAvatarSvg}
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '4px', color: 'var(--secondary-color)' }}>
                  {member.name}
                </h4>
                <div style={{ 
                  color: 'var(--primary-color)', 
                  fontSize: '0.8rem', 
                  fontWeight: 600, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em',
                  marginBottom: '12px' 
                }}>
                  {member.role}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0, lineHeight: '1.5' }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
