export interface IComment {
  username: string;
  user_image: Buffer;
  email: string;
  post_title: string;
  comment: string;
  created_at: Date;
  updated_at: Date;
}
