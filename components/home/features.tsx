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
import { Camera, Search, LineChart, Droplets } from "lucide-react";
import Image from "next/image";

const features = [
  {
    id: "smart-scheduling",
    icon: <Camera className="size-6" />, // Or <CalendarDays>
    title: "AI Smart Scheduling",
    description: "Automatically find the best image among all duplicates.",
    image: "/front.png", // Path to screenshot 1
  },
  {
    id: "intelligent-search",
    icon: <Search className="size-6" />,
    title: "Semantic Search",
    description: "Find past meetings and notes using natural language queries.",
    image: "/hero-2.png", // Path to screenshot 2
  },
  {
    id: "analytics",
    icon: <LineChart className="size-6" />,
    title: "Meeting Analytics",
    description: "Visualize team productivity and time allocation patterns.",
    image: "/images/cal-ai-3.png", // Path to screenshot 3
  },
  {
    id: "auto-notes",
    icon: <Droplets className="size-6" />, // Or <BotMessageSquare>
    title: "Automated Notes",
    description:
      "Generate summaries and action items instantly after every call.",
    image: "/images/cal-ai-4.png", // Path to screenshot 4
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
    }, 2000); // Changes every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="max-w-6xl mx-auto px-4 flex flex-col gap-20 py-20 font-satoshi">
      <motion.div
        className="max-w-2xl text-center mx-auto flex flex-col gap-4"
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

      <div className="flex flex-col md:flex-row gap-12 items-center min-h-[600px]">
        <div className="w-full md:w-1/2 flex justify-center relative">
          {/* The Container (Match the aspect ratio from your working component) */}
          <div className="relative w-[300px] aspect-[9/19]">
            {/* 1. The Frame (Set to z-20 and inset-0) */}
            <img
              src="/frame.png"
              alt="frame"
              className="absolute inset-0 z-20 w-full h-full object-contain pointer-events-none"
            />

            {/* 2. The Active Image (Matching the exact offsets of your working hero) */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeTab}
                src={features[activeTab].image}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 z-10 w-full h-[96%] mt-2.5 rounded-[2.5rem] object-contain"
                alt="Feature Screenshot"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Vertical Tabs */}
        <div
          className="w-full md:w-1/2 space-y-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {features.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => setActiveTab(index)}
              className={`relative w-full text-left p-6 transition-all duration-300 group outline-none rounded-[2rem] border-[1.5px] 
        ${activeTab === index ? "border-transparent" : "border-zinc-200"}`}
              /* ^ If not active, show a light gray border. If active, hide it so the pill takes over. */
            >
              {/* The Active "Box" Style */}
              <AnimatePresence>
                {activeTab === index && (
                  <motion.div
                    layoutId="active-pill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#F3F4F6] border-[1.5px] border-black rounded-[2rem] shadow-sm z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </AnimatePresence>

              {/* Content Layer - Ensure z-10 so it stays above the pill */}
              <div className="relative z-10 flex gap-4 items-start">
                <div
                  className={`mt-1 p-1 transition-colors ${activeTab === index ? "text-black" : "text-zinc-400"}`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3
                    className={`font-bold text-xl mb-2 transition-colors ${activeTab === index ? "text-black" : "text-zinc-500"}`}
                  >
                    {feature.title}
                  </h3>
                  <motion.p
                    animate={{ opacity: activeTab === index ? 1 : 0.7 }}
                    className={`text-base leading-relaxed ${activeTab === index ? "text-zinc-800" : "text-zinc-400"}`}
                  >
                    {feature.description}
                  </motion.p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
