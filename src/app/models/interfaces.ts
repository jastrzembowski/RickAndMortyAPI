export interface Response {
  info: Info;
  results: Character;
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface FilterBy {
  name?: string;
  status?: ["alive" | "dead" | "unknown"];
  gender?: ["female" | "male" | "genderless" | "unknown"];
  species?: string;
  page?: number;
}
