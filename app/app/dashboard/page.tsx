'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [prospectType, setProspectType] = useState('FSBO');
  const [tone, setTone] = useState('professional');
  const [agentName, setAgentName] = useState('');
  const [prospectName, setProspectName] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const generateEmail = async () => {
    if (!agentName) {
      alert('Please enter your name');
      return;
    }

    setLoading(true);
    setGeneratedEmail('');

    const prompt = `You are a top-performing real estate agent named ${agentName}. Write a personalized cold email to ${prospectName || 'the homeowner'} about their ${prospectType} property at ${propertyAddress || 'their address'}. 

Tone: ${tone}. 
Keep it under 150 words, natural, and human-sounding. 
Include value for them (market update, free CMA, no pressure). 
End with a clear, low-pressure call to action to schedule a quick call.

Do not mention that this email was AI-generated.`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer gsk_temp_use_your_own_key_here_for_testing',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      setGeneratedEmail(data.choices[0].message.content.trim());
    } catch (err) {
      setGeneratedEmail('Error generating email. Check your Groq API key or try again.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">AI Cold Email Generator</h1>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <label className="block text-lg mb-2">Your Name (Agent)</label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full p-4 rounded-lg bg-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Prospect Name (optional)</label>
              <input
                type="text"
                value={prospectName}
                onChange={(e) => setProspectName(e.target.value)}
                placeholder="e.g. Mr. Smith"
                className="w-full p-4 rounded-lg bg-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Property Address (optional)</label>
              <input
                type="text"
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                placeholder="e.g. 123 Main St, Anytown"
                className="w-full p-4 rounded-lg bg-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Prospect Type</label>
              <select value={prospectType} onChange={(e) => setProspectType(e.target.value)} className="w-full p-4 rounded-lg bg-slate-800 text-white">
                <option value="FSBO">FSBO</option>
                <option value="Expired Listing">Expired Listing</option>
                <option value="Circle Prospecting">Circle Prospecting</option>
                <option value="Probate">Probate</option>
                <option value="Absentee Owner">Absentee Owner</option>
              </select>
            </div>
            <div>
              <label className="block text-lg mb-2">Tone</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full p-4 rounded-lg bg-slate-800 text-white">
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="direct">Direct & Confident</option>
              </select>
            </div>
            <button
              onClick={generateEmail}
              disabled={loading}
              className="w-full py-5 text-xl font-bold rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 transition"
            >
              {loading ? 'Generating Email...' : 'Generate Cold Email'}
            </button>
          </div>
          <div>
            <label className="block text-lg mb-2">Your Generated Email</label>
            <textarea
              value={generatedEmail}
              readOnly
              rows={20}
              className="w-full p-6 rounded-lg bg-slate-800 text-white font-mono text-sm leading-relaxed"
              placeholder="Your AI-generated email will appear here. Copy and send!"
            />
          </div>
        </div>
      </div>
    </div>
  );
}