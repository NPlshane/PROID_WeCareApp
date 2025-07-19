import { useState } from 'react';
import { ArrowLeft, User, Activity, TestTube, Calendar, Pill, Camera, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [textZoom, setTextZoom] = useState(3);
  const [medications, setMedications] = useState([
    { id: 1, name: 'Blood Pressure Pills', time: '8:00 AM', taken: true },
    { id: 2, name: 'Diabetes Medication', time: '12:00 PM', taken: false },
    { id: 3, name: 'Vitamin D', time: '6:00 PM', taken: false },
  ]);
  const { toast } = useToast();

  const adjustTextSize = (increment: boolean) => {
    setTextZoom((prev) => {
      const newZoom = increment ? Math.min(prev + 1, 5) : Math.max(prev - 1, 1);
      return newZoom;
    });
  };

  const toggleMedication = (id: number) => {
    setMedications(prev => 
      prev.map(med => 
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
    toast({
      title: "Medication Updated",
      description: "Medication status has been updated.",
    });
  };

  const handleFoodPhoto = () => {
    toast({
      title: "Food Camera",
      description: "Camera feature for calorie calculation coming soon!",
    });
  };

  const handleQRScan = () => {
    toast({
      title: "QR Scanner",
      description: "Medication QR scanner coming soon!",
    });
  };

  return (
    <div className={`min-h-screen bg-[#FAF3DD] pb-24 font-[Quicksand]`} style={{fontSize: `${14 + textZoom * 2}px`}}>
      {/* Header */}
      <header className="bg-[#5E6472] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white">
              <ArrowLeft size={32} />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white">Profile</h1>
              <p className="text-white/80 text-xl">Your health dashboard</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-slate-800 text-lg font-semibold">Text Size</div>
            <div className="flex items-center justify-center space-x-3 mt-2">
              <button
                onClick={() => adjustTextSize(false)}
                className="w-10 h-10 bg-slate-300 rounded-lg text-slate-800 text-xl font-bold hover:bg-slate-400 transition-colors"
                disabled={textZoom === 1}
              >
                -
              </button>
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-800 font-bold text-lg">
                {textZoom}
              </div>
              <button
                onClick={() => adjustTextSize(true)}
                className="w-10 h-10 bg-slate-300 rounded-lg text-slate-800 text-xl font-bold hover:bg-slate-400 transition-colors"
                disabled={textZoom === 5}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Info */}
      <section className="bg-[#5E6472] text-white rounded-3xl mx-4 mt-6 p-6">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <User size={48} className="text-[#5E6472]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">John Doe</h2>
            <p className="text-xl text-white/80">Age: 72 years old</p>
            <p className="text-xl text-white/80">ID: S1234567A</p>
          </div>
        </div>
      </section>

      {/* Health Stats */}
      <section className="mx-4 mt-6">
        <h2 className="text-3xl font-bold text-[#5E6472] mb-6">Today's Health</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#B8F2E6] rounded-2xl p-6 text-center">
            <Activity size={40} className="mx-auto mb-2 text-[#5E6472]" />
            <p className="text-3xl font-bold text-[#5E6472]">3,245</p>
            <p className="text-lg text-[#5E6472]">Steps Today</p>
          </div>
          <div className="bg-[#AED9E0] rounded-2xl p-6 text-center">
            <TestTube size={40} className="mx-auto mb-2 text-[#5E6472]" />
            <p className="text-2xl font-bold text-[#5E6472]">Normal</p>
            <p className="text-lg text-[#5E6472]">Last Test</p>
          </div>
        </div>
      </section>

      {/* Latest Test Results */}
      <section className="mx-4 mt-6">
        <h2 className="text-3xl font-bold text-[#5E6472] mb-6">Latest Tests</h2>
        <div className="space-y-4">
          <div className="bg-[#FFD6A5] rounded-2xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-[#5E6472]">Blood Pressure</h3>
                <p className="text-lg text-[#5E6472]">120/80 mmHg</p>
                <p className="text-sm text-[#5E6472]">Yesterday, 9:00 AM</p>
              </div>
              <span className="bg-green-200 text-green-800 px-4 py-2 rounded-full text-lg font-bold">
                Normal
              </span>
            </div>
          </div>
          <div className="bg-[#DDBDD5] rounded-2xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-[#5E6472]">Blood Sugar</h3>
                <p className="text-lg text-[#5E6472]">95 mg/dL</p>
                <p className="text-sm text-[#5E6472]">2 days ago, 8:00 AM</p>
              </div>
              <span className="bg-green-200 text-green-800 px-4 py-2 rounded-full text-lg font-bold">
                Good
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Medication Tracker */}
      <section className="mx-4 mt-6">
        <h2 className="text-3xl font-bold text-[#5E6472] mb-6">Today's Medications</h2>
        <div className="space-y-4">
          {medications.map((med) => (
            <div key={med.id} className="bg-white rounded-2xl p-6 border border-[#5E6472] shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#5E6472]">{med.name}</h3>
                  <p className="text-lg text-[#5E6472]">{med.time}</p>
                </div>
                <button
                  onClick={() => toggleMedication(med.id)}
                  className={`px-6 py-3 rounded-xl font-bold text-lg ${
                    med.taken 
                      ? 'bg-green-200 text-green-800' 
                      : 'bg-red-200 text-red-800 hover:bg-red-300'
                  }`}
                >
                  {med.taken ? 'Taken ✓' : 'Mark Taken'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Food & Medication Features */}
      <section className="mx-4 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={handleFoodPhoto}
          className="bg-[#B8F2E6] rounded-2xl p-6 border border-[#5E6472] hover:bg-green-200 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#5E6472] rounded-xl">
              <Camera size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-[#5E6472] font-bold text-xl">Food Camera</h3>
              <p className="text-[#5E6472] text-lg opacity-80">Calculate calories</p>
            </div>
          </div>
        </button>
        
        <button 
          onClick={handleQRScan}
          className="bg-[#AED9E0] rounded-2xl p-6 border border-[#5E6472] hover:bg-blue-200 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#5E6472] rounded-xl">
              <QrCode size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-[#5E6472] font-bold text-xl">Scan Medication</h3>
              <p className="text-[#5E6472] text-lg opacity-80">Get medication info</p>
            </div>
          </div>
        </button>
      </section>

      {/* Upcoming Appointments */}
      <section className="mx-4 mt-6 mb-6">
        <h2 className="text-3xl font-bold text-[#5E6472] mb-6">Upcoming Appointments</h2>
        <div className="bg-[#FFD6A5] rounded-2xl p-6 border border-orange-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-400 rounded-xl">
              <Calendar size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-[#5E6472] font-bold text-xl">Dr. Smith - Cardiology</h3>
              <p className="text-[#5E6472] text-lg">Tomorrow, 2:00 PM</p>
              <p className="text-[#5E6472] text-lg">Singapore General Hospital</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;