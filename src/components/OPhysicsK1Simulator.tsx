import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function OPhysicsK1Simulator() {
    const [x0, setX0] = useState(0);
    const [v0, setV0] = useState(0);
    const [accel, setAccel] = useState(0);
    const [time, setTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const requestRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const maxTime = 10; // seconds

    useEffect(() => {
        const animate = (timestamp: number) => {
            if (!lastTimeRef.current) lastTimeRef.current = timestamp;
            const deltaTime = (timestamp - lastTimeRef.current) / 1000;
            lastTimeRef.current = timestamp;

            if (isPlaying) {
                setTime(prevTime => {
                    const newTime = prevTime + deltaTime;
                    if (newTime >= maxTime) {
                        setIsPlaying(false);
                        return maxTime;
                    }
                    return newTime;
                });
            }
            requestRef.current = requestAnimationFrame(animate);
        };

        if (isPlaying) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            lastTimeRef.current = 0; // reset to prevent huge jumps when unpausing
        }

        return () => cancelAnimationFrame(requestRef.current);
    }, [isPlaying]);

    // Graph plotting logic
    const generatePath = (calcFunction: (t: number) => number, minY: number, maxY: number) => {
        let path = '';
        const w = 300;
        const h = 200;
        const pts = 50;

        for (let i = 0; i <= pts; i++) {
            const t = (i / pts) * maxTime;
            const yVal = calcFunction(t);
            
            // Map t [0, 10] to x [0, 300]
            const svgX = (t / maxTime) * w;
            
            // Check boundaries - if we exceed, stop drawing the path to avoid horizontal lines
            if (yVal > maxY || yVal < minY) {
                // To make a clean cut at the boundary, we could find the exact t, 
                // but for simplicity, breaking here or drawing one last point at clamped pos is better.
                const clampedY = Math.max(minY, Math.min(maxY, yVal));
                const svgY = h - ((clampedY - minY) / (maxY - minY)) * h;
                path += `L ${svgX} ${svgY} `;
                break; 
            }

            const svgY = h - ((yVal - minY) / (maxY - minY)) * h;

            if (i === 0) path += `M ${svgX} ${svgY} `;
            else path += `L ${svgX} ${svgY} `;
        }
        return path;
    };

    const posX = (t: number) => x0 + v0 * t + 0.5 * accel * t * t;
    const velV = (t: number) => v0 + accel * t;
    const accA = (_t: number) => accel;

    // Current Values
    const currentX = posX(time);
    const currentV = velV(time);
    const currentA = accA(time);

    // Dynamic marker positions (mapping to graph coords)
    const mapY = (val: number, min: number, max: number) => 200 - ((Math.max(min, Math.min(max, val)) - min) / (max - min)) * 200;
    const markerX = (time / maxTime) * 300;

    return (
        <div className="w-full bg-slate-900 rounded-[3.5rem] p-8 md:p-12 shadow-2xl my-16 border-4 border-slate-800 relative overflow-hidden text-white">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <span className="bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full font-black text-xs tracking-widest uppercase mb-4 inline-block border border-emerald-500/30">OPhysics Integration</span>
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">Constant Acceleration Simulator</h3>
                    <p className="text-slate-400 font-medium max-w-2xl">
                        Adjust the initial position, velocity, and acceleration to see how the kinematic graphs are perfectly linked through calculus.
                    </p>
                </div>

                <div className="flex bg-slate-800 p-2 rounded-2xl border border-slate-700">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all ${isPlaying ? 'bg-amber-500 hover:bg-amber-400 text-slate-900' : 'bg-emerald-500 hover:bg-emerald-400 text-white'}`}
                    >
                        {isPlaying ? <Pause size={28} className="fill-current" /> : <Play size={32} className="ml-1 fill-current" />}
                    </button>
                    <button
                        onClick={() => { setIsPlaying(false); setTime(0); }}
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>
            </div>

            {/* Visualizer Track */}
            <div className="w-full h-40 bg-slate-800 rounded-3xl border border-slate-700 mb-10 relative overflow-hidden flex items-center shadow-inner pt-4">
                {/* Center Line Marker */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-700/50"></div>
                <div className="absolute left-1/2 bottom-2 text-xs font-bold text-slate-500 -translate-x-1/2 bg-slate-800 px-2 rounded-full">x = 0</div>
                
                {/* Tick Marks for Track -50 to 50 mapping */}
                <div className="absolute bottom-2 w-full flex justify-between px-4 opacity-50 text-slate-400 font-mono text-xs font-bold pointer-events-none z-0">
                    <span>-50</span>
                    <span>-40</span>
                    <span>-30</span>
                    <span>-20</span>
                    <span>-10</span>
                    <span className="text-white opacity-0">0</span>
                    <span>10</span>
                    <span>20</span>
                    <span>30</span>
                    <span>40</span>
                    <span>50</span>
                </div>

                {/* The Car */}
                <div
                    className={`absolute top-1/2 -mt-6 text-5xl transform -translate-x-1/2 drop-shadow-lg transition-transform ${currentV >= 0 ? 'scale-x-[-1]' : 'scale-x-100'}`}
                    style={{ left: `${50 + (currentX / 100) * 50}%` }} // Maps x [-50, 50] to left [25%, 75%] approx visually
                >
                    🏎️
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Sliders Panel */}
                <div className="lg:col-span-1 bg-slate-800/50 p-6 rounded-3xl border border-slate-700 flex flex-col gap-8">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-blue-400 text-sm font-bold">Position (x₀)</span>
                            <div className="flex items-center gap-2">
                                <input type="number" className="w-16 px-1 py-1 bg-slate-900 border border-slate-600 rounded text-center text-white text-sm" value={x0} onChange={(e) => { setX0(Number(e.target.value)); setTime(0); setIsPlaying(false); }} />
                                <span className="text-white text-sm font-bold">m</span>
                            </div>
                        </div>
                        <input type="range" min="-50" max="50" value={x0} onChange={(e) => { setX0(Number(e.target.value)); setTime(0); setIsPlaying(false); }} className="w-full accent-blue-500" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-emerald-400 text-sm font-bold">Velocity (v₀)</span>
                            <div className="flex items-center gap-2">
                                <input type="number" className="w-16 px-1 py-1 bg-slate-900 border border-slate-600 rounded text-center text-white text-sm" value={v0} onChange={(e) => { setV0(Number(e.target.value)); setTime(0); setIsPlaying(false); }} />
                                <span className="text-white text-sm font-bold">m/s</span>
                            </div>
                        </div>
                        <input type="range" min="-20" max="20" value={v0} onChange={(e) => { setV0(Number(e.target.value)); setTime(0); setIsPlaying(false); }} className="w-full accent-emerald-500" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-rose-400 text-sm font-bold">Acceleration (a)</span>
                            <div className="flex items-center gap-2">
                                <input type="number" className="w-16 px-1 py-1 bg-slate-900 border border-slate-600 rounded text-center text-white text-sm" value={accel} onChange={(e) => { setAccel(Number(e.target.value)); setTime(0); setIsPlaying(false); }} />
                                <span className="text-white text-sm font-bold">m/s²</span>
                            </div>
                        </div>
                        <input type="range" min="-10" max="10" value={accel} onChange={(e) => { setAccel(Number(e.target.value)); setTime(0); setIsPlaying(false); }} className="w-full accent-rose-500" />
                    </div>

                    <div className="mt-auto bg-slate-900 border border-slate-700 p-4 rounded-2xl">
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Current Time</div>
                        <div className="text-3xl font-mono font-black text-amber-400">{time.toFixed(1)}s</div>
                    </div>
                </div>

                {/* Graphs */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Position Graph */}
                    <div className="bg-slate-800 rounded-3xl p-5 border border-slate-700 shadow-lg relative">
                        <h4 className="text-blue-400 font-bold text-sm tracking-widest uppercase mb-4">Position vs Time</h4>
                        <div className="relative w-full aspect-[3/2] bg-slate-900/50 rounded-xl overflow-hidden shadow-inner border border-slate-700/50">
                            {/* Grid Layout */}
                            <div className="absolute top-1/2 w-full h-[1px] bg-slate-700"></div>
                            <svg className="w-full h-full overflow-visible relative z-10" viewBox="0 0 300 200" preserveAspectRatio="none">
                                <path d={generatePath(posX, -150, 150)} fill="none" stroke="#3b82f6" strokeWidth="4" className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                <circle cx={markerX} cy={mapY(currentX, -150, 150)} r="6" fill="#60a5fa" className="drop-shadow-[0_0_10px_#60a5fa]" />
                                <line x1={markerX} y1="0" x2={markerX} y2="200" stroke="#60a5fa" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 4" />
                            </svg>
                        </div>
                        <div className="mt-3 text-center font-mono font-bold text-blue-300">x = {currentX.toFixed(1)} m</div>
                    </div>

                    {/* Velocity Graph */}
                    <div className="bg-slate-800 rounded-3xl p-5 border border-slate-700 shadow-lg relative">
                        <h4 className="text-emerald-400 font-bold text-sm tracking-widest uppercase mb-4">Velocity vs Time</h4>
                        <div className="relative w-full aspect-[3/2] bg-slate-900/50 rounded-xl overflow-hidden shadow-inner border border-slate-700/50">
                            <div className="absolute top-1/2 w-full h-[1px] bg-slate-700"></div>
                            <svg className="w-full h-full overflow-visible relative z-10" viewBox="0 0 300 200" preserveAspectRatio="none">
                                <path d={generatePath(velV, -50, 50)} fill="none" stroke="#10b981" strokeWidth="4" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <circle cx={markerX} cy={mapY(currentV, -50, 50)} r="6" fill="#34d399" className="drop-shadow-[0_0_10px_#34d399]" />
                                <line x1={markerX} y1="0" x2={markerX} y2="200" stroke="#34d399" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 4" />
                            </svg>
                        </div>
                        <div className="mt-3 text-center font-mono font-bold text-emerald-300">v = {currentV.toFixed(1)} m/s</div>
                    </div>

                    {/* Acceleration Graph */}
                    <div className="bg-slate-800 rounded-3xl p-5 border border-slate-700 shadow-lg relative">
                        <h4 className="text-rose-400 font-bold text-sm tracking-widest uppercase mb-4">Accel vs Time</h4>
                        <div className="relative w-full aspect-[3/2] bg-slate-900/50 rounded-xl overflow-hidden shadow-inner border border-slate-700/50">
                            <div className="absolute top-1/2 w-full h-[1px] bg-slate-700"></div>
                            <svg className="w-full h-full overflow-visible relative z-10" viewBox="0 0 300 200" preserveAspectRatio="none">
                                <path d={generatePath(accA, -15, 15)} fill="none" stroke="#f43f5e" strokeWidth="4" className="drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                                <circle cx={markerX} cy={mapY(currentA, -15, 15)} r="6" fill="#fb7185" className="drop-shadow-[0_0_10px_#fb7185]" />
                                <line x1={markerX} y1="0" x2={markerX} y2="200" stroke="#fb7185" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 4" />
                            </svg>
                        </div>
                        <div className="mt-3 text-center font-mono font-bold text-rose-300">a = {currentA.toFixed(1)} m/s²</div>
                    </div>
                </div>
            </div>

        </div>
    );
}
