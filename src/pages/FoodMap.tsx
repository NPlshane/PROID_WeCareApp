import { useState } from 'react';
import { ArrowLeft, MapPin, Star, Clock, Phone, Navigation as NavIcon, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

const FoodMap = () => {
  const [selectedLocation, setSelectedLocation] = useState('bedok');

  const locations = [
    { id: 'bedok', name: 'Bedok' },
    { id: 'ang-mo-kio', name: 'Ang Mo Kio' },
    { id: 'tampines', name: 'Tampines' },
    { id: 'clementi', name: 'Clementi' },
  ];

  const getFoodSpotsForLocation = (location: string) => {
    const foodSpotsByLocation = {
      'bedok': [
        {
          id: 1,
          name: 'Bedok Interchange Hawker Centre',
          category: 'hawker',
          rating: 4.3,
          priceRange: '$',
          openHours: '6:00 AM - 10:00 PM',
          phone: '6123-4567',
          address: '208 New Upper Changi Road',
          specialties: ['Laksa', 'Chicken Rice', 'Roti Prata'],
          elderly_friendly: true
        },
        {
          id: 2,
          name: 'Bedok Food Centre',
          category: 'hawker',
          rating: 4.1,
          priceRange: '$',
          openHours: '6:00 AM - 11:00 PM',
          phone: '6234-5678',
          address: '348 Bedok Road',
          specialties: ['Wanton Mee', 'Char Kway Teow', 'Satay'],
          elderly_friendly: true
        },
        {
          id: 3,
          name: 'Bedok Mall Food Court',
          category: 'restaurant',
          rating: 4.0,
          priceRange: '$$',
          openHours: '10:00 AM - 10:00 PM',
          phone: '6345-6789',
          address: '311 New Upper Changi Road',
          specialties: ['Japanese', 'Korean', 'Western'],
          elderly_friendly: true
        },
      ],
      'ang-mo-kio': [
        {
          id: 4,
          name: 'AMK Hub Food Court',
          category: 'restaurant',
          rating: 4.2,
          priceRange: '$$',
          openHours: '10:00 AM - 10:00 PM',
          phone: '6456-7890',
          address: '53 Ang Mo Kio Avenue 3',
          specialties: ['Thai', 'Vietnamese', 'Chinese'],
          elderly_friendly: true
        },
        {
          id: 5,
          name: 'Ang Mo Kio 628 Market',
          category: 'hawker',
          rating: 4.4,
          priceRange: '$',
          openHours: '6:00 AM - 2:00 PM',
          phone: '6567-8901',
          address: '628 Ang Mo Kio Avenue 4',
          specialties: ['Fishball Noodles', 'Bak Chor Mee', 'Carrot Cake'],
          elderly_friendly: true
        },
      ],
      'tampines': [
        {
          id: 6,
          name: 'Tampines Round Market',
          category: 'hawker',
          rating: 4.5,
          priceRange: '$',
          openHours: '6:00 AM - 10:00 PM',
          phone: '6678-9012',
          address: '137 Tampines Street 11',
          specialties: ['Hokkien Mee', 'Oyster Omelette', 'Rojak'],
          elderly_friendly: true
        },
        {
          id: 7,
          name: 'Tampines Mall Food Republic',
          category: 'restaurant',
          rating: 4.1,
          priceRange: '$$',
          openHours: '10:00 AM - 10:00 PM',
          phone: '6789-0123',
          address: '4 Tampines Central 5',
          specialties: ['International', 'Local', 'Desserts'],
          elderly_friendly: true
        },
      ],
      'clementi': [
        {
          id: 8,
          name: 'Clementi 448 Market',
          category: 'hawker',
          rating: 4.3,
          priceRange: '$',
          openHours: '6:00 AM - 10:00 PM',
          phone: '6890-1234',
          address: '448 Clementi Avenue 3',
          specialties: ['Duck Rice', 'Yong Tau Foo', 'Popiah'],
          elderly_friendly: true
        },
        {
          id: 9,
          name: 'Clementi Mall Food Court',
          category: 'restaurant',
          rating: 4.0,
          priceRange: '$$',
          openHours: '10:00 AM - 10:00 PM',
          phone: '6901-2345',
          address: '3155 Commonwealth Avenue West',
          specialties: ['Halal', 'Vegetarian', 'Fast Food'],
          elderly_friendly: true
        },
      ],
    };
    
    return foodSpotsByLocation[location] || [];
  };

  const foodSpots = getFoodSpotsForLocation(selectedLocation);

  return (
    <div className="min-h-screen bg-[#FAF3DD] pb-24 font-[Quicksand]">
      {/* Header */}
      <header className="bg-[#5E6472] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white">
              <ArrowLeft size={32} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Foods</h1>
              <p className="text-white/80 text-lg">Foods near you</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center">
            <div className="text-[#5E6472] text-sm font-semibold">Text Size</div>
            <div className="flex items-center justify-center space-x-2 mt-1">
              <button className="w-6 h-6 bg-slate-300 rounded text-[#5E6472]">-</button>
              <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center text-[#5E6472] font-bold">3</div>
              <button className="w-6 h-6 bg-slate-300 rounded text-[#5E6472]">+</button>
            </div>
          </div>
        </div>
      </header>

      {/* Location Selector */}
      <section className="bg-[#5E6472] text-white rounded-3xl mx-4 mt-6 p-6">
        <h2 className="text-xl font-bold mb-4">Select Location:</h2>
        <div className="grid grid-cols-2 gap-3">
          {locations.map(({ id, name }) => (
            <button
              key={id}
              onClick={() => setSelectedLocation(id)}
              className={`p-4 rounded-xl text-lg font-semibold transition-all ${
                selectedLocation === id 
                  ? 'bg-[#B8F2E6] text-[#5E6472]' 
                  : 'bg-[#5E6472] text-white border border-white/30 hover:bg-white/10'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </section>

      {/* Food Spots List */}
      <section className="mx-4 mt-6">
        <h2 className="text-2xl font-bold text-[#5E6472] mb-4">Food Spots</h2>
        <div className="space-y-4">
          {foodSpots.map((spot) => (
            <div
              key={spot.id}
              className="bg-[#B8F2E6] rounded-2xl p-6 border border-[#5E6472] shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#5E6472] mb-2">{spot.name}</h3>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-500" size={20} fill="currentColor" />
                      <span className="font-bold text-lg text-[#5E6472]">{spot.rating}</span>
                    </div>
                    <span className="text-[#5E6472] text-lg font-semibold">• {spot.priceRange}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-[#5E6472]">
                      <Clock size={20} className="mr-3" />
                      <span className="text-lg">{spot.openHours}</span>
                    </div>
                    <div className="flex items-center text-[#5E6472]">
                      <MapPin size={20} className="mr-3" />
                      <span className="text-lg">{spot.address}</span>
                    </div>
                  </div>
                </div>
                {spot.elderly_friendly && (
                  <span className="bg-[#AED9E0] text-[#5E6472] px-4 py-2 rounded-full text-lg font-bold">
                    Elder Friendly
                  </span>
                )}
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {spot.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-[#FFD6A5] text-[#5E6472] px-3 py-2 rounded-full text-lg font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 py-4 px-6 bg-[#AED9E0] text-[#5E6472] rounded-xl font-bold text-lg hover:bg-blue-300 flex items-center justify-center space-x-2">
                  <NavIcon size={20} />
                  <span>Directions</span>
                </button>
                <button className="px-6 py-4 bg-[#DDBDD5] text-[#5E6472] rounded-xl font-bold text-lg hover:bg-purple-300 flex items-center space-x-2">
                  <Phone size={20} />
                  <span>Call</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-[#AED9E0] flex justify-around items-center p-4 rounded-t-3xl shadow-inner">
        <Link to="/" className="text-[#5E6472] text-center">
          <Smile size={28} />
          <p className="text-sm">Home</p>
        </Link>
        <Link to="/chat" className="text-[#5E6472] text-center">
          <Smile size={28} />
          <p className="text-sm">Chats</p>
        </Link>
        <Link to="/appointments" className="text-[#5E6472] text-center">
          <Clock size={28} />
          <p className="text-sm">Bookings</p>
        </Link>
        <Link to="/food-map" className="text-[#5E6472] text-center">
          <Smile size={28} />
          <p className="text-sm">Food</p>
        </Link>
        <Link to="/games" className="text-[#5E6472] text-center">
          <Star size={28} />
          <p className="text-sm">Games</p>
        </Link>
      </nav>
    </div>
  );
};

export default FoodMap;