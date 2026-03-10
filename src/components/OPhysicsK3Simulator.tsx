import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function OPhysicsK3Simulator() {
    const [accel1, setAccel1] = useState(0);
    const [accel2, setAccel2] = useState(0);
    const [accel3, setAccel3] = useState(0);
    const [time, setTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const requestRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const maxTime = 10; // seconds

    // Segments: 0-3s, 3-7s, 7-10s
    const t1 = 3;
    const t2 = 7;

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
            lastTimeRef.current = 0;
        }

        return () => cancelAnimationFrame(requestRef.current);
    }, [isPlaying]);

    // Math Engine for Piecewise Functions
    const accA = (t: number) => {
        if (t < t1) return accel1;
        if (t < t2) return accel2;
        return accel3;
    };

    const velV = (t: number) => {
        if (t <= t1) return accel1 * t;
        const v1 = accel1 * t1;
        if (t <= t2) return v1 + accel2 * (t - t1);
        const v2 = v1 + accel2 * (t2 - t1);
        return v2 + accel3 * (t - t2);
    };

    const posX = (t: number) => {
        if (t <= t1) return 0.5 * accel1 * t * t;
        const p1 = 0.5 * accel1 * t1 * t1;
        const v1 = accel1 * t1;
        if (t <= t2) {
            const dt = t - t1;
            return p1 + v1 * dt + 0.5 * accel2 * dt * dt;
        }
        const dt2 = t2 - t1;
        const p2 = p1 + v1 * dt2 + 0.5 * accel2 * dt2 * dt2;
        const v2 = v1 + accel2 * dt2;
        const dt3 = t - t2;
        return p2 + v2 * dt3 + 0.5 * accel3 * dt3 * dt3;
    };

    // Graph plotting logic
    const generatePath = (calcFunction: (t: number) => number, minY: number, maxY: number) => {
        let path = '';
        const w = 300;
        const h = 200;
        const pts = 100; // higher res for curves

        for (let i = 0; i <= pts; i++) {
            const t = (i / pts) * maxTime;
            const yVal = calcFunction(t);
            const svgX = (t / maxTime) * w;
            
            if (yVal > maxY || yVal < minY) {
                const clampedY = Math.max(minY, Math.min(maxY, yVal));
                const svgY = h - ((clampedY - minY) / (maxY - minY)) * h;
                path += `L ${svgX} ${svgY} `;
                break;
            }

            const svgY = h - ((yVal - minY) / (maxY - minY)) * h;

            // Draw steps for acceleration instead of slopes
            if (calcFunction === accA && i > 0) {
                const prevT = ((i - 1) / pts) * maxTime;
                const prevYVal = calcFunction(prevT);
                if (Math.abs(yVal - prevYVal) > 0.01) {
                    // Vertical line for step
                    const prevClamped = Math.max(minY, Math.min(maxY, prevYVal));
                    const prevSvgY = h - ((prevClamped - minY) / (maxY - minY)) * h;
                    path += `L ${svgX} ${prevSvgY} `;
                }
            }

            if (i === 0) path += `M ${svgX} ${svgY} `;
            else path += `L ${svgX} ${svgY} `;
        }
        return path;
    };

    const currentX = posX(time);
    const currentV = velV(time);
    const currentA = accA(time);

    const mapY = (val: number, min: number, max: number) => 200 - ((Math.max(min, Math.min(max, val)) - min) / (max - min)) * 200;
    const markerX = (time / maxTime) * 300;

    return (
        <div className="w-full bg-slate-50 rounded-[3.5rem] p-8 md:p-12 shadow-2xl my-16 border-8 border-violet-100 relative overflow-hidden">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 relative z-10">
                <div>
                    <span className="bg-fuchsia-100 text-fuchsia-600 px-4 py-1.5 rounded-full font-black text-xs tracking-widest uppercase mb-4 inline-block border border-fuchsia-200">OPhysics Integration</span>
                    <h3 className="text-3xl md:text-5xl font-black text-slate-800 mb-2 tracking-tight">Advanced Motion Graph Builder</h3>
                    <p className="text-slate-600 font-medium max-w-2xl">
                        Build a complex journey by chaining different accelerations together! Watch how a step-change in Acceleration creates a sloped Velocity profile, which in turn crafts a curved Position path.
                    </p>
                </div>

                <div className="flex bg-white p-2 rounded-2xl border-4 border-slate-100 shadow-sm">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all shadow-sm ${isPlaying ? 'bg-rose-500 hover:bg-rose-400 text-white' : 'bg-violet-600 hover:bg-violet-500 text-white'}`}
                    >
                        {isPlaying ? <Pause size={28} className="fill-current" /> : <Play size={32} className="ml-1 fill-current" />}
                    </button>
                    <button
                        onClick={() => { setIsPlaying(false); setTime(0); }}
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">

                {/* Sliders Panel */}
                <div className="lg:col-span-1 bg-white p-6 rounded-3xl border-4 border-slate-100 flex flex-col gap-8 shadow-sm">
                    <h4 className="font-extrabold text-slate-800 uppercase tracking-widest text-sm text-center border-b-2 border-slate-100 pb-4">Mission Control</h4>

                    <div>
                        <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wide">
                            <span className="text-fuchsia-500">Stage 1: 0-3s</span>
                            <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">{accel1} m/s²</span>
                        </div>
                        <input type="range" min="-10" max="10" value={accel1} onChange={(e) => { setAccel1(Number(e.target.value)); setTime(0); setIsPlaying(false); }} className="w-full accent-fuchsia-500 cursor-pointer" />
                    </div>

                    <div>
                        <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wide">
                            <span className="text-violet-500">Stage 2: 3-7s</span>
                            <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">{accel2} m/s²</span>
                        </div>
                        <input type="range" min="-10" max="10" value={accel2} onChange={(e) => { setAccel2(Number(e.target.value)); setTime(0); setIsPlaying(false); }} className="w-full accent-violet-500 cursor-pointer" />
                    </div>

                    <div>
                        <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wide">
                            <span className="text-indigo-500">Stage 3: 7-10s</span>
                            <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">{accel3} m/s²</span>
                        </div>
                        <input type="range" min="-10" max="10" value={accel3} onChange={(e) => { setAccel3(Number(e.target.value)); setTime(0); setIsPlaying(false); }} className="w-full accent-indigo-500 cursor-pointer" />
                    </div>

                    <div className="mt-auto bg-slate-800 border-4 border-slate-900 p-4 rounded-2xl text-center shadow-inner">
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Mission Clock</div>
                        <div className="text-4xl font-mono font-black text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">{time.toFixed(1)}s</div>
                    </div>
                </div>

                {/* Graphs */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Acceleration Graph */}
                    <div className="bg-white rounded-[2rem] p-5 border-4 border-slate-100 shadow-xl relative overflow-hidden group">
                        <h4 className="text-rose-500 font-black text-sm tracking-widest uppercase mb-4 flex justify-between items-center">
                            Accel vs Time
                            <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-1 rounded-md">Input</span>
                        </h4>
                        <div className="relative w-full aspect-[3/2] bg-slate-50 rounded-xl overflow-hidden shadow-inner border-2 border-slate-200">
                            <div className="absolute top-1/2 w-full h-[2px] bg-slate-300"></div>
                            {/* Time dividers */}
                            <div className="absolute top-0 bottom-0 left-[30%] w-[1px] bg-slate-200 border-r border-dashed border-slate-400"></div>
                            <div className="absolute top-0 bottom-0 left-[70%] w-[1px] bg-slate-200 border-r border-dashed border-slate-400"></div>

                            <svg className="w-full h-full overflow-visible relative z-10" viewBox="0 0 300 200" preserveAspectRatio="none">
                                <path d={generatePath(accA, -15, 15)} fill="none" stroke="#f43f5e" strokeWidth="4" />
                                <circle cx={markerX} cy={mapY(currentA, -15, 15)} r="6" fill="#fb7185" className="drop-shadow-md" />
                                <line x1={markerX} y1="0" x2={markerX} y2="200" stroke="#fb7185" strokeWidth="2" strokeDasharray="4 4" />
                            </svg>
                        </div>
                        <div className="mt-4 text-center font-mono font-bold text-slate-700 bg-rose-50 rounded-lg py-2">a = {currentA.toFixed(1)} m/s²</div>
                    </div>

                    {/* Velocity Graph */}
                    <div className="bg-white rounded-[2rem] p-5 border-4 border-slate-100 shadow-xl relative overflow-hidden group">
                        <h4 className="text-emerald-500 font-black text-sm tracking-widest uppercase mb-4 flex justify-between items-center">
                            Velocity vs Time
                            <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md">∫a dt</span>
                        </h4>
                        <div className="relative w-full aspect-[3/2] bg-slate-50 rounded-xl overflow-hidden shadow-inner border-2 border-slate-200">
                            <div className="absolute top-1/2 w-full h-[2px] bg-slate-300"></div>
                            <div className="absolute top-0 bottom-0 left-[30%] w-[1px] bg-slate-200 border-r border-dashed border-slate-400"></div>
                            <div className="absolute top-0 bottom-0 left-[70%] w-[1px] bg-slate-200 border-r border-dashed border-slate-400"></div>

                            <svg className="w-full h-full overflow-visible relative z-10" viewBox="0 0 300 200" preserveAspectRatio="none">
                                <path d={generatePath(velV, -100, 100)} fill="none" stroke="#10b981" strokeWidth="4" />
                                <circle cx={markerX} cy={mapY(currentV, -100, 100)} r="6" fill="#34d399" className="drop-shadow-md" />
                                <line x1={markerX} y1="0" x2={markerX} y2="200" stroke="#34d399" strokeWidth="2" strokeDasharray="4 4" />
                            </svg>
                        </div>
                        <div className="mt-4 text-center font-mono font-bold text-slate-700 bg-emerald-50 rounded-lg py-2">v = {currentV.toFixed(1)} m/s</div>
                    </div>

                    {/* Position Graph */}
                    <div className="bg-white rounded-[2rem] p-5 border-4 border-slate-100 shadow-xl relative overflow-hidden group">
                        <h4 className="text-blue-500 font-black text-sm tracking-widest uppercase mb-4 flex justify-between items-center">
                            Position vs Time
                            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-md">∫v dt</span>
                        </h4>
                        <div className="relative w-full aspect-[3/2] bg-slate-50 rounded-xl overflow-hidden shadow-inner border-2 border-slate-200">
                            <div className="absolute top-1/2 w-full h-[2px] bg-slate-300"></div>
                            <div className="absolute top-0 bottom-0 left-[30%] w-[1px] bg-slate-200 border-r border-dashed border-slate-400"></div>
                            <div className="absolute top-0 bottom-0 left-[70%] w-[1px] bg-slate-200 border-r border-dashed border-slate-400"></div>

                            <svg className="w-full h-full overflow-visible relative z-10" viewBox="0 0 300 200" preserveAspectRatio="none">
                                <path d={generatePath(posX, -500, 500)} fill="none" stroke="#3b82f6" strokeWidth="4" />
                                <circle cx={markerX} cy={mapY(currentX, -500, 500)} r="6" fill="#60a5fa" className="drop-shadow-md" />
                                <line x1={markerX} y1="0" x2={markerX} y2="200" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 4" />
                            </svg>
                        </div>
                        <div className="mt-4 text-center font-mono font-bold text-slate-700 bg-blue-50 rounded-lg py-2">x = {currentX.toFixed(1)} m</div>
                    </div>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20px 20px, #ddd 2px, transparent 0)', backgroundSize: '60px 60px' }}></div>
        </div>
    );
}
