import { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Star, Camera, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const EventsFood = () => {
  const [selectedTab, setSelectedTab] = useState('events');
  const [selectedLocation, setSelectedLocation] = useState('bedok');
  const { toast } = useToast();
  
  const locations = [
    { id: 'bedok', name: 'Bedok' },
    { id: 'ang-mo-kio', name: 'AMK' },
    { id: 'tampines', name: 'Tampines' },
    { id: 'clementi', name: 'Clementi' },
  ];

  const getEventsForLocation = (location: string) => {
    const eventsByLocation = {
      'bedok': [
        {
          id: 1,
          title: 'Tai Chi at Bedok Park',
          date: 'Today, 7:00 AM',
          location: 'Bedok Park',
          attendees: 20,
          maxAttendees: 25,
          description: 'Morning tai chi session by the lake',
          isJoined: false,
        },
        {
          id: 2,
          title: 'Cooking Class',
          date: 'Tomorrow, 2:00 PM',
          location: 'Bedok Community Centre',
          attendees: 12,
          maxAttendees: 15,
          description: 'Learn to cook traditional Peranakan dishes',
          isJoined: true,
        },
      ],
      'ang-mo-kio': [
        {
          id: 4,
          title: 'Mahjong Tournament',
          date: 'Today, 9:00 AM',
          location: 'AMK Hub Activity Room',
          attendees: 32,
          maxAttendees: 40,
          description: 'Monthly mahjong competition',
          isJoined: true,
        },
      ],
      'tampines': [
        {
          id: 7,
          title: 'Line Dancing',
          date: 'Today, 10:00 AM',
          location: 'Tampines East CC',
          attendees: 18,
          maxAttendees: 22,
          description: 'Fun line dancing for beginners',
          isJoined: true,
        },
      ],
      'clementi': [
        {
          id: 10,
          title: 'Swimming Session',
          date: 'Today, 8:00 AM',
          location: 'Clementi Swimming Complex',
          attendees: 25,
          maxAttendees: 30,
          description: 'Water aerobics for seniors',
          isJoined: false,
        },
      ],
    };
    
    return eventsByLocation[location] || [];
  };

  const getFoodSpotsForLocation = (location: string) => {
    const foodSpotsByLocation = {
      'bedok': [
        {
          id: 1,
          name: 'Bedok Hawker Centre',
          rating: 4.3,
          priceRange: '$',
          openHours: '6:00 AM - 10:00 PM',
          address: '208 New Upper Changi Road',
          specialties: ['Laksa', 'Chicken Rice', 'Roti Prata'],
        },
        {
          id: 2,
          name: 'Bedok Food Centre',
          rating: 4.1,
          priceRange: '$',
          openHours: '6:00 AM - 11:00 PM',
          address: '348 Bedok Road',
          specialties: ['Wanton Mee', 'Char Kway Teow'],
        },
      ],
      'ang-mo-kio': [
        {
          id: 4,
          name: 'AMK Hub Food Court',
          rating: 4.2,
          priceRange: '$$',
          openHours: '10:00 AM - 10:00 PM',
          address: '53 Ang Mo Kio Avenue 3',
          specialties: ['Thai', 'Vietnamese', 'Chinese'],
        },
      ],
      'tampines': [
        {
          id: 6,
          name: 'Tampines Round Market',
          rating: 4.5,
          priceRange: '$',
          openHours: '6:00 AM - 10:00 PM',
          address: '137 Tampines Street 11',
          specialties: ['Hokkien Mee', 'Oyster Omelette'],
        },
      ],
      'clementi': [
        {
          id: 8,
          name: 'Clementi 448 Market',
          rating: 4.3,
          priceRange: '$',
          openHours: '6:00 AM - 10:00 PM',
          address: '448 Clementi Avenue 3',
          specialties: ['Duck Rice', 'Yong Tau Foo'],
        },
      ],
    };
    
    return foodSpotsByLocation[location] || [];
  };

  const handleFoodPhoto = () => {
    toast({
      title: "Food Camera",
      description: "Camera feature for calorie calculation coming soon!",
    });
  };

  const events = getEventsForLocation(selectedLocation);
  const foodSpots = getFoodSpotsForLocation(selectedLocation);

  return (
    <div className="min-h-screen bg-[#FAF3DD] pb-24 font-[Quicksand]" style={{fontSize: '18px'}}>
      {/* Header */}
      <header className="bg-[#5E6472] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white">
              <ArrowLeft size={32} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Events & Food</h1>
              <p className="text-white/80 text-lg">Local activities and dining</p>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Selector */}
      <section className="mx-4 mt-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedTab('events')}
            className={`flex-1 py-4 px-6 rounded-2xl font-bold text-xl transition-all ${
              selectedTab === 'events' 
                ? 'bg-[#5E6472] text-white' 
                : 'bg-white text-[#5E6472] border border-[#5E6472]'
            }`}
          >
            <Calendar className="inline mr-2" size={24} />
            Events
          </button>
          <button
            onClick={() => setSelectedTab('food')}
            className={`flex-1 py-4 px-6 rounded-2xl font-bold text-xl transition-all ${
              selectedTab === 'food' 
                ? 'bg-[#5E6472] text-white' 
                : 'bg-white text-[#5E6472] border border-[#5E6472]'
            }`}
          >
            <Utensils className="inline mr-2" size={24} />
            Food
          </button>
        </div>
      </section>

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

      {/* Food Photo Feature */}
      {selectedTab === 'food' && (
        <section className="mx-4 mt-6">
          <button 
            onClick={handleFoodPhoto}
            className="w-full bg-[#FFD6A5] rounded-2xl p-6 border border-orange-300 hover:bg-orange-200 transition-colors"
          >
            <div className="flex items-center justify-center space-x-4">
              <div className="p-3 bg-orange-400 rounded-xl">
                <Camera size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-[#5E6472] font-bold text-xl">Take Photo of Food</h3>
                <p className="text-[#5E6472] text-lg opacity-80">Calculate calories automatically</p>
              </div>
            </div>
          </button>
        </section>
      )}

      {/* Content */}
      <section className="mx-4 mt-6">
        <h2 className="text-2xl font-bold text-[#5E6472] mb-4">
          {selectedTab === 'events' ? 'Events' : 'Food Spots'}
        </h2>
        <div className="space-y-4">
          {selectedTab === 'events' ? (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-[#B8F2E6] rounded-2xl p-6 border border-[#5E6472] shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#5E6472] mb-2">{event.title}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-[#5E6472]">
                        <Calendar size={20} className="mr-3" />
                        <span className="text-lg">{event.date}</span>
                      </div>
                      <div className="flex items-center text-[#5E6472]">
                        <MapPin size={20} className="mr-3" />
                        <span className="text-lg">{event.location}</span>
                      </div>
                      <div className="flex items-center text-[#5E6472]">
                        <Users size={20} className="mr-3" />
                        <span className="text-lg">{event.attendees}/{event.maxAttendees} people</span>
                      </div>
                    </div>
                  </div>
                  {event.isJoined && (
                    <span className="bg-[#AED9E0] text-[#5E6472] px-4 py-2 rounded-full text-lg font-bold">
                      Joined
                    </span>
                  )}
                </div>
                <p className="text-[#5E6472] mb-4 text-lg">{event.description}</p>
                <button className={`w-full py-4 px-6 rounded-xl font-bold text-lg ${
                  event.isJoined 
                    ? 'bg-[#FFD6A5] text-[#5E6472] hover:bg-orange-300' 
                    : 'bg-[#AED9E0] text-[#5E6472] hover:bg-blue-300'
                }`}>
                  {event.isJoined ? 'Leave Event' : 'Join Event'}
                </button>
              </div>
            ))
          ) : (
            foodSpots.map((spot) => (
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
                <button className="w-full py-4 px-6 bg-[#AED9E0] text-[#5E6472] rounded-xl font-bold text-lg hover:bg-blue-300">
                  Get Directions
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default EventsFood;