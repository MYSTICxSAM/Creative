import React, { useState } from 'react';
import { Camera, X, ArrowLeft, ArrowRight } from 'lucide-react';

// Data structure for the photos
const initialPhotos = [
  { id: 1, title: "Golden Hour Landscape", category: "Nature", 
    imageUrl: "https://scontent.fixj1-3.fna.fbcdn.net/v/t39.30808-6/535394583_761813743225776_1753750719747275980_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=hMiIuSkRyd0Q7kNvwFgg0X8&_nc_oc=AdntQkTBani3z5FDypEax4TmJu6JPD2AnCpaIPIkDn17EzQXPp79DT9MyWHUXrLwHiES3oPT3KPXIwzxa4nN6Ldd&_nc_zt=23&_nc_ht=scontent.fixj1-3.fna&_nc_gid=aE7OBf1OGjUY8-BUW35zcQ&oh=00_AfgI42Sm94AYmHGHV3ViMpsGS72Y8LfxXM_XnRA8fc2Y-Q&oe=6925301C", date: "2024-05-10" },
  { id: 2, title: "Happy", category: "Not Urban", 
    imageUrl: "https://scontent.fixj1-1.fna.fbcdn.net/v/t39.30808-6/475457682_610237948383357_7289290970585928560_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=_U4UOZYRi8sQ7kNvwFFDRWb&_nc_oc=Admpqtr_AgQ2LQlO38sP0lF5aqQqOdxa6zRi2QRupoGvtWNnJ75T2Euh_VLYKTrL9lfWnd7AzztmYq0oquGkv5vt&_nc_zt=23&_nc_ht=scontent.fixj1-1.fna&_nc_gid=S-9EWO665sEQ9_SSisp8BA&oh=00_Afj3ZreWzc45hMrFU0VDT1V_a67khepf390Y9B3rguDYZQ&oe=69252379", date: "2024-06-15" },
  { id: 3, title: "Minimalist Portrait", category: "Portrait", 
    imageUrl: "https://scontent.fixj1-1.fna.fbcdn.net/v/t39.30808-6/475787647_609705261769959_4232750144807019829_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=9VnHu7Df8-UQ7kNvwFLMN9a&_nc_oc=AdmwIaHxIr9jDBTK4TVsR9A0CEslB2mIwpc_zV9nNRQihLgYedSSXz-fxmOvIUSCr6aEiKofc5iRWc-dkJZEwvB6&_nc_zt=23&_nc_ht=scontent.fixj1-1.fna&_nc_gid=S-9EWO665sEQ9_SSisp8BA&oh=00_AfjVSZRn1RTJ_rDGbayqJMNsBvFNIdlDSNj4e1XD80O-QA&oe=692535CF", date: "2024-07-01" },
  { id: 4, title: "Abstract Art", category: "Art", 
    imageUrl: "https://scontent.fixj1-1.fna.fbcdn.net/v/t51.82787-15/528034443_18058248515366826_7364341862274126128_n.webp?stp=dst-jpg_tt6&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=eVP88JUE7lUQ7kNvwFwU4e8&_nc_oc=AdmFh2EcvuKyA8lvKTV3pru5jDY-3MH686jxwl7bH-SfZzFkWXeKzJHhicyBCCaJ7l9XRks9B9Mkrz3MHlwD8gte&_nc_zt=23&_nc_ht=scontent.fixj1-1.fna&_nc_gid=RBKJF-WACozo6AfamEcplA&oh=00_AfgQGNhbQZgOQaXTpbQnPs2tzLgBW7qk6CzH-BRDE_4wmw&oe=692508FA", date: "2024-07-20" },
  { id: 5, title: "Mountain Peak View", category: "Nature", 
    imageUrl: "https://scontent.fixj1-1.fna.fbcdn.net/v/t39.30808-6/479917379_621828200557665_4596237507323974502_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=0B81e9SKM4cQ7kNvwGfFecX&_nc_oc=Adkb43yqb07_IJyXh83oDc9VThMOGb9_ctETSCvy9baIrnur-RnpKIKXjaEn4oMB3JfMfvbn8l0E5ztGVXvUUaEz&_nc_zt=23&_nc_ht=scontent.fixj1-1.fna&_nc_gid=Ay9kFVzVFzWvG2QqYPlHmA&oh=00_AfhBlmCjxA7mjXFDUUNTfhUnMVQQjdoUQKjBCPFO-ai6Iw&oe=69250966", date: "2024-08-05" },
  { id: 6, title: "Street Performer", category: " Not Urban", 
    imageUrl: "https://scontent.fixj1-3.fna.fbcdn.net/v/t39.30808-6/472571339_593997406674078_8283914382786295317_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=hKIk4XY7hFoQ7kNvwGzYj3I&_nc_oc=AdkqhsGccp4hyUW_ddkU6Hm7HTR6WP_jdag83_VD6SUwlm_n79lx0Pb1RathT6xDfoaIUF1dvaJB66WxgW0KDnMv&_nc_zt=23&_nc_ht=scontent.fixj1-3.fna&_nc_gid=dz_3RijK1Be6iH0pwr8uig&oh=00_Afh_CT9XrCg91fKL7U9_8srdVeKOFFZRUhYoIO12lQzDkw&oe=692523B5", date: "2024-08-12" },
  { id: 7, title: "Night", category: "Still Life", 
    imageUrl: "https://scontent.fixj1-2.fna.fbcdn.net/v/t39.30808-6/472715477_595192916554527_5124647495814315069_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=o-y-pnUuuBYQ7kNvwF54gfK&_nc_oc=AdkP-juq1_jykWwoHSbUIoIG4OFfLTpknaA3RvlrxcHnFN2BsQ9hLW-NoMriC284f6TrFa5--tUf-6vJ4wny9Yac&_nc_zt=23&_nc_ht=scontent.fixj1-2.fna&_nc_gid=cneX68ITzWen9giV2oHHSA&oh=00_AfgR_Scw_V25SoeKYUQ5Au7Gzp53gZueaROofK9iBFd8MQ&oe=69253AD6", date: "2024-09-01" },
  { id: 8, title: "Shiv Shankar", category: "God", 
    imageUrl: "https://scontent.fixj1-2.fna.fbcdn.net/v/t39.30808-6/527773308_748765997863884_8973580299192993184_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=CxJRV3LbbGwQ7kNvwE_Oed0&_nc_oc=AdnFUYPASzBJIloV8Dmb9wGfAQ9MvhHocph78Bs8FJADEknZNXjFnu8KOeyZDAKecH8BDYbEdp735o1a2z8leqc4&_nc_zt=23&_nc_ht=scontent.fixj1-2.fna&_nc_gid=Wy5vs6mw7vo5BIj1joNYnA&oh=00_AfhlZfSV2nIUl9O1gMcf4pcDfi8_ODya7fQtTTGn-d0gjg&oe=692525B7", date: "2024-09-22" },
];

/**
 * Custom Modal Component for Fullscreen Photo View
 * This component is responsible for displaying the selected photo in a large modal overlay.
 * It is used (rendered) inside the main App component.
 * * @param {object} props
 * @param {object | null} props.photo - The photo object to display
 * @param {function} props.onClose - Function to close the modal
 * @param {function} props.onNavigate - Function to navigate (prev/next)
 */
const PhotoModal = ({ photo, onClose, onNavigate }) => {
  if (!photo) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4"
      onClick={onClose} // Close when clicking the overlay
    >
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-7xl h-full flex flex-col items-center justify-center"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking the content
      >
        
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white p-3 rounded-full bg-gray-800/70 hover:bg-gray-700/90 transition duration-200 z-50"
          onClick={onClose}
          aria-label="Close photo view"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Display */}
        <div className="flex-grow flex items-center justify-center max-h-[80vh] w-full">
            <img
            src={photo.imageUrl}
            alt={photo.title}
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/ef4444/f8fafc?text=Image+Failed+to+Load"; }}
            />
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-y-0 w-full flex items-center justify-between pointer-events-none p-4">
            <button
                className="pointer-events-auto text-white p-4 rounded-full bg-gray-800/50 hover:bg-gray-700/90 transition duration-200"
                onClick={() => onNavigate(-1)}
                aria-label="Previous photo"
            >
                <ArrowLeft className="w-8 h-8" />
            </button>
            <button
                className="pointer-events-auto text-white p-4 rounded-full bg-gray-800/50 hover:bg-gray-700/90 transition duration-200"
                onClick={() => onNavigate(1)}
                aria-label="Next photo"
            >
                <ArrowRight className="w-8 h-8" />
            </button>
        </div>


        {/* Photo Info */}
        <div className="mt-4 p-4 bg-gray-800/70 rounded-lg text-white max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold mb-1">{photo.title}</h2>
          <p className="text-lg text-gray-300">{photo.category} &bull; {photo.date}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Main App Component - Photo Portfolio
 * This is the root component that holds all the state and renders the rest of the application.
 */
const App = () => {
  const [photos, setPhotos] = useState(initialPhotos);
  const [filter, setFilter] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Get unique categories for the filter buttons
  const categories = ['All', ...new Set(initialPhotos.map(p => p.category))];

  // Filter logic
  const filteredPhotos = photos.filter(photo => {
    return filter === 'All' || photo.category === filter;
  });

  // Function to open the modal
  const openModal = (photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden'; // Prevent scrolling the body when modal is open
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto'; // Re-enable body scrolling
  };

  // Function to navigate between photos in the modal
  const navigatePhoto = (direction) => {
    if (!selectedPhoto) return;

    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const newIndex = (currentIndex + direction + filteredPhotos.length) % filteredPhotos.length;
    
    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  // Handle keyboard navigation for the modal
  React.useEffect(() => {
    const handleKeydown = (e) => {
      if (!selectedPhoto) return;
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        navigatePhoto(-1);
      } else if (e.key === 'ArrowRight') {
        navigatePhoto(1);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [selectedPhoto, filteredPhotos]);


  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Header Section */}
      <header className="py-12 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Camera className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            My Creative Portfolio
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            A selection of my recent photography and art projects.
          </p>
        </div>
      </header>

      {/* Filter Bar - Could be a separate component (e.g., <FilterBar />) */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out shadow-lg 
                ${filter === cat
                  ? 'bg-indigo-600 text-white transform scale-105 ring-4 ring-indigo-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                }`
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid Section - Could be a separate component (e.g., <PhotoGrid />) */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {filteredPhotos.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
                <p className="text-2xl">No photos found in the '{filter}' category.</p>
                <p className="mt-2">Try selecting a different filter.</p>
            </div>
        ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPhotos.map(photo => (
                <div 
                    key={photo.id}
                    className="relative group bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer transform hover:scale-[1.02] transition-all duration-300 ease-in-out"
                    onClick={() => openModal(photo)}
                >
                    {/* Image */}
                    <div className="aspect-square w-full">
                        <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/ef4444/f8fafc?text=Error"; }}
                        />
                    </div>
                    
                    {/* Overlay Info */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-center text-white p-4">
                            <h3 className="text-lg font-semibold">{photo.title}</h3>
                            <p className="text-sm text-indigo-300">{photo.category}</p>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        )}
      </main>

      {/* Fullscreen Photo Modal - This is where the component is USED */}
      <PhotoModal 
        photo={selectedPhoto} 
        onClose={closeModal} 
        onNavigate={navigatePhoto} 
      />
    </div>
  );
};

export default App;