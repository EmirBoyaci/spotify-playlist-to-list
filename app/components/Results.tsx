import { TrackResponse } from "~/app/types";

interface ResultsProps {
  response: TrackResponse | undefined;
}

const Results = ({ response }: ResultsProps) => {
  return (
    <div className="flex flex-col">
      {response?.error && <div className="font-bold text-red-600">{response.error}</div>}
      {response?.data?.map((track, index) => {
        return (
          <span key={track.name + index} className="text-white">
            {index + 1}. {track.artist} — {track.name}
          </span>
        );
      })}
    </div>
  );
};

export default Results;
