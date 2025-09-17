# Vercel Deployment Guide for Secure Ore Quest

This guide provides step-by-step instructions for deploying the Secure Ore Quest application to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Environment variables ready

## Step 1: Prepare Environment Variables

Create a `.env.local` file with the following variables:

```env
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Infura Configuration (Optional)
VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
VITE_RPC_URL=https://1rpc.io/sepolia
```

## Step 2: Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" button
   - Select "Import Git Repository"
   - Choose `YunfeiShen/secure-ore-quest` from the list
   - Click "Import"

3. **Configure Project Settings**
   - **Project Name**: `secure-ore-quest` (or your preferred name)
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Set Environment Variables**
   - Go to "Environment Variables" section
   - Add each variable from your `.env.local` file:
     - `VITE_CHAIN_ID` = `11155111`
     - `VITE_RPC_URL` = `https://sepolia.infura.io/v3/YOUR_INFURA_KEY`
     - `VITE_WALLET_CONNECT_PROJECT_ID` = `YOUR_WALLET_CONNECT_PROJECT_ID`
     - `VITE_INFURA_API_KEY` = `YOUR_INFURA_API_KEY`

5. **Deploy**
   - Click "Deploy" button
   - Wait for the build process to complete
   - Your app will be available at the provided Vercel URL

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Project Directory**
   ```bash
   cd secure-ore-quest
   vercel
   ```

4. **Follow the CLI prompts**
   - Link to existing project or create new one
   - Set environment variables when prompted
   - Confirm deployment settings

## Step 3: Configure Custom Domain (Optional)

1. **Add Domain in Vercel Dashboard**
   - Go to your project settings
   - Navigate to "Domains" section
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update DNS Records**
   - Add CNAME record pointing to your Vercel deployment
   - Wait for DNS propagation (up to 24 hours)

## Step 4: Configure Automatic Deployments

1. **Enable GitHub Integration**
   - Go to project settings
   - Navigate to "Git" section
   - Ensure GitHub integration is enabled

2. **Set Deployment Branches**
   - Production: `main` branch
   - Preview: All other branches

3. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## Step 5: Monitor and Maintain

1. **View Deployment Logs**
   - Go to "Deployments" tab in Vercel dashboard
   - Click on any deployment to view logs

2. **Set up Monitoring**
   - Enable Vercel Analytics (optional)
   - Set up error tracking if needed

3. **Update Environment Variables**
   - Go to "Environment Variables" in project settings
   - Add/update variables as needed
   - Redeploy to apply changes

## Important Configuration Notes

### Build Configuration
- **Framework**: Vite
- **Node.js Version**: 18.x (recommended)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Environment Variables
All environment variables must be prefixed with `VITE_` to be accessible in the frontend.

### Network Configuration
- **Chain ID**: 11155111 (Sepolia testnet)
- **RPC URL**: Your configured RPC endpoint
- **Wallet Connect**: Your project ID for wallet connections

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (use 18.x)
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

2. **Environment Variables Not Working**
   - Ensure variables are prefixed with `VITE_`
   - Redeploy after adding new variables
   - Check variable names match exactly

3. **Wallet Connection Issues**
   - Verify Wallet Connect Project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches Sepolia (11155111)

4. **Contract Interaction Issues**
   - Verify contract is deployed to Sepolia
   - Check contract address in frontend code
   - Ensure user has Sepolia ETH for gas

### Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/introduction)

## Post-Deployment Checklist

- [ ] Application loads without errors
- [ ] Wallet connection works
- [ ] Contract interactions function properly
- [ ] Environment variables are set correctly
- [ ] Custom domain is configured (if applicable)
- [ ] Analytics/monitoring is set up
- [ ] SSL certificate is active
- [ ] Performance is acceptable

## Maintenance

- Monitor deployment logs regularly
- Update dependencies as needed
- Keep environment variables secure
- Test new features in preview deployments
- Monitor gas costs for contract interactions

Your Secure Ore Quest application should now be successfully deployed and accessible via the Vercel URL!
