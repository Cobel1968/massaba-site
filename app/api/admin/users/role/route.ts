import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function PUT(request) {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
    
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 })
    }
    
    const token = authHeader.split(' ')[1]
    
    // Verify the user is super admin
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const isSuperAdmin = user.user_metadata?.is_super_admin === true || 
                         user.user_metadata?.role === 'super_admin'
    
    if (!isSuperAdmin) {
      return NextResponse.json({ error: 'Forbidden - Super Admin only' }, { status: 403 })
    }
    
    const body = await request.json()
    
    // Update user role
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(body.userId, {
      user_metadata: {
        ...(await supabaseAdmin.auth.admin.getUserById(body.userId)).data.user.user_metadata,
        role: body.role,
        is_super_admin: body.role === 'super_admin'
      }
    })
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, user: data.user })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}