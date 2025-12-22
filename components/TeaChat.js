import React, { useState, useEffect } from 'react';
import { X, Send, Smile, Heart } from 'lucide-react';

const TeaChat = ({ onClose, post }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const getRepliesBasedOnPost = (post) => {
    // Library related posts
    if (post.content.includes('lib')) {
      return [
        {
          id: 1,
          text: "someone ordered 7 coffees to their study spot 💀",
          likes: 12,
          time: "2m",
          alias: "coffee watcher ☕️",
          reactions: ["💀", "☕️"]
        },
        {
          id: 2,
          text: "the silent floor isn't so silent today",
          likes: 8,
          time: "4m",
          alias: "quiet seeker 🤫",
          reactions: ["🤫", "😭"]
        }
      ];
    }

    // Mystic Market posts
    if (post.content.includes('mystic')) {
      return [
        {
          id: 1,
          text: "that line is insane rn 😭",
          likes: 15,
          time: "1m",
          alias: "food critic 🍜",
          reactions: ["😭", "💀"]
        },
        {
          id: 2,
          text: "the prices keep going up fr",
          likes: 9,
          time: "3m",
          alias: "broke student 💸",
          reactions: ["💸", "😭"]
        }
      ];
    }

    // Professor related posts
    if (post.content.includes('prof')) {
      return [
        {
          id: 1,
          text: "half the class failed and they're surprised",
          likes: 18,
          time: "2m",
          alias: "grade hunter 📚",
          reactions: ["💀", "😭"]
        },
        {
          id: 2,
          text: "watched them spill coffee on their laptop",
          likes: 11,
          time: "5m",
          alias: "front row view 👀",
          reactions: ["💻", "☕️"]
        }
      ];
    }

    // Campus wildlife posts
    if (post.content.includes('deer') || post.content.includes('bunny')) {
      return [
        {
          id: 1,
          text: "campus wildlife living rent free fr",
          likes: 20,
          time: "1m",
          alias: "wildlife spotter 🦌",
          reactions: ["🐰", "😌"]
        },
        {
          id: 2,
          text: "they own this campus at this point",
          likes: 14,
          time: "4m",
          alias: "campus explorer 🌿",
          reactions: ["🦌", "👑"]
        }
      ];
    }

    return [
      {
        id: 1,
        text: "uvic things 💀",
        likes: 16,
        time: "2m",
        alias: "campus life 🎭",
        reactions: ["💯", "🎭"]
      },
      {
        id: 2,
        text: "this is normal for ring road tbh",
        likes: 10,
        time: "5m",
        alias: "ring runner 🏃",
        reactions: ["💀", "✨"]
      }
    ];
  };

  useEffect(() => {
    setMessages(getRepliesBasedOnPost(post));
  }, [post]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message,
        likes: 0,
        time: "now",
        alias: "anon 👤",
        reactions: []
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg h-[600px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-pink-400 to-purple-400 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Smile className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                campus tea 
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {post.category}
                </span>
              </h3>
              <p className="text-sm text-white/90">{messages.length} replies</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Original Post */}
          <div className="bg-white p-4 rounded-xl shadow-lg border-l-4 border-pink-400">
            <p className="text-gray-800 text-lg">{post?.content}</p>
          </div>

          {/* Replies */}
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                  {msg.alias}
                </span>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
              <p className="text-gray-800 mb-2">{msg.text}</p>
              <div className="flex items-center gap-2">
                <button className="text-xs bg-gray-50 hover:bg-pink-50 px-3 py-1.5 rounded-full 
                  flex items-center gap-1.5 transition-all">
                  <Heart className="h-3.5 w-3.5 text-pink-400" />
                  <span className="text-gray-600">{msg.likes}</span>
                </button>
                {msg.reactions.map((reaction, idx) => (
                  <span key={idx} className="text-sm">{reaction}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a reply..."
              className="flex-1 px-4 py-2 rounded-xl bg-gray-50 focus:bg-white 
                focus:ring-2 focus:ring-pink-400 transition-all text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              onClick={handleSendMessage}
              className="p-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white 
                rounded-xl hover:shadow-lg transition-all"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeaChat;