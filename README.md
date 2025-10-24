# web-profile

Simple static profile site.

## What I added

- `.github/workflows/deploy.yml` — GitHub Actions workflow to deploy the site to GitHub Pages (publishes the repository root to `gh-pages` branch on push to `main`).
- `.gitignore` — common ignores.

## How to publish to GitHub

1. Create a GitHub repository (e.g. `https://github.com/<username>/<repo>`).
2. From this project folder run (PowerShell):

```powershell
cd /d d:\xampp\htdocs\web-profile
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

3. The workflow will run on push to `main` and publish to the `gh-pages` branch. Your site will be available at:

`https://<username>.github.io/<repo>/`

If you name the repository `<username>.github.io` the site will be available at `https://<username>.github.io/`.

If you want me to push the repo for you, provide the repository URL and tell me whether you want it public or private.
