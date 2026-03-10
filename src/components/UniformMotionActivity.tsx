import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function UniformMotionActivity() {
    const [isUniform, setIsUniform] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const carControls = useAnimation();
    const roadControls = useAnimation();

    // Graph state: tracking data points over time (seconds -> distance)
    const [dataPoints, setDataPoints] = useState<{ t: number, d: number }[]>([]);
    const [currentSpeed, setCurrentSpeed] = useState<number>(0);
    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    // Max visual boundaries
    const maxTime = 10; // 10 seconds simulation
    const maxDist = 100; // 100 meters

    const resetSimulation = () => {
        setIsPlaying(false);
        setDataPoints([]);
        setCurrentSpeed(0);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        carControls.set({ left: '8px' });
        roadControls.stop();
        roadControls.set({ backgroundPosition: '0px center' });
    };

    const startSimulation = () => {
        resetSimulation();
        setIsPlaying(true);
        startTimeRef.current = Date.now();

        const animate = () => {
            if (!startTimeRef.current) return;

            const elapsedTime = (Date.now() - startTimeRef.current) / 1000;

            if (elapsedTime > maxTime) {
                setIsPlaying(false);
                return;
            }

            // Calculate Distance based on Motion Type
            let currentDist = 0;
            if (isUniform) {
                currentDist = 10 * elapsedTime;
                setCurrentSpeed(10);
            } else {
                currentDist = Math.pow(elapsedTime, 2);
                setCurrentSpeed(2 * elapsedTime);
            }

            // Cut the line if distance exceeds visual boundaries
            if (currentDist >= maxDist) {
                // Prevent continuing the plot once limit is hit
                setIsPlaying(false);
                return;
            }

            // Move the car visually
            // Assume the visual track is 100 units wide

            // Only update data points a few times per second to prevent UI lag
            setDataPoints(prev => {
                const lastPoint = prev[prev.length - 1];
                if (!lastPoint || elapsedTime - lastPoint.t > 0.1) {
                    return [...prev, { t: elapsedTime, d: currentDist }];
                }
                return prev;
            });

            // Need to calculate CSS pixel offset for x
            // We'll let Framer Motion handle percentage based movement

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        // Animate Framer Car
        if (isUniform) {
            carControls.start({ left: 'calc(100% - 72px)', transition: { duration: maxTime, ease: "linear" } });
            // Road moves at constant speed using background-position
            roadControls.start({
                backgroundPosition: ['0px center', '-400px center'],
                transition: { duration: 2, ease: "linear", repeat: Infinity }
            });
        } else {
            carControls.start({ left: 'calc(100% - 72px)', transition: { duration: maxTime, ease: "easeIn" } });
            // Road accelerates using easeIn curve
            roadControls.start({
                backgroundPosition: ['0px center', '-2000px center'],
                transition: { duration: maxTime, ease: "easeIn" }
            });
        }
    };

    // Clean up animation on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);


    return (
        <div className="w-full bg-white p-12 rounded-[3.5rem] border-8 border-cyan-200 shadow-xl mb-16 relative overflow-hidden">
            <h3 className="text-4xl font-extrabold text-cyan-900 mb-6 text-center">Interactive Graph: </h3>
            <h4 className="text-2xl font-bold text-center text-cyan-700 mb-10">Uniform vs Non-Uniform Motion 📈</h4>

            <p className="text-xl text-gray-700 font-medium text-center max-w-3xl mx-auto mb-12">
                Choose a driving style! Watch how a constant speed creates a perfectly <b>straight line</b>, while changing speeds create a <b>curved line</b> on a Distance-Time graph!
            </p>

            {/* Controls */}
            <div className="flex justify-center gap-6 mb-12">
                <button
                    onClick={() => { setIsUniform(true); resetSimulation(); }}
                    className={`px-8 py-4 rounded-3xl font-bold text-xl transition-all shadow-md border-4 ${isUniform ? 'bg-cyan-500 text-white border-cyan-600 scale-105' : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'}`}
                >
                    🛣️ Uniform (Steady 10m/s)
                </button>
                <button
                    onClick={() => { setIsUniform(false); resetSimulation(); }}
                    className={`px-8 py-4 rounded-3xl font-bold text-xl transition-all shadow-md border-4 ${!isUniform ? 'bg-indigo-500 text-white border-indigo-600 scale-105' : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'}`}
                >
                    🚦 Non-Uniform (Accelerating)
                </button>
            </div>

            {/* Simulation Arena */}
            <div className="flex flex-col gap-12">

                {/* Physical Track & Speedometer Container */}
                <div className="w-full flex flex-col md:flex-row gap-8 bg-slate-50 p-8 rounded-3xl border-[4px] border-slate-200">

                    {/* Live Speedometer & RPM Meters */}
                    <div className="flex-shrink-0 w-full md:w-80 bg-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center border-4 border-slate-700 shadow-inner relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 opacity-50"></div>
                        
                        <div className="flex flex-row gap-4 relative z-10 w-full justify-center">
                            {/* RPM Meter */}
                            <div className="flex flex-col items-center">
                                <h5 className="text-slate-400 font-bold tracking-widest uppercase mb-2 text-[10px]">RPM</h5>
                                <div className="w-24 h-24 rounded-full border-[6px] border-slate-600 flex items-center justify-center relative bg-slate-800 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
                                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="#475569" strokeWidth="6" />
                                        <circle
                                            cx="50" cy="50" r="40" fill="none"
                                            stroke={isUniform ? "#3b82f6" : "#f43f5e"}
                                            strokeWidth="6" strokeDasharray="251.2"
                                            strokeDashoffset={251.2 - (Math.min((isUniform && currentSpeed > 0 ? 3000 : currentSpeed * 200) / 6000, 1) * 251.2)}
                                            className="transition-all duration-100 ease-linear"
                                        />
                                        {/* Needle */}
                                        <line 
                                            x1="50" y1="50" x2="50" y2="20" 
                                            stroke="white" strokeWidth="2" strokeLinecap="round"
                                            style={{ 
                                                transformOrigin: '50px 50px',
                                                transform: `rotate(${(Math.min((isUniform && currentSpeed > 0 ? 3000 : currentSpeed * 200) / 6000, 1) * 240) - 120}deg)`
                                            }}
                                            className="transition-transform duration-200"
                                        />
                                    </svg>
                                    <div className="flex flex-col items-center justify-center">
                                        <span className={`text-xl font-black ${isUniform ? 'text-blue-400' : 'text-rose-400'} font-mono`}>
                                            {Math.round(isUniform && currentSpeed > 0 ? 3000 : (currentSpeed * 200))}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Speedometer */}
                            <div className="flex flex-col items-center">
                                <h5 className="text-slate-400 font-bold tracking-widest uppercase mb-2 text-[10px]">Speedometer</h5>
                                <div className="w-24 h-24 rounded-full border-[6px] border-slate-600 flex items-center justify-center relative bg-slate-800 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
                                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="#334155" strokeWidth="6" />
                                        <circle
                                            cx="50" cy="50" r="40" fill="none" stroke={isUniform ? "#06b6d4" : "#f43f5e"} strokeWidth="6" strokeDasharray="251.2"
                                            strokeDashoffset={251.2 - (Math.min(currentSpeed / 20, 1) * 251.2)}
                                            className="transition-all duration-100 ease-linear"
                                        />
                                        {/* Needle */}
                                        <line 
                                            x1="50" y1="50" x2="50" y2="15" 
                                            stroke={isUniform ? "#06b6d4" : "#f43f5e"} strokeWidth="3" strokeLinecap="round"
                                            style={{ 
                                                transformOrigin: '50px 50px',
                                                transform: `rotate(${(Math.min(currentSpeed / 20, 1) * 240) - 120}deg)`
                                            }}
                                            className="transition-transform duration-200 shadow-xl"
                                        />
                                        <circle cx="50" cy="50" r="4" fill="white" />
                                    </svg>
                                    <div className="flex flex-col items-center justify-center">
                                        <span className={`text-xl font-black ${isUniform ? 'text-cyan-400' : 'text-rose-400'} font-mono`}>
                                            {Math.round(currentSpeed)}
                                        </span>
                                        <span className="text-slate-500 font-bold text-[8px]">m/s</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Track Section */}
                    <div className="flex-grow flex flex-col gap-4 justify-center relative">
                        <div className="flex justify-between font-bold text-slate-400 mb-2">
                            <span>Start 0m</span>
                            <span>Finish {maxDist}m</span>
                        </div>

                        <div className="relative w-full h-24 bg-slate-800 rounded-full border-4 border-slate-600 overflow-hidden shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)]">
                            {/* Moving Road stripes */}
                            <motion.div
                                animate={roadControls}
                                className={`absolute inset-0 opacity-40 mix-blend-screen transition-all duration-1000 ${isUniform ? '' : 'blur-[1px]'}`}
                                style={{
                                    backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 20px, #facc15 20px, #facc15 60px)`,
                                    backgroundSize: '80px 100%',
                                    backgroundPositionY: '50%',
                                    backgroundRepeat: 'repeat-x',
                                    height: '8px',
                                    top: 'calc(50% - 4px)'
                                }}
                            />

                            {/* The Car - Flipped explicitly to ensure it points forward */}
                            <motion.div
                                initial={{ left: '8px' }}
                                animate={carControls}
                                className="absolute top-2 w-16 h-16 text-5xl flex items-center justify-center drop-shadow-xl z-20"
                                style={{ originX: 0.5, originY: 0.5, scaleX: -1 }} // Emoji cars face left default, scaleX -1 flips to right
                            >
                                {isUniform ? '🚙' : '🏎️'}
                            </motion.div>
                        </div>

                        <button
                            onClick={startSimulation}
                            disabled={isPlaying}
                            className={`py-4 rounded-2xl font-black text-2xl uppercase tracking-widest text-white shadow-lg transition-transform ${isPlaying ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 hover:-translate-y-1'}`}
                        >
                            {isPlaying ? 'Driving...' : 'DRIVE! 🏁'}
                        </button>
                    </div>
                </div>

                {/* Graphing Screen - Full Width Below */}
                <div className="w-full mt-12 bg-[#f8fafc] p-10 rounded-[2.5rem] border-8 border-slate-300 shadow-md relative">
                    <h4 className="text-3xl font-extrabold text-slate-700 text-center mb-8">Real-time Distance vs Time Graph</h4>

                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="relative w-full lg:w-2/3">
                            <div className="absolute -left-16 top-1/2 -rotate-90 font-bold text-slate-500 tracking-widest uppercase">Distance (m)</div>
                            <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 font-bold text-slate-500 tracking-widest uppercase">Time (s)</div>

                            {/* Graph Canvas */}
                            <svg className="w-full aspect-[21/9] bg-white border-l-4 border-b-4 border-slate-400 rounded-bl-sm overflow-visible" viewBox="0 0 600 250">
                                {/* Grid markers */}
                                <line x1={0} y1={250} x2={600} y2={250} stroke="#94a3b8" strokeWidth={4} />
                                <line x1={0} y1={0} x2={0} y2={250} stroke="#94a3b8" strokeWidth={4} />

                                {/* Grid lines internal */}
                                {[1, 2, 3, 4, 5].map(i => (
                                    <line key={`h-${i}`} x1={0} y1={i * 50} x2={600} y2={i * 50} stroke="#e2e8f0" strokeWidth={2} strokeDasharray="4" />
                                ))}
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
                                    <line key={`v-${i}`} x1={i * 50} y1={0} x2={i * 50} y2={250} stroke="#e2e8f0" strokeWidth={2} strokeDasharray="4" />
                                ))}

                                {/* Dynamic Plot Line */}
                                {dataPoints.length > 0 && (
                                    <motion.path
                                        d={dataPoints.map((point, i) => {
                                            const x = (point.t / maxTime) * 600;
                                            const y = 250 - ((point.d / maxDist) * 250);
                                            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                                        }).join(" ")}
                                        fill="none"
                                        stroke={isUniform ? "#06b6d4" : "#f43f5e"} // Cyan vs Rose
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                )}
                            </svg>
                        </div>

                        {/* Analysis Output Box */}
                        <div className="w-full lg:w-1/3 flex flex-col justify-center">
                            <div className="p-8 rounded-[2rem] bg-white border-4 border-slate-200 shadow-lg">
                                <h5 className="font-extrabold text-slate-700 mb-4 text-2xl">Graph Analysis</h5>
                                {dataPoints.length > 5 ? (
                                    isUniform ? (
                                        <div className="animate-fade-in space-y-4">
                                            <p className="text-2xl font-black text-cyan-600 bg-cyan-50 p-4 rounded-2xl text-center border-2 border-cyan-100 shadow-inner">
                                                📏 Straight Line<br />
                                                <span className="text-lg font-bold">Constant Speed</span>
                                            </p>
                                            <p className="text-slate-600 font-medium">Because the speed never changes (always 10m/s), the distance increases at a steady, perfectly linear rate!</p>
                                        </div>
                                    ) : (
                                        <div className="animate-fade-in space-y-4">
                                            <p className="text-2xl font-black text-rose-600 bg-rose-50 p-4 rounded-2xl text-center border-2 border-rose-100 shadow-inner">
                                                📈 Curved Line<br />
                                                <span className="text-lg font-bold">Speeding Up!</span>
                                            </p>
                                            <p className="text-slate-600 font-medium">The speed constantly increases (accelerating!). Therefore, the distance covered every second gets larger and larger, curving the graph upwards!</p>
                                        </div>
                                    )
                                ) : (
                                    <div className="h-32 flex items-center justify-center text-slate-400 italic">
                                        Click DRIVE to analyze...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
