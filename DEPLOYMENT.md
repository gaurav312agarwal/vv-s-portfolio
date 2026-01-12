# Deployment Guide - VV's Portfolio

This guide will walk you through deploying the portfolio to Vercel.

## Prerequisites
- GitHub account
- Vercel account (free) - Sign up at https://vercel.com

## Step 1: Push to GitHub

First, initialize git and push your code to GitHub:

```bash
cd "/home/gaurav/vv's portfolio/shawn-garcia-portfolio"

# Initialize git repository
git init

# Add all files
git add .

# Commit the changes
git commit -m "Initial commit - VV's Portfolio"

# Create a new repository on GitHub
# Option 1: Using GitHub CLI (if installed)
gh repo create vv-portfolio --public --source=. --remote=origin --push

# Option 2: Manual method
# 1. Go to https://github.com/new
# 2. Create a repository named "vv-portfolio"
# 3. Then run:
git remote add origin https://github.com/YOUR_USERNAME/vv-portfolio.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend to Vercel

1. Go to https://vercel.com and sign in
2. Click "Add New Project"
3. Import your GitHub repository "vv-portfolio"
4. Configure the backend:
   - **Project Name**: `vv-portfolio-api`
   - **Framework Preset**: Other
   - **Root Directory**: `server`
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`
5. Click "Deploy"
6. Wait for deployment to complete
7. **Copy the deployment URL** (e.g., `https://vv-portfolio-api.vercel.app`)

## Step 3: Deploy Frontend to Vercel

1. In Vercel dashboard, click "Add New Project" again
2. Select the same GitHub repository
3. Configure the frontend:
   - **Project Name**: `vv-portfolio`
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. **Add Environment Variable**:
   - Key: `VITE_API_URL`
   - Value: Your backend URL from Step 2 (e.g., `https://vv-portfolio-api.vercel.app`)
5. Click "Deploy"
6. Wait for deployment to complete

## Step 4: Update Frontend Environment Variable (If Needed)

If you need to update the API URL later:

1. Go to your frontend project in Vercel
2. Click "Settings" → "Environment Variables"
3. Edit `VITE_API_URL` value
4. Redeploy from "Deployments" tab

## Step 5: Configure Custom Domain (Optional)

1. In Vercel project settings
2. Go to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Your Deployed URLs

After deployment, you'll have:
- **Frontend**: `https://vv-portfolio.vercel.app`
- **Backend API**: `https://vv-portfolio-api.vercel.app`

## Troubleshooting

### Backend not responding
- Check Vercel function logs
- Ensure `vercel.json` is in the server folder
- Verify all routes are properly configured

### Images not loading
- Check that the `data` folder is included in deployment
- Verify environment variable `VITE_API_URL` is set correctly in frontend
- Check browser console for CORS errors

### CORS errors
- Ensure backend CORS is configured properly
- May need to add specific frontend URL to CORS allowlist in production

### Build failures
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

## Alternative: Single Command Deployment

You can also use Vercel CLI for faster deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy backend
cd server
vercel --prod

# Deploy frontend (use backend URL from previous step)
cd ../client
vercel --prod
```

## Continuous Deployment

Once set up, Vercel will automatically:
- Deploy on every push to main branch
- Create preview deployments for pull requests
- Update your live site within minutes

## Support

For issues, check:
- Vercel Dashboard logs
- GitHub Actions (if configured)
- Browser Developer Console
