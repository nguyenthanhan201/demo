export interface Comment {
  _id: string;
  deleted_at: string;
  author: string;
  discuss_id: string;
  text: string;
  parent_slug: string;
  slug: string;

  comment_likes: string[];
  full_slug: string;
  createdAt: string;
  updatedAt: string;
}
