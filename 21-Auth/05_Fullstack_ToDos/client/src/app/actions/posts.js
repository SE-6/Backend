'use server';

// Everything about posts that runs on the SERVER lives here.
//  - reads  (getPosts / getPost)      → called from Server Components
//  - writes (create / update / delete) → Server Actions the forms call
//
// The writes need the auth cookie. The browser keeps that httpOnly cookie for
// "localhost" and cookies ignore the port, so it also reaches the Next server,
// we read it with cookies() and forward it to Express by hand.

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// build the "accessToken=...; refreshToken=..." string for the Cookie header.
// (given to you, this is how we forward the login cookie to the backend)
async function cookieHeader() {
  const store = await cookies();
  return store.toString();
}

// rebuild a clean multipart body. We only attach the image if the user picked a
// file, otherwise we leave it out and the backend makes an AI cover from the title.
// (given to you)
function buildBody(formData) {
  const body = new FormData();
  body.append('title', formData.get('title') ?? '');
  body.append('content', formData.get('content') ?? '');

  const image = formData.get('image');
  if (image && typeof image !== 'string' && image.size > 0) {
    body.append('image', image);
  }
  return body;
}

// ---------------- reads (Server Components) ----------------

// GET /posts → the home list.
// DONE for you, this is what makes the home page work already.
export async function getPosts() {
  const res = await fetch(`${API_URL}/posts`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Could not load the posts');
  return res.json();
}

// GET /posts/:id → one post, for the detail page.
export async function getPost(id) {
  // TODO (step 4): fetch `${API_URL}/posts/${id}` with { cache: 'no-store' }
  //   - if the response is NOT ok  -> return null  (so the page can notFound())
  //   - otherwise                  -> return res.json()
}

// ---------------- writes (Server Actions) ----------------

// POST /posts  (create), used on step 6
export async function createPostAction(prevState, formData) {
  // TODO (step 6):
  //   1. fetch `${API_URL}/posts` with:
  //        method: 'POST'
  //        headers: { Cookie: await cookieHeader() }   ← forwards the login cookie
  //        body: buildBody(formData)                    ← do NOT set Content-Type,
  //                                                        fetch adds the boundary
  //   2. const data = await res.json()
  //   3. if (!res.ok) return { error: data.message }   ← the form shows this
  //   4. revalidatePath('/')                            ← the home list changed
  //   5. redirect(`/posts/${data.newPost._id}`)         ← go to the new post
}

// PUT /posts/:id  (update), used on step 5
// the `id` is bound in from the edit page, so the form gives us (prevState, formData)
export async function updatePostAction(id, prevState, formData) {
  // TODO (step 5): almost the same as create, but:
  //   - method: 'PUT'  to `${API_URL}/posts/${id}`
  //   - on success: revalidatePath('/') AND revalidatePath(`/posts/${id}`)
  //   - then redirect(`/posts/${id}`)
}

// DELETE /posts/:id  (delete), used on step 5
export async function deletePostAction(id) {
  // TODO (step 5):
  //   - fetch `${API_URL}/posts/${id}` with method 'DELETE' + the Cookie header
  //   - if (!res.ok) throw new Error(...)  (something went wrong)
  //   - revalidatePath('/') then redirect('/')
}
