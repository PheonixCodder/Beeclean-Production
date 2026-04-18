import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface BlogCardProps {
  url: string;
  title: string;
  description: string;
  date: string;
  thumbnail?: string;
  category?: string;
  readTime?: string;
  featured?: boolean;
  isTrending?: boolean;
  author?: {
    name?: string | null;
    avatar?: string | null;
  };
}

export function BlogCard({
  url,
  title,
  description,
  date,
  thumbnail,
  category = "Article",
  readTime,
  featured = false,
  isTrending = false,
  author,
}: BlogCardProps) {
  return (
    <Link href={url} className="group block h-full">
      <motion.article
        whileHover={{ y: -4 }}
        className="relative bg-white shadow-apple hover:shadow-apple-hover transition-all duration-300 flex flex-col h-full overflow-hidden rounded-3xl border border-zinc-100"
      >
        {/* ✨ IMAGE AREA */}
        {thumbnail && (
          <div className="relative h-64 overflow-hidden bg-zinc-50">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            {/* Category Badge - Clean Apple Style */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-black px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm z-10">
              {category}
            </div>
          </div>
        )}

        {/* ✨ CONTENT AREA */}
        <div className="p-7 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-4">
            {isTrending && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-zinc-100 px-2 py-0.5 rounded-full">
                Trending
              </span>
            )}
            {readTime && (
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 uppercase tracking-tight">
                <Clock className="w-3.5 h-3.5" />
                {readTime} MIN READ
              </span>
            )}
          </div>

          {/* TITLE - Clean & Strong */}
          <h3
            className={cn(
              "font-satoshi font-black leading-tight tracking-tight text-black mb-3 transition-colors duration-200",
              featured ? "text-2xl md:text-3xl" : "text-xl",
            )}
          >
            {title}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-zinc-600 font-medium leading-relaxed line-clamp-2 mb-6 text-sm">
            {description}
          </p>

          <div className="mt-auto pt-6 border-t border-zinc-50 flex items-center justify-between">
            {/* AUTHOR - Clean & Professional */}
            {author && (
              <div className="flex items-center gap-2.5">
                <Avatar className="w-8 h-8 rounded-full border border-zinc-100">
                  <AvatarImage src={author.avatar || ""} className="object-cover" />
                  <AvatarFallback className="bg-zinc-100 text-zinc-900 text-[10px] font-bold">
                    {author.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-black uppercase tracking-tight">
                    {author.name}
                  </span>
                  <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-tighter">
                    {date}
                  </span>
                </div>
              </div>
            )}

            {/* Read Button Arrow (Visual anchor) */}
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-50 group-hover:bg-black transition-all duration-300">
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="group-hover:text-white transition-colors text-black"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
