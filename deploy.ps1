$env:SUPABASE_ACCESS_TOKEN = 'sbp_6f7d759712c0cdb21edf6cb1dcff35fca075fa17'

# Set environment variables
supabase secrets set --project-ref hjhpcawffvgcczhxcjsr RESEND_API_KEY="re_H3gwg6YT_EKSmLHBE3fZCLd44Ngo1thXw"

# Deploy the function
supabase functions deploy handle-form-submission --project-ref hjhpcawffvgcczhxcjsr --no-verify-jwt 