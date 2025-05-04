import React from 'react';

const faqItems = [
  {
    question: 'Why do you need my wallet address?',
    answer: 'We collect your wallet address for identity linkage only. No transactions will be made without your explicit consent. This helps us verify unique users and prepare for future token distributions or rewards.'
  },
  {
    question: 'How is my email protected?',
    answer: 'Your email is never sold or shared with third parties. We use it only to communicate important updates about the Agent Genesis Protocol and to verify your waitlist position.'
  },
  {
    question: 'How is my data stored?',
    answer: 'All data is stored securely and encrypted on Supabase, a modern database platform with enterprise-grade security measures. We follow best practices for data protection and privacy.'
  },
  {
    question: 'What are referral points?',
    answer: 'You earn 1 point for each person who joins the waitlist using your referral code. Higher points may lead to earlier access, special rewards, or other benefits when Agent Genesis Protocol launches.'
  },
  {
    question: 'Can I check my position later?',
    answer: 'Yes! You can always return to the "Check Rank" page and enter your email to see your current position, referral count, and referral code.'
  }
];

export default function FAQ() {
  return (
    <section className="w-full max-w-4xl mx-auto py-12">
      <h2 className="text-2xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-white">{item.question}</h3>
            <p className="text-gray-300">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
