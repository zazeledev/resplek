import React from 'react';

export const About: React.FC = () => {
  const values = [
    {
      icon: '🛡️',
      title: 'Safety',
      description: 'We prioritize the well-being of our users through rigorous property verification and reliable in-app communication.'
    },
    {
      icon: '⚖️',
      title: 'Equality',
      description: 'Our platform is designed to offer equal opportunities for all students, creating a diverse and inclusive community.'
    },
    {
      icon: '🤝',
      title: 'Integrity',
      description: 'We maintain honest and transparent interactions, ensuring each listing and transaction is conducted with high ethical standards.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'By continuously embracing new web technologies, we are committed to enhancing the housing search experience.'
    },
    {
      icon: '🔍',
      title: 'Transparency',
      description: 'Clear, accurate, and accessible pricing and details are at the heart of everything we do, empowering informed decisions.'
    }
  ];

  const team = [
    {
      name: 'Thuso Pejane',
      role: 'Founder & CEO',
      bio: 'With a strong background in Accounting and Real Estate, Thuso’s vision is the driving force behind our innovative approach.',
      avatar: '👨‍💼'
    },
    {
      name: 'Chief Technology Officer (CTO)',
      role: 'Technology Lead',
      bio: 'Focused on keeping our platform secure, intuitive, scalable, and ahead of technological trends.',
      avatar: '💻'
    },
    {
      name: 'Chief Operations Officer (COO)',
      role: 'Operations & Landlord Relations',
      bio: 'Manages day-to-day operations, ensuring that both students and landlords enjoy seamless service and support.',
      avatar: '⚙️'
    },
    {
      name: 'Chief Marketing Officer (CMO)',
      role: 'Marketing & Student Outreach',
      bio: 'Crafts strategies to boost our reach and engagement, connecting our platform with vibrant student communities.',
      avatar: '📈'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-light)', minHeight: '100vh' }}>
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

      <div className="page-container" style={{ maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
        
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

        {/* Mission Details Cards */}
        <section style={{ 
          backgroundColor: 'var(--card-bg)', 
          border: '1px solid var(--border-color)', 
          borderRadius: 'var(--radius-md)', 
          padding: '40px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '32px' }}>Who We Serve</h3>
          <div className="grid-cols-2" style={{ gap: '30px' }}>
            <div style={{ backgroundColor: 'var(--bg-light)', padding: '24px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'var(--primary-color)', fontSize: '1.2rem', marginBottom: '12px', fontWeight: 600 }}>For Students</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
                We simplify the journey of finding, comparing, and booking student accommodation with accurate and up-to-date information, verified listings, and easy-to-use search and match filters.
              </p>
            </div>
            <div style={{ backgroundColor: 'var(--bg-light)', padding: '24px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'var(--primary-color)', fontSize: '1.2rem', marginBottom: '12px', fontWeight: 600 }}>For Landlords</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
                We offer a highly targeted property portal that increases exposure, guarantees qualified student inquiries, and helps fill rooms quickly with verified student profiles.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values grid */}
        <section>
          <h3 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '32px' }}>Our Core Values</h3>
          <div className="grid-cols-3" style={{ gap: '20px' }}>
            {values.map((v, i) => (
              <div 
                key={i} 
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <span style={{ fontSize: '2.5rem' }}>{v.icon}</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{v.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>{v.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h3 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '16px' }}>Meet Our Team</h3>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px' }}>
            ResPlek is led by a team of dedicated professionals committed to student success.
          </p>
          <div className="grid-cols-2" style={{ gap: '30px' }}>
            {team.map((member, i) => (
              <div 
                key={i}
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center'
                }}
              >
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--bg-light)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '2rem',
                  border: '1px solid var(--border-color)',
                  flexShrink: 0
                }}>
                  {member.avatar}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '2px' }}>{member.name}</h4>
                  <div style={{ color: 'var(--primary-color)', fontSize: '0.85rem', fontWeight: 500, marginBottom: '8px' }}>
                    {member.role}
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
export default About;
