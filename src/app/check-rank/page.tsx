'use client';

import { useState } from 'react';
import CheckRankForm from '@/components/CheckRankForm';
import ConfirmationSection from '@/components/ConfirmationSection';
import FAQ from '@/components/FAQ';
import { WaitlistEntry } from '@/utils/supabase';

export default function CheckRank() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [waitlistData, setWaitlistData] = useState<{
    entry: WaitlistEntry;
    rank: number;
    referralCount: number;
  } | null>(null);

  const handleFormSuccess = (data: {
    entry: WaitlistEntry;
    rank: number;
    referralCount: number;
  }) => {
    setWaitlistData(data);
    setFormSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center">
      <section className="w-full max-w-4xl mx-auto text-center py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Check Your Waitlist Status
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Enter your email to see your current position, referral count, and get your referral link.
        </p>
        
        {formSubmitted && waitlistData ? (
          <ConfirmationSection 
            entry={waitlistData.entry}
            rank={waitlistData.rank}
            referralCount={waitlistData.referralCount}
          />
        ) : (
          <CheckRankForm onSuccess={handleFormSuccess} />
        )}
      </section>
      
      <FAQ />
    </div>
  );
}
