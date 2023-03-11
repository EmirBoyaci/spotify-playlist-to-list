export interface GenericResponse<T> {
  data?: T;

  error?: string;
}

export interface Track {
  name: string;

  artist: string;
}

export type TrackResponse = GenericResponse<Track[]>;
