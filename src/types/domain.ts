export interface User {
  name?: string;
  email: string;
  username: string;
  password: string;
  status?: string;
}

export interface Event {
  name: string;
  description?: string;
  interestedGuilds: number[];
  interestedGuildNames: string[];
}

export interface Product {
  name: string;
  description?: string;
}

export interface Company {
  name: string;
  description?: string;
  chief: string;
}

export interface OpenSourceProject {
  name: string;
  description?: string;
  stars: number;
}

export interface Guild {
  name: string;
  description?: string;
  interestingEvents: number[];
}

export interface Device {
  type: string;
  manufacturer: string;
  model: string;
}
