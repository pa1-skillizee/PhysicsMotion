import { useState } from 'react';
import { motion } from 'framer-motion';
import { Train } from 'lucide-react';

export default function GraphTrainJourneyActivity() {
    const [timeValue, setTimeValue] = useState(0);

    // Timeline mapping:
    // 0 = 08:00 (A start) - Distance 0
    // 30 = 08:30 (A depart)
    // 145 = 10:25 (B arrival) - Distance 120
    // 160 = 10:40 (B depart) - Distance 120
    // 255 = 12:15 (C arrival) - Distance 180

    const getDistance = (t: number) => {
        if (t < 30) return 0; // Waiting at A
        if (t >= 30 && t < 145) { // Traveling A to B
            const duration = 145 - 30;
            const progress = (t - 30) / duration;
            return 0 + (120 * progress);
        }
        if (t >= 145 && t < 160) return 120; // Waiting at B
        if (t >= 160 && t <= 255) { // Traveling B to C
            const duration = 255 - 160;
            const progress = (t - 160) / duration;
            return 120 + (60 * progress);
        }
        return 180; // Reached C
    };

    const currentDistance = getDistance(timeValue);

    // SVG graph rendering
    const maxTime = 255;
    const maxDistance = 180;

    const mapSVGX = (t: number) => (t / maxTime) * 100; // Percentage
    const mapSVGY = (d: number) => 100 - ((d / maxDistance) * 100); // Percentage inverted for Y

    const graphPath = `
        M ${mapSVGX(0)} ${mapSVGY(0)}
        L ${mapSVGX(30)} ${mapSVGY(0)}
        L ${mapSVGX(145)} ${mapSVGY(120)}
        L ${mapSVGX(160)} ${mapSVGY(120)}
        L ${mapSVGX(255)} ${mapSVGY(180)}
    `;

    const formatTime = (t: number) => {
        const hours = 8 + Math.floor(t / 60);
        const mins = t % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-slate-900 rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900 via-slate-900 to-black"></div>

            <div className="relative z-10">
                <div className="text-center mb-10">
                    <h3 className="text-3xl font-black text-white mb-2">The Train Conductor</h3>
                    <p className="text-slate-400 font-medium">Drag the timeline slider to drive the train from Station A to Station C. Watch the graph flatten when the train is parked!</p>
                </div>

                {/* The Map / Railway */}
                <div className="w-full bg-slate-800 rounded-3xl p-6 mb-8 border border-slate-700 relative h-32 flex items-center">
                    {/* Railway line */}
                    <div className="absolute inset-x-12 top-1/2 h-2 -translate-y-1/2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-full h-full border-t border-slate-600 border-dashed opacity-50"></div>
                    </div>

                    {/* Stations */}
                    <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between z-0">
                        <div className="w-4 h-8 bg-amber-500 rounded-md shadow-[0_0_15px_rgba(245,158,11,0.5)] transform -translate-x-1/2">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">A</div>
                        </div>
                        <div className="w-4 h-8 bg-amber-500 rounded-md shadow-[0_0_15px_rgba(245,158,11,0.5)] transform translate-x-[33px]">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">B</div>
                        </div>
                        <div className="w-4 h-8 bg-amber-500 rounded-md shadow-[0_0_15px_rgba(245,158,11,0.5)] transform translate-x-1/2">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">C</div>
                        </div>
                    </div>

                    {/* The Moving Train */}
                    <motion.div
                        animate={{ left: `${(currentDistance / maxDistance) * 100}%` }}
                        transition={{ type: "tween", duration: 0.1 }}
                        className="absolute h-12 w-16 bg-sky-500 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.5)] z-20 flex items-center justify-center -translate-x-1/2 transform -translate-y-1/2 mt-12"
                        // Add margin of error for left padding scaling
                        style={{ marginLeft: '2rem', marginRight: '2rem' }}
                    >
                        <Train className="text-white w-8 h-8 drop-shadow-md" />
                    </motion.div>
                </div>

                {/* The Core Interactive Graph */}
                <div className="w-full h-64 bg-slate-800/80 rounded-3xl border border-slate-700 relative overflow-hidden mb-8 p-6">
                    <h4 className="absolute top-4 left-6 text-sky-400 font-bold uppercase tracking-widest text-xs z-20">Distance vs Time</h4>

                    <svg className="w-full h-full overflow-visible z-10 relative" preserveAspectRatio="none">
                        {/* Static Path */}
                        <path
                            d={graphPath.replace(/%/g, '')} // Need pure coordinates internally mapping directly 0-100 to SVG viewBox 0-100
                            fill="none"
                            stroke="#334155" // slate-700
                            strokeWidth="0.5"
                            vectorEffect="non-scaling-stroke"
                        />
                        {/* Dynamic Path Mask */}
                        <clipPath id="graph-mask">
                            <rect x="0" y="0" width={`${(timeValue / maxTime) * 100}%`} height="100%" />
                        </clipPath>
                        <path
                            d={"M 0 100 L 11.76 100 L 56.86 33.33 L 62.74 33.33 L 100 0"} // Pre-computed coordinates for 0-100 viewBox
                            fill="none"
                            stroke="#38bdf8" // sky-400
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            clipPath="url(#graph-mask)"
                            className="drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]"
                            vectorEffect="non-scaling-stroke"
                        />
                        {/* Plot dot indicator */}
                        <circle
                            cx={`${(timeValue / maxTime) * 100}%`}
                            cy={`${mapSVGY(currentDistance)}%`}
                            r="6"
                            fill="#white"
                            className="drop-shadow-[0_0_8px_rgba(255,255,255,1)] pointer-events-none"
                        />
                    </svg>

                    {/* Annotations */}
                    <div className="absolute inset-x-6 inset-y-6 pointer-events-none grid grid-rows-3 text-slate-500 font-bold text-xs opacity-50">
                        <div className="border-b border-dashed border-slate-700">180km</div>
                        <div className="border-b border-dashed border-slate-700">120km</div>
                        <div className="border-b border-dashed border-slate-700">60km</div>
                    </div>
                </div>

                {/* Controls & Current State Data */}
                <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 flex flex-col md:flex-row items-center gap-8 justify-between">
                    <div className="w-full md:w-2/3">
                        <input
                            type="range"
                            min="0"
                            max={maxTime}
                            value={timeValue}
                            onChange={(e) => setTimeValue(Number(e.target.value))}
                            className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                        />
                        <div className="flex justify-between w-full mt-2 text-xs font-black text-slate-500">
                            <span>08:00</span>
                            <span>09:00</span>
                            <span>10:00</span>
                            <span>11:00</span>
                            <span>12:00</span>
                        </div>
                    </div>

                    <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl p-4 w-full md:w-1/3 flex justify-around">
                        <div className="text-center">
                            <span className="block text-slate-500 text-xs font-bold uppercase mb-1">Clock</span>
                            <span className="text-2xl font-black text-white">{formatTime(timeValue)}</span>
                        </div>
                        <div className="w-px bg-slate-700"></div>
                        <div className="text-center">
                            <span className="block text-slate-500 text-xs font-bold uppercase mb-1">Odometer</span>
                            <span className="text-2xl font-black text-sky-400">{currentDistance.toFixed(0)} <span className="text-sm">km</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
