import { api } from "../baseApi";

export interface Author {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  _id: number;
  title: string;
  content: string;
  author: string;
}

export const postsService = {
  getPosts: () => api.get<Post[]>("/posts"),
};