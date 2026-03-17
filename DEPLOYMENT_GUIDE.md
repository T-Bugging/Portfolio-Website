# Deployment Guide: Vercel vs Netlify

## Quick Comparison

| Feature | Vercel | Netlify |
|---------|--------|---------|
| Deploy from | GitHub, GitLab, Bitbucket | GitHub, GitLab, Bitbucket |
| Functions | `/api` directory | `/netlify/functions` directory |
| Free Tier | Yes (generous limits) | Yes (generous limits) |
| Environment Vars | Via Dashboard | Via Dashboard |
| Custom Domain | Yes | Yes |
| Cold Start Speed | Very Fast | Very Fast |

---

## Option 1: Deploy to Vercel

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Authorize Vercel to access your repositories

### Step 2: Deploy Your Repository
1. Click **New Project** button
2. Select your portfolio repository from GitHub
3. Vercel will auto-detect it's a Vite project - just click **Deploy**

### Step 3: Add Environment Variables
1. Go to your project **Settings** in Vercel Dashboard
2. Click **Environment Variables**
3. Add these three variables:
   ```
   EMAIL_USER = your-email@gmail.com
   EMAIL_PASSWORD = your-app-password
   RECIPIENT_EMAIL = pandey2928uday@gmail.com
   ```
4. Click **Save** and **Redeploy** your project

### Step 4: Test Email Function
- Fill out contact form on your deployed site
- Check your email inbox

---

## Option 2: Deploy to Netlify

### Step 1: Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up with your GitHub account
3. Authorize Netlify to access your repositories

### Step 2: Create netlify.toml (Configuration File)
Add this to your project root:
```toml
[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = "dist"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### Step 3: Deploy Your Repository
1. Click **Add new site** → **Import an existing project**
2. Select your portfolio repository
3. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy site**

### Step 4: Add Environment Variables
1. Go to **Site settings**
2. Click **Build & Deploy** → **Environment**
3. Click **Edit variables**
4. Add these three variables:
   ```
   EMAIL_USER = your-email@gmail.com
   EMAIL_PASSWORD = your-app-password
   RECIPIENT_EMAIL = pandey2928uday@gmail.com
   ```
5. Click **Save** and **Trigger deploy**

### Step 5: Test Email Function
- Fill out contact form on your deployed site
- Check your email inbox

---

## Create Gmail App Password (Required for Both)

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** (left sidebar)
3. Enable **2-Step Verification** (if not already on)
4. After enabling 2FA, scroll to **App passwords**
5. Select:
   - App: **Mail**
   - Device: **Windows Computer** (or your device type)
6. Google generates a 16-character password - **copy this exact text**
7. Use this in `EMAIL_PASSWORD` environment variable

---

## Troubleshooting

### Emails not sending after deployment
- [ ] Check environment variables are set in dashboard
- [ ] Verify you used 16-char App Password, not your Gmail password
- [ ] Check your email's spam folder
- [ ] Look at function logs in the dashboard for errors

**Vercel:** Settings → Functions → View logs
**Netlify:** Deploys → Function logs

### CORS or 405 errors
- Make sure serverless function files are in the correct location
- Vercel: `/api/send-email.js`
- Netlify: `/netlify/functions/send-email.js`

### 404 on email endpoint
- The function wasn't deployed correctly
- Check build logs in your platform dashboard
- Make sure `package.json` includes `nodemailer`

---

## Local Testing (Before Deploying)

### Step 1: Create .env.local
Copy from `.env.example` and add your credentials:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
RECIPIENT_EMAIL=pandey2928uday@gmail.com
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Locally
```bash
npm run dev
```

### Step 4: Test the Form
- Open http://localhost:5174
- Scroll to Contact section
- Fill out and submit form
- Should receive email in your inbox

---

## Next Steps After Deployment

1. **Add custom domain**
   - Vercel: Domains → Add → Connect domain
   - Netlify: Domain settings → Add custom domain

2. **Set up SSL (Auto-enabled on both platforms)**
   - Both provide free HTTPS

3. **Enable analytics & monitoring**
   - Check deployment logs if issues occur

4. **Consider adding**
   - Rate limiting on email function
   - CAPTCHA protection on form (spam prevention)

---

## Cost Analysis

| Platform | Free Tier | Emails/Month | Cost |
|----------|-----------|--------------|------|
| Vercel | Yes | Unlimited* | Free |
| Netlify | Yes | Unlimited* | Free |
| Gmail | Yes | Unlimited** | Free (with limitations) |

*Limited by email service provider (Gmail, SendGrid, etc.)  
**Gmail has daily sending limits (~500 emails/day for most accounts)

For production with high volume, consider upgrading to a dedicated email service like SendGrid or Brevo.
