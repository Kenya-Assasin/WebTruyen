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

  getAllStories: async (): Promise<manga[]> => {
    const [mangaList, novelList] = await Promise.all([
      axios.get(`${BASE_URL}/manga`),
      axios.get(`${BASE_URL}/novel`),
    ]);
    return [
      ...mangaList.data.map((item: any) => ({ ...item, type: 'comic' as const })),
      ...novelList.data.map((item: any) => ({ ...item, type: 'text' as const })),
    ];
  },

  // CREATE
  createStory: async (data: CreateMangaType): Promise<manga> => {
    const url = data.type === 'comic' ? '/manga' : '/novel';
    const res = await axios.post(`${BASE_URL}${url}`, data);
    return res.data;
  },

  // UPDATE
  updateStory: async (id: string, data: UpdateMangaType): Promise<manga> => {
    const url = data.type === 'comic' ? '/manga' : '/novel';
    const res = await axios.put(`${BASE_URL}${url}/${id}`, data);
    return res.data;
  },

  // DELETE
  deleteStory: async (id: string, type: 'comic' | 'text') => {
    const url = type === 'comic' ? '/manga' : '/novel';
    await axios.delete(`${BASE_URL}${url}/${id}`);
  },
};

export default storyService;