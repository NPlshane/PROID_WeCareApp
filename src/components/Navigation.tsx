
import { Heart, MessageCircle, Calendar, Brain, Home, MapPin, Clock } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/checkup', icon: Heart, label: 'Checkup' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/events', icon: Calendar, label: 'Events' },
    { path: '/appointments', icon: Clock, label: 'Appointments' },
    { path: '/food-map', icon: MapPin, label: 'Food Map' },
    { path: '/games', icon: Brain, label: 'Games' },
  ];

  return (
    <nav className="bg-slate-800 border-t-4 border-slate-700 fixed bottom-0 left-0 right-0 z-50 safe-area-pb shadow-2xl">
      <div className="flex justify-around items-center px-2 py-4">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center px-4 py-3 rounded-2xl transition-colors min-w-0 flex-1 ${
                isActive 
                  ? 'bg-primary/30 text-white border-2 border-primary/50' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`
            }
          >
            <Icon size={28} className="mb-2" />
            <span className="text-base font-semibold truncate">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
