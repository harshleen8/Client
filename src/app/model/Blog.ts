import { Post } from "./Post";

export interface Blog {
    id?: number;
    title: string;
    posts: Post[];
  }