# Deployment Guide

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages on every push to the `main` branch.

### Deployment URLs

- **GitHub Pages URL**: https://d-direct.github.io/grandpnb/
- **Custom Domain**: https://grandpnb.com (once DNS is configured)

### Automatic Deployment

The site automatically deploys via GitHub Actions when you push to the `main` branch.

**Workflow file**: `.github/workflows/deploy.yml`

The workflow:
1. Checks out the code with Git LFS support
2. Sets up Node.js 20 with npm caching
3. Installs dependencies with `npm ci`
4. Builds the production site with `npm run build`
5. Deploys to GitHub Pages

### Manual Deployment

You can also trigger a deployment manually:
1. Go to the [Actions tab](https://github.com/D-Direct/grandpnb/actions)
2. Select "Deploy to GitHub Pages"
3. Click "Run workflow"
4. Select the `main` branch
5. Click "Run workflow"

### Local Testing

To test the production build locally:

```bash
# Build with production base path
NODE_ENV=production npm run build

# Preview the production build
npm run preview
```

The production build will use the `/grandpnb/` base path automatically.

## Custom Domain Setup (grandpnb.com)

### DNS Configuration

To point your custom domain to GitHub Pages, configure the following DNS records with your domain registrar:

**Option 1: Using A records (Apex domain)**
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

**Option 2: Using CNAME (www subdomain)**
```
Type: CNAME
Name: www
Value: d-direct.github.io
```

### GitHub Pages Settings

1. Go to [Repository Settings → Pages](https://github.com/D-Direct/grandpnb/settings/pages)
2. Under "Custom domain", enter: `grandpnb.com`
3. Click "Save"
4. Wait for DNS check to complete (may take a few minutes)
5. Once verified, enable "Enforce HTTPS"

### CNAME File

The `public/CNAME` file contains the custom domain name. This file is automatically copied to the `dist` folder during build and tells GitHub Pages which custom domain to use.

**Important**: Do not delete `public/CNAME` or modify its contents.

## Base Path Configuration

### Development vs Production

- **Development** (`npm run dev`): Uses base path `/`
- **Production** (`npm run build`): Uses base path `/grandpnb/`

This is configured in `vite.config.ts`:

```typescript
base: process.env.NODE_ENV === "production" ? "/grandpnb/" : "/"
```

### Switching to Custom Domain

Once your custom domain (grandpnb.com) is configured and verified:

1. Update `vite.config.ts` to use `/` as the base path:
   ```typescript
   base: "/"
   ```

2. Update the canonical URL in `index.html` if needed

3. Commit and push the changes

The site will then work on both:
- https://grandpnb.com (custom domain, using `/` base path)
- https://d-direct.github.io/grandpnb/ (GitHub Pages URL, will redirect to custom domain)

## Build Assets

All assets are automatically processed during build:
- Images are copied to `dist/assets/`
- CSS is minified and paths are rebased
- JavaScript is bundled and minified
- Self-hosted fonts (@fontsource) are included

## Troubleshooting

### Assets Not Loading

If assets don't load after deployment:
1. Check that `import.meta.env.BASE_URL` is used for all asset paths in the code
2. Verify the base path in `vite.config.ts`
3. Check browser console for 404 errors
4. Clear browser cache

### Custom Domain Not Working

1. Verify DNS records are correctly configured
2. Check DNS propagation: https://dnschecker.org
3. Ensure `public/CNAME` file exists and contains correct domain
4. Check GitHub Pages settings show domain as verified
5. Wait up to 24 hours for DNS propagation

### Deployment Failed

1. Check the [Actions tab](https://github.com/D-Direct/grandpnb/actions) for error logs
2. Verify all dependencies are in `package.json`
3. Ensure the build succeeds locally: `NODE_ENV=production npm run build`
4. Check that Git LFS is properly configured for large image files

## Repository Settings Required

Ensure these repository settings are configured:

1. **GitHub Pages**:
   - Source: GitHub Actions
   - Custom domain: grandpnb.com (once DNS is ready)
   - Enforce HTTPS: Enabled

2. **Git LFS**:
   - Enabled for `.webp`, `.jpg`, `.jpeg`, `.png` files

3. **Branch Protection** (Optional):
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
