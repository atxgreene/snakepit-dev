# Deployment Notes

## Staging flow

1. Create a new GitHub repo named `snakepit-dev` or `snakepit-site`.
2. Push this folder to the repo.
3. Enable GitHub Pages from the repository settings.
4. Use the GitHub Pages URL for review.
5. When ready, point `snakepit.dev` DNS to the chosen hosting path.

## GoDaddy static hosting flow

This site does not require Node, Vite, Next.js, or a build step. Upload these files directly to the web root of the domain.

## Things to replace before launch

- `hello@snakepit.dev` with live email or booking link
- Any illustrative simulator assumptions
- Final case study or proof section
- Final legal/privacy language if collecting forms
