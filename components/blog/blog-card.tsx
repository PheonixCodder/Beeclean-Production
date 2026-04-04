import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface BlogCardProps {
  url: string;
  title: string;
  description: string;
  date: string;
  thumbnail?: string;
}

export function BlogCard({
  url,
  title,
  description,
  date,
  thumbnail,
}: BlogCardProps) {
  return (
    <Link href={url} className="group block">
      <Card className="rounded-3xl pt-0 border-none shadow-apple overflow-hidden bg-white transition-all duration-300 hover:shadow-apple-hover hover:-translate-y-1">
        {thumbnail && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <CardContent className="p-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-card-foreground line-clamp-2 underline-offset-4 transition-all">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {description}
            </p>
            <time className="block text-sm font-medium text-muted-foreground mt-2">
              {date}
            </time>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
