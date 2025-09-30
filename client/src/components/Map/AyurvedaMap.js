import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AyurvedaMap.css';

const AyurvedaMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [searchRadius, setSearchRadius] = useState(5); // km

  // Mock data for nearby Ayurveda clinics and stores
  const nearbyPlaces = [
    {
      id: 1,
      name: "Shree Ayurveda Panchakarma Center",
      type: "clinic",
      address: "123 Wellness St, Ayur City, AC 12345",
      distance: 2.3,
      rating: 4.8,
      phone: "+1-555-0123",
      specialties: ["Panchakarma", "Abhyanga", "Shirodhara"],
      image: "🏥",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 2,
      name: "Herbal Paradise Store",
      type: "store",
      address: "456 Green Lane, Herb Town, HT 67890",
      distance: 1.8,
      rating: 4.6,
      phone: "+1-555-0456",
      specialties: ["Herbs", "Oils", "Supplements"],
      image: "🌿",
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    {
      id: 3,
      name: "Vedic Healing Institute",
      type: "clinic",
      address: "789 Sacred Path, Vedic Village, VV 54321",
      distance: 4.1,
      rating: 4.9,
      phone: "+1-555-0789",
      specialties: ["Consultation", "Pulse Diagnosis", "Treatment"],
      image: "🕉️",
      coordinates: { lat: 40.6892, lng: -74.0445 }
    },
    {
      id: 4,
      name: "Nature's Ayurveda Pharmacy",
      type: "store",
      address: "321 Natural Way, Organic City, OC 98765",
      distance: 3.5,
      rating: 4.4,
      phone: "+1-555-0321",
      specialties: ["Medicines", "Formulations", "Consultation"],
      image: "💊",
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    {
      id: 5,
      name: "Holistic Wellness Spa",
      type: "clinic",
      address: "654 Harmony Blvd, Peace Town, PT 13579",
      distance: 5.2,
      rating: 4.7,
      phone: "+1-555-0654",
      specialties: ["Spa Treatments", "Massage", "Detox"],
      image: "🧘‍♀️",
      coordinates: { lat: 40.7831, lng: -73.9712 }
    }
  ];

  const [filteredPlaces, setFilteredPlaces] = useState(nearbyPlaces);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    filterPlaces();
  }, [activeFilter, searchRadius]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Error getting location:', error);
          // Use default location (New York City)
          setUserLocation({ lat: 40.7128, lng: -74.0060 });
        }
      );
    } else {
      // Use default location
      setUserLocation({ lat: 40.7128, lng: -74.0060 });
    }
  };

  const filterPlaces = () => {
    let filtered = nearbyPlaces.filter(place => place.distance <= searchRadius);

    if (activeFilter !== 'all') {
      filtered = filtered.filter(place => place.type === activeFilter);
    }

    setFilteredPlaces(filtered);
  };

  const handleShowDirections = (place) => {
    setSelectedClinic(place);
    setIsMapVisible(true);

    // Open Google Maps with directions
    const origin = userLocation ? `${userLocation.lat},${userLocation.lng}` : 'My Location';
    const destination = `${place.coordinates.lat},${place.coordinates.lng}`;
    const googleMapsUrl = `https://www.google.com/maps/dir/${origin}/${destination}`;
    window.open(googleMapsUrl, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="ayurveda-map-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="map-header">
        <motion.h2 variants={itemVariants}>
          🗺️ Find Nearby Ayurveda Centers
        </motion.h2>
        <motion.p variants={itemVariants}>
          Discover authentic Ayurveda clinics and herbal stores near you
        </motion.p>
      </div>

      <motion.div className="map-filters" variants={itemVariants}>
        <div className="filter-group">
          <label>Filter by type:</label>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${activeFilter === 'clinic' ? 'active' : ''}`}
              onClick={() => setActiveFilter('clinic')}
            >
              🏥 Clinics
            </button>
            <button
              className={`filter-btn ${activeFilter === 'store' ? 'active' : ''}`}
              onClick={() => setActiveFilter('store')}
            >
              🌿 Stores
            </button>
          </div>
        </div>

        <div className="radius-group">
          <label>Search radius: {searchRadius} km</label>
          <input
            type="range"
            min="1"
            max="20"
            value={searchRadius}
            onChange={(e) => setSearchRadius(parseInt(e.target.value))}
            className="radius-slider"
          />
        </div>
      </motion.div>

      <motion.div className="places-grid" variants={itemVariants}>
        <AnimatePresence>
          {filteredPlaces.map((place) => (
            <motion.div
              key={place.id}
              className={`place-card ${place.type}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(135, 169, 107, 0.2)" }}
            >
              <div className="place-header">
                <span className="place-icon">{place.image}</span>
                <div className="place-info">
                  <h3>{place.name}</h3>
                  <p className="place-type">{place.type.charAt(0).toUpperCase() + place.type.slice(1)}</p>
                </div>
                <div className="place-rating">
                  ⭐ {place.rating}
                </div>
              </div>

              <div className="place-details">
                <p className="place-address">📍 {place.address}</p>
                <p className="place-distance">📏 {place.distance} km away</p>
                <p className="place-phone">📞 {place.phone}</p>
              </div>

              <div className="place-specialties">
                <h4>Specialties:</h4>
                <div className="specialty-tags">
                  {place.specialties.map((specialty, index) => (
                    <span key={index} className="specialty-tag">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="place-actions">
                <motion.button
                  className="btn btn-primary directions-btn"
                  onClick={() => handleShowDirections(place)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🗺️ Get Directions
                </motion.button>
                <motion.button
                  className="btn btn-secondary call-btn"
                  onClick={() => window.open(`tel:${place.phone}`, '_self')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📞 Call
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredPlaces.length === 0 && (
        <motion.div
          className="no-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>🔍 No Ayurveda centers found within {searchRadius} km</p>
          <p>Try increasing the search radius or adjusting your filters</p>
        </motion.div>
      )}

      <AnimatePresence>
        {isMapVisible && selectedClinic && (
          <motion.div
            className="map-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMapVisible(false)}
          >
            <motion.div
              className="map-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="map-modal-header">
                <h3>Directions to {selectedClinic.name}</h3>
                <button
                  className="close-btn"
                  onClick={() => setIsMapVisible(false)}
                >
                  ✕
                </button>
              </div>
              <div className="map-modal-content">
                <div className="directions-info">
                  <p><strong>📍 Address:</strong> {selectedClinic.address}</p>
                  <p><strong>📏 Distance:</strong> {selectedClinic.distance} km</p>
                  <p><strong>📞 Phone:</strong> {selectedClinic.phone}</p>
                </div>
                <div className="map-placeholder">
                  <div className="map-frame">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY&origin=${userLocation?.lat},${userLocation?.lng}&destination=${selectedClinic.coordinates.lat},${selectedClinic.coordinates.lng}&mode=driving`}
                      width="100%"
                      height="300"
                      style={{ border: 0, borderRadius: '8px' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Directions to ${selectedClinic.name}`}
                    ></iframe>
                  </div>
                  <p className="map-note">
                    📝 <em>Note: Replace YOUR_API_KEY with a valid Google Maps API key for live directions</em>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AyurvedaMap;