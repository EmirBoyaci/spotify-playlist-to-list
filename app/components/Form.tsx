"use client";
import axios from "axios";
import clsx from "clsx";
import { Inter } from "next/font/google";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { TrackResponse } from "~/app/types";

const inter = Inter({ subsets: ["latin"] });

interface FormProps {
  url: string;

  setUrl: Dispatch<SetStateAction<string>>;

  setResponse: Dispatch<SetStateAction<TrackResponse | undefined>>;
}

const Form = ({ url, setUrl, setResponse }: FormProps) => {
  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data: response } = await axios.get<TrackResponse>("api/getSpotifyList", {
      params: { playlistUrl: url },
    });

    setResponse(response);
  };

  return (
    <>
      <form className={clsx(inter.className, "flex space-x-2")} onSubmit={onFormSubmit}>
        <input
          type="url"
          className="w-96 rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="https://open.spotify.com/playlist/1xqlhV6SvRyWuafrSDJeGy?si=8b67b0168aa047d8"
          required={true}
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          pattern="https:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]+(\?si=[a-zA-Z0-9]+)?"
        />
        <button
          type="submit"
          className="rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          Generate List
        </button>
      </form>
    </>
  );
};

export default Form;