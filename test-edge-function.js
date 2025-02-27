// Test script for send-confirmation-email Edge Function
import fetch from 'node-fetch';

// Supabase configuration
const SUPABASE_URL = 'https://hpuqzerpfylevdfwembv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdXF6ZXJwZnlsZXZkZndlbWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MTIwODIsImV4cCI6MjA1NTA4ODA4Mn0.JYRebBYLMwMYX2FRfNMmV7NDzNZHTeADPdy6CIobzaM';

// Test data
const testData = {
  id: '00000000-0000-0000-0000-000000000000', // This will be replaced with the actual ID from the database
  name: 'Brendan Balsley',
  email: 'brendan.balsley22@gmail.com',
  business: 'Test Business',
  type: 'contact' // or 'audit_request'
};

// Function to test the Edge Function
async function testEdgeFunction() {
  try {
    console.log('Testing Edge Function with data:', testData);
    
    // First, insert a test record into the database
    const insertResponse = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        name: testData.name,
        email: testData.email,
        business: testData.business,
        about: 'This is a test submission',
        type: testData.type
      })
    });
    
    if (!insertResponse.ok) {
      const errorData = await insertResponse.json();
      throw new Error(`Failed to insert test record: ${JSON.stringify(errorData)}`);
    }
    
    const insertData = await insertResponse.json();
    console.log('Test record inserted:', insertData);
    
    // The database trigger should automatically call the Edge Function
    console.log('The database trigger should have automatically called the Edge Function.');
    console.log('Check your email at brendan.balsley22@gmail.com for the confirmation email.');
    
  } catch (error) {
    console.error('Error testing Edge Function:', error);
  }
}

// Run the test
testEdgeFunction(); 