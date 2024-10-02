"use client";
import { LoadingSpinner } from "@/components/Spinner";
import { useLoading } from "@/hooks/useLoading";
import { useState } from "react";

export default function Home() {
  const { loading, toggleLoading } = useLoading();
  const [url, setUrl] = useState("");
  const [collect, setCollect] = useState("");

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-10">
          Describe and retrieve data within an image
        </h1>

        <div className="w-full mb-8">
          <p className="text-left font-bold mb-2">Image URL </p>
          <input
            className="w-full rounded-md border-2 border-primary py-2 px-2"
            inputMode="url"
            placeholder="Enter image URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="w-full">
          <p className="text-left font-bold mb-2">
            Data to extract{" "}
            <span className="font-medium">
              (separate with commas to add multiple items)
            </span>
          </p>
          <textarea
            value={collect}
            onChange={(e) => setCollect(e.target.value)}
            rows={4}
            className="w-full rounded-md py-2 px-2  border-2 border-primary shadow-sm focus:border-black focus:ring-black"
            placeholder={"e.g. First name, last name"}
          />
        </div>

        {!loading && (
          <button className="bg-primary rounded-xl text-white hover:text-primary font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-white hover:border-primary border-2 w-full">
            Extract data &rarr;
          </button>
        )}

        {loading && (
          <button
            className="bg-primary rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 flex hover:bg-black/80 w-full items-center justify-center cursor-pointer"
            disabled
          >
            <LoadingSpinner />
          </button>
        )}
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://jigsawstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <b>JigsawStack</b>
        </a>
      </footer>
    </div>
  );
}
