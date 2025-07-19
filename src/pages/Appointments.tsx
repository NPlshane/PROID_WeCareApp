import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Plus, Phone, MapPin, User, Stethoscope, Smile, MessageCircle, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'General Practitioner',
      date: 'Tomorrow',
      time: '10:00 AM',
      location: 'Bedok Polyclinic',
      type: 'Regular Checkup',
      phone: '6123-4567'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      date: 'Friday',
      time: '2:30 PM',
      location: 'Singapore General Hospital',
      type: 'Heart Specialist',
      phone: '6234-5678'
    },
    {
      id: 3,
      doctor: 'Dr. Lisa Wong',
      specialty: 'Physiotherapist',
      date: 'Next Monday',
      time: '9:00 AM',
      location: 'Tampines Polyclinic',
      type: 'Physical Therapy',
      phone: '6345-6789'
    },
  ];

  const availableDoctors = [
    { id: 'dr-johnson', name: 'Dr. Sarah Johnson', specialty: 'General Practitioner', location: 'Bedok Polyclinic' },
    { id: 'dr-chen', name: 'Dr. Michael Chen', specialty: 'Cardiologist', location: 'SGH' },
    { id: 'dr-wong', name: 'Dr. Lisa Wong', specialty: 'Physiotherapist', location: 'Tampines Polyclinic' },
    { id: 'dr-lim', name: 'Dr. David Lim', specialty: 'Dentist', location: 'Clementi Dental' },
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime && selectedDoctor) {
      alert('Appointment booked successfully!');
      setSelectedDate('');
      setSelectedTime('');
      setSelectedDoctor('');
    } else {
      alert('Please select date, time, and doctor');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF3DD] pb-24 font-[Quicksand]">
      {/* Header */}
      <header className="bg-[#5E6472] p-6">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <ArrowLeft size={32} className="text-white" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">Appointments</h1>
            <p className="text-white/80 text-lg">Book and manage your medical appointments</p>
          </div>
          <Calendar className="text-white" size={40} />
        </div>
      </header>

      <main className="mx-4 mt-6 space-y-6">
        {/* Upcoming Appointments */}
        <div className="bg-[#B8F2E6] rounded-2xl p-6 border border-[#5E6472]">
          <h2 className="text-2xl font-bold text-[#5E6472] mb-6">Upcoming Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-6 bg-[#AED9E0] rounded-2xl border border-[#5E6472]"
              >
                <div className="flex flex-col space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-[#5E6472] rounded-xl">
                        <Stethoscope className="text-white" size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#5E6472]">{appointment.doctor}</h3>
                        <p className="text-[#5E6472] text-lg">{appointment.specialty}</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-[#5E6472]">{appointment.type}</p>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="text-[#5E6472]" size={24} />
                        <span className="text-lg text-[#5E6472]">{appointment.date}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="text-[#5E6472]" size={24} />
                        <span className="text-lg text-[#5E6472]">{appointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="text-[#5E6472]" size={24} />
                        <span className="text-lg text-[#5E6472]">{appointment.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <button className="bg-[#FFD6A5] text-[#5E6472] font-bold px-6 py-4 rounded-xl text-lg border border-orange-300 flex items-center justify-center space-x-2">
                      <Phone size={20} />
                      <span>{appointment.phone}</span>
                    </button>
                    <button className="bg-red-200 text-red-800 font-bold px-6 py-4 rounded-xl text-lg border border-red-300">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book New Appointment */}
        <div className="bg-[#B8F2E6] rounded-2xl p-6 border border-[#5E6472]">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#5E6472] rounded-xl">
              <Plus className="text-white" size={28} />
            </div>
            <h2 className="text-2xl font-bold text-[#5E6472]">Book New Appointment</h2>
          </div>
          
          <div className="space-y-6">
            {/* Select Doctor */}
            <div>
              <label className="block text-xl font-bold mb-3 text-[#5E6472]">Select Doctor:</label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="bg-white border-2 border-[#5E6472] text-[#5E6472] w-full px-6 py-4 rounded-xl text-lg font-semibold"
              >
                <option value="">Choose a doctor...</option>
                {availableDoctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty} ({doctor.location})
                  </option>
                ))}
              </select>
            </div>

            {/* Select Date */}
            <div>
              <label className="block text-xl font-bold mb-3 text-[#5E6472]">Select Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-white border-2 border-[#5E6472] text-[#5E6472] w-full px-6 py-4 rounded-xl text-lg font-semibold"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Select Time */}
            <div>
              <label className="block text-xl font-bold mb-3 text-[#5E6472]">Select Time:</label>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-6 py-4 rounded-xl text-lg font-bold border-2 ${
                      selectedTime === time
                        ? 'bg-[#5E6472] text-white border-[#5E6472]'
                        : 'bg-white text-[#5E6472] border-[#5E6472] hover:bg-[#AED9E0]'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleBookAppointment}
              className="bg-[#5E6472] text-white font-bold px-8 py-4 rounded-xl text-xl w-full hover:bg-[#4A5462]"
            >
              Book Appointment
            </button>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-200 rounded-2xl p-6 text-center border-2 border-red-400">
          <h3 className="text-2xl font-bold text-red-700 mb-4">Medical Emergency</h3>
          <p className="text-lg text-red-700 mb-6">
            For urgent medical help, contact emergency services immediately.
          </p>
          <button className="bg-red-500 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-red-600">
            Call 995 (Emergency)
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

export default Appointments;