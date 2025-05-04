'use client';

import { useState, useEffect } from 'react';
import WaitlistForm from '@/components/WaitlistForm';
import ConfirmationSection from '@/components/ConfirmationSection';
import FAQ from '@/components/FAQ';
import { WaitlistEntry } from '@/utils/supabase';

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [waitlistData, setWaitlistData] = useState<{
    entry: WaitlistEntry;
    rank: number;
    referralCount: number;
  } | null>(null);

  // Setup database on first load
  useEffect(() => {
    fetch('/api/setup-db')
      .then(response => response.json())
      .catch(error => console.error('Error setting up database:', error));
  }, []);

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
      {/* Hero Section */}
      <section className="w-full max-w-4xl mx-auto text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Be First to Enter the Age of Autonomous Agents.
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Join the waitlist for exclusive Alpha access, rewards, and early adoption perks.
        </p>

        {/* Form or Confirmation Section */}
        {formSubmitted && waitlistData ? (
          <ConfirmationSection
            entry={waitlistData.entry}
            rank={waitlistData.rank}
            referralCount={waitlistData.referralCount}
          />
        ) : (
          <WaitlistForm onSuccess={handleFormSuccess} />
        )}
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}
