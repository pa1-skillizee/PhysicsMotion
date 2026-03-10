import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

export default function GalileoTowerActivity() {
    const [isDropping, setIsDropping] = useState(false);
    const [dropTime, setDropTime] = useState(0);
    const timerRef = useRef<number | NodeJS.Timeout | null>(null);

    // Initial heights in percentage
    const startY = 10;
    const endY = 85;

    // Simulation parameters
    const totalDurationSeconds = 3; 
    const fps = 60;
    const intervalMs = 1000 / fps;

    useEffect(() => {
        if (isDropping) {
            timerRef.current = setInterval(() => {
                setDropTime((prevTime) => {
                    const newTime = prevTime + intervalMs / 1000;
                    if (newTime >= totalDurationSeconds) {
                        clearInterval(timerRef.current as NodeJS.Timeout);
                        setIsDropping(false);
                        return totalDurationSeconds;
                    }
                    return newTime;
                });
            }, intervalMs);
        } else if (timerRef.current) {
            clearInterval(timerRef.current as NodeJS.Timeout);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current as NodeJS.Timeout);
        };
    }, [isDropping, intervalMs]);

    const handleDrop = () => {
        setIsDropping(true);
        setDropTime(0);
    };

    const handleReset = () => {
        setIsDropping(false);
        setDropTime(0);
    };

    // calculate position based on s = 1/2 * g * t^2 (simulated visually)
    // distance fraction = time^2 / totalTime^2
    const currentFraction = Math.pow(dropTime, 2) / Math.pow(totalDurationSeconds, 2);
    const currentY = startY + (endY - startY) * currentFraction;

    return (
        <div className="w-full bg-white p-12 rounded-[3.5rem] border-8 border-indigo-200 shadow-xl mb-16 relative overflow-hidden flex flex-col gap-12">
            <div>
                <h3 className="text-4xl font-extrabold text-indigo-900 mb-6 text-center">Interactive: Galileo's Leaning Tower 🏛️</h3>
                <p className="text-xl text-indigo-700 font-medium text-center max-w-3xl mx-auto mb-10">
                    Galileo famously proved that <b>acceleration due to gravity ($g$)</b> is constant for all bodies, regardless of their mass. Drop the heavy Bowling Ball and the light Feather in a vacuum!
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-16 items-center justify-center">
                
                {/* Visual Tower Area */}
                <div className="relative w-full md:w-1/2 h-96 bg-sky-50 rounded-3xl border-4 border-sky-200 overflow-hidden flex shadow-inner">
                    {/* Background Grid */}
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#bae6fd 2px, transparent 2px)', backgroundSize: '100% 40px' }}></div>
                    
                    {/* Leaning Tower simplified visual */}
                    <div className="absolute left-8 bottom-0 w-24 h-[90%] bg-stone-300 border-x-4 border-t-4 border-stone-400 rounded-t-xl rotate-[-2deg] flex flex-col items-center justify-around py-4">
                        <div className="w-16 h-8 bg-stone-400/50 rounded-full"></div>
                        <div className="w-16 h-8 bg-stone-400/50 rounded-full"></div>
                        <div className="w-16 h-8 bg-stone-400/50 rounded-full"></div>
                        <div className="w-16 h-8 bg-stone-400/50 rounded-full"></div>
                    </div>

                    {/* Objects */}
                    <div className="absolute right-1/2 translate-x-12 bottom-0 w-48 h-full flex justify-between pr-8">
                        {/* Bowling Ball */}
                        <div className="relative flex flex-col items-center w-1/2">
                            <motion.div 
                                className="absolute text-5xl z-10"
                                style={{ top: `${currentY}%` }}
                            >
                                🎳
                            </motion.div>
                            <div className="absolute top-4 text-xs font-bold text-sky-900 uppercase tracking-widest bg-white/60 px-2 py-1 rounded">10 kg</div>
                        </div>

                        {/* Feather */}
                        <div className="relative flex flex-col items-center w-1/2">
                             <motion.div 
                                className="absolute text-5xl z-10"
                                style={{ top: `${currentY}%` }}
                            >
                                🪶
                            </motion.div>
                            <div className="absolute top-4 text-xs font-bold text-sky-900 uppercase tracking-widest bg-white/60 px-2 py-1 rounded">0.01 kg</div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 w-full h-8 bg-emerald-600 border-t-4 border-emerald-700"></div>
                </div>

                {/* Dashboard Area */}
                <div className="w-full md:w-1/2 flex flex-col gap-8">
                    <div className="bg-indigo-50 p-8 rounded-3xl border-4 border-indigo-200 shadow-sm text-center">
                        <h4 className="text-2xl font-black text-indigo-900 mb-4">Vacuum Chamber</h4>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={handleDrop}
                                disabled={isDropping || dropTime >= totalDurationSeconds}
                                className={`px-8 py-4 rounded-xl font-bold text-xl text-white transition-all flex items-center gap-2 shadow-lg ${isDropping || dropTime >= totalDurationSeconds ? 'bg-slate-400 cursor-not-allowed transform ' : 'bg-indigo-600 hover:bg-indigo-500 hover:scale-105'}`}
                            >
                                <Play /> Drop Objects
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-6 py-4 rounded-xl font-bold text-lg text-indigo-700 bg-white border-4 border-indigo-200 hover:bg-indigo-100 transition-all flex items-center gap-2 shadow"
                            >
                                <RotateCcw /> Reset
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-emerald-50 p-6 rounded-2xl border-[4px] border-emerald-200 text-center child-bounce">
                            <h4 className="text-sm font-bold text-emerald-900 uppercase tracking-widest mb-1">Elapsed Time</h4>
                            <p className="text-3xl font-black text-emerald-600 font-mono">{dropTime.toFixed(2)}s</p>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-2xl border-[4px] border-purple-200 text-center">
                            <h4 className="text-sm font-bold text-purple-900 uppercase tracking-widest mb-1">Acceleration (g)</h4>
                            <p className="text-3xl font-black text-purple-600 font-mono">9.8 m/s²</p>
                        </div>
                    </div>

                    {dropTime >= totalDurationSeconds && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-amber-100 p-6 rounded-xl border-4 border-amber-300 text-center shadow-lg"
                        >
                            <h4 className="text-xl font-black text-amber-900 mb-2">Notice the Results! ✨</h4>
                            <p className="font-bold text-amber-800 text-lg">Both the 10kg ball and 0.01kg feather hit the ground at the exact same time! Mass does not affect uniform acceleration!</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
