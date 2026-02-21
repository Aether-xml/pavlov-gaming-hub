// components/home/VideoGrid.tsx

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import type { YouTubeVideo } from "@/types";
import { formatViewCount } from "@/lib/youtube";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface VideoGridProps {
  videos: YouTubeVideo[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  if (!videos || videos.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative px-6 md:px-12 py-32">
      {/* Section Header — Editoryal stil */}
      <div className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <ScrollReveal className="md:col-span-8" direction="left">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-8 h-[1px] bg-electric-purple/30" />
            <span className="font-mono text-fluid-xs tracking-[0.3em] text-electric-purple/50 uppercase">
              YouTube — @ytpavlov
            </span>
          </div>
          <h2 className="font-grotesk text-fluid-3xl font-light text-white/90 leading-tight">
            Son{" "}
            <span className="font-editorial italic text-electric-purple">
              Yayınlar
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal
          className="md:col-span-4 md:text-right"
          direction="right"
          delay={0.2}
        >
          <a
            href="https://youtube.com/@ytpavlov"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-fluid-xs tracking-[0.15em] text-white/30 hover:text-electric-purple transition-colors uppercase group"
          >
            Tüm Videoları Gör
            <span className="w-6 h-[1px] bg-current group-hover:w-10 transition-all" />
          </a>
        </ScrollReveal>
      </div>

      {/* Video Grid — Bento/Asimetrik Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        {/* Featured Video — Large */}
        {videos[0] && (
          <ScrollReveal className="md:col-span-7 md:row-span-2" delay={0.1}>
            <VideoCard video={videos[0]} featured />
          </ScrollReveal>
        )}

        {/* Video 2 — Right top */}
        {videos[1] && (
          <ScrollReveal className="md:col-span-5" direction="right" delay={0.2}>
            <VideoCard video={videos[1]} />
          </ScrollReveal>
        )}

        {/* Video 3 — Right bottom */}
        {videos[2] && (
          <ScrollReveal className="md:col-span-5" direction="right" delay={0.3}>
            <VideoCard video={videos[2]} />
          </ScrollReveal>
        )}

        {/* Video 4 — Full width bottom bar */}
        {videos[3] && (
          <ScrollReveal className="md:col-span-12" delay={0.4}>
            <VideoCardWide video={videos[3]} />
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}

function VideoCard({
  video,
  featured = false,
}: {
  video: YouTubeVideo;
  featured?: boolean;
}) {
  const timeAgo = formatDistanceToNow(new Date(video.publishedAt), {
    addSuffix: true,
    locale: tr,
  });

  return (
    <a
      href={`https://youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`video-card block group relative bg-surface-1 border border-white/[0.04] overflow-hidden ${
        featured ? "h-full min-h-[400px] md:min-h-[500px]" : "h-full min-h-[220px]"
      }`}
    >
      {/* Thumbnail */}
      <div className="absolute inset-0">
        {video.thumbnail.url.startsWith("/mock") ? (
          <div className="w-full h-full bg-gradient-to-br from-surface-2 to-surface-3 flex items-center justify-center">
            <span className="font-mono text-fluid-xs text-white/10">
              THUMBNAIL
            </span>
          </div>
        ) : (
          <img
            src={video.thumbnail.url}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />
      </div>

      {/* Duration badge */}
      {video.duration && (
        <div className="absolute top-4 right-4 z-10 font-mono text-[0.6rem] tracking-wider text-white/70 bg-void/80 backdrop-blur-sm px-2 py-1">
          {video.duration}
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
        <h3
          className={`font-grotesk font-medium text-white/90 leading-tight mb-3 group-hover:text-electric-purple transition-colors duration-300 ${
            featured ? "text-fluid-xl" : "text-fluid-base"
          }`}
        >
          {video.title}
        </h3>
        <div className="flex items-center gap-4 font-mono text-[0.6rem] tracking-[0.15em] text-white/30">
          <span>{timeAgo}</span>
          {video.viewCount && (
            <>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>{formatViewCount(video.viewCount)} görüntüleme</span>
            </>
          )}
        </div>

        {/* Animated line */}
        <div className="mt-4 w-full h-[1px] bg-white/[0.06] relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-0 bg-electric-purple/50 group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </div>
    </a>
  );
}

function VideoCardWide({ video }: { video: YouTubeVideo }) {
  const timeAgo = formatDistanceToNow(new Date(video.publishedAt), {
    addSuffix: true,
    locale: tr,
  });

  return (
    <a
      href={`https://youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col md:flex-row items-stretch border border-white/[0.04] bg-surface-1 overflow-hidden hover:border-electric-purple/10 transition-colors"
    >
      {/* Thumbnail — Left side */}
      <div className="relative md:w-72 h-44 md:h-auto overflow-hidden flex-shrink-0">
        {video.thumbnail.url.startsWith("/mock") ? (
          <div className="w-full h-full bg-gradient-to-br from-surface-2 to-surface-3 flex items-center justify-center">
            <span className="font-mono text-fluid-xs text-white/10">
              THUMBNAIL
            </span>
          </div>
        ) : (
          <img
            src={video.thumbnail.url}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-1/80 hidden md:block" />
      </div>

      {/* Content — Right side */}
      <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[0.55rem] tracking-[0.2em] text-electric-cyan/40 uppercase">
            Son Video
          </span>
          <span className="w-6 h-[1px] bg-electric-cyan/20" />
        </div>
        <h3 className="font-grotesk text-fluid-lg font-medium text-white/80 group-hover:text-white transition-colors mb-2">
          {video.title}
        </h3>
        <p className="font-grotesk text-fluid-sm text-white/20 mb-4 line-clamp-2">
          {video.description}
        </p>
        <div className="flex items-center gap-4 font-mono text-[0.6rem] tracking-[0.15em] text-white/20">
          <span>{timeAgo}</span>
          {video.viewCount && (
            <>
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span>{formatViewCount(video.viewCount)} görüntüleme</span>
            </>
          )}
          {video.duration && (
            <>
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span>{video.duration}</span>
            </>
          )}
        </div>
      </div>

      {/* Play icon hint */}
      <div className="hidden md:flex items-center justify-center px-8">
        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-electric-purple/40 group-hover:bg-electric-purple/10 transition-all duration-300">
          <span className="text-white/30 group-hover:text-electric-purple transition-colors text-lg ml-0.5">
            ▶
          </span>
        </div>
      </div>
    </a>
  );
}