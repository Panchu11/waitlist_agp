import React from 'react';
import { WaitlistEntry } from '@/utils/supabase';

interface ConfirmationSectionProps {
  entry: WaitlistEntry;
  rank: number;
  referralCount: number;
}

export default function ConfirmationSection({
  entry,
  rank,
  referralCount,
}: ConfirmationSectionProps) {
  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.host}`
    : 'https://waitlist.agprotocol.xyz';

  const referralLink = `${baseUrl}?ref=${entry.referral_code}`;

  const shareText = `I just joined the Agent Genesis Protocol waitlist! Be first to enter the age of autonomous agents. Join me using my referral link: ${referralLink}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`;
  const discordText = `I just joined the Agent Genesis Protocol waitlist! Be first to enter the age of autonomous agents.\n\nJoin me using my referral link: ${referralLink}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-800 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">You're In!</h2>
        <p className="text-gray-300 mt-1">Thanks for joining the waitlist</p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
          <span className="font-medium text-white">Your Position</span>
          <span className="text-xl font-bold text-blue-400">{rank}</span>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
          <span className="font-medium text-white">Referral Points</span>
          <span className="text-xl font-bold text-blue-400">{referralCount}</span>
        </div>

        <div className="p-3 bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-white">Your Referral Code</span>
            <button
              onClick={() => copyToClipboard(entry.referral_code)}
              className="text-blue-400 text-sm hover:text-blue-300"
            >
              Copy
            </button>
          </div>
          <div className="font-mono text-sm bg-gray-700 text-white p-2 rounded border border-gray-600 break-all">
            {entry.referral_code}
          </div>
        </div>

        <div className="p-3 bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-white">Shareable Link</span>
            <button
              onClick={() => copyToClipboard(referralLink)}
              className="text-blue-400 text-sm hover:text-blue-300"
            >
              Copy
            </button>
          </div>
          <div className="font-mono text-sm bg-gray-700 text-white p-2 rounded border border-gray-600 break-all">
            {referralLink}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-center mb-2 text-white">Share Your Referral Link</h3>
        <div className="grid grid-cols-3 gap-3">
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <svg className="h-6 w-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            <span className="text-xs">Twitter</span>
          </a>

          <a
            href={telegramShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            <svg className="h-6 w-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.654-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.952z" />
            </svg>
            <span className="text-xs">Telegram</span>
          </a>

          <button
            onClick={() => copyToClipboard(discordText)}
            className="flex flex-col items-center justify-center p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <svg className="h-6 w-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            <span className="text-xs">Discord</span>
          </button>
        </div>
      </div>
    </div>
  );
}
