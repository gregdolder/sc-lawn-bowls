import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor, testSanityConnection, getGalleryAlbumsWithPhotos } from '../lib/sanity';
import { createPortal } from 'react-dom';

// Define the type for our gallery photos and albums to match the Sanity types
interface GalleryPhoto {
  _id?: string;
  _key?: string;
  title?: string;
  caption?: string;
  image?: any;
  imageUrl?: string;
}

interface GalleryAlbum {
  _id: string;
  title: string;
  description?: string;
  coverImage?: any;
  coverImageUrl?: string;
  photos: GalleryPhoto[];
}

// Static fallback albums if no Sanity content is available
const FALLBACK_ALBUMS: GalleryAlbum[] = [
  {
    _id: 'fallback-1',
    title: 'Club Tournament 2023',
    description: 'Photos from our annual club tournament featuring members from across Northern California',
    photos: [
      { _id: 'f1-1', title: 'Opening Ceremony', imageUrl: '/images/hero-1.jpg' },
      { _id: 'f1-2', title: 'Game in Progress', imageUrl: '/images/aeriel-green.jpg' },
      { _id: 'f1-3', title: 'Winners Circle', imageUrl: '/images/sc-greens.png' },
      { _id: 'f1-4', title: 'Trophy Presentation', imageUrl: '/images/earl-brushing.jpg' }
    ]
  },
  {
    _id: 'fallback-2',
    title: 'Club Social Events',
    description: 'Gatherings and social events hosted by our club throughout the year',
    photos: [
      { _id: 'f2-1', title: 'Summer BBQ', imageUrl: '/images/warmups.jpg' },
      { _id: 'f2-2', title: 'Holiday Party', imageUrl: '/images/sc-greens.png' },
      { _id: 'f2-3', title: 'New Member Welcome', imageUrl: '/images/aeriel-green.jpg' }
    ]
  }
];

// Slideshow Modal Component
const SlideshowModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  album: GalleryAlbum | null;
}> = ({ isOpen, onClose, album }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const photos = album?.photos || [];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, photos.length, onClose]);

  // Reset current index and loading state when opening a new album
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setIsLoading(true);
    }
  }, [isOpen, album]);

  // If no album or not open, don't render
  if (!isOpen || !album) return null;

  const currentPhoto = photos[currentIndex];

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm"
          onClick={onClose}
        >
          <div 
            className="relative w-full max-w-6xl max-h-[90vh] px-4" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 right-4 z-20 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-80 transition-all duration-300"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>

            {/* Album title */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-6"
            >
              <h3 className="text-white text-2xl font-bold">{album.title}</h3>
              {album.description && (
                <p className="text-gray-300 mt-1">{album.description}</p>
              )}
            </motion.div>

            {/* Image container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-video bg-gray-900 overflow-hidden rounded-lg shadow-2xl"
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {currentPhoto?.imageUrl || (currentPhoto?.image && currentPhoto.image.asset) ? (
                <motion.img
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={currentPhoto.imageUrl || urlFor(currentPhoto.image).width(1200).url()}
                  alt={currentPhoto.caption || currentPhoto.title || `Photo ${currentIndex + 1}`}
                  className="w-full h-full object-contain"
                  onLoad={handleImageLoad}
                  style={{ display: isLoading ? 'none' : 'block' }}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-white">No image available</p>
                </div>
              )}

              {/* Caption */}
              {currentPhoto?.caption && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-0 inset-x-0 bg-black bg-opacity-70 text-white p-4 backdrop-blur-sm"
                >
                  <p>{currentPhoto.caption}</p>
                </motion.div>
              )}
            </motion.div>

            {/* Navigation arrows */}
            {photos.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white rounded-full p-3 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
                    setIsLoading(true);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white rounded-full p-3 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex((prev) => (prev + 1) % photos.length);
                    setIsLoading(true);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </motion.button>
              </>
            )}

            {/* Photo counter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-4 text-white font-medium"
            >
              <span className="px-3 py-1 bg-black bg-opacity-50 rounded-full text-sm">
                {currentIndex + 1} / {photos.length}
              </span>
            </motion.div>

            {/* Thumbnail navigation (for galleries with multiple photos) */}
            {photos.length > 3 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex justify-center overflow-x-auto py-2 px-4 max-w-4xl mx-auto"
              >
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05
                      }
                    }
                  }}
                  className="flex space-x-2 snap-x snap-mandatory overflow-x-auto pb-2 px-4 scrollbar-thin scrollbar-thumb-white scrollbar-thumb-rounded-full hover:scrollbar-thumb-primary"
                >
                  {photos.map((photo, index) => (
                    <motion.button
                      key={photo._id || index}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { 
                          opacity: 1, 
                          scale: 1,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 15
                          }
                        }
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-shrink-0 w-16 h-16 snap-center overflow-hidden rounded-md transition-all duration-300 ${
                        index === currentIndex 
                          ? 'ring-2 ring-primary scale-110 z-10' 
                          : 'opacity-60 hover:opacity-100 filter grayscale hover:grayscale-0'
                      }`}
                      onClick={() => {
                        setCurrentIndex(index);
                        setIsLoading(true);
                      }}
                    >
                      <img
                        src={photo.imageUrl || urlFor(photo.image).width(100).url()}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const TheClub: React.FC = () => {
  const [galleryAlbums, setGalleryAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'failed'>('checking');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);

  useEffect(() => {
    const checkSanityConnection = async () => {
      try {
        console.log('Testing Sanity connection...');
        const result = await testSanityConnection();
        if (result.success) {
          console.log('Sanity connection successful');
          setConnectionStatus('connected');
          return true;
        } else {
          console.error('Sanity connection failed:', result.error);
          setConnectionStatus('failed');
          setError('Unable to connect to content database. Please try again later.');
          return false;
        }
      } catch (error) {
        console.error('Error testing Sanity connection:', error);
        setConnectionStatus('failed');
        setError('Error connecting to content database');
        return false;
      }
    };

    const fetchGalleryAlbums = async () => {
      try {
        console.log('Starting gallery albums fetch...');
        setLoading(true);
        
        // First check the connection
        const connected = await checkSanityConnection();
        if (!connected) {
          setLoading(false);
          return;
        }
        
        // Log environment variables (without token)
        console.log('Sanity environment config:', {
          projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
          dataset: import.meta.env.VITE_SANITY_DATASET,
          tokenExists: !!import.meta.env.VITE_SANITY_TOKEN
        });
        
        const albums = await getGalleryAlbumsWithPhotos();
        
        console.log(`Received ${albums?.length || 0} albums from getGalleryAlbumsWithPhotos`);
        
        if (albums && albums.length > 0) {
          console.log(`Found ${albums.length} albums to display`);
          // Ensure each album has a photos array
          const safeAlbums: GalleryAlbum[] = albums.map(album => ({
            ...album,
            photos: album.photos || []
          }));
          setGalleryAlbums(safeAlbums);
        } else {
          console.warn('No gallery albums found from Sanity, using fallback content');
          setGalleryAlbums(FALLBACK_ALBUMS);
          // Only set error if connection failed
          if (connectionStatus === 'failed') {
            setError('Unable to load gallery content from the database');
          }
        }
      } catch (error) {
        console.error('Error in gallery albums fetch:', error);
        setError(error instanceof Error ? error.message : 'Unknown error fetching albums');
        setGalleryAlbums([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryAlbums();
  }, []);

  // Function to open the slideshow modal
  const openSlideshow = (album: GalleryAlbum) => {
    setSelectedAlbum(album);
    setModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Function to close the slideshow modal
  const closeSlideshow = () => {
    setModalOpen(false);
    setSelectedAlbum(null);
    // Restore body scroll
    document.body.style.overflow = 'auto';
  };

  // Gallery section with improved album cards
  const renderGallerySection = () => {
    return (
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Club Photo Galleries</h2>
              <p className="text-lg max-w-3xl mx-auto mb-6">
                Browse through collections of photos from our club activities, tournaments, and social events
              </p>
              {error ? (
                <p className="text-red-500 mt-4 bg-red-50 p-3 rounded inline-block">
                  {error} {connectionStatus === 'failed' && ' - Check console for details'}
                </p>
              ) : (
                <p className="text-sm text-gray-500 mb-8">Click on any album to view its photos in a slideshow</p>
              )}
            </motion.div>
          </div>

          {loading ? (
            // Show improved loading skeleton with pulse animation
            <motion.div 
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-12 max-w-screen-xl mx-auto"
            >
              {[...Array(4)].map((_, index) => (
                <div 
                  key={index} 
                  className="relative rounded-xl bg-gray-200 overflow-hidden shadow-md h-full flex flex-col"
                  style={{ height: "400px" }}
                >
                  <div className="h-64 md:h-72 animate-pulse"></div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="h-6 bg-gray-300 rounded animate-pulse mb-3 w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded animate-pulse mb-2 w-full"></div>
                    <div className="h-4 bg-gray-300 rounded animate-pulse w-2/3"></div>
                    <div className="flex justify-end mt-auto pt-3">
                      <div className="h-8 bg-gray-300 rounded animate-pulse w-32"></div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : galleryAlbums.length > 0 ? (
            // Show gallery albums with enhanced styling and coverflow effect
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-12 max-w-screen-xl mx-auto"
            >
              {galleryAlbums.map((album, index) => (
                <motion.div
                  key={album._id}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 12
                      }
                    }
                  }}
                  whileHover={{ 
                    y: -8, 
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    rotateY: index % 2 === 0 ? 5 : -5, // Alternate rotation direction
                    z: 20
                  }}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 cursor-pointer transition-all duration-500 transform-gpu perspective-1000 h-full flex flex-col"
                  onClick={() => openSlideshow(album)}
                >
                  <div className="h-64 md:h-72 overflow-hidden relative">
                    {(album.coverImageUrl || (album.coverImage && album.coverImage.asset)) ? (
                      <img 
                        src={album.coverImageUrl || urlFor(album.coverImage).width(800).url()} 
                        alt={album.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : album.photos && album.photos.length > 0 && album.photos[0].imageUrl ? (
                      // Fallback to first photo if no cover image
                      <img 
                        src={album.photos[0].imageUrl || urlFor(album.photos[0].image).width(800).url()} 
                        alt={album.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No cover image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                      {album.photos?.length || 0} photos
                    </div>
                  </div>
                  <div className="p-6 relative z-10 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-primary-light transition-colors duration-300">{album.title}</h3>
                    {album.description && (
                      <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{album.description}</p>
                    )}
                    <div className="flex justify-end mt-auto pt-3">
                      <button className="btn btn-sm btn-primary inline-flex items-center gap-2 group-hover:bg-primary-light transition-colors duration-300">
                        View Gallery
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // This section shouldn't be reached since we have fallback albums
            <div className="text-center p-10 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-600 mb-4">
                No photo galleries are available at this time. Please check back soon!
              </p>
              <Link to="/" className="btn btn-primary">
                Return Home
              </Link>
            </div>
          )}

          {/* Slideshow Modal */}
          <SlideshowModal 
            isOpen={modalOpen} 
            onClose={closeSlideshow} 
            album={selectedAlbum} 
          />

          {connectionStatus === 'failed' && (
            <p className="text-sm mt-6 text-center text-gray-500">
              Using local content while content database is unavailable
            </p>
          )}
        </div>
      </section>
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-cover bg-center" style={{ backgroundImage: "url('/images/sc-greens.png')" }}>
        <div className="absolute inset-0 bg-primary bg-opacity-60"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">The Santa Cruz Lawn Bowls Club</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              A welcoming community of lawn bowlers of all skill levels
            </p>
          </motion.div>
        </div>
      </section>

      {/* Club History */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-left"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our History</h2>
              <p className="text-lg mb-4">
                The Santa Cruz Lawn Bowls Club was established in 1963 by a small group of enthusiasts who shared a passion 
                for this classic sport. The club began with just a single green and a handful of dedicated members.
              </p>
              <p className="text-lg mb-4">
                Over the decades, our club has grown significantly, adding improved facilities, expanding our greens, and 
                welcoming hundreds of members from all walks of life. We've hosted numerous tournaments, from local 
                friendly competitions to regional championships.
              </p>
              <p className="text-lg">
                Today, we're proud to be one of the most active lawn bowling clubs in Northern California, with a vibrant 
                community of players ranging from beginners to experienced competitors.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              <img 
                src="/images/sc-lawn-bowls-march-1967.jpg" 
                alt="Historic photo of the Santa Cruz Lawn Bowls Club from March 1967" 
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Club Facilities */}
      <section className="py-16 md:py-20 bg-background-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Facilities</h2>
              <p className="text-lg max-w-3xl mx-auto">
                We're proud to offer excellent facilities for our members and guests
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src="/images/aeriel-green.jpg" 
                  alt="Our pristine bowling green" 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Championship Green</h3>
                <p className="text-gray-600">
                  Our meticulously maintained bowling green offers an exceptional playing surface. The green is 
                  kept to championship standards, allowing for both casual play and competitive tournaments.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src="/images/earl-brushing.jpg" 
                  alt="Our welcoming clubhouse" 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Clubhouse</h3>
                <p className="text-gray-600">
                  Our clubhouse provides a comfortable gathering space for members. With a kitchen, restrooms, 
                  and social area, it's perfect for post-game relaxation and club events. The clubhouse also houses 
                  our trophy display and historical memorabilia.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src="/images/hero-1.jpg" 
                  alt="Equipment available for members" 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Equipment</h3>
                <p className="text-gray-600">
                  Don't worry about bringing your own equipment! We provide bowls in various sizes for beginners and 
                  visitors. Our members typically acquire their own bowls over time, but we ensure everyone can play 
                  regardless of whether they own equipment.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/contact" className="btn btn-primary">
              Schedule a Visit
            </Link>
          </div>
        </div>
      </section>

      {/* Membership Information */}
      <section className="py-16 md:py-20 bg-white" id="membership">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Membership</h2>
              <p className="text-lg max-w-3xl mx-auto">
                Join our community of lawn bowlers and enjoy all the benefits our club has to offer
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-primary mb-4">Membership Benefits</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1"><i className="fas fa-check-circle"></i></span>
                  <span>Unlimited access to our bowling green during club hours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1"><i className="fas fa-check-circle"></i></span>
                  <span>Free coaching sessions for beginners and skill development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1"><i className="fas fa-check-circle"></i></span>
                  <span>Participation in club tournaments and social events</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1"><i className="fas fa-check-circle"></i></span>
                  <span>Use of club equipment and facilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1"><i className="fas fa-check-circle"></i></span>
                  <span>Opportunity to represent the club in inter-club competitions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1"><i className="fas fa-check-circle"></i></span>
                  <span>Monthly newsletter with club updates and lawn bowling news</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-1"><i className="fas fa-check-circle"></i></span>
                  <span>Discounts on club merchandise and special events</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-primary mb-4">Membership Options</h3>
              <div className="space-y-6">
                <div className="bg-background-light p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-bold mb-2">Full Membership</h4>
                  <p className="text-3xl font-bold text-primary mb-4">$140<span className="text-lg text-gray-600">/year</span></p>
                  <p className="text-gray-600 mb-4">
                    Complete access to all club facilities and events. Ideal for regular players.
                  </p>
                  <Link to="/join" className="btn btn-primary w-full">Apply Now</Link>
                </div>

                {/* <div className="bg-background-light p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-bold mb-2">Social Membership</h4>
                  <p className="text-3xl font-bold text-primary mb-4">$100<span className="text-lg text-gray-600">/year</span></p>
                  <p className="text-gray-600 mb-4">
                    Access to club social events and limited bowling sessions. Perfect for occasional players.
                  </p>
                  <Link to="/join" className="btn btn-primary w-full">Apply Now</Link>
                </div> */}

                {/* <div className="bg-background-light p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-bold mb-2">Trial Membership</h4>
                  <p className="text-3xl font-bold text-primary mb-4">$50<span className="text-lg text-gray-600">/3 months</span></p>
                  <p className="text-gray-600 mb-4">
                    Try before you commit. Includes coaching sessions and use of equipment.
                  </p>
                  <Link to="/join" className="btn btn-primary w-full">Apply Now</Link>
                </div> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 md:py-20 bg-background-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Meet Our Team</h2>
              <p className="text-lg max-w-3xl mx-auto">
                The dedicated individuals who keep our club running smoothly
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Michael Thompson",
                role: "Club President",
                bio: "With over 20 years of lawn bowling experience, Michael has led our club for the past 5 years.",
                image: "/images/president.png"
              },
              {
                name: "Sarah Johnson",
                role: "Vice President",
                bio: "Sarah oversees our tournament schedule and coordinates with other clubs in the region.",
                image: "/images/vice-president.png"
              },
              {
                name: "David Garcia",
                role: "Head Coach",
                bio: "A certified instructor with a passion for teaching newcomers to the sport.",
                image: "/images/team-coach.png"
              },
              {
                name: "Elizabeth Chen",
                role: "Membership Coordinator",
                bio: "Elizabeth welcomes new members and ensures everyone feels part of our community.",
                image: "/images/membership.png"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md text-center"
              >
                <div className="h-80 overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-contain object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Preview - Now using the function */}
      {renderGallerySection()}

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Club?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              We welcome players of all skill levels. Come for a visit or sign up for membership today!
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-100">
                Schedule a Visit
              </Link>
              <Link to="/join" className="btn btn-accent">
                Apply for Membership
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TheClub; 