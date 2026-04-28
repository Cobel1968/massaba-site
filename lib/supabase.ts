import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// For build time (Node.js without env vars), provide fallback
const hasEnvVars = supabaseUrl && supabaseAnonKey
// Create a mock client for build time when env vars aren't available
const createSafeClient = () => {
  if (!hasEnvVars) {
    console.warn('⚠️ Supabase environment variables are missing - using mock client for build')
    // Return a mock client with essential methods
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: null }),
            order: () => Promise.resolve({ data: [], error: null }),
            limit: () => Promise.resolve({ data: [], error: null }),
          }),
        }),
      }),
    } as any
  }
  return createClient(supabaseUrl!, supabaseAnonKey!)
}
export const supabase = createSafeClient()
