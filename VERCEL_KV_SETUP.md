# Vercel KV Setup for Streams

The Community Streams feature uses Vercel KV for permanent storage.

## Setup Steps:

1. **Go to your Vercel Dashboard**
   - Navigate to: https://vercel.com/dashboard

2. **Select your spidertanks project**

3. **Go to Storage tab**
   - Click "Storage" in the top navigation
   - Click "Create Database"
   - Select "KV" (Redis)

4. **Create KV Database**
   - Name it something like "spidertanks-streams"
   - Select your region (choose one close to your users)
   - Click "Create"

5. **Connect to Project**
   - Vercel will automatically add these environment variables:
     - `KV_URL`
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
     - `KV_REST_API_READ_ONLY_TOKEN`

6. **Redeploy**
   - The environment variables are automatically added
   - Just run: `vercel --prod`

## How it works:

- Streams are stored in KV under the key: `spidertanks:streams`
- Maximum 100 streams stored
- Data persists across deployments
- Automatic sorting by newest first

## Local Development (Optional):

If you want to test locally, create a `.env.local` file with:

```
KV_URL="your-kv-url"
KV_REST_API_URL="your-rest-api-url"
KV_REST_API_TOKEN="your-token"
KV_REST_API_READ_ONLY_TOKEN="your-read-only-token"
```

Get these values from the Vercel KV dashboard under "Quickstart" → ".env.local" tab.
