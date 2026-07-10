// Create page, renders the shared form wired to the create action.
// <Protected> makes sure only logged-in users get here.

import PostForm from '@/components/PostForm';
import Protected from '@/components/Protected';
import { createPostAction } from '@/app/actions/posts';

export default function CreatePostPage() {
  return (
    <section className="narrow">
      <h1>Write a new post</h1>
      <Protected>
        <PostForm action={createPostAction} mode="create" />
      </Protected>
    </section>
  );
}
