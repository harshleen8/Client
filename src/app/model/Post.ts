import { Blog } from "./Blog";

export interface Post {
    id: number;
    PostTitle: string;
    content: string;
    blogId: number;
    blog?: Blog; // Assuming you have a Blog model as well
  }