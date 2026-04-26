import axios from "axios";

const BASE_URL = "https://69cfd6b2a4647a9fc6760d2c.mockapi.io";

const mangaService = {
  getByType: async (type: "comic" | "text") => {
    const url = type === "comic" ? "/manga" : "/novel";
    const res = await axios.get(BASE_URL + url);
    return res.data;
  },
};


export type manga = {
    id: string;
    title: string;
    cover: string;
    author: string;
    type: "text" | "comic";
    view: number;
    likes: number;
    createdAt: string;
    status?: "pending" | "approved" | "rejected";
};

export type CreateMangaType = {
  title: string;
  cover: string;
  author: string;
  type: "text" | "comic";
  view?: number;
  likes?: number;
  createdAt?: string;
};

export type UpdateMangaType = {
  title?: string;
  cover?: string;
  author?: string;
  type?: "text" | "comic";
  view?: number;
  likes?: number;
  status?: "pending" | "approved" | "rejected";
};

const storyService = {
  getByType: async (type: "comic" | "text") => {
    const url = type === "comic" ? "/manga" : "/novel";
    const res = await axios.get(BASE_URL + url);
    return res.data;
  },

  // GET ALL
  setStories: async (): Promise<manga[]> => {
    const res = await axios.get(`${BASE_URL}/manga`);
    return res.data;
  },

  // CREATE
  createStory: async (data: CreateMangaType): Promise<manga> => {
    const res = await axios.post(`${BASE_URL}/manga`, data);
    return res.data;
  },

  // UPDATE
  updateStory: async (id: string, data: UpdateMangaType): Promise<manga> => {
    const res = await axios.put(`${BASE_URL}/manga/${id}`, data);
    return res.data;
  },

  // DELETE
  deleteStory: async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/manga/${id}`);
  },
};

export default storyService;