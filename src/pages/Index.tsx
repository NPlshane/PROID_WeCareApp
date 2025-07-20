
import {
  Heart,
  MessageCircle,
  Calendar,
  Brain,
  User,
  Clock,
  Utensils,
  Plus,
  Minus,
  Home,
  QrCode,
  Check,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useTextZoom } from "@/contexts/TextZoomContext";
import TextZoomControls from "@/components/TextZoomControls";

const Index = () => {
  const { textZoom } = useTextZoom();
  const [medicationTaken, setMedicationTaken] = useState(false);
  const { toast } = useToast();


  const handleMedicationTaken = () => {
    setMedicationTaken(!medicationTaken);
    toast({
      title: medicationTaken ? "Medication Unmarked" : "Medication Taken",
      description: medicationTaken ? "Blood pressure pills unmarked as taken." : "Blood pressure pills marked as taken!",
    });
  };

  const handleQRScan = () => {
    toast({
      title: "QR Scanner",
      description: "Medication QR scanner opening soon!",
    });
  };

  const features = [
    {
      title: 'Daily Checkup',
      description: 'Track your mood & wellness',
      icon: Heart,
      path: '/checkup',
    },
    {
      title: 'Chats & Calls',
      description: 'Connect with family & doctors',
      icon: MessageCircle,
      path: '/chat',
    },
    {
      title: 'Events',
      description: 'Local events & activities',
      icon: Calendar,
      path: '/events',
    },
    {
      title: 'Bookings',
      description: 'Your upcoming appointments',
      icon: Clock,
      path: '/appointments',
    },
    {
      title: 'Foods',
      description: 'Foods near you',
      icon: Utensils,
      path: '/events?tab=food',
    },
    {
      title: 'Games',
      description: 'Keep your mind sharp',
      icon: Brain,
      path: '/games',
    },
  ];

  return (
    <>
      <TextZoomControls />
      <div className={`min-h-screen bg-[#FAF3DD] pb-24 font-[Quicksand] elderly-text-zoom-${textZoom}`} style={{fontSize: `${14 + textZoom * 2}px`}}>
      {/* Header */}
      <header className="bg-[#5E6472] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="text-white">
              <User size={32} />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white">CareConnect</h1>
              <p className="text-white/80 text-xl">GOOD MORNING</p>
            </div>
          </div>
        </div>
      </header>

      {/* Overview */}
      <section className="bg-[#5E6472] text-white rounded-3xl mx-4 mt-6 p-6">
        <h2 className="text-2xl font-bold mb-6">Today's Overview</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[#AED9E0] rounded-2xl p-6 text-center">
            <MessageCircle size={40} className="mx-auto mb-2 text-[#5E6472]" />
            <p className="text-3xl font-bold text-[#5E6472]">4</p>
            <p className="text-lg text-[#5E6472]">Chats</p>
          </div>
          <div className="bg-[#B8F2E6] rounded-2xl p-6 text-center">
            <Heart size={40} className="mx-auto mb-2 text-red-400" />
            <p className="text-2xl font-bold text-[#5E6472]">Good</p>
            <p className="text-lg text-[#5E6472]">Mood</p>
          </div>
          <div className="bg-[#AED9E0] rounded-2xl p-6 text-center">
            <Calendar size={40} className="mx-auto mb-2 text-[#5E6472]" />
            <p className="text-3xl font-bold text-[#5E6472]">2</p>
            <p className="text-lg text-[#5E6472]">Events</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-4 mt-6">
        <h2 className="text-3xl font-bold text-[#5E6472] mb-6">Features</h2>
        <div className="grid grid-cols-2 gap-6">
          {features.map(({ title, description, icon: Icon, path }) => (
            <Link to={path} key={title} className="bg-[#B8F2E6] rounded-2xl p-6 border border-[#5E6472] shadow hover:shadow-lg transition-shadow">
              <div className="flex space-x-4">
                <div className="p-3 bg-[#5E6472] rounded-xl">
                  <Icon size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[#5E6472] font-bold text-xl">{title}</h3>
                  <p className="text-[#5E6472] text-lg opacity-80">{description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Medication + Event */}
      <section className="mx-4 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#FFD6A5] rounded-2xl p-5 border border-orange-300">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[#5E6472] font-bold text-lg">Medication Reminder</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleQRScan}
                className="p-2 bg-blue-400 rounded-xl hover:bg-blue-500 transition-colors"
                aria-label="Scan QR Code"
              >
                <QrCode size={20} className="text-white" />
              </button>
              <div className="p-2 bg-orange-400 rounded-xl">
                <Clock size={20} className="text-white" />
              </div>
            </div>
          </div>
          <div className="bg-orange-100 rounded-xl p-3 border border-orange-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[#5E6472] font-bold">Blood Pressure Pills</p>
                <p className="text-sm text-[#5E6472]">Take with breakfast</p>
                <p className="text-sm font-bold text-[#5E6472]">8:00AM</p>
              </div>
              <button
                onClick={handleMedicationTaken}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all hover-scale ${
                  medicationTaken 
                    ? 'bg-green-200 text-green-800 animate-scale-in' 
                    : 'bg-red-200 text-red-800 hover:bg-red-300'
                }`}
              >
                {medicationTaken ? (
                  <div className="flex items-center space-x-1">
                    <Check size={16} />
                    <span>Taken</span>
                  </div>
                ) : (
                  'Mark Taken'
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[#DDBDD5] rounded-2xl p-5 border border-purple-300">
          <h3 className="text-[#5E6472] font-bold text-lg mb-2">Upcoming Events</h3>
          <div className="bg-purple-100 rounded-xl p-3 border border-purple-300">
            <p className="text-[#5E6472] font-bold">Tai Chi Class</p>
            <p className="text-sm text-[#5E6472]">Bedok CC</p>
            <p className="text-sm font-bold text-[#5E6472]">7:00AM</p>
          </div>
        </div>
      </section>

      {/* Emergency Button */}
      <section className="mx-4 mt-6 bg-red-200 p-6 rounded-3xl text-center border-t-4 border-red-400">
        <h3 className="text-red-700 text-xl font-bold mb-2">Emergency</h3>
        <p className="text-red-700 mb-4 text-sm">Need immediate help? Tap to call emergency services.</p>
        <button className="bg-red-500 text-white font-bold px-8 py-3 rounded-xl text-xl shadow-md">
          Call 911
        </button>
      </section>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-[#AED9E0] flex justify-around items-center p-6 rounded-t-3xl shadow-inner">
        <Link to="/" className="text-[#5E6472] text-center">
          <Home size={28} />
          <p className="text-sm font-semibold">Home</p>
        </Link>
        <Link to="/chat" className="text-[#5E6472] text-center">
          <MessageCircle size={28} />
          <p className="text-sm font-semibold">Chats</p>
        </Link>
        <Link to="/appointments" className="text-[#5E6472] text-center">
          <Clock size={28} />
          <p className="text-sm font-semibold">Bookings</p>
        </Link>
        <Link to="/events" className="text-[#5E6472] text-center">
          <div className="flex space-x-1">
            <Calendar size={20} />
            <Utensils size={20} />
          </div>
          <p className="text-sm font-semibold">Events & Food</p>
        </Link>
        <Link to="/games" className="text-[#5E6472] text-center">
          <Brain size={28} />
          <p className="text-sm font-semibold">Games</p>
        </Link>
      </nav>
    </div>
    </>
  );
};

export default Index;
