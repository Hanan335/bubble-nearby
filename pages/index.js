import React, { useState, useEffect } from 'react';
import { MessageCircle, X, DollarSign, Ticket, Heart, Phone, Video, Send, Plus, Sparkles } from 'lucide-react';

const BunnyChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('main');
  const [isBouncing, setIsBouncing] = useState(false);
  const [breathCount, setBreathCount] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [auroraMode, setAuroraMode] = useState('wave');

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
    { id: 'find', text: 'find someone 💫', icon: '✨' }
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
            <button onClick={() => setActiveSection('calm')} className="text-sm text-gray-500 hover:text-pink-500">
              ← back
            </button>
            <div className="relative h-48 flex items-center justify-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
              {isBreathing ? (
                <>
                  <div className={`absolute transition-all duration-[4000ms] ease-in-out rounded-full 
                    bg-gradient-to-r from-pink-300/40 to-purple-300/40 backdrop-blur-sm
                    ${breathCount % 2 === 0 ? 'scale-100 opacity-50' : 'scale-150 opacity-80'}`}
                    style={{ width: '100px', height: '100px' }}
                  />
                  <div className="absolute text-gray-500 text-sm">
                    {breathCount % 2 === 0 ? 'breathe in... 🧘‍♀️' : 'breathe out... 😌'}
                  </div>
                </>
              ) : (
                <button
                  onClick={handleBreathing}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 
                    text-white text-sm hover:shadow-lg transition-all"
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
            <button onClick={() => setActiveSection('calm')} className="text-sm text-gray-500 hover:text-pink-500">
              ← back
            </button>
            <div 
              className="h-48 relative overflow-hidden bg-gradient-to-b from-purple-50 to-pink-50 rounded-xl cursor-pointer"
              onClick={handleBubbles}
            >
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
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
                    background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.3), rgba(167, 139, 250, 0.3))'
                  }}
                />
              ))}
            </div>
          </div>
        );

      case 'aurora':
        return (
          <div className="space-y-3">
            <button onClick={() => setActiveSection('calm')} className="text-sm text-gray-500 hover:text-pink-500">
              ← back
            </button>
            <div className="h-48 relative bg-gray-900 rounded-xl overflow-hidden">
              <button
                onClick={() => setAuroraMode(prev => prev === 'wave' ? 'pulse' : 'wave')}
                className="absolute top-2 right-2 px-3 py-1 rounded-full bg-white/10 text-white/70 
                  hover:bg-white/20 text-xs z-10"
              >
                switch mode ✨
              </button>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-full h-full ${
                  auroraMode === 'wave' 
                    ? 'animate-auroraWave' 
                    : 'animate-auroraPulse'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 via-pink-500/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 via-purple-500/10 to-transparent" />
                </div>
              </div>
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
    <div className="fixed bottom-16 right-4 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl">
          <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-3 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src="/images/bunny.png" 
                alt="Bunny"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white">I am your Bunny 🩷❤️💜</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-3 max-h-96 overflow-y-auto">
            {activeSection === 'main' ? (
              <div className="space-y-2">
                {mainOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setActiveSection(opt.id)}
                    className="w-full p-3 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50
                      hover:from-pink-100 hover:to-purple-100 transition-all flex items-center gap-2"
                  >
                    <span className="text-xl">{opt.icon}</span>
                    <span>{opt.text}</span>
                  </button>
                ))}
              </div>
            ) : ['breathe', 'bubbles', 'aurora'].includes(activeSection) ? (
              renderCalming()
            ) : (
              <div className="space-y-3">
                <button 
                  onClick={() => setActiveSection('main')}
                  className="text-sm text-gray-500 hover:text-pink-500"
                >
                  ← back
                </button>
                
                <div className="space-y-2">
                  {sections[activeSection]?.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSectionOption(opt)}
                      className="w-full p-3 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50
                        hover:from-pink-100 hover:to-purple-100 transition-all text-left"
                    >
                      {typeof opt === 'object' ? opt.text : opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="type something..."
                className="flex-1 px-3 py-2 rounded-xl bg-gray-50 focus:bg-white 
                  focus:ring-2 focus:ring-pink-400 transition-all text-sm"
              />
              <button className="p-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white 
                rounded-xl hover:shadow-lg transition-all">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg hover:shadow-xl 
          transition-all hover:scale-110 ${isBouncing ? 'animate-bounce' : ''}`}
      >
        <div className="relative">
          <img 
            src="/images/bunny.png" 
            alt="Bunny"
            className="w-12 h-12 rounded-full"
          />
          <div className="absolute -right-1 -bottom-1 w-5 h-5 bg-gradient-to-r from-pink-400 to-purple-400 
            rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
        </div>
      </button>
    </div>
  );
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('nearby');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showFullImage, setShowFullImage] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showTicket, setShowTicket] = useState(false);

  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  const profiles = {
    nearby: [
      {
        id: 10,
        name: "John",
        age: 20,
        gender: "boy",
        year: "2nd year",
        major: "Computer Science",
        photos: ["/images/users/John/1.jpg", "/images/users/John/2.jpg"],
        location: "science library",
        status: 'waiting',
        isNearby: true
      },
      {
        id: 11,
        name: "Mara",
        age: 21,
        gender: "girl",
        year: "3rd year",
        major: "Business",
        photos: ["/images/users/Mara/1.jpg", "/images/users/Mara/2.jpg"],
        location: "student center",
        status: 'connected',
        isNearby: true
      },
      {
        id: 12,
        name: "Sarah",
        age: 19,
        gender: "girl",
        year: "2nd year",
        major: "Psychology",
        photos: ["/images/users/Sarah/1.jpg", "/images/users/Sarah/2.jpg"],
        location: "campus cafe",
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
        mood: "hoping for a casual 5-10 minute coffee chat to unwind 😌",
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
      
      // Simulate response
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
    const cardConnected = user.status === 'connected';
    
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-3 border border-gray-100 hover:shadow-xl transition-all max-w-xs mx-auto">
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

        <div className={`relative h-96 ${cardConnected ? 'bg-gradient-to-br from-pink-100 via-purple-100 to-pink-100' : 'bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50'}`}>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 space-y-2 z-10">
            <div className={`w-2 h-2 rounded-full ${cardConnected ? 'bg-gray-300' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse'}`} />
            <div className={`w-2 h-2 rounded-full ${cardConnected ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)] animate-pulse' : 'bg-gray-300'}`} />
          </div>

          <div className="absolute inset-1 rounded-2xl overflow-hidden shadow-2xl">
  <img
  src={`/images/snap-emojis/${user.name?.toLowerCase() || 'default'}.png`}
  alt="Snap"
  className="w-full h-full object-cover transition-all"
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
              setSelectedProfile(user);
              setShowProfile(true);
              setIsConnected(false);
              setCurrentPhotoIndex(0);
              setShowFullImage(false);
              setShowChat(false);
              setChatMessages([]);
            }}
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg"
          >
            view profile
          </button>
        </div>
      </div>
    );
  };

  const ChatView = ({ user }) => (
    <div className="absolute inset-0 bg-white z-50 flex flex-col max-w-sm mx-auto">
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

  const ProfileView = ({ user }) => {
    const getGenderEmoji = (gender) => {
      if (gender === 'boy') return '👨';
      if (gender === 'girl') return '👩';
      return '🎭';
    };

    return (
      <div className="absolute inset-0 bg-black z-50 overflow-y-auto max-w-sm mx-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between p-3 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-xl border-b border-white/10">
          <button onClick={() => setShowProfile(false)} className="text-white">
            <X className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-purple-400 to-pink-500 rounded-full flex items-center justify-center text-2xl border-2 border-pink-300 shadow-lg shadow-pink-500/50">
            {getGenderEmoji(user.gender)}
          </div>
          <div className="w-5" />
        </div>

        <div className="px-4 pt-4 pb-6">
          <div className="text-center mb-4">
            <p className="text-white font-bold text-xl mb-1">{user.name}{user.age ? `, ${user.age}` : ''}</p>
            {user.mood && <p className="text-pink-400 italic mb-1">"{user.mood}"</p>}
            {user.year && user.major && (
              <p className="text-gray-400 text-sm">{user.year} • {user.major}</p>
            )}
            <p className="text-gray-400 text-sm mt-1">📍 {user.location}</p>
          </div>

          <div className="mb-3 bg-gradient-to-br from-white/5 via-pink-500/10 to-purple-500/10 backdrop-blur-2xl rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl animate-pulse">
                🎵
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">listening now</p>
                <p className="text-pink-400 text-xs">indie / bedroom pop • on repeat</p>
              </div>
            </div>
          </div>

          <div className="relative mb-4">
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

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gradient-to-br from-white/5 via-green-500/10 to-emerald-500/10 backdrop-blur-2xl rounded-2xl p-3 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-lg">
                  🏃
                </div>
                <p className="text-white font-semibold text-xs">ran today</p>
              </div>
              <p className="text-green-400 text-xs">5.2 km • 28 min</p>
            </div>

            <div className="bg-gradient-to-br from-white/5 via-purple-500/10 to-pink-500/10 backdrop-blur-2xl rounded-2xl p-3 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-lg">
                  ✨
                </div>
                <p className="text-white font-semibold text-xs">vibe</p>
              </div>
              <p className="text-purple-400 text-xs">chill • friendly</p>
            </div>
          </div>

          <div className="mb-3 bg-gradient-to-br from-white/5 via-blue-500/10 to-cyan-500/10 backdrop-blur-2xl rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center text-2xl">
                ⚡
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">last active</p>
                <p className="text-blue-400 text-xs">online now • campus library</p>
              </div>
            </div>
          </div>

          <div className="mb-3 bg-gradient-to-br from-white/5 via-orange-500/10 to-amber-500/10 backdrop-blur-2xl rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center text-2xl">
                🔥
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">streak</p>
                <p className="text-orange-400 text-xs">12 days connecting • keep it going!</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {user.isEvent ? (
              <button 
                onClick={() => setShowChat(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                <Ticket className="w-5 h-5" />
                buy ticket - {user.price}
              </button>
            ) : user.isNearby ? (
              <button 
                onClick={() => setShowChat(true)}
                className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg animate-pulse hover:scale-105 transition-all"
              >
                <span className="text-2xl animate-bounce">☕</span>
                invite to coffee
              </button>
            ) : !isConnected ? (
              <button 
                onClick={() => setIsConnected(true)}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                <Heart className="w-5 h-5" />
                connect
              </button>
            ) : (
              <button 
                onClick={() => setShowChat(true)}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg animate-pulse hover:scale-105 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                start chat
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (showChat && selectedProfile) return <ChatView user={selectedProfile} />;
  if (showProfile && selectedProfile) return <ProfileView user={selectedProfile} />;

  return (
    <main className="h-screen w-full max-w-2xl mx-auto relative overflow-hidden bg-white">
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="h-[calc(100%-80px)] w-full relative overflow-y-auto p-4">
        {selectedCategory && (
          <div className="space-y-3">
            {profiles[selectedCategory]?.map((profile) => (
              <MoodCard key={profile.id} user={profile} />
            ))}
          </div>
        )}

        {!selectedCategory && (
          <div className="flex items-center justify-center h-full text-gray-400 text-center">
            <div>
              <p className="text-4xl mb-3">👇</p>
              <p>Select a category below to see who's around</p>
            </div>
          </div>
        )}
      </div>

      <BunnyChat />

      <div className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-lg">
  <div className="p-5 overflow-x-auto scrollbar-hide min-h-[90px]">

          <div className="flex gap-2" style={{minWidth: 'max-content'}}>
            {[
              { id: 'nearby', image: '/images/nearby.jpg'},
              { id: 'events', image: '/images/events.jpg'},
              { id: 'social', image: '/images/coffee.jpg'},
              { id: 'rides', image: '/images/car.jpg'},
              { id: 'study', image: '/images/studying.jpg'},
              { id: 'sports', image: '/images/playing.jpg'},
              
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 rounded-full transition-all transform hover:scale-105 flex-shrink-0 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-110'
                    : 'bg-gray-50 text-gray-600'
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <img 
                    src={category.image}
                    alt={category.id}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}