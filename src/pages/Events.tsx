
import { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Events = () => {
  const [selectedLocation, setSelectedLocation] = useState('bedok');
  
  const locations = [
    { id: 'bedok', name: 'Bedok CC' },
    { id: 'ang-mo-kio', name: 'AMK Hub' },
    { id: 'tampines', name: 'Tampines Mall' },
    { id: 'clementi', name: 'Clementi Mall' },
  ];

  const getEventsForLocation = (location: string) => {
    const eventsByLocation = {
      'bedok': [
        {
          id: 1,
          title: 'Tai Chi at Bedok Park',
          category: 'exercise',
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
          category: 'social',
          date: 'Tomorrow, 2:00 PM',
          location: 'Bedok Community Centre',
          attendees: 12,
          maxAttendees: 15,
          description: 'Learn to cook traditional Peranakan dishes',
          isJoined: true,
        },
        {
          id: 3,
          title: 'Health Screening',
          category: 'health',
          date: 'Friday, 9:00 AM',
          location: 'Bedok Polyclinic',
          attendees: 30,
          maxAttendees: 40,
          description: 'Free blood pressure and diabetes screening',
          isJoined: false,
        },
      ],
      'ang-mo-kio': [
        {
          id: 4,
          title: 'Mahjong Tournament',
          category: 'social',
          date: 'Today, 9:00 AM',
          location: 'AMK Hub Activity Room',
          attendees: 32,
          maxAttendees: 40,
          description: 'Monthly mahjong competition',
          isJoined: true,
        },
        {
          id: 5,
          title: 'Health Talk',
          category: 'health',
          date: 'Wednesday, 3:00 PM',
          location: 'AMK Polyclinic',
          attendees: 50,
          maxAttendees: 60,
          description: 'Understanding diabetes management',
          isJoined: false,
        },
        {
          id: 6,
          title: 'Morning Walk',
          category: 'exercise',
          date: 'Saturday, 6:30 AM',
          location: 'Bishan-AMK Park',
          attendees: 25,
          maxAttendees: 30,
          description: 'Scenic walk around the park',
          isJoined: false,
        },
      ],
      'tampines': [
        {
          id: 7,
          title: 'Line Dancing',
          category: 'exercise',
          date: 'Today, 10:00 AM',
          location: 'Tampines East CC',
          attendees: 18,
          maxAttendees: 22,
          description: 'Fun line dancing for beginners',
          isJoined: true,
        },
        {
          id: 8,
          title: 'Garden Club',
          category: 'social',
          date: 'Saturday, 8:00 AM',
          location: 'Tampines Eco Garden',
          attendees: 15,
          maxAttendees: 20,
          description: 'Learn about urban gardening',
          isJoined: false,
        },
        {
          id: 9,
          title: 'Medication Workshop',
          category: 'health',
          date: 'Monday, 2:00 PM',
          location: 'Tampines Polyclinic',
          attendees: 25,
          maxAttendees: 35,
          description: 'Managing multiple medications safely',
          isJoined: false,
        },
      ],
      'clementi': [
        {
          id: 10,
          title: 'Swimming Session',
          category: 'exercise',
          date: 'Today, 8:00 AM',
          location: 'Clementi Swimming Complex',
          attendees: 25,
          maxAttendees: 30,
          description: 'Water aerobics for seniors',
          isJoined: false,
        },
        {
          id: 11,
          title: 'Chess Club',
          category: 'social',
          date: 'Thursday, 2:00 PM',
          location: 'Clementi Library',
          attendees: 16,
          maxAttendees: 20,
          description: 'Weekly chess meetup',
          isJoined: true,
        },
        {
          id: 12,
          title: 'Heart Health Check',
          category: 'health',
          date: 'Friday, 10:00 AM',
          location: 'Clementi Polyclinic',
          attendees: 40,
          maxAttendees: 50,
          description: 'Free cardiac health assessment',
          isJoined: false,
        },
      ],
    };
    
    return eventsByLocation[location] || [];
  };

  const events = getEventsForLocation(selectedLocation);

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
              <h1 className="text-3xl font-bold text-white">Events</h1>
              <p className="text-white/80 text-lg">Local events & activities</p>
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

      {/* Events List */}
      <section className="mx-4 mt-6">
        <h2 className="text-2xl font-bold text-[#5E6472] mb-4">Events</h2>
        <div className="space-y-4">
          {events.map((event) => (
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

              <div className="flex space-x-3">
                <button className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg ${
                  event.isJoined 
                    ? 'bg-[#FFD6A5] text-[#5E6472] hover:bg-orange-300' 
                    : 'bg-[#AED9E0] text-[#5E6472] hover:bg-blue-300'
                }`}>
                  {event.isJoined ? 'Leave Event' : 'Join Event'}
                </button>
                <button className="px-6 py-4 bg-[#DDBDD5] text-[#5E6472] rounded-xl font-bold text-lg hover:bg-purple-300">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-[#AED9E0] flex justify-around items-center p-4 rounded-t-3xl shadow-inner">
        <Link to="/" className="text-[#5E6472] text-center">
          <Calendar size={28} />
          <p className="text-sm">Home</p>
        </Link>
        <Link to="/chat" className="text-[#5E6472] text-center">
          <Calendar size={28} />
          <p className="text-sm">Chats</p>
        </Link>
        <Link to="/appointments" className="text-[#5E6472] text-center">
          <Clock size={28} />
          <p className="text-sm">Bookings</p>
        </Link>
        <Link to="/food-map" className="text-[#5E6472] text-center">
          <MapPin size={28} />
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

export default Events;
