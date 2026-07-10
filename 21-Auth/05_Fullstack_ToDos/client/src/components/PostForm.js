'use client';

// Shared form for both creating and editing a post.
// It submits to a Server Action (passed in as `action`) via useActionState,
// which gives us the server's returned state ({ error }) and an isPending flag.

import { useActionState, useState } from 'react';

export default function PostForm({ action, mode = 'create', initial }) {
  const [state, formAction, isPending] = useActionState(action, { error: null });
  const [hasImage, setHasImage] = useState(false);
  const [useAI, setUseAI] = useState(false);

  // On create you must EITHER upload an image OR tick the AI box.
  // On edit the image is optional (leave empty to keep the current one).
  const mustChoose = mode === 'create' && !hasImage && !useAI;

  return (
    <form action={formAction} className="form">
      {state?.error && <p className="error">{state.error}</p>}

      <label>
        Title
        <input
          name="title"
          type="text"
          defaultValue={initial?.title || ''}
          minLength={5}
          required
        />
      </label>

      <label>
        Content
        <textarea
          name="content"
          rows={8}
          defaultValue={initial?.content || ''}
          minLength={5}
          required
        />
      </label>

      <label>
        Cover image {mode === 'edit' && '(leave empty to keep the current one)'}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setHasImage(e.target.files.length > 0)}
        />
      </label>

      {mode === 'create' && (
        <label className="checkbox">
          <input
            type="checkbox"
            checked={useAI}
            disabled={hasImage}
            onChange={(e) => setUseAI(e.target.checked)}
          />
          No image? Let AI paint a cover from the title (~15s)
        </label>
      )}

      <button className="btn" type="submit" disabled={isPending || mustChoose}>
        {isPending
          ? 'Working…'
          : mode === 'create'
            ? 'Publish'
            : 'Save changes'}
      </button>

      {mustChoose && (
        <p className="muted small">
          Upload an image, or tick “Let AI paint a cover”.
        </p>
      )}
    </form>
  );
}
