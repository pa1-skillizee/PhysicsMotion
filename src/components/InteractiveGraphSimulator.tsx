import { useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Play, Square, FastForward, RotateCcw } from 'lucide-react';

type MotionState = 'rest' | 'uniform' | 'accelerating' | 'decelerating';

export default function InteractiveGraphSimulator() {
    const [motionState, setMotionState] = useState<MotionState>('rest');
    const [isPlaying, setIsPlaying] = useState(false);
    const maxTime = 100;

    const carX = useMotionValue(0);

    // Graph Data
    const [distancePoints, setDistancePoints] = useState<string>('0,200');
    const [velocityPoints, setVelocityPoints] = useState<string>('0,200');

    // Simulate physics
    useEffect(() => {
        let animationFrame: number;
        let t = 0;
        let currentS = 0;
        let currentV = 0;
        let lastTimestamp = 0;
        let distCapped = false;
        let velCapped = false;

        const updatePhysics = (timestamp: number) => {
            if (!isPlaying) return;

            if (!lastTimestamp) lastTimestamp = timestamp;
            const delta = (timestamp - lastTimestamp) / 1000; // seconds
            lastTimestamp = timestamp;

            t += delta * 15; // Speed up simulation time

            if (t > maxTime) {
                setIsPlaying(false);
                return;
            }

            // Calculate physics based on state
            let a = 0;
            switch (motionState) {
                case 'rest':
                    a = 0;
                    currentV = 0;
                    break;
                case 'uniform':
                    a = 0;
                    currentV = 2; // Constant velocity
                    break;
                case 'accelerating':
                    a = 0.05;
                    currentV += a * delta * 60; // scale up a bit for visual
                    break;
                case 'decelerating':
                    a = -0.05;
                    currentV = Math.max(0, currentV + a * delta * 60);
                    break;
            }

            currentS += currentV;

            // Map to SVG coordinates (Width: 300, Height: 200)
            const mapX = (x: number) => (x / maxTime) * 300;
            const mapY = (y: number, max: number) => 200 - (y / max) * 200;

            const svgX = mapX(t);

            if (!distCapped) {
                if (currentS > 200) {
                    const distY = mapY(200, 200); // 0
                    setDistancePoints(prev => `${prev} ${svgX},${distY}`);
                    distCapped = true;
                } else {
                    const distY = mapY(currentS, 200);
                    setDistancePoints(prev => `${prev} ${svgX},${distY}`);
                }
            }

            if (!velCapped) {
                if (currentV > 5) {
                    const velY = mapY(5, 5); // 0
                    setVelocityPoints(prev => `${prev} ${svgX},${velY}`);
                    velCapped = true;
                } else {
                    const velY = mapY(currentV, 5);
                    setVelocityPoints(prev => `${prev} ${svgX},${velY}`);
                }
            }

            // Move car
            carX.set(Math.min(currentS, 800)); // Max width of road

            animationFrame = requestAnimationFrame(updatePhysics);
        };

        if (isPlaying) {
            animationFrame = requestAnimationFrame(updatePhysics);
        }

        return () => cancelAnimationFrame(animationFrame);
    }, [isPlaying, motionState]);

    const handleReset = () => {
        setIsPlaying(false);
        setDistancePoints('0,200');
        setVelocityPoints('0,200');
        carX.set(0);
    };

    const handleStateChange = (state: MotionState) => {
        setMotionState(state);
        if (!isPlaying) setIsPlaying(true);
    };

    return (
        <div className="w-full bg-slate-900 rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden ring-4 ring-slate-800">
            {/* Background Details */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-900 via-slate-900 to-black"></div>

            <div className="relative z-10">
                {/* 1. The Real World (Car on Road) */}
                <div className="mb-12 bg-slate-800/50 rounded-3xl p-6 border border-slate-700">
                    <h4 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">The Highway</h4>
                    <div className="relative w-full h-24 bg-slate-700 rounded-xl overflow-hidden border-b-4 border-slate-600">
                        {/* Road Lines */}
                        <div className="absolute top-1/2 w-full flex justify-between px-4 opacity-30">
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className="w-8 h-2 bg-white rounded-full"></div>
                            ))}
                        </div>
                        {/* The Car */}
                        <motion.div
                            style={{ x: carX }}
                            className="absolute bottom-4 left-4 text-5xl drop-shadow-lg"
                        >
                            <div className="scale-x-[-1]">🏎️</div>
                        </motion.div>
                    </div>
                </div>

                {/* 2. The Graphs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Distance-Time Graph */}
                    <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700">
                        <h4 className="text-violet-400 font-bold tracking-widest text-sm mb-4 flex items-center justify-between">
                            Distance-Time
                            <span className="text-slate-500 text-xs font-mono">s-t graph</span>
                        </h4>
                        <div className="relative w-full h-[200px] border-l-2 border-b-2 border-slate-600 bg-slate-900/50 rounded-br-xl">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 200" preserveAspectRatio="none">
                                <polyline
                                    points={distancePoints}
                                    fill="none"
                                    stroke="#8b5cf6" // violet-500
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                                />
                            </svg>
                            {/* Grid Lines */}
                            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '10% 10%' }}></div>
                        </div>
                    </div>

                    {/* Velocity-Time Graph */}
                    <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700">
                        <h4 className="text-emerald-400 font-bold tracking-widest text-sm mb-4 flex items-center justify-between">
                            Velocity-Time
                            <span className="text-slate-500 text-xs font-mono">v-t graph</span>
                        </h4>
                        <div className="relative w-full h-[200px] border-l-2 border-b-2 border-slate-600 bg-slate-900/50 rounded-br-xl">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 200" preserveAspectRatio="none">
                                <polyline
                                    points={velocityPoints}
                                    fill="none"
                                    stroke="#10b981" // emerald-500
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                                />
                            </svg>
                            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '10% 10%' }}></div>
                        </div>
                    </div>
                </div>

                {/* 3. Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between bg-slate-800/80 rounded-full p-2 border border-slate-700">
                    <div className="flex items-center gap-2 p-2">
                        <button
                            onClick={() => handleStateChange('rest')}
                            className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${motionState === 'rest' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                        >
                            At Rest
                        </button>
                        <button
                            onClick={() => handleStateChange('uniform')}
                            className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${motionState === 'uniform' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                        >
                            Uniform Motion
                        </button>
                        <button
                            onClick={() => handleStateChange('accelerating')}
                            className={`px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${motionState === 'accelerating' ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                        >
                            <FastForward className="w-4 h-4" /> Accelerate
                        </button>
                    </div>

                    <div className="flex items-center gap-4 pr-4">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                        >
                            {isPlaying ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-6 h-6 ml-1 fill-current" />}
                        </button>
                        <button
                            onClick={handleReset}
                            className="w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 text-slate-300 flex items-center justify-center transition-transform hover:-rotate-180 duration-500"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
