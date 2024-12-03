// pages/index.js
import { useState } from 'react';
import { MessageCircle, X, DollarSign, Ticket } from 'lucide-react';
import Head from 'next/head';

export default function home() {
  const [selectedcategory, setselectedcategory] = useState(null);
  const [selectedprofile, setselectedprofile] = useState(null);
  const [currentphotoindex, setcurrentphotoindex] = useState(0);
  const [showchat, setshowchat] = useState(false);

  const profiles = {
    study: [
      {
        id: 1,
        name: "Jhon",
        age: 20,
        year: "2nd year",
        major: "Biology",
        photos: ["/images/users/Jhon/1.jpg", "/images/users/Jhon/2.jpg"],
        description: "at math learning center rn! need help with stats 260 🥲",
        location: "science library - 2nd floor",
        position: { top: "30%", left: "40%" }
      },
      {
        id: 2,
        name: "Mara",
        age: 21,
        year: "3rd year",
        major: "Engineering",
        photos: ["/images/users/Mara/1.jpg", "/images/users/Mara/2.jpg"],
        description: "can help with calculus integration, at library till 4 ! experienced tutor 📚😌",
        location: "library second floor",
        position: { top: "45%", left: "60%" },
        price: 10,
        service: "math tutoring"
      }
    ],
    sports: [
      {
        id: 3,
        name: "Sarah",
        age: 19,
        year: "2nd year",
        major: "Biology",
        photos: ["/images/users/Sarah/1.jpg", "/images/users/Sarah/2.jpg"],
        description: "getting bored! need someone to play squash at gym 🏸",
        location: "university gym",
        position: { top: "35%", left: "45%" }
      },
      {
        id: 4,
        name: "Mike",
        age: 23,
        year: "4th year",
        major: "sports science",
        photos: ["/images/users/Mike/1.jpg", "/images/users/Mike/2.jpg"],
        description: "certified trainer! can teach gym basics and proper form 💪 at 4 ",
        location: "fitness center",
        position: { top: "55%", left: "40%" },
        price: 10,
        service: "gym training"
      }
    ],
    rides: [
      {
        id: 5,
        name: "Lisa",
        age: 22,
        year: "3rd year",
        major: "business",
        photos: ["/images/users/Lisa/1.jpg", "/images/users/Lisa/2.jpg"],
        description: "going for grocery shopping to thrifty at 5 ! can give rides 🛒",
        location: "north parking lot 3",
        position: { top: "25%", left: "55%" },
        price: 5,
        service: "ride share"
      },
      {
        id: 6,
        name: "Tom",
        age: 20,
        year: "2nd year",
        major: "Business",
        photos: ["/images/users/Tom/1.jpg", "/images/users/Tom/2.jpg"],
        description: "heading to downtown Tim's for coffee ! anyone want to share ride and have a casual talk 😌",
        location: "main parking",
        position: { top: "65%", left: "50%" }
      }
    ],
    events: [
      {
        id: 7,
        name: " Taylor Swift Club ",
        //age: "20, 21",
        //year: "3rd year",
        //major: "",
        photos: ["/images/users/Event/1.jpg", "/images/users/Event/2.jpg"],
        description: "“Join us for an unforgettable evening celebrating Taylor Swift’s iconic music!  ",
        location: "student center - main hall",
        position: { top: "40%", left: "55%" },
        price: 10,
        service: "movie ticket",
        ticketsLeft: 15,
        eventDate: "today, 8 PM",
        isEvent: true
      }
    ],
    social: [
      {
        id: 8,
        name: "Jim",
        age: 21,
        year: "3rd year",
        major: "Business",
        photos: ["/images/users/Jim/1.jpg", "/images/users/Jim/2.jpg"],
        description: "A friendly university student hoping for a casual 5-10 minute coffee chat to unwind, share laughs, and connect with like-minded peers over a warm brew.",
        location: "Campus Starbucks",
        position: { top: "60%", left: "45%" }
      },
      {
        id: 9,
        name: "Elly",
        age: 20,
        year: "2nd year",
        major: "English",
        photos: ["/images/users/Elly/1.jpg", "/images/users/Elly/2.jpg"],
        description: "A cheerful student looking to enjoy a quick 10-minute pizza break, savor good food, and strike up an engaging conversation in a relaxed dining setting.",
        location: "Cove dinning hall",
        position: { top: "40%", left: "65%" }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>campus social map</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="h-screen w-full max-w-2xl mx-auto relative overflow-hidden bg-gradient-to-b from-pink-50 to-white">
        <div className="h-[calc(100%-100px)] w-full relative">
          <img 
            src="/images/campus-map.jpg"
            alt="Campus Map"
            className="w-full h-full object-cover"
          />
          
          {selectedcategory && profiles[selectedcategory]?.map((profile) => (
            <div
              key={profile.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={profile.position}
              onClick={() => {
                setselectedprofile(profile);
                setcurrentphotoindex(0);
                setshowchat(false);
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-pink-400 rounded-full opacity-20 animate-ping" />
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
                  <img
                    src={profile.photos[0]}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-pink-500 rounded-full opacity-10 animate-ping" />
              <div className="absolute -inset-2 bg-pink-500 rounded-full opacity-20" />
              <div className="relative w-4 h-4 bg-pink-500 rounded-full border-2 border-white shadow-lg" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-lg">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="bg-white rounded-full px-6 py-2 shadow-lg">
              <span className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                campus vibes ✨
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-around">
              {[
                { id: 'study', image: '/images/studying.jpg'},
                { id: 'sports', image: '/images/playing.jpg'},
                { id: 'rides', image: '/images/car.jpg'},
                { id: 'events', image: '/images/events.jpg'},
                { id: 'social', image: '/images/coffee.jpg'}
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setselectedcategory(category.id)}
                  className={`p-4 rounded-full transition-all transform hover:scale-105 ${
                    selectedcategory === category.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-110'
                      : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img 
                      src={category.image}
                      alt={category.id}
                      className="w-full h-full object-cover rounded-full transform scale-125"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {selectedprofile && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-sm w-full overflow-hidden">
              {!showchat ? (
                <>
                  <div className="relative h-96">
                    <img
                      src={selectedprofile.photos[currentphotoindex]}
                      alt={selectedprofile.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {currentphotoindex > 0 && (
                      <button
                        onClick={() => setcurrentphotoindex(0)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                    )}

                    {currentphotoindex < 1 && (
                      <button
                        onClick={() => setcurrentphotoindex(1)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {[0, 1].map((index) => (
                        <button
                          key={index}
                          onClick={() => setcurrentphotoindex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentphotoindex === index 
                              ? 'bg-white w-4' 
                              : 'bg-white/60'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => setselectedprofile(null)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="mb-1">
                      <h3 className="text-xl font-semibold">
                        {selectedprofile.name}, {selectedprofile.age}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {selectedprofile.year} • {selectedprofile.major}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                      <span>📍 {selectedprofile.location}</span>
                      {selectedprofile.price && !selectedprofile.isEvent && (
                        <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs">
                          ${selectedprofile.price} • {selectedprofile.service}
                        </span>
                      )}
                    </div>
                    {selectedprofile.isEvent && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                        <span>📅 {selectedprofile.eventDate}</span>
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                          {selectedprofile.ticketsLeft} tickets left
                        </span>
                      </div>
                    )}
                    <p className="text-gray-700 mb-4">{selectedprofile.description}</p>
                    <button
                      onClick={() => setshowchat(true)}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2"
                    >
                      {selectedprofile.isEvent ? (
                        <>
                          <Ticket className="h-5 w-5" />
                          buy ticket
                        </>
                      ) : (
                        <>
                          <MessageCircle className="h-5 w-5" />
                          connect
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-4 h-[600px] flex flex-col">
                  {selectedprofile.isEvent ? (
                    <>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">event ticket</h3>
                        <button
                          onClick={() => setselectedprofile(null)}
                          className="p-2 rounded-full hover:bg-gray-100"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                      
                      <div className="flex-1 mb-4">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-1">
                          <div className="bg-white rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div className="text-2xl font-bold text-purple-600">
                                {selectedprofile.name}
                              </div>
                              <div className="text-xl font-bold text-pink-500">
                                ${selectedprofile.price}
                              </div>
                            </div>
                            <div className="border-t border-b border-dashed border-gray-300 py-4 my-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Date</span>
                                <span className="font-semibold">{selectedprofile.eventDate}</span>
                              </div>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Location</span>
                                <span className="font-semibold">{selectedprofile.location}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Tickets Left</span>
                                <span className="font-semibold text-pink-600">{selectedprofile.ticketsLeft}</span>
                              </div>
                            </div>

                            <div className="relative">
                              <div className="absolute left-0 right-0 -top-2 h-4 flex justify-between px-2">
                                {[...Array(12)].map((_, i) => (
                                  <div key={i} className="w-2 h-2 rounded-full bg-gray-100" />
                                ))}
                              </div>
                              
                              <div className="pt-4 flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                  <div>Ticket #{Math.random().toString(36).substr(2, 8).toUpperCase()}</div>
                                  <div className="text-xs">This is a digital ticket</div>
                                </div>
                                <div className="h-16 w-16 opacity-50">
                                  <svg viewBox="0 0 24 24" className="w-full h-full">
                                    <path 
                                      fill="currentColor" 
                                      d="M4 4h16v16H4V4m2 2v12h12V6H6m2 2h8v2H8V8m0 3h8v2H8v-2m0 3h4v2H8v-2z"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-4 rounded-xl flex items-center justify-center gap-2 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        <Ticket className="h-6 w-6" />
                        Purchase Ticket - ${selectedprofile.price}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">chat with {selectedprofile.name}</h3>
                        <button
                          onClick={() => setselectedprofile(null)}
                          className="p-2 rounded-full hover:bg-gray-100"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg mb-4 p-4">
                        <p className="text-center text-gray-500">start chatting!</p>
                      </div>
                      {selectedprofile.price && (
                        <button className="w-full bg-green-500 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 mb-2">
                          <DollarSign className="h-5 w-5" />
                          pay ${selectedprofile.price} for {selectedprofile.service}
                        </button>
                      )}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="type a message..."
                          className="flex-1 border rounded-xl px-4 py-2"
                        />
                        <button className="bg-pink-500 text-white p-2 rounded-xl">
                          <MessageCircle className="h-6 w-6" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}