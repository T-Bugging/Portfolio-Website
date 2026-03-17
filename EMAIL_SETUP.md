# Environment Variables Setup

For email functionality to work on Vercel or Netlify, you need to add these environment variables:

## For Gmail (Recommended)

### Step 1: Get Your Gmail App Password
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** in the left sidebar
3. Enable **2-Step Verification** (if not already enabled)
4. After enabling 2FA, go back to Security
5. Look for **App passwords** (bottom section)
6. Select "Mail" and "Windows Computer" (or your device)
7. Google will generate a 16-character password - **copy this**

### Step 2: Add Environment Variables

**For Vercel:**
```bash
# In Vercel Dashboard:
# Project Settings → Environment Variables

EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
RECIPIENT_EMAIL=pandey2928uday@gmail.com
```

**For Netlify:**
```bash
# In Netlify Dashboard:
# Site Settings → Build & Deploy → Environment

EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
RECIPIENT_EMAIL=pandey2928uday@gmail.com
```

## Environment Variables Explained

- `EMAIL_USER`: Your Gmail address (e.g., your-email@gmail.com)
- `EMAIL_PASSWORD`: The 16-character App Password from Google (NOT your regular password)
- `RECIPIENT_EMAIL`: Where you want to receive contact form submissions (default: pandey2928uday@gmail.com)

## Email Service Providers (Alternative to Gmail)

If you prefer to use a different email provider:

### SendGrid
```js
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

### Brevo (formerly Sendinblue)
```js
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASSWORD
  }
});
```

## Testing Locally

To test the email function locally:

```bash
npm run dev
```

Then POST a request to:
```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

## Troubleshooting

### "Failed to send email" when deployed
- Check environment variables are set in your platform (Vercel/Netlify)
- Verify the app password is the 16-character one from Google, not your regular password
- Check that 2FA is enabled on your Google account

### Gmail rejecting connection
- Make sure you used the App Password, not your Gmail password
- Verify the email in `EMAIL_USER` matches your Google account

### SMTP Error 535
- Your credentials are incorrect
- Generate a new App Password and try again
