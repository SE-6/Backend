'use client';

// The Edit / Delete controls under a single post.
// These should ONLY show when the logged-in user OWNS the post, or is an admin,
// the exact same rule the backend's `authorize` middleware enforces.

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { deletePostAction } from '@/app/actions/posts';

export default function PostActions({ post }) {
  const { user } = useAuth();

  // TODO (step 5): decide if the current user may edit/delete this post.
  //   - if there is no user at all           -> return null  (show nothing)
  //   - isOwner  = user's id === post.author's id   (post.author is populated,
  //                so compare user._id with post.author?._id as strings)
  //   - isAdmin  = user's roles array includes 'admin'
  //   - if the user is NEITHER owner nor admin -> return null
  //
  // Once you allow it, the buttons below will render.

  // bind the post id into the delete action so the <form> can call it
  const deleteThisPost = deletePostAction.bind(null, post._id);

  return (
    <div className="actions">
      <Link className="btn btn--sm btn--ghost" href={`/posts/${post._id}/edit`}>
        Edit
      </Link>

      <form action={deleteThisPost}>
        <button className="btn btn--sm btn--danger" type="submit">
          Delete
        </button>
      </form>
    </div>
  );
}
