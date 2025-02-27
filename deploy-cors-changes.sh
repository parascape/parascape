#!/bin/bash

# Deploy CORS and RLS changes to Supabase

echo "Deploying CORS and RLS changes to Supabase..."

# Deploy the migration to allow anonymous inserts
echo "Applying migration to allow anonymous inserts..."
supabase db push --db-url postgresql://postgres:postgres@localhost:54322/postgres

# Deploy the updated edge function
echo "Deploying updated edge function with CORS headers..."
supabase functions deploy send-confirmation-email

echo "Testing anonymous access..."
echo "Open test-contact-form.html in your browser to test the form submission"

echo "Deployment complete!" 