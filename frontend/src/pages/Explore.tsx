import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CityDetail {
  id: string;
  name: string;
  image: string;
  description: string;
  universities: string[];
  activities: string[];
  rentStart: string;
}

export const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string>('stellenbosch');

  const cities: CityDetail[] = [
    {
      id: 'stellenbosch',
      name: 'Stellenbosch',
      image: '/images/stellie.jpg',
      description: 'Stellenbosch is a picturesque town surrounded by mountains and vineyards. It offers a unique blend of academic excellence and a vibrant student lifestyle. Experience the rich history and culture, relax in the town\'s beautiful parks, and enjoy hiking trails.',
      universities: [
        'Stellenbosch University (SU)',
        'Boland College (TVET)',
        'Various private specialized institutions'
      ],
      activities: [
        'Visit the Stellenbosch Botanical Gardens',
        'Explore local historic wine farms',
        'Enjoy vibrant student cafes and events',
        'Hike and cycle in the Jonkershoek Nature Reserve'
      ],
      rentStart: 'ZAR 3,500'
    },
    {
      id: 'capetown',
      name: 'Cape Town',
      image: '/images/kaapstad Bo kant.webp',
      description: 'Cape Town, the Mother City, offers a breathtaking combination of oceans, Table Mountain, and top-tier institutions. It is a diverse and energetic hub for international and local students.',
      universities: [
        'University of Cape Town (UCT)',
        'Cape Peninsula University of Technology (CPUT)',
        'Varsity College',
        'AFDA Cape Town'
      ],
      activities: [
        'Hike up Table Mountain or Lion\'s Head',
        'Relax on Clifton and Camps Bay beaches',
        'Visit the historic V&A Waterfront',
        'Explore the Kirstenbosch National Botanical Garden'
      ],
      rentStart: 'ZAR 6,500'
    },
    {
      id: 'johannesburg',
      name: 'Johannesburg',
      image: '/images/GARDEN+STUDIO.jpg',
      description: 'Johannesburg (Joburg) is South Africa\'s financial powerhouse. It is a fast-paced city filled with opportunities, culture, and high-energy student communities.',
      universities: [
        'University of the Witwatersrand (Wits)',
        'University of Johannesburg (UJ)',
        'Rosebank College'
      ],
      activities: [
        'Visit Constitution Hill and the Apartheid Museum',
        'Explore the hipster cafes of Maboneng Precinct',
        'Hang out in the student suburb of Melville',
        'Attend local theater shows and live music events'
      ],
      rentStart: 'ZAR 4,500'
    },
    {
      id: 'durban',
      name: 'Durban',
      image: '/images/Twinshare+.jpg',
      description: 'Durban offers a relaxed warm subtropical climate, sandy golden beaches, and a vibrant melting pot of cultures, making it an excellent student destination.',
      universities: [
        'University of KwaZulu-Natal (UKZN)',
        'Durban University of Technology (DUT)',
        'Varsity College Durban'
      ],
      activities: [
        'Surf or walk along the Golden Mile beachfront',
        'Visit uShaka Marine World',
        'Explore the Durban Botanic Gardens',
        'Enjoy local cuisines, especially the famous Bunny Chow'
      ],
      rentStart: 'ZAR 8,500'
    }
  ];

  const currentCity = cities.find(c => c.id === selectedCity) || cities[0];

  const handleSearchCity = (cityName: string) => {
    navigate(`/listings?search=${cityName}`);
  };

  return (
    <div className="page-container" style={{ maxWidth: '1100px' }}>
      <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '10px' }}>
        Explore Student Life
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px', fontSize: '1.1rem' }}>
        Discover your next study destination and view virtual tours of our properties.
      </p>

      {/* Matterport Virtual 3D Tour Frame */}
      <section style={{ 
        backgroundColor: 'var(--card-bg)', 
        border: '1px solid var(--border-color)', 
        borderRadius: 'var(--radius-md)', 
        padding: '30px', 
        marginBottom: '50px',
        boxShadow: 'var(--shadow-md)' 
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--secondary-color)' }}>
          Matterport 3D Virtual Tour
        </h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
          Take an immersive 3D walkthrough of our premium student accommodation from the comfort of your home.
        </p>
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          paddingTop: '56.25%', // 16:9 Aspect Ratio 
          borderRadius: 'var(--radius-sm)', 
          overflow: 'hidden', 
          border: '1px solid var(--border-color)' 
        }}>
          <iframe 
            src="https://my.matterport.com/show/?m=abc123xyz" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            allowFullScreen 
            aria-label="Virtual tour of the property"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        </div>
      </section>

      {/* Interactive Cities Guides */}
      <section style={{ 
        backgroundColor: 'var(--card-bg)', 
        border: '1px solid var(--border-color)', 
        borderRadius: 'var(--radius-md)', 
        padding: '30px', 
        boxShadow: 'var(--shadow-md)',
        marginBottom: '40px'
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--secondary-color)' }}>
          Explore South African University Cities
        </h3>

        {/* Tab Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          flexWrap: 'wrap', 
          marginBottom: '32px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '12px' 
        }}>
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => setSelectedCity(city.id)}
              className={selectedCity === city.id ? 'btn-primary' : 'btn-secondary'}
              style={{ borderRadius: '20px', padding: '8px 20px', fontSize: '0.95rem' }}
            >
              {city.name}
            </button>
          ))}
        </div>

        {/* City Details Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="grid-cols-2" style={{ gap: '40px' }}>
            <div style={{ 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden', 
              height: '320px', 
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}>
              <img 
                src={currentCity.image} 
                alt={`${currentCity.name} scenery`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                color: '#fff',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 500,
                backdropFilter: 'blur(4px)'
              }}>
                Rooms from {currentCity.rentStart}/mo
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Student Life in {currentCity.name}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.7', marginBottom: '20px' }}>
                {currentCity.description}
              </p>
              <div>
                <button 
                  onClick={() => handleSearchCity(currentCity.name)} 
                  className="btn-primary"
                >
                  View Listings in {currentCity.name}
                </button>
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '10px 0' }} />

          <div className="grid-cols-2" style={{ gap: '40px' }}>
            <div>
              <h5 style={{ fontSize: '1.2rem', color: 'var(--secondary-color)', marginBottom: '16px', fontWeight: 600 }}>
                Top Educational Institutions
              </h5>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {currentCity.universities.map((uni, index) => (
                  <li key={index} style={{ 
                    padding: '8px 12px', 
                    backgroundColor: 'var(--bg-light)', 
                    borderRadius: 'var(--radius-sm)', 
                    marginBottom: '10px', 
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: '1px solid var(--border-color)'
                  }}>
                    <span style={{ color: 'var(--primary-color)', fontSize: '1.1rem' }}>🎓</span>
                    <span>{uni}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 style={{ fontSize: '1.2rem', color: 'var(--secondary-color)', marginBottom: '16px', fontWeight: 600 }}>
                Local Highlights & Activities
              </h5>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {currentCity.activities.map((act, index) => (
                  <li key={index} style={{ 
                    padding: '8px 12px', 
                    backgroundColor: 'var(--bg-light)', 
                    borderRadius: 'var(--radius-sm)', 
                    marginBottom: '10px', 
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: '1px solid var(--border-color)'
                  }}>
                    <span style={{ color: 'var(--accent-color)', fontSize: '1.1rem' }}>🌟</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Explore;
