const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://udcjxyxkxiaaiwfpqike.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkY2p4eXhreGlhYWl3ZnBxaWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MTMxNzUsImV4cCI6MjA4NTM4OTE3NX0.bj2TVO5qJ0-drRIOVlfkR2CwUBXQMa1GJvfb9pfzKcY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkFeatured() {
  console.log('Checking featured properties...');

  // Fetch all featured properties regardless of status
  const { data: properties, error } = await supabase
    .from('properties')
    .select('id, title, status, featured, created_at')
    .eq('featured', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching properties:', error);
    return;
  }

  console.log(`Found ${properties.length} featured properties:`);
  console.table(properties);

  const activeFeatured = properties.filter(p => p.status === 'active');
  const pendingFeatured = properties.filter(p => p.status === 'pending');

  console.log('Summary:');
  console.log(`- Active & Featured: ${activeFeatured.length}`);
  console.log(`- Pending & Featured: ${pendingFeatured.length}`);

  if (pendingFeatured.length > 0) {
    console.log('\nPotential issue: There are pending featured properties that will NOT show on the homepage.');
  }
}

checkFeatured();