# Deploy CORS and RLS changes to Supabase

Write-Host "Deploying CORS and RLS changes to Supabase..." -ForegroundColor Green

# Deploy the migration to allow anonymous inserts
Write-Host "Applying migration to allow anonymous inserts..." -ForegroundColor Yellow
supabase db push --db-url postgresql://postgres:postgres@localhost:54322/postgres

# Deploy the updated edge function
Write-Host "Deploying updated edge function with CORS headers..." -ForegroundColor Yellow
supabase functions deploy send-confirmation-email

Write-Host "Testing anonymous access..." -ForegroundColor Cyan
Write-Host "Open test-contact-form.html in your browser to test the form submission"

Write-Host "Deployment complete!" -ForegroundColor Green 