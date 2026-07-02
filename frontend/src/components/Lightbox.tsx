import React, { useEffect } from 'react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div className="lightbox-modal" onClick={onClose}>
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close gallery">
          &times;
        </button>

        <img 
          className="lightbox-image" 
          src={images[currentIndex]} 
          alt={`Gallery image ${currentIndex + 1}`} 
        />

        {images.length > 1 && (
          <>
            <button className="lightbox-nav-btn prev" onClick={onPrev} aria-label="Previous image">
              &#8249;
            </button>
            <button className="lightbox-nav-btn next" onClick={onNext} aria-label="Next image">
              &#8250;
            </button>
          </>
        )}

        <div className="lightbox-caption">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};
export default Lightbox;
