"use client";
import { useState } from "react";
import Form from "~/app/components/Form";
import Results from "~/app/components/Results";
import { TrackResponse } from "~/app/types";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [response, setResponse] = useState<TrackResponse>();

  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-4">
      <Form url={url} setUrl={setUrl} setResponse={setResponse} />
      <Results response={response} />
      <button
        className="rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        onClick={() => {
          const text =
            response?.data
              ?.map((track, index) => {
                return `${index + 1}. ${track.artist} — ${track.name}`;
              })
              .join("\n") ?? "";
          navigator.clipboard.writeText(text);
        }}
      >
        Copy
      </button>
    </main>
  );
}
