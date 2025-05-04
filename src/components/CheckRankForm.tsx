import React, { useState } from 'react';
import { WaitlistEntry } from '@/utils/supabase';

interface CheckRankFormProps {
  onSuccess: (data: {
    entry: WaitlistEntry;
    rank: number;
    referralCount: number;
  }) => void;
}

export default function CheckRankForm({ onSuccess }: CheckRankFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/waitlist?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to find your waitlist entry');
      }

      onSuccess(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center text-white">Check Your Waitlist Status</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="check-email" className="block text-sm font-medium mb-1 text-white">
            Email Address
          </label>
          <input
            id="check-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-70"
        >
          {isSubmitting ? 'Checking...' : 'Check Status'}
        </button>
      </form>
    </div>
  );
}
