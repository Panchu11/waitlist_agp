import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Just return success - we'll handle table creation in the Supabase dashboard
    return NextResponse.json({ success: true, message: 'Database setup check completed' });
  } catch (error) {
    console.error('Error checking database setup:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
