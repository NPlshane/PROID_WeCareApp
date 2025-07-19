
import { useState } from 'react';
import { ArrowLeft, MessageCircle, Video, Phone, Plus, Search, Smile, Clock, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Chat = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'calls'>('chat');

  const contacts = [
    { id: 1, name: 'Dr. Smith', role: 'Family Doctor', status: 'online', lastMessage: 'Your test results look good!' },
    { id: 2, name: 'Sarah (Daughter)', role: 'Family', status: 'online', lastMessage: 'Love you mom! Call me later.' },
    { id: 3, name: 'Mike (Son)', role: 'Family', status: 'away', lastMessage: 'Thanks for the birthday wishes!' },
    { id: 4, name: 'Nurse Jennifer', role: 'Healthcare', status: 'online', lastMessage: 'Reminder: Take evening medication' },
    { id: 5, name: 'Mary (Neighbor)', role: 'Friend', status: 'offline', lastMessage: 'See you at the community center!' },
  ];

  const recentCalls = [
    { id: 1, name: 'Sarah (Daughter)', type: 'video', time: '2 hours ago', duration: '45 min' },
    { id: 2, name: 'Dr. Smith', type: 'voice', time: 'Yesterday', duration: '12 min' },
    { id: 3, name: 'Mike (Son)', type: 'video', time: '2 days ago', duration: '23 min' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

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
              <h1 className="text-3xl font-bold text-white">Chat & Calls</h1>
              <p className="text-white/80 text-lg">Stay connected with family</p>
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

      {/* Tab Navigation */}
      <section className="bg-[#5E6472] text-white rounded-3xl mx-4 mt-6 p-6">
        <div className="flex space-x-3">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-4 px-6 rounded-xl text-lg font-bold transition-all ${
              activeTab === 'chat' 
                ? 'bg-[#B8F2E6] text-[#5E6472]' 
                : 'bg-[#5E6472] text-white border border-white/30 hover:bg-white/10'
            } flex items-center justify-center space-x-2`}
          >
            <MessageCircle size={24} />
            <span>Messages</span>
          </button>
          <button
            onClick={() => setActiveTab('calls')}
            className={`flex-1 py-4 px-6 rounded-xl text-lg font-bold transition-all ${
              activeTab === 'calls' 
                ? 'bg-[#B8F2E6] text-[#5E6472]' 
                : 'bg-[#5E6472] text-white border border-white/30 hover:bg-white/10'
            } flex items-center justify-center space-x-2`}
          >
            <Phone size={24} />
            <span>Calls</span>
          </button>
        </div>
      </section>

      {/* Search */}
      <section className="mx-4 mt-6">
        <div className="bg-white rounded-2xl p-4 border border-[#5E6472] shadow">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5E6472]" size={24} />
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full pl-14 pr-4 py-4 text-xl bg-white border-2 border-[#5E6472] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#AED9E0] text-[#5E6472]"
            />
          </div>
        </div>
      </section>

      <main className="mx-4 mt-6">
        {activeTab === 'chat' ? (
          /* Chat Contacts */
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#5E6472]">Recent Conversations</h2>
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-[#B8F2E6] rounded-2xl p-6 border border-[#5E6472] shadow hover:shadow-lg cursor-pointer transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-[#AED9E0] rounded-full flex items-center justify-center">
                      <MessageCircle className="text-[#5E6472]" size={28} />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${getStatusColor(contact.status)} rounded-full border-3 border-white`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-[#5E6472]">{contact.name}</h3>
                      <span className="text-lg text-[#5E6472] font-medium">{contact.role}</span>
                    </div>
                    <p className="text-lg text-[#5E6472] truncate">
                      {contact.lastMessage}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <button className="p-4 bg-[#AED9E0] hover:bg-blue-300 rounded-xl transition-colors">
                      <MessageCircle size={24} className="text-[#5E6472]" />
                    </button>
                    <button className="p-4 bg-[#DDBDD5] hover:bg-purple-300 rounded-xl transition-colors">
                      <Video size={24} className="text-[#5E6472]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Recent Calls */
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#5E6472]">Recent Calls</h2>
            {recentCalls.map((call) => (
              <div
                key={call.id}
                className="bg-[#B8F2E6] rounded-2xl p-6 border border-[#5E6472] shadow hover:shadow-lg cursor-pointer transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#DDBDD5] rounded-full flex items-center justify-center">
                    {call.type === 'video' ? (
                      <Video className="text-[#5E6472]" size={28} />
                    ) : (
                      <Phone className="text-[#5E6472]" size={28} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#5E6472] mb-2">{call.name}</h3>
                    <div className="flex items-center space-x-4 text-[#5E6472]">
                      <span className="text-lg">{call.time}</span>
                      <span className="text-lg">Duration: {call.duration}</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="py-4 px-6 bg-[#AED9E0] hover:bg-blue-300 rounded-xl font-bold text-lg">
                      <Phone size={24} className="text-[#5E6472]" />
                    </button>
                    <button className="py-4 px-6 bg-[#DDBDD5] hover:bg-purple-300 rounded-xl font-bold text-lg">
                      <Video size={24} className="text-[#5E6472]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Emergency Call Button */}
        <div className="bg-red-200 p-6 rounded-3xl text-center border-t-4 border-red-400 mt-8">
          <h3 className="text-red-700 text-xl font-bold mb-2">Emergency Call</h3>
          <p className="text-red-700 mb-4 text-lg">
            Need immediate help? Press the button below to call emergency services.
          </p>
          <button className="bg-red-500 text-white font-bold px-8 py-4 rounded-xl text-xl shadow-md">
            Call 911
          </button>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-[#AED9E0] flex justify-around items-center p-4 rounded-t-3xl shadow-inner">
        <Link to="/" className="text-[#5E6472] text-center">
          <Smile size={28} />
          <p className="text-sm">Home</p>
        </Link>
        <Link to="/chat" className="text-[#5E6472] text-center">
          <MessageCircle size={28} />
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
          <Brain size={28} />
          <p className="text-sm">Games</p>
        </Link>
      </nav>
    </div>
  );
};

export default Chat;
