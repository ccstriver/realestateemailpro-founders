import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-6">RealEstateEmailPro</h1>
      <p className="text-2xl mb-8 max-w-2xl text-center">
        AI that writes high-converting cold emails for real estate agents — FSBOs, expireds, circle prospecting, probate, absentee owners.
      </p>
      <p className="text-lg text-slate-400 mb-12">
        Founding member beta — unlimited AI emails forever
      </p>
      <a
        href="https://realestateemailpro.lemonsqueezy.com/checkouts/founding-lifetime"
        target="_blank"
        rel="noopener noreferrer"
        className="px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white text-xl font-semibold rounded-lg shadow-lg transition mb-12"
      >
        Claim Lifetime Access – $299 (first 50 only)
      </a>
      <p className="text-slate-400">
        Already a founding member?{' '}
        <Link href="/auth" className="text-emerald-400 hover:underline">
          Log in here
        </Link>
      </p>
    </div>
  );
}