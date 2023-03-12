import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import parse from "node-html-parser";
import { Track } from "~/app/types";

export async function GET(request: NextRequest) {
  const errorResponse = NextResponse.json({
    error:
      "Given Spotify playlist does not exists or private! Please try again after making it public.",
  });
  const searchParams = new URLSearchParams(request.nextUrl.search);
  const playlistUrl = searchParams.get("playlistUrl");

  if (!playlistUrl) {
    return new NextResponse("Search params must have 'playlistUrl' property.");
  }

  const trackList: Track[] = [];

  try {
    const { data } = await axios.get(playlistUrl);

    const htmlElement = parse(data);

    const parentDiv = htmlElement.querySelector("div[data-testid='top-sentinel']")?.parentNode;

    if (parentDiv) {
      const trackElements = parentDiv.querySelectorAll("[data-testid='track-row']");

      trackElements.forEach((track) => {
        const artist = track
          .querySelectorAll('a[href^="/artist/"]')
          .map((element) => {
            return element.innerText;
          })
          .join(", ");

        const name = track?.querySelector("button")?.getAttribute("aria-label")?.split("track ")[1];

        if (name && artist) {
          trackList.push({ name, artist });
        }
      });
    }
  } catch {
    return errorResponse;
  }

  if (!trackList.length) {
    return errorResponse;
  }

  return NextResponse.json({ data: trackList });
}
