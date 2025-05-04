import { NextRequest, NextResponse } from 'next/server';
import { supabase, WaitlistEntry } from '@/utils/supabase';
import crypto from 'crypto';

// Function to generate a referral code from email
function generateReferralCode(email: string): string {
  return crypto.createHash('sha256').update(email).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const { email, wallet, referredBy } = await request.json();

    // Validate input
    if (!email || !wallet) {
      return NextResponse.json(
        { error: 'Email and wallet are required' },
        { status: 400 }
      );
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate referral code
    const referralCode = generateReferralCode(email);

    // Check if referral code exists if provided
    let referrerExists = false;
    if (referredBy) {
      const { data: referrer, error: referrerError } = await supabase
        .from('waitlist_entries')
        .select('referral_code')
        .eq('referral_code', referredBy)
        .maybeSingle();

      referrerExists = !!referrer;
    }

    // Check if email already exists
    const { data: existingEntry, error: checkError } = await supabase
      .from('waitlist_entries')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (existingEntry) {
      // Email already exists, get rank and referral count
      const { count: rankCount, error: rankError } = await supabase
        .from('waitlist_entries')
        .select('*', { count: 'exact', head: true })
        .lte('created_at', existingEntry.created_at);

      const { count: referralCount, error: refCountError } = await supabase
        .from('waitlist_entries')
        .select('*', { count: 'exact', head: true })
        .eq('referred_by', existingEntry.referral_code);

      return NextResponse.json({
        message: 'Email already registered',
        entry: {
          ...existingEntry,
          referral_code: existingEntry.referral_code || referralCode
        },
        rank: rankCount || 1,
        referralCount: referralCount || 0,
      });
    }

    // Insert the new waitlist entry
    const { data, error } = await supabase
      .from('waitlist_entries')
      .insert([
        {
          email,
          wallet,
          referral_code: referralCode,
          referred_by: referrerExists ? referredBy : null,
        },
      ])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error inserting waitlist entry:', error);
      return NextResponse.json(
        { error: 'Failed to join waitlist' },
        { status: 500 }
      );
    }

    // Get rank (position in waitlist)
    const { count: rankCount, error: rankError } = await supabase
      .from('waitlist_entries')
      .select('*', { count: 'exact', head: true });

    // Get referral count (always 0 for new entries)
    const referralCount = 0;

    return NextResponse.json({
      message: 'Successfully joined waitlist',
      entry: data,
      rank: rankCount || 1,
      referralCount,
    });
  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate referral code
    const referralCode = generateReferralCode(email);

    // Get the waitlist entry
    const { data: entry, error } = await supabase
      .from('waitlist_entries')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (!entry) {
      return NextResponse.json(
        { error: 'Email not found in waitlist' },
        { status: 404 }
      );
    }

    // Get rank
    const { count: rankCount, error: rankError } = await supabase
      .from('waitlist_entries')
      .select('*', { count: 'exact', head: true });

    // Get referral count
    const { count: referralCount, error: refCountError } = await supabase
      .from('waitlist_entries')
      .select('*', { count: 'exact', head: true })
      .eq('referred_by', entry.referral_code || referralCode);

    return NextResponse.json({
      entry: {
        ...entry,
        referral_code: entry.referral_code || referralCode
      },
      rank: rankCount || 1,
      referralCount: referralCount || 0,
    });
  } catch (error) {
    console.error('Error retrieving waitlist entry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
