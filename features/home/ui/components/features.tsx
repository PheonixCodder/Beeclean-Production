// import React from "react";
// import { Card, CardContent } from "../ui/card";
// import { ChevronRight, Search } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// const Features = () => {
//   return (
//     <div className="flex flex-col pt-30 items-center font-satoshi">
//       <div className="max-w-xl px-4 mx-auto gap-4 items-center justify-center flex flex-col">
//         <h4 className="text-4xl font-black">Smarter tools for your Phone</h4>
//         <p className="text-[16px] max-w-md text-center text-foreground/80 font-[550]">
//           Track. Plan. Scan. Repeat. Your journey gets easier with AI features
//           that think ahead, so you don’t have to.
//         </p>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-5xl mx-auto">
//         {/* Card 1: Images Cleaned */}
//         <Card className="rounded-3xl border-none shadow-sm overflow-hidden bg-[#F6F6F6]">
//           <CardContent className="p-8 space-y-8">
//             <div className="bg-white rounded-3xl p-8 shadow-inner border border-gray-100 relative">
//               <div className="flex justify-between items-start mb-2">
//                 <span className="text-gray-400 text-sm font-medium">
//                   Images Cleaned
//                 </span>
//                 <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
//                   4 GB Cleaned 🎉
//                 </span>
//               </div>
//               <div className="text-4xl font-bold">
//                 <span className="text-yellow-400">1,802</span>
//                 <span className="text-gray-200 ml-1">/ 2000</span>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <h3 className="text-xl font-bold text-gray-800">
//                 Track your Storage
//               </h3>
//               <p className="text-gray-400 leading-relaxed">
//                 Stay consistent with phone cleaning that show how your phone
//                 evolve.
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Card 2: Videos Cleaned */}
//         <Card className="rounded-3xl border-none shadow-sm overflow-hidden bg-[#F6F6F6]">
//           <CardContent className="p-8 space-y-8">
//             <div className="bg-white rounded-3xl p-8 shadow-inner border border-gray-100">
//               <div className="flex justify-between items-start mb-2">
//                 <span className="text-gray-400 text-sm font-medium">
//                   Videos Cleaned
//                 </span>
//                 <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
//                   4 GB Cleaned 🎉
//                 </span>
//               </div>
//               <div className="text-4xl font-bold">
//                 <span className="text-yellow-400">1,435</span>
//                 <span className="text-gray-200 ml-1">/ 2000</span>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <h3 className="text-xl font-bold text-gray-800">
//                 Create strategic storage plans
//               </h3>
//               <p className="text-gray-400 leading-relaxed">
//                 Build smarter daily meal plans that fit your goals and
//                 lifestyle.
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Card 3: Duplicate Contacts (Search UI) */}
//         <Card className="rounded-3xl border-none shadow-sm overflow-hidden bg-[#F6F6F6]">
//           <CardContent className="p-8 space-y-8">
//             <div className="bg-white rounded-3xl p-8 shadow-inner border border-gray-100 min-h-[180px] flex flex-col">
//               <span className="text-gray-600 text-sm font-medium mb-4">
//                 Search Duplicate Contacts
//               </span>
//               <div className="relative mb-8">
//                 <input
//                   type="text"
//                   placeholder="Harry"
//                   className="w-full bg-gray-50 border-none rounded-lg py-2 px-4 text-sm focus:ring-0 placeholder:text-gray-400"
//                 />
//                 <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-300" />
//               </div>
//               <div className="flex flex-col  justify-center flex-grow opacity-70">
//                 <span className="text-gray-400 text-sm font-medium">
//                   <div className="flex items-center justify-between p-2 bg-white hover:bg-slate-50 cursor-pointer transition-colors group">
//                     <div className="flex items-center gap-4">
//                       {/* shadcn/ui Avatar */}
//                       <Avatar className="h-10 w-10">
//                         <AvatarImage src="/testmonial-2.webp" alt="Harry" />
//                         <AvatarFallback>H</AvatarFallback>
//                       </Avatar>

//                       {/* Text Content */}
//                       <div className="flex flex-col">
//                         <h3 className="text-md font-semibold text-slate-900 leading-tight">
//                           Harry
//                         </h3>
//                         <p className="text-xs text-slate-500 font-medium">
//                           12023330132
//                         </p>
//                       </div>
//                     </div>

//                     {/* Right Arrow Icon */}
//                     <ChevronRight className="h-6 w-6 text-slate-500 group-hover:text-slate-400 transition-colors" />
//                   </div>
//                   <div className="flex items-center justify-between p-2 bg-white hover:bg-slate-50 cursor-pointer transition-colors group">
//                     <div className="flex items-center gap-4">
//                       {/* shadcn/ui Avatar */}
//                       <Avatar className="h-10 w-10">
//                         <AvatarImage src="/testmonial-2.webp" alt="Harry" />
//                         <AvatarFallback>H</AvatarFallback>
//                       </Avatar>

//                       {/* Text Content */}
//                       <div className="flex flex-col">
//                         <h3 className="text-md font-semibold text-slate-900 leading-tight">
//                           Harry
//                         </h3>
//                         <p className="text-xs text-slate-500 font-medium">
//                           12023330132
//                         </p>
//                       </div>
//                     </div>

//                     {/* Right Arrow Icon */}
//                     <ChevronRight className="h-6 w-6 text-slate-500 group-hover:text-slate-400 transition-colors" />
//                   </div>
//                 </span>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <h3 className="text-xl font-bold text-gray-800">
//                 Track your duplicate contacts
//               </h3>
//               <p className="text-gray-400 leading-relaxed">
//                 A massive, verified food database so you can log any meal,
//                 anywhere, in seconds.
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Card 4: Cleaning Buddy (Image UI) */}
//         <Card className="rounded-3xl border-none shadow-sm overflow-hidden bg-[#F6F6F6]">
//           <CardContent className="p-8 space-y-8">
//             <div className="bg-white rounded-3xl p-4 shadow-inner border border-gray-100 flex justify-center items-center min-h-[180px]">
//               {/* Replace /api/placeholder/150/150 with your Bee Image asset */}
//               <img
//                 src="/beehero.png"
//                 alt="Cleaning Bee Buddy"
//                 className="w-62 h-62 object-contain"
//               />
//             </div>
//             <div className="space-y-2">
//               <h3 className="text-xl font-bold text-gray-800">
//                 Meet your Cleaning Buddy
//               </h3>
//               <p className="text-gray-400 leading-relaxed">
//                 Our Bee scans, tracks and cleans your storage, to keep your
//                 phone healthy.
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Features;

"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Users, Minimize, Mail } from "lucide-react";
import Image from "next/image";

const features = [
  {
    id: "ask-the-bee",
    icon: <MessageSquare className="size-6" />,
    title: "Ask the Bee AI",
    description: "Command your assistant to sweep out specific junk via our intuitive chat, instantly zapping duplicate photos.",
    image: "/Home.png", 
  },
  {
    id: "contacts-cleanup",
    icon: <Users className="size-6" />,
    title: "Smart Contacts Cleanup",
    description: "Merge duplicate contacts and effortlessly fix missing info, keeping your address book flawlessly organized.",
    image: "/Contact.png", 
  },
  {
    id: "file-compression",
    icon: <Minimize className="size-6" />,
    title: "File Compression",
    description: "Our Bee 'hugs' your large files to easily compress them into lightweight versions, freeing up gigabytes.",
    image: "/Compress.png", 
  },
  {
    id: "email-detox",
    icon: <Mail className="size-6" />,
    title: "Email Detox",
    description: "Sort cluttered inboxes into neat categories, instantly zapping newsletters and mass-deleting junk to end inbox anxiety.",
    image: "/Email.png", 
  },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % features.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative w-full py-32 bg-transparent font-satoshi overflow-hidden">
      {/* Background Polish */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
        className="max-w-2xl text-center mx-auto flex flex-col gap-4 mb-24"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        <h4 className="text-5xl font-black tracking-tight">
          What does Beeclean include?
        </h4>
        <p className="text-lg text-muted-foreground font-medium">
          Start free, go pro when you’re ready! No limits, no pressure.
        </p>
      </motion.div>

        <div className="flex flex-col lg:flex-row gap-20 items-center min-h-[700px]">
          <div className="w-full lg:w-1/2 flex justify-center relative">
            {/* The Container */}
            <div className="relative w-[320px] md:w-[360px] aspect-[9/19]">
              {/* Frame Shadow */}
              <div className="absolute inset-0 z-0 bg-black/5 blur-3xl scale-90 translate-y-10 rounded-[3rem]" />
              
              {/* 1. The Frame */}
              <img
                src="/frame.png"
                alt="frame"
                className="absolute inset-0 z-30 w-full h-full object-contain pointer-events-none drop-shadow-2xl"
              />

              {/* 2. The Active Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-10 w-full h-[97%] mt-3 rounded-[2.8rem] overflow-hidden"
                >
                  <img
                    src={features[activeTab].image}
                    className="w-[91.5%] h-full mt-0 ml-[16px] rounded-[2.8rem] object-cover"
                    alt="Feature Screenshot"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: Vertical Tabs */}
          <div
            className="w-full lg:w-1/2 space-y-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(index)}
                className={`relative w-full text-left p-8 transition-all duration-500 group outline-none rounded-[2rem] border border-transparent
                  ${activeTab === index ? "" : "hover:bg-zinc-50/50 hover:border-zinc-100"}`}
              >
                {/* The Active "Box" Style */}
                <AnimatePresence>
                  {activeTab === index && (
                    <motion.div
                      layoutId="active-pill"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white border border-zinc-200 rounded-[2rem] shadow-apple-hover z-0"
                      transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
                    />
                  )}
                </AnimatePresence>

                {/* Content Layer */}
                <div className="relative z-10 flex gap-6 items-start">
                  <div
                    className={`mt-1.5 p-3 rounded-xl transition-all duration-500
                      ${activeTab === index ? "bg-black text-white shadow-lg" : "bg-zinc-50 text-zinc-400"}`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3
                      className={`font-black text-2xl mb-2 transition-colors duration-500
                        ${activeTab === index ? "text-black" : "text-zinc-400 group-hover:text-zinc-600"}`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`text-lg font-medium tracking-tight leading-snug transition-colors duration-500
                        ${activeTab === index ? "text-zinc-500" : "text-zinc-400"}`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
