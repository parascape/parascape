# Enabling CORS and Anonymous Access for Contact Submissions

This guide explains how to enable CORS (Cross-Origin Resource Sharing) and anonymous access for the `contact_submissions` table in your Supabase project.

## What's Included

1. **Database Migration**: Adds RLS (Row Level Security) policies to allow anonymous users to insert data into the `contact_submissions` table.
2. **Edge Function Update**: Adds CORS headers to the `send-confirmation-email` edge function to allow cross-origin requests.
3. **Test Form**: A simple HTML form to test anonymous submissions.
4. **Deployment Script**: A PowerShell script to deploy the changes.

## Files

- `supabase/migrations/20240227_allow_anon_inserts.sql`: SQL migration to allow anonymous inserts
- `supabase/functions/send-confirmation-email/index.ts`: Updated edge function with CORS headers
- `test-contact-form.html`: Test form for anonymous submissions
- `deploy-cors-changes.ps1`: PowerShell deployment script

## How to Deploy

### Local Development

1. Make sure you have the Supabase CLI installed:
   ```
   npm install -g supabase
   ```

2. Start your local Supabase instance:
   ```
   supabase start
   ```

3. Run the deployment script:
   ```
   .\deploy-cors-changes.ps1
   ```

4. Open `test-contact-form.html` in your browser to test the form submission.

### Production Deployment

1. Log in to the Supabase CLI:
   ```
   supabase login
   ```

2. Link your project:
   ```
   supabase link --project-ref hpuqzerpfylevdfwembv
   ```

3. Deploy the migration:
   ```
   supabase db push
   ```

4. Deploy the edge function:
   ```
   supabase functions deploy send-confirmation-email
   ```

## Manual Configuration

If you prefer to make these changes manually:

### Database Configuration

1. Go to the Supabase Dashboard > SQL Editor
2. Run the SQL from `supabase/migrations/20240227_allow_anon_inserts.sql`

### Edge Function Configuration

1. Go to the Supabase Dashboard > Edge Functions
2. Edit the `send-confirmation-email` function
3. Add the CORS headers as shown in `supabase/functions/send-confirmation-email/index.ts`

## Testing

After deployment, you can test the anonymous access by:

1. Opening `test-contact-form.html` in your browser
2. Filling out the form and submitting
3. Checking the response to verify the submission was successful

## Troubleshooting

If you encounter issues:

1. **403 Forbidden**: Check that the RLS policy is correctly applied
2. **CORS Errors**: Verify that the edge function has the correct CORS headers
3. **Database Errors**: Check the Supabase logs for any SQL errors

For more help, refer to the [Supabase documentation](https://supabase.com/docs). 