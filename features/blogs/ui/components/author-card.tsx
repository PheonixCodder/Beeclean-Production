"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Author {
  name: string;
  position?: string;
  avatar: string;
}

interface AuthorCardProps {
  author: Author;
  className?: string;
}

export function AuthorCard({ author, className }: AuthorCardProps) {
  return (
    <Card className={`rounded-3xl border-none shadow-apple overflow-hidden bg-white ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 flex-shrink-0 rounded-full overflow-hidden bg-gray-100">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">
              {author.name}
            </h3>
            {author.position && (
              <p className="text-sm text-muted-foreground">
                {author.position}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
