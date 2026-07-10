// Home page, a Server Component. It fetches the posts on the server and
// renders the grid. No 'use client', no useEffect, no loading spinner.

import { getPosts } from '@/app/actions/posts';
import PostCard from '@/components/PostCard';

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <section>
      <header className="page-head">
        <h1>The Journal</h1>
        <p className="muted">Stories, notes and everything in between.</p>
      </header>

      {posts.length === 0 ? (
        <p className="muted">No posts yet. Be the first to write one.</p>
      ) : (
        <div className="grid">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
