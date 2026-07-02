import React from 'react';
import { Link } from 'react-router-dom';

export const Terms: React.FC = () => {
  return (
    <div className="page-container" style={{ maxWidth: '800px' }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: '24px' }}>Terms and Conditions</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Last Updated: July 2, 2026</p>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Welcome to ResPlek</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
          These terms and conditions outline the rules and regulations for the use of ResPlek's website and services. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use ResPlek's website if you do not accept all the terms and conditions stated on this page.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Use of Our Services</h3>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
          <li style={{ marginBottom: '8px' }}>ResPlek provides a portal for students to find and book verified accommodations and for landlords to list their student rooms.</li>
          <li style={{ marginBottom: '8px' }}>Users must provide accurate, up-to-date, and truthful information when creating an account or posting property details.</li>
          <li style={{ marginBottom: '8px' }}>ResPlek reserves the right to suspend, audit, or terminate user accounts that violate these terms.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Privacy & Data Protection</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
          Your privacy is important to us. Please read our <Link to="/privacy">Privacy Policy</Link> to understand how we collect, use, and protect your personal information.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Limitation of Liability</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
          ResPlek acts as a platform. While we make every effort to verify property listings, we are not responsible for disputes, financial issues, or lease contract issues arising between students and landlords.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Changes to Terms</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
          ResPlek reserves the right to update these terms and conditions at any time. Users will be notified of significant changes via email or a notification banner on our website.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Contact Us</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '8px' }}>
          If you have any questions or feedback regarding these terms, please contact us directly:
        </p>
        <ul style={{ listStyleType: 'none', padding: 0, color: 'var(--text-muted)', lineHeight: '1.7' }}>
          <li><strong>Email:</strong> <a href="mailto:thuso@resplek.com">thuso@resplek.com</a></li>
          <li><strong>Phone:</strong> +27 64 319 8125</li>
        </ul>
      </section>
    </div>
  );
};
export default Terms;
