// lib/youtube.ts

import { YouTubeVideo } from "@/types";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

interface YouTubeAPIResponse {
  items: Array<{
    id: { videoId?: string; kind: string } | string;
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      channelTitle: string;
      thumbnails: {
        high: { url: string; width: number; height: number };
        maxres?: { url: string; width: number; height: number };
      };
    };
    statistics?: {
      viewCount: string;
    };
    contentDetails?: {
      duration: string;
    };
  }>;
}

export async function getLatestVideos(count: number = 4): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    console.warn("YouTube API credentials missing, returning mock data");
    return getMockVideos(count);
  }

  try {
    // Step 1: Search for latest videos
    const searchUrl = new URL(`${YOUTUBE_API_BASE}/search`);
    searchUrl.searchParams.set("key", apiKey);
    searchUrl.searchParams.set("channelId", channelId);
    searchUrl.searchParams.set("part", "snippet");
    searchUrl.searchParams.set("order", "date");
    searchUrl.searchParams.set("maxResults", count.toString());
    searchUrl.searchParams.set("type", "video");

    const searchResponse = await fetch(searchUrl.toString(), {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!searchResponse.ok) {
      throw new Error(`YouTube API error: ${searchResponse.status}`);
    }

    const searchData: YouTubeAPIResponse = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return getMockVideos(count);
    }

    // Step 2: Get video statistics
    const videoIds = searchData.items
      .map((item) => (typeof item.id === "object" ? item.id.videoId : item.id))
      .filter(Boolean)
      .join(",");

    const statsUrl = new URL(`${YOUTUBE_API_BASE}/videos`);
    statsUrl.searchParams.set("key", apiKey);
    statsUrl.searchParams.set("id", videoIds);
    statsUrl.searchParams.set("part", "statistics,contentDetails");

    const statsResponse = await fetch(statsUrl.toString(), {
      next: { revalidate: 3600 },
    });

    const statsData: YouTubeAPIResponse = statsResponse.ok
      ? await statsResponse.json()
      : { items: [] };

    // Merge data
    const videos: YouTubeVideo[] = searchData.items.map((item, index) => {
      const videoId = typeof item.id === "object" ? item.id.videoId : item.id;
      const stats = statsData.items?.[index];

      return {
        id: videoId || `video-${index}`,
        title: decodeHTMLEntities(item.snippet.title),
        description: item.snippet.description.slice(0, 120),
        thumbnail: {
          url:
            item.snippet.thumbnails.maxres?.url ||
            item.snippet.thumbnails.high.url,
          width: item.snippet.thumbnails.maxres?.width || 1280,
          height: item.snippet.thumbnails.maxres?.height || 720,
        },
        publishedAt: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        viewCount: stats?.statistics?.viewCount,
        duration: stats?.contentDetails?.duration
          ? parseDuration(stats.contentDetails.duration)
          : undefined,
      };
    });

    return videos;
  } catch (error) {
    console.error("Failed to fetch YouTube videos:", error);
    return getMockVideos(count);
  }
}

function decodeHTMLEntities(text: string): string {
  const entities: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
  };
  return text.replace(
    /&(?:amp|lt|gt|quot|#39|apos);/g,
    (match) => entities[match] || match
  );
}

function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatViewCount(count: string | undefined): string {
  if (!count) return "";
  const num = parseInt(count);
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

function getMockVideos(count: number): YouTubeVideo[] {
  const mockVideos: YouTubeVideo[] = [
    {
      id: "mock-1",
      title: "PavRoyale — Season 4 Fragman",
      description: "Yeni sezon, yeni mekanikler, yeni haritalar. Hazır mısın?",
      thumbnail: { url: "/mock/thumb-1.jpg", width: 1280, height: 720 },
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      channelTitle: "Pavlov",
      viewCount: "142000",
      duration: "12:34",
    },
    {
      id: "mock-2",
      title: "Pavometry: İmkansız Level Speedrun",
      description:
        "Bu seviyeyi 47 saniyede bitirdim. Dünya rekoru olabilir...",
      thumbnail: { url: "/mock/thumb-2.jpg", width: 1280, height: 720 },
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      channelTitle: "Pavlov",
      viewCount: "89000",
      duration: "8:21",
    },
    {
      id: "mock-3",
      title: "Topluluk Turnuvası #12 Highlights",
      description: "En iyi anlar, en epik oyunlar. GG herkese!",
      thumbnail: { url: "/mock/thumb-3.jpg", width: 1280, height: 720 },
      publishedAt: new Date(Date.now() - 432000000).toISOString(),
      channelTitle: "Pavlov",
      viewCount: "203000",
      duration: "15:02",
    },
    {
      id: "mock-4",
      title: "Oyun Geliştirme Günlükleri #8",
      description: "Yeni fizik motoru, parçalanma sistemi ve daha fazlası.",
      thumbnail: { url: "/mock/thumb-4.jpg", width: 1280, height: 720 },
      publishedAt: new Date(Date.now() - 604800000).toISOString(),
      channelTitle: "Pavlov",
      viewCount: "67000",
      duration: "22:15",
    },
  ];
  return mockVideos.slice(0, count);
}