import { motion } from 'framer-motion';
import { Gauge, Zap, ArrowRight } from 'lucide-react';
import FluidGlass from './FluidGlass';
import ChapterFooter from './ChapterFooter';
import UniformMotionActivity from './UniformMotionActivity';
import LightningDistanceActivity from './LightningDistanceActivity';

// A completely unique, high-energy "Speeding" text animation
function VelocityHeaderAnimation({ lines, colorFrom, colorTo }: { lines: string[], colorFrom: string, colorTo: string }) {
    let globalIndex = 0;
    return (
        <div className="flex flex-col items-center gap-0 mb-4">
            {lines.map((line, lineIndex) => (
                <h1 key={lineIndex} className={`text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r ${colorFrom} ${colorTo} font-outfit drop-shadow-[0_5px_15px_rgba(234,88,12,0.5)] flex justify-center tracking-tighter flex-wrap overflow-hidden py-1 italic skew-x-[-10deg] leading-none`}>
                    {line.split("").map((char) => {
                        const currentIndex = globalIndex++;
                        return (
                            <motion.span
                                key={currentIndex}
                                className="inline-block"
                                initial={{ x: 200, opacity: 0, scale: 0.5 }}
                                animate={{ x: 0, opacity: 1, scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15,
                                    mass: 0.5,
                                    delay: currentIndex * 0.05, // Rapid fire in
                                }}
                                whileHover={{
                                    x: [0, 10, -5, 0], // Subtle vibration
                                    skewX: -20,
                                    color: "#fb923c",
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        );
                    })}
                </h1>
            ))}
        </div>
    );
}

// Reusable Youtube Component
function VideoFrame({ url }: { url: string }) {
    const videoId = url.split('/').pop()?.split('?')[0] || url;

    return (
        <div className="w-[800px] max-w-full aspect-video rounded-[3rem] overflow-hidden bg-white p-4 border-[6px] border-orange-200 shadow-[0_16px_0_0_rgba(253,186,116,1)] my-12 mx-auto transform transition-transform hover:-translate-y-2 group">
            <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative bg-black shadow-inner">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                />
            </div>
        </div>
    );
}

export default function ChapterFour() {
    return (
        <div className="max-w-6xl mx-auto px-6 pb-40">
            {/* Animated Header */}
            <motion.header
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="mb-16 mt-10"
            >
                <FluidGlass className="p-12 rounded-[3.5rem] border-[8px] border-white/60 shadow-[0_30px_60px_rgba(234,88,12,0.15)] relative overflow-hidden text-center group">
                    <motion.div
                        className="absolute -top-32 -left-32 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply filter blur-[60px] opacity-40"
                        animate={{ x: [0, 80, 0], y: [0, 20, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute -bottom-32 -right-32 w-64 h-64 bg-red-400 rounded-full mix-blend-multiply filter blur-[60px] opacity-40"
                        animate={{ x: [0, -80, 0], y: [0, -20, 0], scale: [1, 1.5, 1] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    />

                    <div className="relative z-10 flex flex-col items-center justify-center">
                        <span className="text-xl font-black text-orange-700 tracking-[0.3em] uppercase mb-6 opacity-90 border-4 border-orange-200 bg-orange-100 px-8 py-2 rounded-full shadow-inner transform -skew-x-12">Unit 4</span>

                        <VelocityHeaderAnimation lines={["SPEED &", "VELOCITY"]} colorFrom="from-orange-600" colorTo="to-red-600" />

                        <p className="text-2xl md:text-3xl text-gray-800 font-extrabold mt-6 tracking-wide drop-shadow-sm max-w-3xl leading-snug">
                            Measuring the <span className="text-white bg-orange-500 px-3 py-1 rounded-xl shadow-md rotate-2 inline-block">Rate of Motion!</span> Fast, slow, and everywhere in between.
                        </p>
                    </div>
                </FluidGlass>
            </motion.header>

            {/* Intro Content */}
            <div className="flex flex-col md:flex-row items-center gap-12 bg-white p-10 rounded-[3.5rem] border-8 border-orange-100 shadow-xl mb-16 relative overflow-hidden group">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cG9seWdvbiBwb2ludHM9IjAsMCAyMCwyMCAwLDIwIiBmaWxsPSIjZmZlZGRhIiBvcGFjaXR5PSIwLjUiPjwvcG9seWdvbj4KPC9zdmc+')] opacity-50 pointer-events-none rounded-bl-[100px]" />

                <div className="w-full md:w-1/2 relative z-10">
                    <motion.div whileHover={{ scale: 1.02 }} className="rounded-[2.5rem] overflow-hidden border-8 border-orange-200 shadow-lg">
                        <img
                            src="https://login.skillizee.io/s/articles/69a53d1bd657b515032fe854/images/image-20260302130346-1.png"
                            alt="Speed Limit Sign"
                            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                        />
                    </motion.div>
                </div>
                <div className="w-full md:w-1/2 relative z-10">
                    <h2 className="text-4xl font-extrabold text-orange-900 mb-6 flex items-center gap-4">
                        <Gauge className="text-orange-500 w-12 h-12" /> What is Speed?
                    </h2>
                    <p className="text-2xl font-bold text-gray-700 leading-relaxed mb-6">
                        In physics, different objects take different amounts of time to cover a given distance. The quantity used to measure this rate of motion is called <span className="text-orange-600 bg-orange-50 px-2 rounded-lg">Speed</span>.
                    </p>
                    <div className="bg-orange-50 p-6 rounded-3xl border-4 border-orange-200 shadow-inner">
                        <p className="text-xl font-bold text-orange-800">
                            <b>Definition:</b> Speed is the distance travelled by an object in unit time. It describes exactly how fast an object is moving!
                        </p>
                    </div>
                </div>
            </div>

            {/* Video Context */}
            <VideoFrame url="https://youtu.be/YshnFne48pw" />

            {/* Key Characteristics Cards */}
            <h2 className="text-5xl font-black text-center text-slate-800 mb-12 drop-shadow-sm">Key Characteristics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">

                <motion.div whileHover={{ y: -10 }} className="bg-white p-8 rounded-[2.5rem] border-4 border-slate-200 shadow-lg text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-2 bg-pink-500 group-hover:h-full group-hover:opacity-10 transition-all duration-300 z-0"></div>
                    <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 shadow-sm border-2 border-pink-200">
                        <span className="text-2xl font-bold text-pink-600">#</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-800 mb-4 relative z-10">Magnitude Only</h3>
                    <p className="text-slate-600 font-medium relative z-10 text-lg">To specify speed, we require only its numerical value. Direction does not matter! (It's a Scalar).</p>
                </motion.div>

                <motion.div whileHover={{ y: -10 }} className="bg-white p-8 rounded-[2.5rem] border-4 border-slate-200 shadow-lg text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-2 bg-blue-500 group-hover:h-full group-hover:opacity-10 transition-all duration-300 z-0"></div>
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 shadow-sm border-2 border-blue-200">
                        <span className="text-2xl font-bold text-blue-600">SI</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-800 mb-4 relative z-10">Standard Unit</h3>
                    <p className="text-slate-600 font-medium relative z-10 text-lg">The standard SI unit is <br /><b className="text-blue-600 text-xl bg-blue-50 px-2 rounded-md">metre per second</b><br />(m s⁻¹ or m/s).</p>
                </motion.div>

                <motion.div whileHover={{ y: -10 }} className="bg-white p-8 rounded-[2.5rem] border-4 border-slate-200 shadow-lg text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500 group-hover:h-full group-hover:opacity-10 transition-all duration-300 z-0"></div>
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 shadow-sm border-2 border-emerald-200">
                        <span className="text-2xl font-bold text-emerald-600">Alt</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-800 mb-4 relative z-10">Other Units</h3>
                    <p className="text-slate-600 font-medium relative z-10 text-lg">Common alternatives include cm/s (snails) and km/h (cars on a highway!).</p>
                </motion.div>

                <motion.div whileHover={{ y: -10 }} className="bg-white p-8 rounded-[2.5rem] border-4 border-slate-200 shadow-lg text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-2 bg-amber-500 group-hover:h-full group-hover:opacity-10 transition-all duration-300 z-0"></div>
                    <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 shadow-sm border-2 border-amber-200">
                        <Zap className="text-amber-600 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-800 mb-4 relative z-10">The Formula</h3>
                    <p className="text-slate-600 font-medium relative z-10 text-lg">Speed (v) = Distance (s) / Time (t)</p>
                    <img src="https://login.skillizee.io/s/articles/69a53d1bd657b515032fe854/images/image-20260302130346-2.png" alt="Formula v=s/t" className="mx-auto mt-4 h-12 relative z-10" />
                </motion.div>

            </div>

            {/* Types of Motion via Speed */}
            <div className="bg-slate-50 border-[6px] border-slate-200 rounded-[3.5rem] p-12 shadow-sm mb-16 relative overflow-hidden">
                <h2 className="text-4xl font-extrabold text-slate-800 mb-10 text-center">Types of Motion</h2>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Uniform Motion */}
                    <motion.div whileHover={{ scale: 1.02 }} className="w-full md:w-1/2 bg-white p-8 rounded-[2.5rem] border-4 border-cyan-200 shadow-md">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-bold text-xl border-2 border-cyan-200">1</span>
                            <h3 className="text-3xl font-bold text-cyan-900">Uniform Motion</h3>
                        </div>
                        <p className="text-xl text-gray-700 font-medium mb-6">
                            An object is in uniform motion when it covers <b className="text-cyan-700 bg-cyan-50 px-2 rounded">equal distances in equal intervals of time</b>.
                        </p>
                        <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 mb-6 font-medium text-slate-600">
                            <b>Example:</b> A car travelling exactly 5m every single second!
                        </div>
                        <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border-2 border-emerald-200 font-bold flex items-center gap-2">
                            📈 The distance-time graph is ALWAYS a straight line.
                        </div>
                    </motion.div>

                    {/* Non-Uniform Motion */}
                    <motion.div whileHover={{ scale: 1.02 }} className="w-full md:w-1/2 bg-white p-8 rounded-[2.5rem] border-4 border-indigo-200 shadow-md">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl border-2 border-indigo-200">2</span>
                            <h3 className="text-3xl font-bold text-indigo-900">Non-Uniform Motion</h3>
                        </div>
                        <p className="text-xl text-gray-700 font-medium mb-6">
                            When objects cover <b className="text-indigo-700 bg-indigo-50 px-2 rounded">unequal distances in equal intervals of time</b>. This applies to 99% of daily life!
                        </p>
                        <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 mb-6 font-medium text-slate-600">
                            <b>Example:</b> A car stuck in traffic, or a person jogging in a park.
                        </div>
                        <div className="bg-pink-50 text-pink-800 p-4 rounded-xl border-2 border-pink-200 font-bold flex items-center gap-2">
                            📉 The distance-time graph is a curve (non-linear).
                        </div>
                    </motion.div>
                </div>

                {/* Book Graph Example Images */}
                <div className="grid md:grid-cols-2 gap-8 mt-12 bg-white p-6 rounded-[2.5rem] border-4 border-slate-200">
                    <img src="https://login.skillizee.io/s/articles/69a53d1bd657b515032fe854/images/image-20260302130346-3.jpeg" alt="Uniform Graph" className="w-full h-auto rounded-3xl border-4 border-cyan-100" />
                    <img src="https://login.skillizee.io/s/articles/69a53d1bd657b515032fe854/images/image-20260302130346-4.png" alt="Non-Uniform Graph" className="w-full h-auto rounded-3xl border-4 border-indigo-100" />
                </div>
            </div>

            {/* Interactive Activity 1 */}
            <UniformMotionActivity />

            {/* Average Speed Section */}
            <div className="bg-yellow-50 p-12 rounded-[3.5rem] border-[6px] border-yellow-200 shadow-md mb-16 relative overflow-hidden">
                <div className="absolute top-[-50px] right-[-50px] text-[200px] opacity-10 pointer-events-none">🚗</div>
                <h2 className="text-5xl font-black text-yellow-900 mb-8 relative z-10">Average Speed</h2>
                <p className="text-2xl text-yellow-900 font-medium max-w-4xl leading-relaxed mb-8 relative z-10">
                    Since the speed of an object is rarely constant throughout its journey, we use <b>Average Speed</b> to describe its overall rate of motion.
                </p>

                {/* Formula Box */}
                <div className="bg-white p-8 rounded-[2rem] border-4 border-yellow-300 shadow-sm max-w-3xl mb-8 relative z-10">
                    <p className="text-xl text-yellow-800 font-bold mb-4">The Formula:</p>
                    <img src="https://login.skillizee.io/s/articles/69a53d1bd657b515032fe854/images/image-20260302130346-5.png" alt="Average Speed Formula" className="w-full max-w-md border-4 border-slate-100 rounded-xl" />
                </div>

                {/* Mathematical Example */}
                <div className="bg-yellow-100 p-8 rounded-[2rem] border-4 border-yellow-300 max-w-4xl relative z-10">
                    <h4 className="text-2xl font-bold text-yellow-900 mb-4 flex items-center gap-2"><ArrowRight className="text-yellow-600" /> Let's Calculate!</h4>
                    <p className="text-xl text-yellow-800 font-medium mb-4">An object travels <b>16 m in 4 s</b> and then another <b>16 m in 2 s</b>.</p>
                    <ul className="text-lg text-yellow-900 font-bold space-y-3 bg-white p-6 rounded-xl border-2 border-yellow-200">
                        <li>Total Distance = 16m + 16m = 32m</li>
                        <li>Total Time = 4s + 2s = 6s</li>
                        <li className="text-yellow-600 text-xl border-t-2 border-yellow-100 pt-3 mt-3">Average Speed = 32m / 6s = <b>5.33 m s⁻¹</b></li>
                    </ul>
                </div>
            </div>

            {/* Velocity Introduction */}
            <div className="bg-emerald-50 p-12 rounded-[3.5rem] border-[6px] border-emerald-200 shadow-md mb-16">
                <h2 className="text-5xl font-black text-emerald-900 mb-8 text-center">Velocity: Speed with Direction 🧭</h2>

                <div className="bg-white p-6 rounded-[2.5rem] border-4 border-emerald-300 shadow-sm mb-12">
                    <img src="https://login.skillizee.io/s/articles/69a53d1bd657b515032fe854/images/image-20260302130346-8.png" alt="Speed vs Velocity Cars" className="w-full rounded-[2rem] border-4 border-slate-100 object-cover" />
                </div>

                <p className="text-2xl text-emerald-900 font-bold max-w-4xl mx-auto text-center leading-relaxed mb-12">
                    While speed tells us how fast an object is moving, it doesn't tell us <i>where</i> it is going.<br />
                    Velocity is the speed of an object moving in a <span className="text-white bg-emerald-500 px-3 py-1 rounded-xl shadow-md rotate-[-2deg] inline-block">definite direction</span>.
                </p>

                {/* Velocity Change factors */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-3xl border-4 border-emerald-100 text-center shadow-sm">
                        <span className="text-4xl block mb-4">🏎️</span>
                        <h4 className="text-xl font-bold text-emerald-800 mb-2">1. Change Speed</h4>
                        <p className="text-emerald-700 font-medium">Speeding up or slowing down changes velocity.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border-4 border-emerald-100 text-center shadow-sm">
                        <span className="text-4xl block mb-4">↩️</span>
                        <h4 className="text-xl font-bold text-emerald-800 mb-2">2. Change Direction</h4>
                        <p className="text-emerald-700 font-medium">Turning a corner at the exact same speed changes velocity!</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border-4 border-emerald-100 text-center shadow-sm">
                        <span className="text-4xl block mb-4">🎢</span>
                        <h4 className="text-xl font-bold text-emerald-800 mb-2">3. Change Both</h4>
                        <p className="text-emerald-700 font-medium">Like a rollercoaster looping and dropping.</p>
                    </div>
                </div>

                {/* Average Velocity Formulas */}
                <div className="mt-12 bg-white p-10 rounded-[3rem] border-4 border-emerald-200">
                    <h3 className="text-3xl font-extrabold text-emerald-900 mb-6">Average Velocity Formulas</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-200">
                            <h4 className="font-bold text-green-800 mb-2">For Uniformly Changing Velocity:</h4>
                            <p className="text-green-700 mb-4 font-medium">Arithmetic mean of initial (u) and final (v) velocity.</p>
                            <img src="https://login.skillizee.io/s/articles/69a53d1bd657b515032fe854/images/image-20260302130346-9.png" alt="v_av = (u+v)/2" className="h-[75px] rounded border" />
                        </div>
                        <div className="bg-teal-50 p-6 rounded-2xl border-2 border-teal-200">
                            <h4 className="font-bold text-teal-800 mb-2">General Calculation:</h4>
                            <p className="text-teal-700 mb-4 font-medium">Total displacement over total time!</p>
                            <img src="https://login.skillizee.io/s/articles/69a53d1bd657b515032fe854/images/image-20260302130346-10.png" alt="v_av = Total Displacement / Total Time" className="h-[68px] rounded border" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Activity 2 */}
            <LightningDistanceActivity />

            {/* Global Footer */}
            <ChapterFooter chapterName="1.4 ⏤ Speed and Velocity" />
        </div>
    );
}
