"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Form from "~/app/components/Form";
import Results from "~/app/components/Results";
import { TrackResponse } from "~/app/types";

export default function Home() {
  const searchParams = useSearchParams();
  const playlistUrl = searchParams.get("playlistUrl");
  const [copied, setCopied] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(
    playlistUrl ? `https://open.spotify.com/playlist/${playlistUrl}` : ""
  );
  const [response, setResponse] = useState<TrackResponse>();

  return (
    <main className="flex w-full flex-col items-center space-y-2">
      <Form url={url} setUrl={setUrl} setResponse={setResponse} />
      {response?.data ? (
        <button
          className="w-1/6 min-w-fit rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onClick={() => {
            const text =
              response?.data
                ?.map((track, index) => {
                  return `${index + 1}. ${track.artist} — ${track.name}`;
                })
                .join("\n") ?? "";
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 5000);
          }}
        >
          {copied ? (
            <>
              <svg
                fill="none"
                role="status"
                stroke="currentColor"
                className="mr-3 inline h-4 w-4"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
              </svg>
              Copied
            </>
          ) : (
            "Copy"
          )}
        </button>
      ) : null}
      <Results response={response} />
    </main>
  );
}
