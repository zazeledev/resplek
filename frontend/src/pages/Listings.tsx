import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Lightbox from '../components/Lightbox';

interface Listing {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  type: string;
  tags: string[];
  images: string[];
  image?: string;
  status: string;
}

export const Listings: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Filter states
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState(searchParams.get('priceRange') || '');
  const [roomType, setRoomType] = useState(searchParams.get('roomType') || '');
  const [distance, setDistance] = useState(searchParams.get('distance') || '');

  // Lightbox gallery state
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    images: [] as string[],
    currentIndex: 0
  });

  const fetchListings = async () => {
    setLoading(true);
    setError('');
    
    // Construct query parameters
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (priceRange) params.append('priceRange', priceRange);
    if (roomType) params.append('roomType', roomType);
    if (distance) params.append('distance', distance);

    try {
      const response = await fetch(`/api/listings?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch accommodations');
      const data = await response.json();
      setListings(data);
    } catch (err: any) {
      console.error(err);
      setError('Could not connect to backend server. Using offline mock listings.');
      
      // Offline fallback seed to prevent UI failure
      const mockListings: Listing[] = [
        {
          id: 1,
          title: "Two Bedroom Apartment at Bergzicht Plaza",
          description: "Modern student residence featuring spacious rooms, high-speed internet, and comprehensive student support services. Right next to Eikestad Mall and Stellenbosch campus.",
          location: "Stellenbosch",
          price: 12000.0,
          type: "private",
          tags: ["Furnished", "Private", "Secure Complex", "2 min from Campus", "1 min from Eikestad Mall"],
          images: ["/images/Enterance.JPG", "/images/Bedroom Bergzicht.png", "/images/Upperview.png", "/images/Parking spot.png"],
          status: "Taken for 2026"
        },
        {
          id: 2,
          title: "Die Berke",
          description: "Comfortable student housing located close to campus with secure facilities, beautiful bathrooms, and included utilities. Perfect for study groups.",
          location: "Stellenbosch",
          price: 3500.0,
          type: "private",
          tags: ["Furnished", "Walking Distance", "Private"],
          images: ["/images/Die Berke.jpg", "/images/Bathtub.JPG"],
          status: "Fully Booked for 2026"
        },
        {
          id: 3,
          title: "Shared Room in Cape Town",
          description: "Cozy shared student room located in Cape Town near public transport lines and university shuttle routes. Fully equipped communal kitchen.",
          location: "Cape Town",
          price: 6500.0,
          type: "shared",
          tags: ["Shared Room", "Cape Town", "Walking Distance", "Furnished"],
          images: ["/images/112+-+1.jpg", "/images/306-2.jpg"],
          status: "Available"
        },
        {
          id: 4,
          title: "Private Room in Johannesburg",
          description: "Comfortable private room in a secure garden studio in JHB. Features private study area, peaceful environment, and high-speed Wi-Fi.",
          location: "Johannesburg",
          price: 4500.0,
          type: "private",
          tags: ["Private Room", "Garden Studio", "Secure", "JHB"],
          images: ["/images/GARDEN+STUDIO.jpg", "/images/45+Studio+2+(1).jpeg"],
          status: "Available"
        },
        {
          id: 5,
          title: "Luxury Suite in Durban",
          description: "Premium luxury student suite in Durban close to campuses. Includes shared entertainment lounge, pool access, study spaces and top-tier security.",
          location: "Durban",
          price: 8500.0,
          type: "luxury",
          tags: ["Luxury Suite", "Durban", "Pool Access", "En-suite Bath"],
          images: ["/images/Twinshare+.jpg", "/images/Studio+1+(1).jpg", "/images/411+Studio+4+(2).jpg"],
          status: "Available"
        }
      ];
      
      // Manual client-side filtering for fallback mode
      let filtered = mockListings;
      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(l => 
          l.title.toLowerCase().includes(searchLower) || 
          l.description.toLowerCase().includes(searchLower) ||
          l.location.toLowerCase().includes(searchLower)
        );
      }
      if (roomType) {
        filtered = filtered.filter(l => l.type === roomType);
      }
      if (priceRange) {
        if (priceRange === '3000-5000') filtered = filtered.filter(l => l.price >= 3000 && l.price <= 5000);
        if (priceRange === '5000-7000') filtered = filtered.filter(l => l.price >= 5000 && l.price <= 7000);
        if (priceRange === '7000-10000') filtered = filtered.filter(l => l.price >= 7000 && l.price <= 10000);
        if (priceRange === '10000+') filtered = filtered.filter(l => l.price >= 10000);
      }
      if (distance === 'walking') {
        filtered = filtered.filter(l => l.tags.includes("Walking Distance") || l.tags.includes("2 min from Campus"));
      }

      setListings(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [searchParams]);

  const handleFilterChange = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams();
    if (search) newParams.set('search', search);
    if (priceRange) newParams.set('priceRange', priceRange);
    if (roomType) newParams.set('roomType', roomType);
    if (distance) newParams.set('distance', distance);
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSearch('');
    setPriceRange('');
    setRoomType('');
    setDistance('');
    setSearchParams(new URLSearchParams());
  };

  // Image lightbox hooks
  const openGallery = (imgs: string[], index: number) => {
    setLightboxState({
      isOpen: true,
      images: imgs,
      currentIndex: index
    });
  };

  const closeGallery = () => {
    setLightboxState(prev => ({ ...prev, isOpen: false }));
  };

  const handlePrevImage = () => {
    setLightboxState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1
    }));
  };

  const handleNextImage = () => {
    setLightboxState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex === prev.images.length - 1 ? 0 : prev.currentIndex + 1
    }));
  };

  const handleApplyClick = (title: string) => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate(`/login?redirect=/dashboard&property=${encodeURIComponent(title)}`);
    } else {
      navigate('/dashboard?action=apply');
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Search Filter Header panel */}
      <div style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '24px 28px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <form onSubmit={handleFilterChange} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              placeholder="Search by university, city, or property name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-light)',
                color: 'var(--text-main)',
                fontSize: '0.98rem',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '12px 28px' }}>
              Search
            </button>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <select 
              value={priceRange} 
              onChange={(e) => setPriceRange(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-light)',
                color: 'var(--text-main)',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            >
              <option value="">Price Range (All)</option>
              <option value="3000-5000">ZAR 3,000 - ZAR 5,000</option>
              <option value="5000-7000">ZAR 5,000 - ZAR 7,000</option>
              <option value="7000-10000">ZAR 7,000 - ZAR 10,000</option>
              <option value="10000+">ZAR 10,000+</option>
            </select>

            <select 
              value={roomType} 
              onChange={(e) => setRoomType(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-light)',
                color: 'var(--text-main)',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            >
              <option value="">Room Type (All)</option>
              <option value="shared">Shared Room</option>
              <option value="private">Private Room</option>
              <option value="luxury">Luxury Suite</option>
            </select>

            <select 
              value={distance} 
              onChange={(e) => setDistance(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-light)',
                color: 'var(--text-main)',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            >
              <option value="">Distance to Campus (All)</option>
              <option value="walking">Walking Distance</option>
            </select>

            {(search || priceRange || roomType || distance) && (
              <button 
                type="button" 
                onClick={handleClearFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary-color)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Main Grid: Map + Listings */}
      <div className="grid-cols-2" style={{ gridTemplateColumns: '45% 55%', gap: '30px' }}>
        
        {/* Map column */}
        <div style={{ height: 'calc(100vh - 280px)', minHeight: '400px', position: 'sticky', top: '110px' }}>
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.055964328393!2d18.85593431521034!3d-33.9340550806347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcdb2b7e4e3f3e3%3A0x7e7d6e8b7e7e7e7e!2sStellenbosch%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v1718370000000"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="ResPlek Accommodation Map Coordinates"
            />
          </div>
        </div>

        {/* Listings column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 600 }}>Available Student Rooms</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {loading ? 'Finding properties...' : `Showing ${listings.length} verified listings`}
            </p>
          </div>

          {error && (
            <div style={{ padding: '8px 12px', fontSize: '0.85rem', backgroundColor: '#fff3cd', color: '#856404', borderRadius: '4px', border: '1px solid #ffeeba' }}>
              {error}
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              Loading listings...
            </div>
          ) : listings.length === 0 ? (
            <div style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '60px 20px',
              textAlign: 'center',
              color: 'var(--text-muted)'
            }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>🏘️</span>
              No student properties match your criteria. Try adjusting filters or search term.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {listings.map((l) => (
                <div 
                  key={l.id} 
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '24px',
                    display: 'flex',
                    gap: '20px',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'box-shadow 0.2s',
                    position: 'relative'
                  }}
                >
                  {/* Thumb image with gallery action */}
                  <div 
                    onClick={() => openGallery(l.images, 0)}
                    style={{
                      width: '140px',
                      height: '110px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      flexShrink: 0,
                      backgroundColor: 'var(--bg-light)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    <img 
                      src={l.images[0] || '/images/logo.png'} 
                      alt={l.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '4px',
                      right: '4px',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      📸 {l.images.length}
                    </div>
                  </div>

                  {/* Info details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--secondary-color)', marginBottom: '6px' }}>
                      {l.title}
                    </h4>
                    <div style={{ fontWeight: 600, fontSize: '0.98rem', color: 'var(--text-main)', marginBottom: '8px' }}>
                      ZAR {l.price.toLocaleString()}/month <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>• {l.location}</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {l.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {l.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 500,
                            padding: '3px 10px',
                            borderRadius: '12px',
                            backgroundColor: tag.toLowerCase().includes('nsfas') ? '#e6ffe6' : 'var(--bg-light)',
                            color: tag.toLowerCase().includes('nsfas') ? '#28a745' : 'var(--primary-color)',
                            border: '1px solid var(--border-color)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action states */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center', flexShrink: 0, minWidth: '130px' }}>
                    {l.status === 'Taken for 2026' ? (
                      <div style={{
                        backgroundColor: 'rgba(220, 53, 69, 0.12)',
                        color: '#dc3545',
                        border: '1px solid rgba(220, 53, 69, 0.2)',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        textAlign: 'center'
                      }}>
                        Taken for 2026
                      </div>
                    ) : l.status.toLowerCase().includes('fully booked') ? (
                      <button 
                        disabled 
                        style={{
                          backgroundColor: '#cbd5e1',
                          color: '#64748b',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px 12px',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          cursor: 'not-allowed'
                        }}
                      >
                        Fully Booked
                      </button>
                    ) : (
                      <>
                        <button 
                          onClick={() => handleApplyClick(l.title)}
                          className="btn-primary" 
                          style={{ padding: '8px 14px', fontSize: '0.88rem', justifyContent: 'center' }}
                        >
                          Apply
                        </button>
                        <button 
                          onClick={() => openGallery(l.images, 0)}
                          className="btn-secondary" 
                          style={{ padding: '6px 14px', fontSize: '0.88rem', justifyContent: 'center' }}
                        >
                          Photos
                        </button>
                      </>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Lightbox attachment */}
      <Lightbox 
        images={lightboxState.images}
        currentIndex={lightboxState.currentIndex}
        isOpen={lightboxState.isOpen}
        onClose={closeGallery}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />

    </div>
  );
};
export default Listings;
