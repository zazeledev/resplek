import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState('');
  const [showCompareBar, setShowCompareBar] = useState(true);
  const [roomSlide, setRoomSlide] = useState(0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/listings?search=${encodeURIComponent(searchVal)}`);
    } else {
      navigate('/listings');
    }
  };

  const roomTypes = [
    { name: 'Modern Apartment', image: '/images/45+Studio+2+(1).jpeg' },
    { name: 'Shared Room', image: '/images/Studio+1+(1).jpg' },
    { name: 'Private Room', image: '/images/411+Studio+4+(2).jpg' },
    { name: 'Luxury Suite', image: '/images/Twinshare+.jpg' }
  ];

  const featured = [
    {
      title: 'Modern Apartment',
      location: 'Stellenbosch',
      price: 'ZAR 12,000/month',
      image: '/images/306-2.jpg'
    },
    {
      title: 'Shared Room',
      location: 'Cape Town',
      price: 'ZAR 6,500/month',
      image: '/images/1+1 suite.jpg'
    },
    {
      title: 'Private Room',
      location: 'Johannesburg',
      price: 'ZAR 4,500/month',
      image: '/images/GARDEN+STUDIO.jpg'
    }
  ];

  const reviews = [
    {
      name: 'Sam.',
      avatar: '/images/sam.jpg',
      text: 'ResPlek made finding accommodation so easy! Highly recommend it to all students.'
    },
    {
      name: 'Diteboho P.',
      avatar: '/images/tete.jpg',
      text: 'I found the perfect room near my campus in just a few clicks. Amazing platform!'
    },
    {
      name: 'Sipho N.',
      avatar: '/images/logo.png', // Fallback
      text: 'The verified listings gave me peace of mind. Thank you, ResPlek!'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-light)', overflowX: 'hidden' }}>
      
      {/* Sticky Book / Compare bar */}
      {showCompareBar && (
        <div style={{
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '95px',
          zIndex: 900,
          backgroundColor: 'var(--card-bg)',
          borderRadius: '30px',
          boxShadow: 'var(--shadow-md)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          width: 'max-content',
          maxWidth: '90vw',
          border: '1px solid var(--border-color)',
          backdropFilter: 'blur(8px)'
        }}>
          <span style={{ fontWeight: 600, color: 'var(--primary-color)', fontSize: '0.92rem' }}>
            🔔 Find, <span style={{ color: '#28a745' }}>Compare</span> &amp; <span style={{ color: 'var(--accent-color)' }}>Book</span> student accommodation!
          </span>
          <button 
            onClick={() => setShowCompareBar(false)}
            style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            aria-label="Dismiss bar"
          >
            &times;
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(0, 119, 204, 0.15) 0%, rgba(255, 255, 255, 0.9) 100%), url("/images/stellie.jpg") no-repeat center center/cover',
        padding: '120px 4% 90px 4%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        <h2 style={{ fontSize: '3rem', color: 'var(--secondary-color)', maxWidth: '800px', lineHeight: '1.2' }}>
          Accommodation simplified for the next generation
        </h2>
        
        {/* Hero Search Box */}
        <form onSubmit={handleSearchSubmit} style={{
          display: 'flex',
          width: '100%',
          maxWidth: '640px',
          backgroundColor: 'var(--card-bg)',
          borderRadius: 'var(--radius-lg)',
          padding: '8px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-color)',
          backdropFilter: 'blur(10px)'
        }}>
          <input 
            type="text"
            placeholder="Search by university, city, or property name..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              background: 'none',
              padding: '10px 18px',
              fontSize: '1rem',
              outline: 'none',
              color: 'var(--text-main)'
            }}
          />
          <button type="submit" className="btn-primary" style={{ borderRadius: '20px', padding: '10px 28px' }}>
            Search
          </button>
        </form>

        <div style={{ marginTop: '10px' }}>
          <Link to="/listings" className="btn-secondary" style={{ borderRadius: '20px', padding: '10px 30px' }}>
            Browse All Listings
          </Link>
        </div>
      </section>

      {/* Welcome & Student Poster Section */}
      <section style={{
        width: '100%',
        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(255,255,255,0.7))',
        padding: '60px 4%',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
          <h3 style={{ fontSize: '2.2rem', color: 'var(--secondary-color)', marginBottom: '16px' }}>
            🏡 Welcome to ResPlek!
          </h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', maxWidth: '720px', margin: '0 auto 28px auto', lineHeight: '1.7' }}>
            Your one-stop solution for finding the perfect student accommodation in South Africa. 
            Whether you're looking for a cozy apartment, a shared room, or a luxury suite, we've got you covered!
          </p>
          <img 
            src="/images/student-first.png" 
            alt="ResPlek - Student Housing Portal Gateway" 
            style={{ width: '100%', maxWidth: '800px', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)' }}
          />
        </div>
      </section>

      {/* Discover / App Preview section */}
      <section className="page-container" style={{ maxWidth: '1100px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '24px' }}>Discover ResPlek</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img 
            src="/images/ResPlekphone.png" 
            alt="ResPlek App Mockup View" 
            style={{ width: '100%', maxWidth: '440px', borderRadius: 'var(--radius-md)' }}
          />
        </div>
      </section>

      {/* Featured Listings marquee/grid */}
      <section className="page-container" style={{ maxWidth: '1100px' }}>
        <h3 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '36px' }}>Featured Listings</h3>
        <div className="grid-cols-3" style={{ gap: '24px' }}>
          {featured.map((item, index) => (
            <div 
              key={index} 
              style={{
                backgroundColor: 'var(--card-bg)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/listings')}
            >
              <div style={{ height: '180px', width: '100%', backgroundColor: 'var(--bg-light)' }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--secondary-color)', margin: 0 }}>
                  {item.title}
                </h4>
                <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                  📍 {item.location} • {item.price}
                </div>
                <div style={{ display: 'flex', color: 'var(--accent-color)', fontSize: '1.1rem', gap: '2px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                  <Link to="/listings" style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--primary-color)' }}>
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flatmate CTA panel */}
      <section className="page-container" style={{ maxWidth: '1100px' }}>
        <div style={{
          backgroundColor: 'rgba(56, 189, 248, 0.08)',
          border: '1.5px solid var(--primary-color)',
          borderRadius: 'var(--radius-md)',
          padding: '30px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <h3 style={{ margin: 0, color: 'var(--secondary-color)', fontSize: '1.5rem' }}>
            Looking for a flatmate or a place to join?
          </h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px' }}>
            Use our dedicated matching service to find roommates that align with your lifestyle, cleanliness level, and budget!
          </p>
          <Link to="/flatmate" className="btn-primary" style={{ borderRadius: '20px', marginTop: '8px' }}>
            Go to Flatmate Service
          </Link>
        </div>
      </section>

      {/* Room Types carousel track */}
      <section className="page-container" style={{ maxWidth: '1100px' }}>
        <h3 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '32px' }}>
          Explore Room Types
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <button 
            onClick={() => setRoomSlide(prev => Math.max(0, prev - 1))}
            className="btn-secondary" 
            style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0, justifyContent: 'center' }}
            disabled={roomSlide === 0}
          >
            &#8249;
          </button>
          
          <div style={{ overflow: 'hidden', width: '100%', maxWidth: '800px' }}>
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              transform: `translateX(-${roomSlide * 255}px)`, 
              transition: 'transform 0.4s ease-in-out'
            }}>
              {roomTypes.map((room, i) => (
                <div 
                  key={i} 
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    padding: '20px 14px',
                    minWidth: '235px',
                    maxWidth: '235px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ width: '100%', height: '140px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', backgroundColor: 'var(--bg-light)' }}>
                    <img src={room.image} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 style={{ marginTop: '16px', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {room.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setRoomSlide(prev => Math.min(roomTypes.length - 3, prev + 1))}
            className="btn-secondary" 
            style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0, justifyContent: 'center' }}
            disabled={roomSlide >= roomTypes.length - 3}
          >
            &#8250;
          </button>
        </div>
      </section>

      {/* Testimonials Review Marquee */}
      <section className="page-container" style={{ maxWidth: '1100px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '36px' }}>What Our Students Say</h3>
        <div className="grid-cols-3" style={{ gap: '20px' }}>
          {reviews.map((rev, i) => (
            <div 
              key={i} 
              style={{
                backgroundColor: 'var(--card-bg)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', border: '1.5px solid var(--border-color)', backgroundColor: 'var(--bg-light)' }}>
                  <img src={rev.avatar} alt={rev.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ margin: 0, fontSize: '1.02rem', fontWeight: 600 }}>{rev.name}</h4>
              </div>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                "{rev.text}"
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
export default Home;
