"use client";
import Navbar from "@/component/Navbar";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type VideoData = {
  id: string;
  title: string;
  summary: string;
  uploader_id: string;
  genre: string;
  path: string;
  thumbnail_path: string;
  length: number;
  size: number;
  release_date: string;
  created_at: Date;
  updated_at: Date;
};

export default function Login() {
  const [videoData, setVideoData] = useState<VideoData>();
  const [suggestedVideos, setSuggestedVideos] = useState<VideoData[]>([]);
  const searchParams = useSearchParams().get("id");
  useEffect(() => {
    fetchVideos();
  }, [videoData]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/video/${searchParams}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      );
      setVideoData(response.data.data);
      const genre = JSON.parse(response.data.data.genre);
      const resp = await axios.post(
        "http://localhost:4000/video/search",
        { genre: genre[0], limit: 3 },
        { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
      );
      let suggestedVideos: VideoData[] = resp.data.data;
      suggestedVideos = suggestedVideos.filter(
        (video) => video.id !== searchParams
      );
      setSuggestedVideos(suggestedVideos);
    } catch (error) {
      console.log(error);
    }
  };

  return videoData ? (
    <div className="m-4">
      <Navbar />
      <div className="flex mx-4">
        <div>
          <video
            src={`http://localhost:4000/video/${searchParams}/play`}
            width={1120}
            height={630}
            autoPlay
            controls
          />
          <p className="text-3xl tracking-wide font-bold mt-2">
            {videoData.title}
          </p>
          <p className="text-md tracking-wide font-medium mt-2 text-zinc-400">
            {videoData.summary}
          </p>
        </div>
        <div className="flex flex-col mx-4">
          {suggestedVideos.length > 0 && (
            <>
              <p className="text-xl font-bold mb-4 mx-6 ">Suggested Videos</p>
              {suggestedVideos.map((video, index) => (
                <div
                  key={index}
                  className="mx-6 mb-4 shadow rounded-lg shadow-zinc-700 hover:cursor-pointer hover:scale-105 transition hover:shadow-zinc-800 hover:shadow-lg"
                >
                  <Link
                    href={{
                      pathname: "/video",
                      query: {
                        id: video.id,
                      },
                    }}
                    key={video.id}
                    className="flex flex-1 relative rounded-lg"
                  >
                    <Image
                      src={video.thumbnail_path}
                      height={135}
                      width={240}
                      className="rounded-lg"
                      alt={video.title}
                      style={{ height: 135, width: 240 }}
                    />
                    <h2 className="bg-gradient-to-t from-[#00000085] text-lg font-bold tracking-wide pt-2 px-2 absolute bottom-0 w-full rounded-b-lg">
                      {video.title}
                    </h2>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <>
      <Navbar />
      <p>No such Video</p>
    </>
  );
}
