import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; text: string }>({
    type: '',
    text: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', text: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          text: data.message || 'Your inquiry has been submitted successfully! We will get back to you shortly.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err: any) {
      setStatus({
        type: 'error',
        text: err.message || 'Failed to submit form. Please check your network connection.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '1000px' }}>
      <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '10px' }}>Contact Us</h2>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '50px', fontSize: '1.1rem' }}>
        We are here to help you find the perfect student room. Get in touch with our support team.
      </p>

      <div className="grid-cols-2" style={{ gap: '40px' }}>
        {/* Left Side: Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ 
            backgroundColor: 'var(--card-bg)', 
            border: '1px solid var(--border-color)', 
            borderRadius: 'var(--radius-md)', 
            padding: '30px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--secondary-color)' }}>
              Get in Touch Directly
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem' }}>📧</span>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>Email Us</h4>
                  <a href="mailto:thuso@resplek.com" style={{ fontSize: '0.95rem', color: 'var(--primary-color)' }}>
                    thuso@resplek.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem' }}>📞</span>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>Call Us</h4>
                  <a href="tel:+27643198125" style={{ fontSize: '0.95rem', color: 'var(--primary-color)' }}>
                    +27 64 319 8125
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem' }}>📍</span>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>Headquarters</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>
                    Stellenbosch Central, 7600<br />
                    Western Cape, South Africa
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'var(--card-bg)', 
            border: '1px solid var(--border-color)', 
            borderRadius: 'var(--radius-md)', 
            padding: '30px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', color: 'var(--secondary-color)' }}>
              Frequently Asked Support
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
              If you are a student requesting a booking update or checking flatmate lists, you can also sign in to your dashboard to view the status of your applications directly.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div style={{ 
          backgroundColor: 'var(--card-bg)', 
          border: '1px solid var(--border-color)', 
          borderRadius: 'var(--radius-md)', 
          padding: '36px 30px', 
          boxShadow: 'var(--shadow-md)'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Send Us a Message</h3>

          {status.type && (
            <div style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '20px',
              fontSize: '0.92rem',
              backgroundColor: status.type === 'success' ? '#e6ffe6' : '#ffe6e6',
              color: status.type === 'success' ? '#28a745' : '#dc3545',
              border: `1px solid ${status.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
            }}>
              {status.text}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '6px', fontSize: '0.92rem', fontWeight: 500 }}>
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

            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '6px', fontSize: '0.92rem', fontWeight: 500 }}>
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
              <label htmlFor="subject" style={{ display: 'block', marginBottom: '6px', fontSize: '0.92rem', fontWeight: 500 }}>
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
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
              <label htmlFor="message" style={{ display: 'block', marginBottom: '6px', fontSize: '0.92rem', fontWeight: 500 }}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-light)',
                  color: 'var(--text-main)',
                  outline: 'none',
                  fontSize: '0.95rem',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contact;
