import React, { useState, useEffect } from 'react';
import { Sparkles, X, Send } from 'lucide-react';

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
    <div className="fixed bottom-20 right-18 z-50">
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

export default BunnyChat;
