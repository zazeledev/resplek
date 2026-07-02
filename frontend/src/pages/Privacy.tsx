import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="page-container" style={{ maxWidth: '800px' }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: '24px' }}>Privacy Policy</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Last Updated: July 2, 2026</p>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Our Commitment to Your Privacy</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
          At ResPlek, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Information We Collect</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '12px' }}>
          We collect several categories of information to serve you better:
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
          <li style={{ marginBottom: '8px' }}>Personal details such as your name, email address, and phone number when you register or make an inquiry.</li>
          <li style={{ marginBottom: '8px' }}>Usage data, including your interactions with our website, search queries, and services.</li>
          <li style={{ marginBottom: '8px' }}>Payment information for bookings, which is processed securely through verified third-party payment gateways. We do not store raw credit card details on our servers.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>How We Use Your Information</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '12px' }}>
          We use your information exclusively to:
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
          <li style={{ marginBottom: '8px' }}>Provide and improve our platform services.</li>
          <li style={{ marginBottom: '8px' }}>Process booking inquires and flatmate matchmaking requests.</li>
          <li style={{ marginBottom: '8px' }}>Send system updates, promotions, and important account notifications.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Data Security</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
          We implement robust, modern security measures to protect your data from unauthorized access, alteration, or disclosure. All transactions and details are encrypted.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Your Rights</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
          You have the right to access, update, or delete your personal information stored with us at any time. Contact us at <a href="mailto:thuso@resplek.com">thuso@resplek.com</a> for assistance with account queries.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Contact Us</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
          If you have any questions or feedback regarding this Privacy Policy, please contact our team directly at <a href="mailto:thuso@resplek.com">thuso@resplek.com</a>.
        </p>
      </section>
    </div>
  );
};
export default Privacy;
