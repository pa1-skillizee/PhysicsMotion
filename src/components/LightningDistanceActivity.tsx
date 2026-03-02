import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, CloudLightning, TimerReset } from 'lucide-react';

export default function LightningDistanceActivity() {
    // Activity States
    const [phase, setPhase] = useState<'IDLE' | 'FLASHED' | 'THUNDERED' | 'CALCULATED'>('IDLE');
    const [timeElapsed, setTimeElapsed] = useState(0); // in seconds
    const timerRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    // Physics constants
    const speedOfSound = 346; // m/s in air as per book

    const triggerLightning = () => {
        setPhase('FLASHED');
        startTimeRef.current = Date.now();

        // Start Stopwatch
        timerRef.current = setInterval(() => {
            if (startTimeRef.current) {
                const diff = (Date.now() - startTimeRef.current) / 1000;
                setTimeElapsed(diff);
            }
        }, 50); // High res update
    };

    const triggerThunder = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setPhase('THUNDERED');

        // Brief pause before showing calculation
        setTimeout(() => {
            setPhase('CALCULATED');
        }, 800);
    };

    const resetActivity = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setPhase('IDLE');
        setTimeElapsed(0);
        startTimeRef.current = null;
    };

    // Cleanup
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    // Calculated Distance (Distance = Speed * Time)
    const distanceMeters = speedOfSound * timeElapsed;
    const distanceKm = distanceMeters / 1000;

    return (
        <div className="w-full bg-slate-900 p-12 rounded-[3.5rem] border-8 border-slate-700 shadow-2xl mb-16 relative overflow-hidden group">

            {/* Dark Mode Background Effects */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIj48L2NpcmNsZT4KPC9zdmc+')] opacity-50 z-0"></div>

            {/* Simulated Lightning Flash Effects */}
            {phase === 'FLASHED' && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 0, 0.8, 0] }}
                    transition={{ duration: 0.5, times: [0, 0.1, 0.2, 1] }}
                    className="absolute inset-0 bg-white z-10 mix-blend-overlay pointer-events-none"
                />
            )}

            <div className="relative z-20">
                <h3 className="text-4xl font-extrabold text-blue-300 mb-4 text-center tracking-wide">
                    Activity: The Storm Calculator 🌩️
                </h3>
                <p className="text-xl text-slate-300 font-medium text-center max-w-3xl mx-auto mb-10 leading-relaxed">
                    Light travels incredibly fast, but sound is slower (<b>{speedOfSound} m/s</b>). Measure the time between seeing lightning and hearing thunder to calculate how far away the storm is!
                </p>

                <div className="flex flex-col md:flex-row gap-12 items-center justify-center">

                    {/* Visual Scene Area */}
                    <div className="w-full md:w-1/2 flex flex-col items-center gap-6">

                        <div className="relative w-full aspect-square max-w-sm bg-slate-800 rounded-full border-8 border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center">

                            {/* Moon/Clouds */}
                            <CloudLightning className={`w-32 h-32 transition-colors duration-300 ${phase === 'FLASHED' ? 'text-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,0.8)]' : 'text-slate-600'}`} />

                            {/* Soundwave animation for Thunder */}
                            {phase === 'THUNDERED' && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 1, borderWidth: "8px" }}
                                    animate={{ scale: 3, opacity: 0, borderWidth: "0px" }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="absolute w-32 h-32 rounded-full border-white"
                                />
                            )}
                        </div>

                        {/* Interactive Buttons */}
                        <div className="flex gap-4">
                            {phase === 'IDLE' && (
                                <button
                                    onClick={triggerLightning}
                                    className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-yellow-950 font-black text-xl rounded-full shadow-[0_0_20px_rgba(234,179,8,0.5)] transition-all hover:scale-105 flex items-center gap-2"
                                >
                                    <Zap /> 1. I See Lightning!
                                </button>
                            )}

                            {phase === 'FLASHED' && (
                                <button
                                    onClick={triggerThunder}
                                    className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-black text-xl rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all hover:scale-105 flex items-center gap-2 animate-pulse"
                                >
                                    🔊 2. I Hear Thunder!
                                </button>
                            )}

                            {(phase === 'THUNDERED' || phase === 'CALCULATED') && (
                                <button
                                    onClick={resetActivity}
                                    className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold text-xl rounded-full transition-all flex items-center gap-2"
                                >
                                    <TimerReset /> Reset Storm
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Data / Calculation Dashboard */}
                    <div className="w-full md:w-1/2 flex flex-col gap-6">

                        {/* Stopwatch */}
                        <div className="bg-slate-800 p-8 rounded-[2.5rem] border-4 border-slate-700 text-center shadow-inner">
                            <h4 className="text-slate-400 font-bold tracking-widest uppercase mb-2">Stopwatch Delay</h4>
                            <div className="text-6xl font-black text-white font-mono tracking-tighter">
                                {timeElapsed.toFixed(2)}<span className="text-2xl text-slate-500">s</span>
                            </div>
                        </div>

                        {/* Results Box */}
                        <motion.div
                            initial={{ opacity: 0.5, y: 20 }}
                            animate={{
                                opacity: phase === 'CALCULATED' ? 1 : 0.5,
                                y: phase === 'CALCULATED' ? 0 : 20,
                                scale: phase === 'CALCULATED' ? 1.02 : 1
                            }}
                            className={`p-8 rounded-[2.5rem] border-4 transition-colors ${phase === 'CALCULATED' ? 'bg-indigo-900 border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.3)]' : 'bg-slate-800 border-slate-700'}`}
                        >
                            <h4 className="text-indigo-300 font-bold text-xl mb-4">Calculation <span className="opacity-50">(d = v × t)</span></h4>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between border-b border-indigo-800/50 pb-2">
                                    <span className="text-slate-400 font-medium">Speed of Sound (v):</span>
                                    <span className="text-white font-bold">{speedOfSound} m/s</span>
                                </div>
                                <div className="flex justify-between border-b border-indigo-800/50 pb-2">
                                    <span className="text-slate-400 font-medium">Time Delay (t):</span>
                                    <span className="text-white font-bold">{timeElapsed.toFixed(2)} s</span>
                                </div>
                            </div>

                            <div className="bg-indigo-950/50 p-6 rounded-2xl border-2 border-indigo-800/50">
                                <h5 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Total Distance (d)</h5>
                                <div className="text-4xl font-black text-indigo-200">
                                    {phase === 'CALCULATED' ? `${distanceMeters.toFixed(0)} m` : '---'}
                                </div>
                                {phase === 'CALCULATED' && (
                                    <p className="text-indigo-400 font-medium mt-2">
                                        The storm is exactly <b>{distanceKm.toFixed(2)} kilometres</b> away!
                                    </p>
                                )}
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
}
