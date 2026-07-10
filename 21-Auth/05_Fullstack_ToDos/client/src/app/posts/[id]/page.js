// Single post page, a Server Component. Fetches one post by id.
// The owner/admin-only Edit/Delete controls live in <PostActions>, a client
// component that reads the logged-in user from context.

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost } from '@/app/actions/posts';
import PostActions from '@/components/PostActions';

export default async function PostPage({ params }) {
  const { id } = await params; // params is a promise in Next 15
  const post = await getPost(id);

  if (!post) notFound();

  const author = post.author
    ? `${post.author.firstName} ${post.author.lastName}`
    : 'Unknown author';

  const date = new Date(post.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="post">
      <Link href="/" className="back-link">
        ← Back to all posts
      </Link>

      {post.image_url && (
        <img className="post-hero" src={post.image_url} alt={post.title} />
      )}

      <h1>{post.title}</h1>
      <p className="byline">
        by {author} · {date}
      </p>

      <PostActions post={post} />

      <div className="post-content">
        <p>{post.content}</p>
      </div>
    </article>
  );
}
