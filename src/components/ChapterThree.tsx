import { motion } from 'framer-motion';
import { Compass, Zap, MoveRight, RefreshCw } from 'lucide-react';
import FluidGlass from './FluidGlass';
import ChapterFooter from './ChapterFooter';
// Interactive 1.3 Gamified Component will be imported here
import DisplacementVectorActivity from './DisplacementVectorActivity';

// VideoFrame removed as there are no videos currently needed for Chapter 3

function FlipRevealText({ text, colorFrom, colorTo }: { text: string, colorFrom: string, colorTo: string }) {
    const chars = text.split("");
    return (
        <h1 className={`text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${colorFrom} ${colorTo} font-outfit drop-shadow-md mb-4 flex justify-center tracking-tight flex-wrap perspective-1000`}>
            {chars.map((char, index) => (
                <motion.span
                    key={index}
                    className="inline-block origin-bottom"
                    initial={{ rotateX: 90, opacity: 0, y: 20 }}
                    animate={{ rotateX: 0, opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 10,
                        delay: index * 0.1,
                    }}
                    whileHover={{
                        scale: 1.15,
                        y: -10,
                        rotateZ: index % 2 === 0 ? 3 : -3,
                        transition: { type: "spring", stiffness: 300 }
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </h1>
    );
}

export default function ChapterThree() {
    return (
        <div className="max-w-6xl mx-auto px-6 pb-40">
            {/* Animated Header */}
            <motion.header
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="mb-16 mt-10"
            >
                <FluidGlass className="p-12 rounded-[3.5rem] border-[8px] border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.1)] relative overflow-hidden text-center group">
                    <motion.div
                        className="absolute -top-32 -left-32 w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
                        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute -bottom-32 -right-32 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
                        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    />

                    <div className="relative z-10 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-teal-700 tracking-[0.2em] uppercase mb-6 opacity-80 border-2 border-teal-200 bg-teal-50 px-6 py-2 rounded-full">Unit 3</span>
                        <FlipRevealText text="DISPLACEMENT" colorFrom="from-teal-600" colorTo="to-emerald-500" />
                        <p className="text-2xl md:text-3xl text-gray-700 font-bold mt-6 tracking-wide drop-shadow-sm max-w-3xl">
                            The <span className="text-teal-600 bg-teal-50 px-2 rounded-lg border border-teal-200">shortest straight-line</span> distance between initial and final positions.
                        </p>
                    </div>
                </FluidGlass>
            </motion.header>

            {/* Core Definitions */}
            <div className="grid md:grid-cols-2 gap-10 mt-12 mb-16">
                <motion.div
                    whileHover={{ y: -8 }}
                    className="p-10 rounded-[3rem] bg-white border-8 border-teal-100 shadow-lg relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full flex items-start justify-end p-6">
                        <Compass className="text-teal-400" size={48} />
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-800 mb-6 relative z-10">Vector Quantity</h3>
                    <p className="text-xl text-gray-700 font-medium leading-relaxed relative z-10">
                        Unlike <span className="text-pink-500 font-bold">distance</span>, displacement requires both a <strong className="text-teal-600">numerical value (magnitude)</strong> and a <strong className="text-teal-600">direction</strong> to be fully described.
                    </p>
                    <div className="mt-8 bg-teal-50 p-6 rounded-2xl border-4 border-teal-200 relative z-10">
                        <p className="text-lg text-teal-900 font-bold">Example:</p>
                        <p className="text-lg text-teal-800">35 km <b className="text-teal-600">North</b> (Magnitude + Direction)</p>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ y: -8 }}
                    className="p-10 rounded-[3rem] bg-white border-8 border-emerald-100 shadow-lg relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full flex items-start justify-end p-6">
                        <Zap className="text-emerald-400" size={48} />
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-800 mb-6 relative z-10">The "Zero" Rule</h3>
                    <p className="text-xl text-gray-700 font-medium leading-relaxed relative z-10">
                        Even if an object has covered a significant distance, its displacement can be <strong className="text-emerald-600 text-2xl">ZERO</strong> if it returns to its starting point!
                    </p>
                    <div className="mt-8 bg-emerald-50 p-6 rounded-2xl border-4 border-emerald-200 relative z-10 flex gap-4 items-center">
                        <span className="text-4xl">🏃‍♂️💨</span>
                        <p className="text-md text-emerald-900 font-medium">Running 400m around a circular track back to the start = <b>0m Displacement!</b></p>
                    </div>
                </motion.div>
            </div>

            {/* Visual Example Image */}
            <motion.div
                className="w-full max-w-4xl mx-auto rounded-[3rem] overflow-hidden border-8 border-slate-200 shadow-xl mb-16 relative group"
                whileHover={{ scale: 1.02 }}
            >
                <div className="absolute inset-0 bg-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                <img
                    src="https://login.skillizee.io/s/articles/69a513cdbac1134b1c6331c9/images/image-20260302100633-1.jpeg"
                    alt="Displacement vs Distance Visual"
                    className="w-full h-auto object-cover"
                />
            </motion.div>

            {/* Key Characteristics Accordion/Cards */}
            <div className="bg-slate-50 border-[6px] border-slate-200 rounded-[3rem] p-12 shadow-sm mb-16 relative overflow-hidden">
                <h2 className="text-4xl font-extrabold text-slate-800 mb-10 text-center">Key Characteristics</h2>

                <div className="space-y-8">
                    {/* Size comparison */}
                    <div className="bg-white p-8 rounded-3xl border-4 border-slate-300 shadow-sm flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                                <span className="bg-red-100 text-red-600 p-2 rounded-xl">≤</span> Displacement is never greater!
                            </h3>
                            <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                The magnitude of displacement is either equal to or less than the distance traveled. It can never be greater than the distance.
                            </p>
                            <ul className="mt-4 space-y-3 text-md text-gray-700 font-medium">
                                <li className="flex gap-3"><MoveRight className="text-emerald-500" /> <b>Equal:</b> Moving single straight line without turning back.</li>
                                <li className="flex gap-3"><RefreshCw className="text-red-500" /> <b>Different:</b> Changing direction or moving backward.</li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/3 flex justify-center">
                            <img src="https://login.skillizee.io/s/articles/69a513cdbac1134b1c6331c9/images/image-20260302100633-2.png" className="rounded-2xl border-4 border-slate-200" alt="Straight Line" />
                        </div>
                    </div>

                    {/* Linear Example */}
                    <div className="bg-white p-8 rounded-3xl border-4 border-slate-300 shadow-sm">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Illustrative Example</h3>
                        <img src="https://login.skillizee.io/s/articles/69a513cdbac1134b1c6331c9/images/image-20260302100633-3.png" className="w-full rounded-2xl border-4 border-slate-200 mb-8" alt="Number Line Example" />
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-pink-50 rounded-2xl p-6 border-2 border-pink-200">
                                <h4 className="text-xl font-bold text-pink-700 mb-2">Total Distance</h4>
                                <p className="text-gray-700">Path length (O to A) + (A back to C) <br /> <b>60km + 35km = 95km</b></p>
                            </div>
                            <div className="bg-teal-50 rounded-2xl p-6 border-2 border-teal-200">
                                <h4 className="text-xl font-bold text-teal-700 mb-2">Displacement</h4>
                                <p className="text-gray-700">Shortest path from Start(O) to End(C) <br /> <b>= 25km</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="mb-16">
                <h2 className="text-4xl font-extrabold text-slate-800 mb-8 text-center">Distance vs. Displacement</h2>
                <div className="overflow-x-auto rounded-3xl border-4 border-slate-300 shadow-md">
                    <table className="w-full text-left bg-white border-collapse">
                        <thead>
                            <tr className="bg-slate-100">
                                <th className="p-6 text-xl font-bold text-slate-800 border-b-4 border-slate-300">Feature</th>
                                <th className="p-6 text-xl font-bold text-pink-600 border-b-4 border-slate-300 border-l border-slate-200">Distance</th>
                                <th className="p-6 text-xl font-bold text-teal-600 border-b-4 border-slate-300 border-l border-slate-200">Displacement</th>
                            </tr>
                        </thead>
                        <tbody className="text-lg font-medium text-gray-700">
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="p-6 border-b border-slate-200 font-bold text-slate-700">Definition</td>
                                <td className="p-6 border-b border-slate-200 border-l border-slate-200">Total path length covered.</td>
                                <td className="p-6 border-b border-slate-200 border-l border-slate-200">Shortest distance between start & end.</td>
                            </tr>
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="p-6 border-b border-slate-200 font-bold text-slate-700">Requirement</td>
                                <td className="p-6 border-b border-slate-200 border-l border-slate-200 bg-pink-50/30">Magnitude only. (Scalar)</td>
                                <td className="p-6 border-b border-slate-200 border-l border-slate-200 bg-teal-50/30">Magnitude AND Direction. (Vector)</td>
                            </tr>
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="p-6 font-bold text-slate-700 text-red-500">Can it be Zero?</td>
                                <td className="p-6 border-l border-slate-200 text-red-600 font-bold">No (if object moved)</td>
                                <td className="p-6 border-l border-slate-200 text-emerald-600 font-bold">Yes (if returns to start)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Odometer & Activity Section */}
            <div className="grid md:grid-cols-2 gap-10 mb-16">
                <div className="bg-indigo-50 rounded-[3rem] p-10 border-8 border-indigo-200">
                    <h3 className="text-3xl font-extrabold text-indigo-900 mb-6">Measuring Distance 🚗</h3>
                    <img src="https://login.skillizee.io/s/articles/69a513cdbac1134b1c6331c9/images/image-20260302100633-4.png" className="w-full rounded-2xl border-4 border-indigo-300 mb-6 object-cover h-48" alt="Odometer" />
                    <p className="text-lg text-indigo-800 font-medium mb-4">
                        Automobiles are fitted with a device called an <b>Odometer</b> that specifically shows the distance traveled by the vehicle!
                    </p>
                    <p className="text-md text-indigo-600 bg-white p-4 rounded-xl border-2 border-indigo-100">
                        <b>Standard Units:</b> The SI unit of length/distance is the meter (m).
                    </p>
                </div>

                <div className="bg-yellow-50 rounded-[3rem] p-10 border-8 border-yellow-200 flex flex-col justify-center">
                    <h3 className="text-3xl font-extrabold text-yellow-900 mb-6 text-center">🧠 Think About It!</h3>
                    <ul className="text-lg text-yellow-800 font-medium space-y-4">
                        <li className="bg-white p-4 rounded-xl shadow-sm border-2 border-yellow-100">
                            1. An object moved a distance. Can displacement be zero? <b>(Yes, if it returned home!)</b>
                        </li>
                        <li className="bg-white p-4 rounded-xl shadow-sm border-2 border-yellow-100">
                            2. A farmer walks the perimeter of a 10m square field in 40s. What is displacement at 2m 20s?
                        </li>
                    </ul>
                </div>
            </div>

            {/* Gamified Vector Activity Injection */}
            <DisplacementVectorActivity />

            {/* Global Footer */}
            <ChapterFooter chapterName="1.3 ⏤ Displacement" />
        </div>
    );
}
