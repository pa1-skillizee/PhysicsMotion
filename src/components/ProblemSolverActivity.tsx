import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, AlertCircle, RefreshCw } from 'lucide-react';

export default function ProblemSolverActivity() {
    const [u, setU] = useState<string>('');
    const [v, setV] = useState<string>('');
    const [a, setA] = useState<string>('');
    const [t, setT] = useState<string>('');
    const [result, setResult] = useState<string | null>(null);
    const [solvingFor, setSolvingFor] = useState<string | null>(null);
    const [step1, setStep1] = useState<string>('');
    const [step2, setStep2] = useState<string>('');

    const handleSolve = () => {
        const uVal = parseFloat(u);
        const vVal = parseFloat(v);
        const aVal = parseFloat(a);
        const tVal = parseFloat(t);

        // Count empty strings
        const empties = [u, v, a, t].filter(val => val === '').length;
        if (empties !== 1) {
            alert("Please leave EXACTLY ONE field blank to solve for it!");
            return;
        }

        if (a === '') {
            setSolvingFor('a');
            const res = (vVal - uVal) / tVal;
            setStep1('a = (v - u) / t');
            setStep2(`a = (${vVal} - ${uVal}) / ${tVal}`);
            setResult(`${res.toFixed(2)} m/s²`);
        } else if (v === '') {
            setSolvingFor('v');
            const res = uVal + (aVal * tVal);
            setStep1('v = u + at');
            setStep2(`v = ${uVal} + (${aVal} × ${tVal})`);
            setResult(`${res.toFixed(2)} m/s`);
        } else if (u === '') {
            setSolvingFor('u');
            const res = vVal - (aVal * tVal);
            setStep1('u = v - at');
            setStep2(`u = ${vVal} - (${aVal} × ${tVal})`);
            setResult(`${res.toFixed(2)} m/s`);
        } else if (t === '') {
            setSolvingFor('t');
            const res = (vVal - uVal) / aVal;
            setStep1('t = (v - u) / a');
            setStep2(`t = (${vVal} - ${uVal}) / ${aVal}`);
            setResult(`${res.toFixed(2)} s`);
        }
    };

    const handleClear = () => {
        setU(''); setV(''); setA(''); setT('');
        setResult(null); setSolvingFor(null);
    };



    return (
        <div className="w-full bg-white rounded-[3.5rem] border-8 border-slate-100 shadow-2xl p-8 md:p-12 my-12 overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h3 className="text-4xl font-black text-slate-800 flex items-center gap-3">
                        <Calculator className="w-10 h-10 text-indigo-500" />
                        Smart Solver: Rahul's Bicycle
                    </h3>
                    <p className="text-slate-500 font-medium mt-2">Interact with the data to see how acceleration is calculated.</p>
                </div>

                <div className="flex bg-slate-100 p-2 rounded-3xl gap-2 border-2 border-slate-200">
                    <button
                        onClick={handleClear}
                        className="px-6 py-3 rounded-2xl font-black transition-all text-slate-500 hover:text-slate-700 flex items-center gap-2"
                    >
                        <RefreshCw size={20} /> Clear Data
                    </button>
                    <button
                        onClick={handleSolve}
                        className="px-8 py-3 rounded-2xl font-black transition-all bg-indigo-500 text-white shadow-md hover:bg-indigo-600 hover:scale-105"
                    >
                        SOLVE
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Input Fields */}
                <div className="space-y-6">
                    <div className="p-8 rounded-[2.5rem] bg-indigo-50 border-4 border-indigo-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-4 bg-indigo-500 rounded-2xl text-white">
                                <Calculator className="w-8 h-8" />
                            </div>
                            <h4 className="text-2xl font-black text-indigo-700">Interactive Equation Setup</h4>
                        </div>
                        <p className="text-slate-600 text-lg font-medium leading-relaxed mb-6">
                            Enter any 3 values below, and leave the 4th one exactly blank to solve for it.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Initial Velocity (u) m/s</label>
                                <input type="number" value={u} onChange={(e) => setU(e.target.value)} className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl font-bold text-lg outline-indigo-500" placeholder="e.g. 0" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Final Velocity (v) m/s</label>
                                <input type="number" value={v} onChange={(e) => setV(e.target.value)} className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl font-bold text-lg outline-indigo-500" placeholder="e.g. 10" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Acceleration (a) m/s²</label>
                                <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl font-bold text-lg outline-indigo-500" placeholder="e.g. 2" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Time (t) s</label>
                                <input type="number" value={t} onChange={(e) => setT(e.target.value)} className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl font-bold text-lg outline-indigo-500" placeholder="e.g. 5" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Math breakdown */}
                <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col justify-center min-h-[400px]">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Calculator className="w-32 h-32" />
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-3 text-indigo-400 font-bold uppercase tracking-widest text-sm">
                            <span className="w-8 h-[2px] bg-indigo-500"></span>
                            Step-by-Step Solution
                        </div>

                        {result ? (
                            <div className="space-y-8 font-mono">
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="text-2xl"
                                >
                                    <span className="text-slate-500">1. Formula:</span>
                                    <div className="mt-2 text-3xl font-black text-indigo-300">
                                        {step1}
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                                    className="text-2xl"
                                >
                                    <span className="text-slate-500">2. Substitution:</span>
                                    <div className="mt-2 text-3xl font-black">
                                        {step2}
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                                    className={`p-6 rounded-3xl border-4 border-emerald-500/30 bg-emerald-500/10`}
                                >
                                    <span className="text-slate-500">3. Result ({solvingFor}):</span>
                                    <div className={`mt-2 text-5xl font-black text-emerald-400 flex items-baseline gap-2`}>
                                        {result}
                                    </div>
                                </motion.div>
                            </div>
                        ) : (
                            <div className="text-center text-slate-500 font-bold mt-10">
                                Enter 3 values and click SOLVE to see the magic.
                            </div>
                        )}

                        {result && solvingFor === 'a' && parseFloat(result) < 0 && (
                            <div className="flex items-center gap-3 bg-rose-500/20 text-rose-300 p-4 rounded-2xl border border-rose-500/30 mt-6">
                                <AlertCircle className="w-6 h-6 shrink-0" />
                                <p className="text-sm font-bold italic">Note the negative sign! This is called Deceleration or Retardation.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


