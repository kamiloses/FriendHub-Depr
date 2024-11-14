export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  postId: string;
  parentCommentId: string | null;
  numberOfComments: number;
  numberOfLikes: number;
  numberOfReplies: number;

}
