import Link from 'next/link';

// A single card in the home grid. Plain component (no hooks) so it can render
// on the server together with the list.
export default function PostCard({ post }) {
  const author = post.author
    ? `${post.author.firstName} ${post.author.lastName}`
    : 'Unknown author';

  const preview =
    post.content.length > 110
      ? post.content.slice(0, 110) + '…'
      : post.content;

  return (
    <Link href={`/posts/${post._id}`} className="card">
      <div className="card-media">
        {post.image_url ? (
          <img src={post.image_url} alt={post.title} />
        ) : (
          <div className="card-media--empty">No cover</div>
        )}
      </div>

      <div className="card-body">
        <h2>{post.title}</h2>
        <p className="muted small">{preview}</p>
        <span className="byline">by {author}</span>
      </div>
    </Link>
  );
}
