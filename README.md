# Shenron Global

React 19 + Vite public website with a dynamic market journal and a separate Express/MongoDB blog API.

## Run locally

1. Configure the backend as described in [backend/README.md](backend/README.md): copy `backend/.env.example` to `backend/.env`, set MongoDB and admin values, and generate the bcrypt password hash with `npm run hash-password` from the backend folder.
2. In `backend/`, run `npm.cmd install` and `npm.cmd run dev`.
3. In the repository root, run `npm.cmd install` and `npm.cmd run dev`.
4. Open the local Vite URL shown in the terminal. The local Vite proxy sends `/api`, `/uploads`, and `/sitemap.xml` to the API at `http://localhost:5000` by default.

The frontend API path is configured in one place through `VITE_API_BASE_URL`, which defaults to `/api`. Set `VITE_DEV_API_ORIGIN` if the local API uses a different origin. Production defaults to the same-origin `/api` path; the production host must proxy that path to the backend.

## Blog content desk

- Public journal: `/blogs`
- Article: `/blogs/:slug`
- Admin sign-in: `/admin/login`
- Admin articles: `/admin/blogs`

Only published records are returned by public endpoints. Admin CRUD and upload requests require a valid HttpOnly cookie session.

## Production notes

No production hosting, MongoDB URI, or API domain is configured in this repository. Set those in the hosting environment, proxy backend paths, configure the public SPA fallback for direct article navigation, and choose persistent local disk or S3-compatible media storage. Full backend setup, routes, environment variables, deployment, and troubleshooting are in [backend/README.md](backend/README.md).
