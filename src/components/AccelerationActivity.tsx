import { useState } from 'react';
import Groq from 'groq-sdk';
import { motion } from 'framer-motion';

// Initialize Groq client using Vite environment variable
const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });

export default function AccelerationActivity() {
    const [scenarioText, setScenarioText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [resultData, setResultData] = useState<{ type: string, explanation: string } | null>(null);

    const handleAnalyze = async () => {
        if (!scenarioText.trim()) return;
        setIsAnalyzing(true);
        setResultData(null);

        try {
            const systemPrompt = `You are a fun, encouraging Physics teacher named Professor Velocity.
A student is providing a real-world scenario of an object in motion.
You must analyze their scenario and determine what type of acceleration it demonstrates from the following 4 options:
1. Positive Acceleration
2. Negative Acceleration (Retardation)
3. Uniform Acceleration
4. Non-Uniform Acceleration

Format your response EXACTLY as a JSON object with this shape and absolutely no other text:
{
  "type": "One of the 4 exact options named above",
  "explanation": "A fun, enthusiastic, 2-3 sentence explanation directly addressing the student's scenario and why it fits this type of acceleration. Use emojis!"
}`;

            const response = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: `Scenario to analyze: "${scenarioText}"` }
                ],
                model: "llama3-8b-8192", // Using an extremely fast standard model
                temperature: 0.5,
                max_tokens: 300,
                response_format: { type: "json_object" }
            });

            const content = response.choices[0]?.message?.content;
            if (content) {
                const parsed = JSON.parse(content);
                setResultData({
                    type: parsed.type || 'Unknown Acceleration',
                    explanation: parsed.explanation || 'Oops! My AI brain got a little dizzy analyzing that one.'
                });
            }
        } catch (error) {
            console.error(error);
            setResultData({
                type: 'System Error',
                explanation: 'Uh oh! My connection to the AI supercomputer dropped. Make sure the API key is valid!'
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="w-full bg-indigo-50 p-8 md:p-12 rounded-[3.5rem] border-8 border-indigo-200 shadow-xl my-16 relative overflow-hidden">
            <h3 className="text-4xl font-extrabold text-indigo-900 mb-4 text-center">🤖 Ask Professor AI: The Acceleration Explorer</h3>
            <p className="text-lg text-indigo-700 font-medium text-center max-w-3xl mx-auto mb-10">
                Think of an action in real life! (e.g. "Dropping a bouncy ball from a roof", "A racecar slamming on the brakes", "A kid swinging back and forth").
                Type it below, and Professor AI will figure out what kind of acceleration it is!
            </p>

            <div className="flex flex-col gap-6 items-center w-full max-w-4xl mx-auto">
                <textarea
                    className="w-full h-32 p-6 rounded-3xl border-4 border-indigo-300 focus:border-indigo-500 text-xl text-slate-700 font-bold shadow-inner resize-none transition-colors"
                    placeholder="Enter your scenario here! (e.g. A space shuttle taking off into orbit!)"
                    value={scenarioText}
                    onChange={(e) => setScenarioText(e.target.value)}
                />

                <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !scenarioText.trim()}
                    className={`px-10 py-5 rounded-full font-black text-2xl uppercase tracking-widest text-white shadow-[0_10px_0_rgba(79,70,229,0.8)] transition-all ${isAnalyzing || !scenarioText.trim()
                            ? 'bg-slate-400 shadow-[0_10px_0_rgba(148,163,184,0.8)] cursor-not-allowed translate-y-2 pb-5'
                            : 'bg-indigo-500 hover:bg-indigo-400 active:translate-y-2 active:shadow-none'
                        }`}
                >
                    {isAnalyzing ? 'Analyzing... 🧠' : 'Evaluate Motion! 🚀'}
                </button>

                {resultData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="w-full mt-8 p-8 bg-white border-4 border-emerald-300 rounded-[2.5rem] shadow-2xl relative"
                    >
                        <div className="absolute -top-6 -left-6 text-6xl">👨‍🔬</div>
                        <h4 className="text-2xl font-bold text-slate-500 uppercase tracking-widest mb-2 font-mono ml-8">AI Analysis Complete</h4>
                        <div className="text-4xl font-black text-emerald-600 mb-6 bg-emerald-50 inline-block px-6 py-2 rounded-2xl ml-8 shadow-sm">
                            {resultData.type}
                        </div>
                        <p className="text-2xl text-slate-700 font-medium leading-relaxed bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 italic">
                            "{resultData.explanation}"
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
