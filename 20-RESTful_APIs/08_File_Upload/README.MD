## 📋 File Upload TODO's

- [ ] **Remove the file if validation fails**

  `upload` runs before `validateBodyZod`, so the file is already in Cloudinary even when
  the request is rejected. This leaves an unused file. We should delete it in
  `validateBodyZod` before sending the `400` response.

- [ ] **Remove the file(s) when a post is deleted**

  When we delete a post, its images stay in Cloudinary forever. In `deletePost` we
  should also delete them using their saved `public_id`.

- [ ] **Replace the old file(s) on update**

  When `updatePost` gets new images, the old images are not used anymore. We should
  delete the old ones from Cloudinary before saving the new ones.
