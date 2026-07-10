// Edit page, Server Component fetches the post so we can pre-fill the form.
// The update action has the post id bound in, then <PostForm> submits to it.
// <Protected> keeps logged-out users out (the backend also enforces owner/admin).

import { notFound } from 'next/navigation';
import { getPost, updatePostAction } from '@/app/actions/posts';
import PostForm from '@/components/PostForm';
import Protected from '@/components/Protected';

export default async function EditPostPage({ params }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) notFound();

  const action = updatePostAction.bind(null, id);

  return (
    <section className="narrow">
      <h1>Edit post</h1>
      <Protected>
        <PostForm
          action={action}
          mode="edit"
          initial={{ title: post.title, content: post.content }}
        />
      </Protected>
    </section>
  );
}
