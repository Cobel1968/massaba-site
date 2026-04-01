import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    console.log('=== API GET /api/admin/users START ===')
    
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    console.log('SUPABASE_URL exists:', !!supabaseUrl)
    console.log('SERVICE_ROLE_KEY exists:', !!serviceRoleKey)
    
    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Missing environment variables')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }
    
    // Get auth header
    const authHeader = request.headers.get('authorization')
    console.log('Auth header present:', !!authHeader)
    
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 })
    }
    
    const token = authHeader.split(' ')[1]
    console.log('Token received, length:', token?.length)
    
    // Create admin client
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)
    
    // Verify the user token
    console.log('Verifying token...')
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
    
    if (userError) {
      console.error('User verification error:', userError.message)
      return NextResponse.json({ error: userError.message }, { status: 401 })
    }
    
    console.log('User found:', user?.email)
    console.log('User metadata:', JSON.stringify(user?.user_metadata))
    
    // Check if user is super admin
    const isSuperAdmin = user?.user_metadata?.is_super_admin === true || 
                         user?.user_metadata?.role === 'super_admin'
    
    console.log('Is super admin:', isSuperAdmin)
    
    if (!isSuperAdmin) {
      return NextResponse.json({ error: 'Forbidden - Super Admin only' }, { status: 403 })
    }
    
    // List all users
    console.log('Listing users...')
    const { data, error } = await supabaseAdmin.auth.admin.listUsers()
    
    if (error) {
      console.error('List users error:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    console.log('Success, found', data.users.length, 'users')
    return NextResponse.json({ users: data.users })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    console.log('=== API POST /api/admin/users START ===')
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 })
    }
    
    const token = authHeader.split(' ')[1]
    
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)
    
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const isSuperAdmin = user?.user_metadata?.is_super_admin === true || 
                         user?.user_metadata?.role === 'super_admin'
    
    if (!isSuperAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    const body = await request.json()
    console.log('Creating user:', body.email)
    
    const tempPassword = body.password || Math.random().toString(36).slice(-8) + '!Aa'
    
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: body.email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        full_name: body.full_name,
        phone: body.phone || '',
        client_type: body.client_type || 'Individual',
        role: 'user'
      }
    })
    
    if (error) {
      console.error('Create user error:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    console.log('User created successfully')
    return NextResponse.json({ user: data.user, tempPassword: tempPassword })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}