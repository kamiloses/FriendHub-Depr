export interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  likeCount: number;
  retweetCount: number;
  commentsCount:number;
  isDeleted: boolean;
}
