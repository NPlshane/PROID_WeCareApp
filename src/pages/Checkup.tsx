
import { useState } from 'react';
import { ArrowLeft, Heart, Smile, Meh, Frown, ThumbsUp, MessageCircle, Clock, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkup = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<string[]>([]);

  const moods = [
    { id: 'excellent', label: 'Excellent', icon: ThumbsUp, color: 'bg-green-200 hover:bg-green-300' },
    { id: 'good', label: 'Good', icon: Smile, color: 'bg-primary hover:bg-primary/80' },
    { id: 'okay', label: 'Okay', icon: Meh, color: 'bg-secondary hover:bg-secondary/80' },
    { id: 'not-great', label: 'Not Great', icon: Frown, color: 'bg-orange-200 hover:bg-orange-300' },
  ];

  const surveyQuestions = [
    {
      question: 'How well did you sleep last night?',
      options: ['Very well', 'Well', 'Fair', 'Poorly'],
    },
    {
      question: 'Have you taken your medications today?',
      options: ['Yes, all of them', 'Yes, most of them', 'Some of them', 'No, not yet'],
    },
    {
      question: 'How is your energy level today?',
      options: ['Very energetic', 'Good energy', 'Some energy', 'Low energy'],
    },
  ];

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
  };

  const handleSurveyAnswer = (answer: string) => {
    const newAnswers = [...surveyAnswers];
    newAnswers[surveyStep] = answer;
    setSurveyAnswers(newAnswers);
    
    if (surveyStep < surveyQuestions.length - 1) {
      setSurveyStep(surveyStep + 1);
    }
  };

  const completedSurvey = surveyAnswers.length === surveyQuestions.length && surveyAnswers.every(answer => answer);

  return (
    <div className="min-h-screen bg-[#FAF3DD] pb-24 font-[Quicksand]">
      {/* Header */}
      <header className="bg-[#5E6472] p-6">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <ArrowLeft size={32} className="text-white" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">Daily Checkup</h1>
            <p className="text-white/80 text-lg">How are you feeling today?</p>
          </div>
          <Heart className="text-white" size={40} />
        </div>
      </header>

      <main className="mx-4 mt-6 space-y-6">
        {/* Mood Selection */}
        <div className="bg-[#B8F2E6] rounded-2xl p-6 border border-[#5E6472]">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#5E6472] rounded-xl">
              <Heart className="text-white" size={28} />
            </div>
            <h2 className="text-2xl font-bold text-[#5E6472]">Select Your Mood</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {moods.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => handleMoodSelect(id)}
                className={`px-6 py-6 rounded-xl text-lg font-bold border-2 ${
                  selectedMood === id 
                    ? 'bg-[#5E6472] text-white border-[#5E6472]' 
                    : 'bg-white text-[#5E6472] border-[#5E6472] hover:bg-[#AED9E0]'
                } flex items-center justify-center space-x-3`}
              >
                <Icon size={32} />
                <span className="text-xl">{label}</span>
              </button>
            ))}
          </div>
          {selectedMood && (
            <div className="mt-6 p-6 bg-[#AED9E0] rounded-xl border border-[#5E6472]">
              <p className="text-lg text-center text-[#5E6472] font-semibold">
                Thank you for sharing! Your mood has been recorded.
              </p>
            </div>
          )}
        </div>

        {/* Health Survey */}
        <div className="bg-[#B8F2E6] rounded-2xl p-6 border border-[#5E6472]">
          <h2 className="text-2xl font-bold text-[#5E6472] mb-6">Quick Health Check</h2>
          
          {surveyStep < surveyQuestions.length ? (
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-[#5E6472]">Question {surveyStep + 1} of {surveyQuestions.length}</span>
                  <div className="bg-[#AED9E0] rounded-full h-4 flex-1 mx-4 border border-[#5E6472]">
                    <div 
                      className="bg-[#5E6472] h-full rounded-full transition-all duration-300"
                      style={{ width: `${((surveyStep + 1) / surveyQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-6 text-[#5E6472]">
                  {surveyQuestions[surveyStep].question}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {surveyQuestions[surveyStep].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSurveyAnswer(option)}
                    className="bg-white text-[#5E6472] font-bold px-6 py-4 rounded-xl text-lg border-2 border-[#5E6472] hover:bg-[#AED9E0] text-left"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : completedSurvey ? (
            <div className="text-center py-8">
              <div className="p-4 bg-[#5E6472] rounded-xl inline-block mb-4">
                <ThumbsUp className="text-white" size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#5E6472]">Checkup Complete!</h3>
              <p className="text-lg text-[#5E6472] mb-6">
                Thank you for completing your daily checkup. Your responses help us understand your wellbeing better.
              </p>
              <Link 
                to="/"
                className="bg-[#5E6472] text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-[#4A5462] inline-flex items-center"
              >
                Return Home
              </Link>
            </div>
          ) : null}
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

export default Checkup;
