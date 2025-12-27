import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, DollarSign, Ticket, Heart, Phone, Video, Send, Plus, Sparkles } from 'lucide-react';

const BunnyChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('main');
  const [isBouncing, setIsBouncing] = useState(false);
  const [breathCount, setBreathCount] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [auroraMode, setAuroraMode] = useState('wave');
  const [throwMessage, setThrowMessage] = useState('');
  const [isThrown, setIsThrown] = useState(false);
  const [matchedPerson, setMatchedPerson] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 800);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const mainOptions = [
    { id: 'calm', text: 'stressed rn 😮‍💫', icon: '🫧' },
    { id: 'talk', text: 'need to vent, i will help you 🥺', icon: '💭' },
    { id: 'find', text: 'find someone 💫', icon: '✨' },
    { id: 'throw', text: 'throw a vibe ✨🎯', icon: '🎲' }
  ];

  const sections = {
    calm: {
      options: [
        { text: 'breathing circle 🫧', action: 'breathe' },
        { text: 'pop anxiety away ⭐️', action: 'bubbles' },
        { text: 'northern lights ✨', action: 'aurora' }
      ]
    },
    talk: {
      options: [
        'finals stress 📚',
        'need to vent 💭',
        'feeling down 🥺',
        'feeling lost 😞',
        'help me, I\'m not feeling good 💔'
      ]
    },
    find: {
      options: [
        'coffee time ☕️',
        'study buddy 📚',
        'just hangout 🌸',
        'someone to talk to 🗣️'
      ]
    },
    throw: {
      options: [
        { text: 'throw a thought 💭', action: 'throw-thought' },
        { text: 'throw a song 🎵', action: 'throw-song' },
        { text: 'throw a mood ✨', action: 'throw-mood' }
      ]
    }
  };

  const handleBreathing = () => {
    setIsBreathing(true);
    const interval = setInterval(() => {
      setBreathCount(c => {
        if (c >= 8) {
          clearInterval(interval);
          setIsBreathing(false);
          return 0;
        }
        return c + 1;
      });
    }, 4000);
  };

  const handleBubbles = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newBubble = {
      id: Date.now(),
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      size: Math.random() * 20 + 20
    };
    setBubbles(prev => [...prev, newBubble]);
    
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
    }, 2000);
  };


  const renderCalming = () => {
    switch(activeSection) {
      case 'breathe':
        return (
          <div className="space-y-3">
            <div className="relative h-48 flex items-center justify-center bg-gradient-to-r from-purple-900/50 to-purple-800/50 rounded-xl border border-purple-700/30">
              {isBreathing ? (
                <>
                  <div className={`absolute transition-all duration-[4000ms] ease-in-out rounded-full 
                    bg-gradient-to-r from-purple-500/40 to-pink-500/40 backdrop-blur-sm
                    ${breathCount % 2 === 0 ? 'scale-100 opacity-50' : 'scale-150 opacity-80'}`}
                    style={{ width: '100px', height: '100px' }}
                  />
                  <div className="absolute text-purple-200 text-sm font-medium">
                    {breathCount % 2 === 0 ? 'breathe in... 🧘‍♀️' : 'breathe out... 😌'}
                  </div>
                </>
              ) : (
                <button
                  onClick={handleBreathing}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 
                    text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  start breathing ✨
                </button>
              )}
            </div>
          </div>
        );

      case 'bubbles':
        return (
          <div className="space-y-3">
            <div 
              className="h-48 relative overflow-hidden bg-gradient-to-b from-purple-900/50 to-purple-800/50 rounded-xl cursor-pointer border border-purple-700/30"
              onClick={handleBubbles}
            >
              <div className="absolute inset-0 flex items-center justify-center text-purple-300 text-sm font-medium">
                tap anywhere to pop anxiety bubbles ✨
              </div>
              
              {bubbles.map(bubble => (
                <div
                  key={bubble.id}
                  className="absolute rounded-full backdrop-blur-sm animate-float
                    hover:scale-110 transition-transform"
                  style={{
                    left: `${bubble.x}%`,
                    top: `${bubble.y}%`,
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                    background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4))'
                  }}
                />
              ))}
            </div>
          </div>
        );

      case 'aurora':
        return (
          <div className="space-y-3">
            <div className="h-48 relative bg-gradient-to-b from-black via-purple-950 to-black rounded-xl overflow-hidden border border-purple-500/20">
              <button
                onClick={() => setAuroraMode(prev => prev === 'wave' ? 'pulse' : 'wave')}
                className="absolute top-2 right-2 px-3 py-1 rounded-full bg-purple-700/50 text-purple-200
                  hover:bg-purple-600/50 text-xs z-10 backdrop-blur-sm border border-purple-500/30"
              >
                switch mode ✨
              </button>

              {/* Avatar-style particles dropping */}
              <div className="absolute inset-0">
                <style jsx>{`
                  @keyframes floatDown {
                    0% {
                      transform: translateY(-100%) translateX(0);
                      opacity: 0;
                    }
                    10% {
                      opacity: 1;
                    }
                    90% {
                      opacity: 1;
                    }
                    100% {
                      transform: translateY(250%) translateX(var(--drift));
                      opacity: 0;
                    }
                  }
                  .particle {
                    animation: floatDown var(--duration) linear infinite;
                    animation-delay: var(--delay);
                  }
                `}</style>
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="particle absolute w-1 h-1 bg-purple-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      '--drift': `${(Math.random() - 0.5) * 100}px`,
                      '--delay': `${Math.random() * 5}s`,
                      '--duration': `${3 + Math.random() * 4}s`,
                      boxShadow: '0 0 8px rgba(168, 85, 247, 0.8)'
                    }}
                  />
                ))}
                {[...Array(15)].map((_, i) => (
                  <div
                    key={`pink-${i}`}
                    className="particle absolute w-1 h-1 bg-pink-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      '--drift': `${(Math.random() - 0.5) * 100}px`,
                      '--delay': `${Math.random() * 5}s`,
                      '--duration': `${4 + Math.random() * 3}s`,
                      boxShadow: '0 0 8px rgba(236, 72, 153, 0.8)'
                    }}
                  />
                ))}
              </div>

              {/* Aurora waves */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-full h-full ${
                  auroraMode === 'wave' 
                    ? 'animate-auroraWave' 
                    : 'animate-auroraPulse'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-600/40 via-pink-500/30 to-transparent blur-xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 via-pink-600/20 to-transparent blur-xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-pink-500/20 blur-xl" />
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-500/30 to-transparent blur-2xl" />
            </div>
          </div>
        );

      case 'throw-thought':
      case 'throw-song':
      case 'throw-mood':
        const handleThrow = () => {
          if (!throwMessage.trim()) return;
          setIsThrown(true);
          
          // Simulate matching after 2 seconds
          setTimeout(() => {
            const mockPerson = { name: 'Sarah', match: 85 };
            setMatchedPerson(mockPerson);
          }, 2000);
        };

        if (isThrown && matchedPerson) {
          return (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-green-900/60 to-emerald-900/60 backdrop-blur-sm rounded-2xl p-4 border border-green-500/30">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3 animate-bounce">
                    ✨🎯
                  </div>
                  <p className="text-green-100 font-bold text-lg mb-2">
                    it's a match!
                  </p>
                  <p className="text-green-300 text-sm mb-3">
                    {matchedPerson.name} vibed with your {activeSection.replace('throw-', '')}! 
                  </p>
                  <div className="bg-green-950/50 rounded-xl p-3 mb-3">
                    <p className="text-green-200 text-xs mb-2">your {activeSection.replace('throw-', '')}:</p>
                    <p className="text-white text-sm italic">"{throwMessage}"</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="text-4xl">💚</div>
                    <div className="text-green-300 font-bold">{matchedPerson.match}% match</div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setIsThrown(false);
                    setMatchedPerson(null);
                    setThrowMessage('');
                    setActiveSection('main');
                  }}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 
                    text-white rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/50 
                    transition-all">
                  meet for coffee! ☕✨
                </button>
                
                <button 
                  onClick={() => {
                    setIsThrown(false);
                    setMatchedPerson(null);
                    setThrowMessage('');
                  }}
                  className="w-full mt-2 py-2 text-green-300 text-sm">
                  throw another one
                </button>
              </div>
            </div>
          );
        }

        if (isThrown && !matchedPerson) {
          return (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-spin">
                    🎯
                  </div>
                  <p className="text-purple-100 font-semibold mb-2">
                    finding your vibe match...
                  </p>
                  <p className="text-purple-300 text-xs">
                    looking for someone nearby who resonates 💜
                  </p>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-sm rounded-2xl p-4 border border-purple-500/30">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3 animate-bounce">
                  {activeSection === 'throw-thought' ? '💭' : activeSection === 'throw-song' ? '🎵' : '✨'}
                </div>
                <p className="text-purple-100 font-semibold mb-2">
                  {activeSection === 'throw-thought' && 'throw a random thought'}
                  {activeSection === 'throw-song' && 'throw a song vibe'}
                  {activeSection === 'throw-mood' && 'throw a mood check'}
                </p>
                <p className="text-purple-300 text-xs">
                  send it out there. if someone nearby resonates, you'll match for coffee! ☕✨
                </p>
              </div>

              <textarea
                value={throwMessage}
                onChange={(e) => setThrowMessage(e.target.value)}
                placeholder={
                  activeSection === 'throw-thought' 
                    ? "what's on your mind? 💭" 
                    : activeSection === 'throw-song'
                    ? "what song are you feeling? 🎵"
                    : "what's your vibe rn? ✨"
                }
                className="w-full h-24 px-4 py-3 rounded-xl bg-purple-950/50 text-purple-100 
                  placeholder-purple-400 border border-purple-500/30 focus:border-purple-500 
                  focus:ring-2 focus:ring-purple-500/50 transition-all resize-none text-sm"
              />

              <button 
                onClick={handleThrow}
                disabled={!throwMessage.trim()}
                className="w-full mt-3 py-3 bg-gradient-to-r from-pink-500 to-purple-500 
                  text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 
                  transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                <span>throw it! 🎯</span>
              </button>

              <p className="text-purple-400 text-xs text-center mt-3">
                gen z connection game • real vibes only 💜
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSectionOption = (opt) => {
    if (typeof opt === 'object' && opt.action) {
      setActiveSection(opt.action);
    }
  };

  return (
    <div className="absolute bottom-[80px] right-4 z-50">
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-gradient-to-br from-black via-gray-900 to-purple-950">
          {/* Chat Header - Profile View Style */}
          <div className="sticky top-0 z-10 bg-gradient-to-b from-black/95 via-black/90 to-transparent backdrop-blur-xl border-b border-purple-500/20">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/images/bunny.png" 
                  alt="Bunny"
                  className="w-10 h-10 rounded-full border-2 border-purple-500 shadow-lg shadow-purple-500/50"
                />
                <div>
                  <p className="text-white font-bold text-sm">Bunny AI</p>
                  <p className="text-purple-400 text-xs">comfort companion 💜</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-purple-400 hover:text-purple-300 bg-purple-500/10 backdrop-blur-sm rounded-full p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 pb-24" style={{ height: 'calc(100vh - 140px)' }}>
            {activeSection === 'main' ? (
              <div className="space-y-3">
                {/* Welcome message from Bunny */}
                <div className="flex justify-start mb-4">
                  <div className="bg-gradient-to-r from-purple-900/60 to-purple-800/60 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] border border-purple-500/20">
                    <p className="text-purple-100 text-sm leading-relaxed">
                      hey there! 💜 i'm here to help you feel better. what's on your mind?
                    </p>
                  </div>
                </div>

                {/* Quick action bubbles */}
                {mainOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setActiveSection(opt.id)}
                    className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-950/70 to-gray-900/70 
                      hover:from-purple-900/80 hover:to-purple-800/80 transition-all flex items-center gap-3
                      border border-purple-500/20 backdrop-blur-sm shadow-lg shadow-purple-900/20"
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="text-purple-100 font-medium text-left flex-1">{opt.text}</span>
                  </button>
                ))}
              </div>
            ) : ['breathe', 'bubbles', 'aurora'].includes(activeSection) ? (
              <div className="space-y-4">
                <button 
                  onClick={() => setActiveSection('main')}
                  className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-2"
                >
                  ← back
                </button>
                <div className="bg-gradient-to-br from-purple-950/50 to-black/50 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/20">
                  {renderCalming()}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <button 
                  onClick={() => setActiveSection('main')}
                  className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-2"
                >
                  ← back
                </button>

                {/* Bunny's response */}
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-purple-900/60 to-purple-800/60 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] border border-purple-500/20">
                    <p className="text-purple-100 text-sm leading-relaxed">
                      i hear you. let's work through this together 💜
                    </p>
                  </div>
                </div>

                {/* Options as chat bubbles */}
                <div className="space-y-3">
                  {sections[activeSection]?.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSectionOption(opt)}
                      className="w-full p-3 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 
                        transition-all text-left border border-purple-500/20 backdrop-blur-sm"
                    >
                      <span className="text-purple-100 text-sm">
                        {typeof opt === 'object' ? opt.text : opt}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chat Input - Always Visible at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-xl border-t border-purple-500/20">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="type your feelings..."
                className="flex-1 px-4 py-3 rounded-2xl bg-purple-950/50 text-purple-100 
                  placeholder-purple-500 focus:bg-purple-900/50 focus:ring-2 focus:ring-purple-500 
                  transition-all border border-purple-500/30 backdrop-blur-sm"
              />
              <button className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white 
                rounded-2xl hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setActiveSection('main');
          }
        }}
        className={`bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-full p-2 shadow-2xl hover:shadow-purple-500/50 
          transition-all hover:scale-110 border-2 border-purple-300 ${isBouncing ? 'animate-bounce' : ''}`}
      >
        <div className="relative">
          <img 
            src="/images/bunny.png" 
            alt="Bunny"
            className="w-12 h-12 rounded-full"
          />
          <div className="absolute -right-1 -bottom-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 
            rounded-full flex items-center justify-center animate-pulse shadow-lg border-2 border-white">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
        </div>
      </button>
    </div>
  );
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showFullImage, setShowFullImage] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showTicket, setShowTicket] = useState(false);

  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [coffeeInviteSent, setCoffeeInviteSent] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);

  // Helper to clear bottom navigation selection
  const clearBottomNav = () => {
    setSelectedCategory(null);
  };

  const profiles = {
    nearby: [
      {
        id: 10,
        name: "John",
        age: 28,
        gender: "boy",
        year: null,
        major: null,
        occupation: "Software Engineer",
        photos: ["/images/users/john/1.jpg", "/images/users/john/2.jpg"],
        location: "JFK Airport - Terminal 4",
        status: 'waiting',
        isNearby: true
      },
      {
        id: 11,
        name: "Mara",
        age: 32,
        gender: "girl",
        year: null,
        major: null,
        occupation: "Marketing Manager",
        photos: ["/images/users/Mara/1.jpg", "/images/users/Mara/2.jpg"],
        location: "Blue Bottle Coffee, NYC",
        status: 'connected',
        isNearby: true
      },
      {
        id: 12,
        name: "Sarah",
        age: 26,
        gender: "girl",
        year: null,
        major: null,
        occupation: "Graphic Designer",
        photos: ["/images/users/Sarah/1.jpg", "/images/users/Sarah/2.jpg"],
        location: "LaGuardia Airport - Terminal B",
        status: 'waiting',
        isNearby: true
      }
    ],
    events: [
      {
        id: 7,
        name: "Taylor Swift Club",
        gender: "event",
        photos: ["/images/users/Event/1.jpg", "/images/users/Event/2.jpg"],
        mood: "Join us for an unforgettable evening celebrating Taylor Swift's iconic music!",
        location: "student center - main hall",
        price: '$10',
        service: "movie ticket",
        ticketsLeft: 15,
        eventDate: "today, 8 PM",
        status: 'waiting',
        isEvent: true
      }
    ],
    study: [
      {
        id: 1,
        name: "John",
        age: 20,
        gender: "boy",
        year: "2nd year",
        major: "Biology",
        photos: ["/images/users/John/1.jpg", "/images/users/John/2.jpg"],
        mood: "at math learning center rn! need help with stats 260 🥲",
        location: "science library - 2nd floor",
        price: null,
        status: 'waiting'
      },
      {
        id: 2,
        name: "Mara",
        age: 21,
        gender: "girl",
        year: "3rd year",
        major: "Engineering",
        photos: ["/images/users/Mara/1.jpg", "/images/users/Mara/2.jpg"],
        mood: "can help with calculus integration, at library till 4! 📚😌",
        location: "library second floor",
        price: '$10',
        service: "math tutoring",
        status: 'connected'
      }
    ],
    sports: [
      {
        id: 3,
        name: "Sarah",
        age: 19,
        gender: "girl",
        year: "2nd year",
        major: "Biology",
        photos: ["/images/users/Sarah/1.jpg", "/images/users/Sarah/2.jpg"],
        mood: "getting bored! need someone to play squash at gym 🏸",
        location: "university gym",
        price: null,
        status: 'waiting'
      },
      {
        id: 4,
        name: "Mike",
        age: 23,
        gender: "boy",
        year: "4th year",
        major: "sports science",
        photos: ["/images/users/Mike/1.jpg", "/images/users/Mike/2.jpg"],
        mood: "certified trainer! can teach gym basics and proper form 💪 at 4",
        location: "fitness center",
        price: '$10',
        service: "gym training",
        status: 'connected'
      }
    ],
    rides: [
      {
        id: 5,
        name: "Lisa",
        age: 22,
        gender: "girl",
        year: "3rd year",
        major: "business",
        photos: ["/images/users/Lisa/1.jpg", "/images/users/Lisa/2.jpg"],
        mood: "going for grocery shopping to thrifty at 5! can give rides 🛒",
        location: "north parking lot 3",
        price: '$5',
        service: "ride share",
        status: 'waiting'
      },
      {
        id: 6,
        name: "Tom",
        age: 20,
        gender: "boy",
        year: "2nd year",
        major: "Business",
        photos: ["/images/users/Tom/1.jpg", "/images/users/Tom/2.jpg"],
        mood: "heading to downtown Tim's for coffee! anyone want to share ride 😌",
        location: "main parking",
        price: null,
        status: 'connected'
      }
    ],
    social: [
      {
        id: 8,
        name: "Jim",
        age: 21,
        gender: "boy",
        year: "3rd year",
        major: "Business",
        photos: ["/images/users/Jim/1.jpg", "/images/users/Jim/2.jpg"],
        mood: "hoping for a casual 5-10 minute chat to unwind 😌",
        location: "Campus Starbucks",
        price: null,
        status: 'waiting'
      },
      {
        id: 9,
        name: "Elly",
        age: 20,
        gender: "girl",
        year: "2nd year",
        major: "English",
        photos: ["/images/users/Elly/1.jpg", "/images/users/Elly/2.jpg"],
        mood: "looking to enjoy a quick 10-minute walk near Cove 🌊",
        location: "Cove",
        price: null,
        status: 'connected'
      }
    ]
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { text: chatInput, sender: 'user', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
      setChatInput('');
      
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          text: "Great! See you soon! 😊", 
          sender: 'other', 
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
        }]);
      }, 1000);
    }
  };

  const MoodCard = ({ user }) => {
    const cardConnected = user.status === 'connected' || user.isEvent;
    
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-3 border border-gray-100 hover:shadow-xl transition-all w-full">
        {user.price && (
          <div className="flex justify-end p-2 pb-0">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              {user.price}
            </div>
          </div>
        )}

        {!user.isNearby && !user.isEvent && (
          <div className="px-3 pt-1 pb-2">
            <p className="text-xs text-pink-500 italic text-center">"{user.mood}"</p>
          </div>
        )}

        <div className={`relative h-40 ${cardConnected ? 'bg-gradient-to-br from-pink-100 via-purple-100 to-pink-100' : 'bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50'}`}>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 space-y-2 z-10">
            <div className={`w-2 h-2 rounded-full ${cardConnected ? 'bg-gray-300' : 'bg-red-500 animate-pulse'}`} />
            <div className={`w-2 h-2 rounded-full ${cardConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`} />
          </div>

          <div className="absolute inset-2 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={user.isEvent 
                ? `/images/snap-emojis/event.png`
                : `/images/snap-emojis/${user.name?.toLowerCase()}.png`
              }
              alt="Snap"
              className="w-full h-full object-contain transition-all"
            />
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${cardConnected ? 'bg-pink-100 text-pink-600 border border-pink-300' : 'bg-gray-100 text-gray-600 border border-gray-300'}`}>
              {cardConnected ? '💫 connected' : '⏳ waiting'}
            </span>
          </div>
        </div>

        <div className="p-3">
          <button
            onClick={() => {
              clearBottomNav();
              setSelectedProfile(user);
              setShowProfile(true);
              setIsConnected(false);
              setCurrentPhotoIndex(0);
              setShowFullImage(false);
              setShowChat(false);
              setShowTicket(false);
              setChatMessages([]);
              setCoffeeInviteSent(false);
            }}
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white rounded-full font-semibold text-sm transition-colors"
          >
            view profile
          </button>
        </div>
      </div>
    );
  };

  const TicketView = ({ user }) => {
    const ticketNumber = Math.floor(Math.random() * 10000);
    
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 z-[60] overflow-y-auto p-4">
        <div className="flex items-center justify-center min-h-full">
          <div className="w-full">
            <button 
              onClick={() => setShowTicket(false)} 
              className="absolute top-4 left-4 text-white/80 hover:text-white z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 p-6 text-center relative">
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/10 to-transparent"></div>
                <div className="w-20 h-20 bg-white rounded-full mx-auto mb-3 flex items-center justify-center text-4xl shadow-lg relative z-10 animate-bounce">
                  🎫
                </div>
                <h2 className="text-white font-bold text-xl mb-1 relative z-10">Your Ticket!</h2>
                <p className="text-white/90 text-sm relative z-10">See you there! ✨</p>
              </div>

              <div className="p-4 space-y-3">
                <div className="text-center border-b border-dashed border-gray-300 pb-3">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{user.name}</h3>
                  <p className="text-pink-500 italic text-xs leading-relaxed">"{user.mood}"</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3 border border-pink-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-xl shadow-md">
                      📅
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Date & Time</p>
                      <p className="font-bold text-gray-800 text-sm">{user.eventDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-xl shadow-md">
                      📍
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Location</p>
                      <p className="font-bold text-gray-800 text-xs">{user.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-xl shadow-md">
                      💰
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Price</p>
                      <p className="font-bold text-gray-800 text-lg">{user.price}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-dashed border-gray-300">
                  <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-dashed border-pink-200">
                    <div className="bg-white p-3 rounded-xl mb-2 flex items-center justify-center shadow-inner">
                      <svg width="120" height="120" viewBox="0 0 29 29">
                        <rect width="29" height="29" fill="white"/>
                        <path d="M1,1h7v7h-7z M9,1h1v1h1v1h-1v1h-2v-1h1z M11,1h2v1h1v2h-1v1h-1v-2h-1z M15,1h1v1h-1z M17,1h1v2h1v-1h2v1h-1v1h1v1h-2v-1h-1v1h-1v-1h-1v-1h1v-1h1z M21,1h7v7h-7z M2,2v5h5v-5z M22,2v5h5v-5z M3,3h3v3h-3z M23,3h3v3h-3z M9,5h1v1h-1z M11,5h2v1h1v1h-2v1h-1v-2h-1v-1h1z M15,5h1v1h-1z M19,5h1v1h-1z M10,6h1v1h-1z M1,9h1v2h1v-1h2v1h-1v1h-1v1h-1v-1h-1z M5,9h1v2h-1z M9,9h1v1h1v-1h2v2h-2v1h-1v-1h-1v1h-1v-2h1z M14,9h1v1h-1z M16,9h1v2h-1v1h-1v-3h1z M19,9h1v1h-1z M6,10h1v1h-1z M20,10h1v2h-1z M4,11h1v1h-1z M7,11h1v2h-1v1h-1v-1h-1v-2h1v1h1z M14,11h1v1h-1z M22,11h3v1h-2v1h-1z M26,11h2v1h-2z M5,12h1v1h-1z M10,12h1v1h-1z M18,12h1v1h-1z M1,13h1v1h1v-1h1v1h-1v1h-2z M13,13h1v1h-1z M21,13h1v2h-1z M25,13h1v3h-1v1h-1v-2h-1v-1h2z M4,14h1v1h-1z M9,14h1v1h-1z M19,14h1v1h-1z M27,14h1v1h-1z M11,15h1v2h-1z M13,15h3v1h-2v1h-1z M17,15h2v1h1v1h-3v1h-1v-3h1z M22,15h1v1h-1z M1,16h1v1h-1z M3,16h4v1h-1v1h-1v-1h-2z M8,16h2v1h1v1h-2v1h-2v-1h1z M20,16h1v1h-1z M23,16h1v1h-1z M26,16h2v1h-2z M13,17h1v1h-1z M21,17h1v2h-1z M1,18h2v1h-2z M4,18h2v1h1v2h-1v-1h-1v1h-1v-1h-1v-1h1z M14,18h1v1h1v1h-1v1h-1z M17,18h1v1h-1z M19,18h1v1h-1z M26,18h2v1h-2z M9,19h2v1h-2z M12,19h1v1h-1z M22,19h2v1h-1v1h-1z M1,20h1v1h-1z M7,20h1v1h1v1h-1v1h-2v-2h1z M16,20h1v1h-1z M18,20h1v1h-1z M25,20h2v1h-2z M2,21h1v2h2v-1h1v2h-1v1h-2v1h-1v-1h-1v-3h1z M10,21h1v1h-1z M12,21h2v2h-1v-1h-1z M15,21h1v1h1v1h-2z M20,21h1v1h-1z M24,21h1v2h2v2h-1v-1h-2v-1h1v-1h-1z M27,21h1v1h-1z M5,22h2v1h-1v1h-1z M17,22h1v1h-1z M19,22h2v1h-1v1h-1z M9,23h1v1h1v1h-1v1h-1v-2h-1v-1h1z M11,23h1v2h-1z M14,23h1v1h-1z M22,23h1v1h-1z M26,23h2v1h-1v1h-1z M4,24h1v1h-1z M15,24h2v1h-1v1h-1z M19,24h2v1h-2z M5,25h2v1h-2z M12,25h1v1h1v1h-2z M17,25h1v1h-1z M21,25h1v2h-1z M1,26h1v1h-1z M7,26h1v1h-1z M9,26h1v1h-1z M14,26h1v1h-1z M18,26h2v1h-2z M23,26h1v1h-1z M25,26h1v2h-1z M27,26h1v1h-1z M2,27h1v1h-1z M4,27h3v1h-3z M8,27h1v1h-1z M10,27h2v1h-2z M15,27h1v1h-1z M17,27h1v1h-1z M20,27h1v1h-1z M22,27h1v1h-1z M26,27h2v1h-2z" fill="black"/>
                        <path d="M1,1h7v7h-7z M2,2v5h5v-5z M3,3h3v3h-3z" fill="black"/>
                        <path d="M21,1h7v7h-7z M22,2v5h5v-5z M23,3h3v3h-3z" fill="black"/>
                        <path d="M1,21h7v7h-7z M2,22v5h5v-5z M3,23h3v3h-3z" fill="black"/>
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-base text-gray-800 font-mono font-bold mb-1">TICKET #{ticketNumber}</p>
                      <p className="text-xs text-gray-500 mt-2 font-medium">Show QR code at entrance</p>
                      <div className="mt-2 pt-2 border-t border-pink-200">
                        <p className="text-xs text-pink-600 font-semibold">Valid for event date only</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ChatView = ({ user }) => {
    // Add suggested song message when chat opens from listening now
    useEffect(() => {
      if (chatMessages.length === 0) {
        setChatMessages([{
          text: "Hey!",
          sender: 'user',
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }]);
      }
    }, []);

    return (
      <div className="absolute inset-0 bg-white z-[60] flex flex-col">
      <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-3 flex items-center gap-3">
        <button onClick={() => setShowChat(false)} className="text-white">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 flex-1">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white">
            <img src={user.photos[0]} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{user.name}</p>
            <p className="text-white/80 text-xs">online now</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {chatMessages.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-4xl mb-2">💬</p>
            <p>Start chatting with {user.name}!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${msg.sender === 'user' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'bg-white text-gray-800'} rounded-2xl px-4 py-2 shadow`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 bg-white border-t">
        {selectedProfile?.price && (
          <div className="mb-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl p-3 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                💰
              </div>
              <div>
                <p className="text-xs font-semibold">Payment Required</p>
                <p className="text-sm font-bold">{selectedProfile.price}</p>
              </div>
            </div>
            <button className="bg-white text-green-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-green-50 transition-all">
              Pay Now
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:bg-gray-200 focus:outline-none"
          />
          <button 
            onClick={sendMessage}
            className="p-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:shadow-lg transition-all"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

  const ProfileView = ({ user }) => {
    const scrollRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const touchStartY = useRef(0);
    const touchEndY = useRef(0);
    const [swipeOffset, setSwipeOffset] = useState(0);
    const scrollPosition = useRef(0);
    
    const getGenderEmoji = (gender) => {
      if (gender === 'boy') return '👨';
      if (gender === 'girl') return '👩';
      return '🎭';
    };

    // Save scroll position before state changes
    const saveScrollPosition = () => {
      if (scrollRef.current) {
        scrollPosition.current = scrollRef.current.scrollTop;
      }
    };

    // Restore scroll position after state changes
    useEffect(() => {
      if (scrollRef.current && scrollPosition.current > 0) {
        scrollRef.current.scrollTop = scrollPosition.current;
      }
    }, [isConnected]);

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      touchEndX.current = e.touches[0].clientX;
      touchEndY.current = e.touches[0].clientY;
      
      const diffX = touchEndX.current - touchStartX.current;
      const diffY = touchEndY.current - touchStartY.current;
      
      // Only register horizontal swipe if it's more horizontal than vertical
      if (Math.abs(diffX) > Math.abs(diffY)) {
        setSwipeOffset(diffX);
        // Prevent vertical scrolling when doing horizontal swipe
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      const swipeDistanceX = touchEndX.current - touchStartX.current;
      const swipeDistanceY = touchEndY.current - touchStartY.current;
      
      // Only close if horizontal swipe is dominant and more than 100px
      if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY) && Math.abs(swipeDistanceX) > 100) {
        setShowProfile(false);
      }
      
      // Reset swipe offset
      setSwipeOffset(0);
      touchStartX.current = 0;
      touchEndX.current = 0;
      touchStartY.current = 0;
      touchEndY.current = 0;
    };

    return (
      <div 
        className="absolute inset-0 bg-black z-50 flex flex-col transition-transform"
        style={{ 
          transform: `translateX(${swipeOffset}px)`,
          transition: swipeOffset === 0 ? 'transform 0.3s ease-out' : 'none',
          willChange: 'transform',
          contain: 'layout paint'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => {
          // Prevent any click from closing - only swipe or X button
          e.stopPropagation();
        }}
      >
        {/* Swipe indicator */}
        {Math.abs(swipeOffset) > 20 && (
          <div className={`absolute ${swipeOffset > 0 ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 z-20 pointer-events-none`}>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 text-white text-2xl">
              {swipeOffset > 0 ? '→' : '←'}
            </div>
          </div>
        )}

        <div className="sticky top-0 z-10 flex items-center justify-between p-3 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-xl border-b border-white/10">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowProfile(false);
            }} 
            className="text-purple-400 hover:text-purple-300 transition-colors bg-purple-500/20 backdrop-blur-sm rounded-full p-2"
          >
            <X className="w-6 h-6" />
          </button>
          <div 
            className="w-10 h-10 bg-gradient-to-br from-pink-400 via-purple-400 to-pink-500 rounded-full flex items-center justify-center text-2xl border-2 border-pink-300 shadow-lg shadow-pink-500/50"
            onClick={(e) => e.stopPropagation()}
          >
            👧
          </div>
          <div className="w-6" />
        </div>

        <div 
          ref={scrollRef} 
          className="flex-1 overflow-y-auto overscroll-contain" 
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
        <div className="px-4 pt-3 pb-6">
          <div className="text-center mb-3">
            <p className="text-white font-bold text-lg mb-1">{user.name}{user.age ? `, ${user.age}` : ''}</p>
            {user.mood && <p className="text-pink-400 italic text-sm mb-1">"{user.mood}"</p>}
            {user.year && user.major && (
              <p className="text-gray-400 text-xs">{user.year} • {user.major}</p>
            )}
            {user.occupation && (
              <p className="text-gray-400 text-xs">{user.occupation}</p>
            )}
            <p className="text-gray-400 text-xs mt-1">📍 {user.location}</p>
          </div>

          {!user.isEvent && (
            <>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  saveScrollPosition();
                  setShowChat(true);
                }}
                className="w-full mb-3 bg-gradient-to-br from-white/5 via-pink-500/10 to-purple-500/10 backdrop-blur-2xl rounded-2xl p-3 border border-pink-500/20 hover:border-pink-500/40 transition-all active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-xl animate-pulse">
                    🎵
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-semibold text-xs">listening now</p>
                    <p className="text-pink-400 text-xs">indie / bedroom pop • on repeat</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-purple-400 text-xs font-semibold">suggest song</p>
                    <p className="text-purple-500 text-xs">→ chat</p>
                  </div>
                </div>
              </button>
            </>
          )}

          <div className="relative mb-3">
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
              <img 
                src={user.photos[currentPhotoIndex]} 
                alt={user.name} 
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setShowFullImage(true)}
              />
            </div>
            
            {user.photos.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentPhotoIndex(prev => prev === 0 ? user.photos.length - 1 : prev - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentPhotoIndex(prev => prev === user.photos.length - 1 ? 0 : prev + 1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
                >
                  →
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {user.photos.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentPhotoIndex ? 'bg-white w-4' : 'bg-white/50 w-2'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {showFullImage && (
            <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center" onClick={() => setShowFullImage(false)}>
              <button 
                onClick={() => setShowFullImage(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <img 
                src={user.photos[currentPhotoIndex]} 
                alt={user.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}

          {!user.isEvent && (
            <>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-gradient-to-br from-white/5 via-green-500/10 to-emerald-500/10 backdrop-blur-2xl rounded-2xl p-3 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-base">
                      🏃
                    </div>
                    <p className="text-white font-semibold text-xs">ran today</p>
                  </div>
                  <p className="text-green-400 text-xs">5.2 km • 28 min</p>
                </div>

                <div className="bg-gradient-to-br from-white/5 via-purple-500/10 to-pink-500/10 backdrop-blur-2xl rounded-2xl p-3 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-base">
                      ✨
                    </div>
                    <p className="text-white font-semibold text-xs">vibe</p>
                  </div>
                  <p className="text-purple-400 text-xs">chill • friendly</p>
                </div>
              </div>

              <div className="mb-2 bg-gradient-to-br from-white/5 via-blue-500/10 to-cyan-500/10 backdrop-blur-2xl rounded-2xl p-3 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center text-xl">
                    ⚡
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-xs">last active</p>
                    <p className="text-blue-400 text-xs">online now • {user.location}</p>
                  </div>
                </div>
              </div>

              <div className="mb-3 bg-gradient-to-br from-white/5 via-orange-500/10 to-amber-500/10 backdrop-blur-2xl rounded-2xl p-3 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center text-xl">
                    🔥
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-xs">streak</p>
                    <p className="text-orange-400 text-xs">12 days connecting • keep it going!</p>
                  </div>
                </div>
              </div>

              {/* Available Today Bubbles - ONLY in nearby category */}
              {selectedCategory === 'nearby' && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-gradient-to-br from-white/5 via-purple-500/10 to-pink-500/10 backdrop-blur-2xl rounded-2xl p-3 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-lg overflow-hidden">
                        <img 
                          src="/images/coffee.jpg"
                          alt="coffee"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-white font-semibold text-xs">2:00 PM</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/5 via-purple-500/10 to-pink-500/10 backdrop-blur-2xl rounded-2xl p-3 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-lg overflow-hidden">
                        <img 
                          src="/images/studying.jpg"
                          alt="study"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-white font-semibold text-xs">5:00 PM</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="space-y-2">
            {user.isEvent ? (
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  clearBottomNav();
                  setShowTicket(true);
                }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all active:scale-95"
              >
                <Ticket className="w-5 h-5" />
                buy ticket - {user.price}
              </button>
            ) : user.isNearby ? (
              coffeeInviteSent ? (
                <div className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                  <span className="text-2xl">✓</span>
                  coffee invitation sent!
                </div>
              ) : (
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCoffeeInviteSent(true);
                  }}
                  className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all active:scale-95"
                >
                  <span className="text-2xl">☕</span>
                  invite to coffee
                </button>
              )
            ) : !isConnected ? (
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  saveScrollPosition();
                  setIsConnected(true);
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all active:scale-95"
              >
                <Heart className="w-5 h-5" />
                connect
              </button>
            ) : (
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  saveScrollPosition();
                  clearBottomNav();
                  setShowChat(true);
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                start chat
              </button>
            )}
          </div>
        </div>
        </div>
      </div>
    );
  };

  const AvatarBuilder = () => {
    const [selectedBubbles, setSelectedBubbles] = useState([]);
    const [bubbleData, setBubbleData] = useState({});
    const [listeningNow, setListeningNow] = useState('');
    const [showPopup, setShowPopup] = useState(null);
    const [popupData, setPopupData] = useState({});
    
    const allBubbles = [
      { id: 'nearby', img: '/images/nearby.jpg', isNearby: true },
      { id: 'coffee', img: '/images/coffee.jpg' },
      { id: 'rides', img: '/images/car.jpg' },
      { id: 'study', img: '/images/studying.jpg' },
      { id: 'sports', img: '/images/playing.jpg' },
      { id: 'events', img: '/images/events.jpg' }
    ];

    const toggleBubble = (id) => {
      if (selectedBubbles.includes(id)) {
        setSelectedBubbles(selectedBubbles.filter(b => b !== id));
        const newData = {...bubbleData};
        delete newData[id];
        setBubbleData(newData);
      } else if (selectedBubbles.length < 2) {
        setSelectedBubbles([...selectedBubbles, id]);
        setShowPopup(id);
        setPopupData({});
      }
    };

    const savePopupData = () => {
      setBubbleData({...bubbleData, [showPopup]: popupData});
      setShowPopup(null);
      setPopupData({});
    };

    return (
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-950 z-[60] overflow-y-auto">
        {/* Header with girl emoji */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-black/95 via-black/90 to-transparent backdrop-blur-xl border-b border-purple-500/20 p-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowAvatar(false)} 
              className="text-purple-400 hover:text-purple-300 bg-purple-500/10 backdrop-blur-sm rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 via-purple-400 to-pink-500 rounded-full flex items-center justify-center text-3xl border-2 border-pink-300 shadow-lg shadow-pink-500/50">
              👧
            </div>
            <div className="w-10"></div>
          </div>
        </div>

        <div className="px-4 pt-3 pb-6">
          <p className="text-purple-400 text-xs font-semibold mb-4 text-center">make today's profile</p>

          {/* Edit Avatar */}
          <div className="mb-4">
            <p className="text-purple-300 text-xs font-semibold mb-2">edit avatar</p>
            <div className="bg-gradient-to-br from-white/5 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20 text-center">
              <div className="w-24 h-24 mx-auto mb-3">
                <img src="/images/snap-emojis/sarah.png" alt="avatar" className="w-full h-full object-contain" />
              </div>
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold text-xs shadow-lg">
                Edit Avatar
              </button>
            </div>
          </div>

          {/* Edit Photo */}
          <div className="mb-4">
            <p className="text-purple-300 text-xs font-semibold mb-2">edit photo</p>
            <div className="relative h-48 bg-gradient-to-br from-white/5 via-purple-500/10 to-pink-500/10 rounded-2xl overflow-hidden border border-purple-500/20">
              <img src="/images/users/Sarah/1.jpg" alt="profile" className="w-full h-full object-cover" />
              <button className="absolute bottom-3 right-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-2 rounded-xl font-semibold text-xs shadow-lg">
                Change Photo
              </button>
            </div>
          </div>

          {/* Horizontal Bubble Selection */}
          <div className="mb-4">
            <p className="text-purple-300 text-xs font-semibold mb-2">choose bubbles (max 2)</p>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-3">
              {allBubbles.map((bubble) => (
                <div key={bubble.id} className="flex-shrink-0">
                  <button
                    onClick={() => toggleBubble(bubble.id)}
                    className={`relative w-16 h-16 rounded-full overflow-hidden border-2 transition-all ${
                      selectedBubbles.includes(bubble.id)
                        ? 'border-pink-500 scale-110 shadow-lg shadow-pink-500/50'
                        : 'border-purple-500/30'
                    }`}
                  >
                    <img 
                      src={bubble.img}
                      alt={bubble.id}
                      className="w-full h-full object-cover"
                    />
                    {selectedBubbles.includes(bubble.id) && (
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/50 to-purple-600/50 flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <span className="text-pink-600 text-sm">✓</span>
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Listening Now - Editable */}
          <div className="mb-4">
            <p className="text-purple-300 text-xs font-semibold mb-2">listening now</p>
            <div className="bg-gradient-to-br from-white/5 via-pink-500/10 to-purple-500/10 backdrop-blur-2xl rounded-2xl p-3 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-xl animate-pulse">
                  🎵
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-xs">listening now</p>
                </div>
              </div>
              <input
                type="text"
                value={listeningNow}
                onChange={(e) => setListeningNow(e.target.value)}
                placeholder="indie / bedroom pop • on repeat"
                className="w-full px-3 py-2 rounded-xl bg-purple-950/50 text-white placeholder-purple-400 text-xs border border-purple-500/30 focus:border-purple-500"
              />
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg border border-pink-400/30">
            Save Daily Profile ✨
          </button>
        </div>

        {/* Popup for Bubble Details */}
        {showPopup && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-2xl p-6 max-w-sm w-full border border-purple-500/30">
              <p className="text-white font-bold text-lg mb-4 text-center">
                {showPopup === 'nearby' ? 'Set Nearby Time' : 'Bubble Details'}
              </p>

              {showPopup === 'nearby' ? (
                // Nearby: From and To time
                <div className="space-y-3">
                  <div>
                    <p className="text-purple-300 text-xs mb-1">from</p>
                    <input
                      type="time"
                      value={popupData.from || ''}
                      onChange={(e) => setPopupData({...popupData, from: e.target.value})}
                      className="w-full px-3 py-2 rounded-xl bg-purple-950/50 text-white border border-purple-500/30 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <p className="text-purple-300 text-xs mb-1">to</p>
                    <input
                      type="time"
                      value={popupData.to || ''}
                      onChange={(e) => setPopupData({...popupData, to: e.target.value})}
                      className="w-full px-3 py-2 rounded-xl bg-purple-950/50 text-white border border-purple-500/30 focus:border-purple-500"
                    />
                  </div>
                </div>
              ) : (
                // Other bubbles: Paid/Not Paid, Time, Description
                <div className="space-y-3">
                  <div>
                    <p className="text-purple-300 text-xs mb-1">type</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setPopupData({...popupData, paid: false})}
                        className={`py-2 rounded-xl text-xs font-semibold ${
                          popupData.paid === false
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                            : 'bg-purple-950/50 text-purple-300 border border-purple-500/30'
                        }`}
                      >
                        Not Paid
                      </button>
                      <button
                        onClick={() => setPopupData({...popupData, paid: true})}
                        className={`py-2 rounded-xl text-xs font-semibold ${
                          popupData.paid === true
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                            : 'bg-purple-950/50 text-purple-300 border border-purple-500/30'
                        }`}
                      >
                        Paid
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-purple-300 text-xs mb-1">time</p>
                    <input
                      type="time"
                      value={popupData.time || ''}
                      onChange={(e) => setPopupData({...popupData, time: e.target.value})}
                      className="w-full px-3 py-2 rounded-xl bg-purple-950/50 text-white border border-purple-500/30 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <p className="text-purple-300 text-xs mb-1">description</p>
                    <input
                      type="text"
                      value={popupData.description || ''}
                      onChange={(e) => setPopupData({...popupData, description: e.target.value})}
                      placeholder="add description..."
                      className="w-full px-3 py-2 rounded-xl bg-purple-950/50 text-white placeholder-purple-400 border border-purple-500/30 focus:border-purple-500 text-sm"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setShowPopup(null);
                    setPopupData({});
                    setSelectedBubbles(selectedBubbles.filter(b => b !== showPopup));
                  }}
                  className="flex-1 py-2 rounded-xl bg-gray-700 text-white font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={savePopupData}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const WalletView = () => (
    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-950 z-[60] overflow-y-auto">
      <div className="sticky top-0 z-10 bg-gradient-to-b from-black/95 via-black/90 to-transparent backdrop-blur-xl border-b border-purple-500/20 p-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setShowWallet(false)} 
            className="text-purple-400 hover:text-purple-300 bg-purple-500/10 backdrop-blur-sm rounded-full p-2"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-white font-bold text-lg">My Wallet</h2>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Debit Card */}
        <div className="relative h-44 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all border border-purple-500/30">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-gray-900 to-black"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500 rounded-full -translate-y-20 translate-x-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500 rounded-full translate-y-16 -translate-x-16 blur-3xl"></div>
          </div>
          
          <div className="relative h-full p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-purple-300 text-xs font-semibold mb-1">Current Balance</p>
                <p className="text-white text-2xl font-bold">$847.50</p>
              </div>
              <div className="w-10 h-10 bg-purple-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-purple-500/30">
                <span className="text-xl">💳</span>
              </div>
            </div>
            
            <div>
              <div className="mb-2">
                <p className="text-purple-400 text-xs mb-1">Card Number</p>
                <p className="text-white font-mono text-base tracking-wider">•••• •••• •••• 4829</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-purple-400 text-xs mb-1">Card Holder</p>
                  <p className="text-white font-semibold text-xs">Alex Rodriguez</p>
                </div>
                <div>
                  <p className="text-purple-400 text-xs mb-1">Expires</p>
                  <p className="text-white font-semibold text-xs">12/27</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Earnings Section */}
        <div className="bg-gradient-to-br from-white/5 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold text-base">This Month</h3>
            <div className="bg-gradient-to-r from-green-600/80 to-emerald-600/80 text-white px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">
              +$247.50
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gradient-to-r from-purple-950/40 to-gray-900/40 rounded-xl border border-purple-500/20">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-purple-500/50 to-pink-500/50 rounded-full flex items-center justify-center border border-purple-500/30">
                  <span className="text-lg">🎓</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-xs">Tutoring Sessions</p>
                  <p className="text-purple-300 text-xs">12 sessions</p>
                </div>
              </div>
              <p className="text-green-400 font-bold text-sm">$120.00</p>
            </div>

            <div className="flex items-center justify-between p-2 bg-gradient-to-r from-purple-950/40 to-gray-900/40 rounded-xl border border-purple-500/20">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500/50 to-cyan-500/50 rounded-full flex items-center justify-center border border-blue-500/30">
                  <span className="text-lg">🚗</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-xs">Ride Shares</p>
                  <p className="text-purple-300 text-xs">8 trips</p>
                </div>
              </div>
              <p className="text-green-400 font-bold text-sm">$40.00</p>
            </div>

            <div className="flex items-center justify-between p-2 bg-gradient-to-r from-purple-950/40 to-gray-900/40 rounded-xl border border-purple-500/20">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-orange-500/50 to-amber-500/50 rounded-full flex items-center justify-center border border-orange-500/30">
                  <span className="text-lg">🎫</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-xs">Event Tickets</p>
                  <p className="text-purple-300 text-xs">15 sold</p>
                </div>
              </div>
              <p className="text-green-400 font-bold text-sm">$87.50</p>
            </div>
          </div>
        </div>

        {/* Potential Earnings */}
        <div className="bg-gradient-to-br from-purple-900/60 via-gray-900/60 to-purple-950/60 rounded-2xl p-4 shadow-xl text-white border border-purple-500/30 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 bg-purple-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-purple-500/30">
              <span className="text-xl">🚀</span>
            </div>
            <h3 className="font-bold text-base">Unlock More Earnings</h3>
          </div>
          
          <p className="text-purple-200 text-xs mb-3 leading-relaxed">
            Complete 5 more sessions this week to earn a <span className="font-bold text-white">$50 bonus!</span>
          </p>
          
          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-purple-500/20 rounded-full h-2 overflow-hidden border border-purple-500/30">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" style={{width: '60%'}}></div>
              </div>
              <span className="text-xs font-semibold">3/5</span>
            </div>
          </div>

          <div className="bg-purple-950/50 backdrop-blur-sm rounded-xl p-2 space-y-1 mb-3 border border-purple-500/20">
            <div className="flex items-center justify-between text-xs">
              <span className="text-purple-300">Potential this week:</span>
              <span className="font-bold text-base text-white">+$185</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-purple-400">Average per session:</span>
              <span className="font-semibold text-purple-200">$12.50</span>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-xl font-bold hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg text-sm border border-purple-400/30">
            Tap to Pay 💳
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="fixed inset-0 w-full flex justify-center bg-gray-100">
      <div className="relative w-full max-w-[390px] h-full bg-white flex flex-col">
        <style jsx global>{`
          body {
            position: fixed;
            overflow: hidden;
            width: 100%;
            height: 100%;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        <div 
          className="flex-1 overflow-y-auto overflow-x-hidden p-4"
          style={{ 
            paddingBottom: '100px',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {selectedCategory && (
            <div className="space-y-3">
              {profiles[selectedCategory]?.map((profile) => (
                <MoodCard key={profile.id} user={profile} />
              ))}
            </div>
          )}

          {!selectedCategory && (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0">
              {/* Static dark background */}
              <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-950"></div>
              
              {/* Animated floating orbs - dark purple/pink only */}
              <div className="absolute top-10 left-10 w-64 h-64 bg-purple-900/40 rounded-full blur-3xl animate-pulse" style={{animationDuration: '3s'}}></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-900/40 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-purple-800/30 rounded-full blur-2xl animate-pulse" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
              <div className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-pink-800/30 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s', animationDelay: '0.5s'}}></div>
              
              {/* Sparkles */}
              <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `twinkle ${2 + Math.random() * 3}s infinite`,
                      animationDelay: `${Math.random() * 2}s`,
                      opacity: 0
                    }}
                  ></div>
                ))}
              </div>

              <div className="relative z-10 text-center px-6">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 font-bold text-3xl mb-3">
                  bubble world
                </p>
                <p className="text-gray-400 text-sm">select a category below</p>
              </div>
            </div>
          )}
        </div>

        <BunnyChat />

        {/* Avatar Button - Top Left - Always Visible */}
        <button
          onClick={() => {
            clearBottomNav();
            setShowAvatar(true);
          }}
          className="absolute top-4 left-4 z-50 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-full p-1.5 shadow-2xl hover:shadow-pink-500/50 transition-all hover:scale-110 border-2 border-pink-300 animate-pulse"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-purple-400 to-pink-500 rounded-full flex items-center justify-center text-2xl border border-white shadow-lg">
            👧
          </div>
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg z-40">
          <div className="p-2 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2" style={{minWidth: 'max-content'}}>
              {[
                { id: 'nearby', image: '/images/nearby.jpg'},
                { id: 'events', image: '/images/events.jpg'},
                { id: 'social', image: '/images/coffee.jpg'},
                { id: 'rides', image: '/images/car.jpg'},
                { id: 'study', image: '/images/studying.jpg'},
                { id: 'sports', image: '/images/playing.jpg'},
                { id: 'wallet', isWallet: true, icon: '💳'},
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    if (category.isWallet) {
                      clearBottomNav();
                      setShowWallet(true);
                    } else {
                      setSelectedCategory(category.id);
                    }
                  }}
                  className={`p-2 rounded-full transition-all transform hover:scale-105 flex-shrink-0 ${
                    category.isWallet
                      ? 'bg-gray-50 text-gray-600 hover:bg-pink-50'
                      : selectedCategory === category.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-110'
                      : 'bg-gray-50 text-gray-600 hover:bg-pink-50'
                  }`}
                >
                  {category.isWallet ? (
                    <div className="w-9 h-9 flex items-center justify-center">
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                  ) : (
                    <div className="w-9 h-9 flex items-center justify-center">
                      <img 
                        src={category.image}
                        alt={category.id}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modals - rendered inside phone container */}
        {showProfile && selectedProfile && (
          <ProfileView
            key={`profile-${selectedProfile.id}`}
            user={selectedProfile}
          />
        )}
        {showAvatar && <AvatarBuilder />}
        {showWallet && <WalletView />}
        {showChat && selectedProfile && <ChatView user={selectedProfile} />}
        {showTicket && selectedProfile && <TicketView user={selectedProfile} />}
      </div>
    </main>
  );
}