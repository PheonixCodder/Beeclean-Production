import prisma from "@/lib/prisma";
import { Mail } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardNewsletterPage() {
  const subscribers = await prisma.newsletter.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 shadow-sm mb-8">
              <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Audience Growth
              </span>
            </div>
            <h1 className="text-6xl md:text-6xl font-black tracking-tight text-[#1a1a1a] leading-[1.1] font-satoshi">
              Newsletters
            </h1>
            <p className="font-semibold text-xl text-foreground/85 mt-6 leading-relaxed max-w-xl">
              Monitor and manage your Beeclean Journal subscribers.
            </p>
          </div>
          <div className="bg-zinc-50 px-8 py-6 rounded-3xl border border-zinc-100">
             <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Total Subscribers</p>
             <p className="text-4xl font-black">{subscribers.length}</p>
          </div>
        </div>
      </div>

      {/* Subscriber List */}
      <div className="space-y-8">
        {subscribers.length === 0 ? (
          <div className="text-center py-40 bg-white rounded-[3rem] border border-zinc-100 shadow-sm">
            <div className="w-20 h-20 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Mail className="w-8 h-8 text-zinc-200" />
            </div>
            <p className="text-black font-black uppercase tracking-widest text-xs mb-3">
              No subscribers yet
            </p>
            <p className="text-zinc-400 font-medium text-xl leading-tight tracking-tight mb-12 max-w-xs mx-auto">
              Your subscriber list is currently empty. Incoming signups will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] border border-zinc-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50/50 border-b border-zinc-100">
                    <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Email Address
                    </th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Status
                    </th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Subscribed On
                    </th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">
                      ID
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {subscribers.map((subscriber) => (
                    <tr
                      key={subscriber.id}
                      className="hover:bg-zinc-50/50 transition-colors duration-300"
                    >
                      <td className="p-8">
                        <span className="font-bold text-lg text-black">
                          {subscriber.email}
                        </span>
                      </td>
                      <td className="p-8">
                        {subscriber.isActive ? (
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                            Unsubscribed
                          </span>
                        )}
                      </td>
                      <td className="p-8 text-zinc-500 font-medium">
                        {subscriber.createdAt.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-8 text-right font-mono text-xs text-zinc-300">
                        {subscriber.id.slice(-6)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
