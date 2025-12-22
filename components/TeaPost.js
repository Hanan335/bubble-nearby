import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Share2, Star } from 'lucide-react';
import TeaChat from './TeaChat';

const TeaPost = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    // Share functionality
  };

  return (
    <>
      {showChat && <TeaChat post={post} onClose={() => setShowChat(false)} />}
      <div 
        className="bg-white rounded-xl shadow-lg p-4 mb-4 cursor-pointer hover:shadow-xl transition-all
          hover:scale-[1.02] border-l-4 border-transparent hover:border-pink-400"
        onClick={() => setShowChat(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all
              ${isHovered ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white' : 
              'bg-pink-100 text-pink-600'}`}
            >
              {post.category}
            </span>
            <span className="text-gray-400 text-sm">{post.time}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleSave}
              className={`p-2 rounded-full transition-all hover:scale-110
                ${isSaved ? 'bg-pink-50 text-pink-500' : 'hover:bg-gray-50 text-gray-400'}`}
            >
              <Star className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <p className="text-gray-800 text-lg mb-4">{post.content}</p>
        
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-sm transition-all
                ${isLiked ? 'text-pink-500' : 'text-gray-500 hover:text-pink-500'}`}
            >
              <Heart className={`h-5 w-5 transition-transform hover:scale-125
                ${isLiked ? 'fill-pink-500 animate-ping' : ''}`} />
              <span className="font-medium">{likes}</span>
            </button>
            <button 
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-pink-500 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                setShowChat(true);
              }}
            >
              <MessageCircle className="h-5 w-5 hover:scale-110 transition-transform" />
              <span className="font-medium">{post.comments}</span>
            </button>
          </div>
          
          <button 
            onClick={handleShare}
            className="text-sm text-gray-500 hover:text-pink-500 transition-all
              p-2 hover:bg-pink-50 rounded-full"
          >
            <Share2 className="h-5 w-5 hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </>
  );
};

// Example posts to use with this component
const examplePosts = [
  {
    id: 1,
    category: "no way 👀",
    content: "someone's sleeping in every single lib cubicle rn fr fr",
    likes: 234,
    comments: 45,
    time: "rn"
  },
  {
    id: 2,
    category: "caught in 4k 📸",
    content: "quad raccoons throwing hands w the deer at sunset no cap",
    likes: 567,
    comments: 89,
    time: "2min"
  },
  {
    id: 3,
    category: "UVic tea ☕️",
    content: "who brought their gaming setup to mystic market and why is it giving main character energy",
    likes: 421,
    comments: 67,
    time: "5min"
  },
  {
    id: 4,
    category: "help? 💀",
    content: "someone's doing a full photoshoot with the bunnies outside ECS i'm living",
    likes: 876,
    comments: 123,
    time: "10min"
  }
];

export default TeaPost;