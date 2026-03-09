import { motion } from 'framer-motion';
import { Sigma, Milestone, Combine } from 'lucide-react';
import FluidGlass from './FluidGlass';
import ChapterFooter from './ChapterFooter';
import Equations3DActivity from './Equations3DActivity';
import EquationsDragDropActivity from './EquationsDragDropActivity';
import OPhysicsK1Simulator from './OPhysicsK1Simulator';

function EquationsHeaderAnimation() {
    const line1 = "EQUATIONS OF".split("");
    const line2 = "MOTION".split("");

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl mx-auto bg-white/40 backdrop-blur-xl border border-white/60 p-12 rounded-[3.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.05)] mb-12 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"></div>

            <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex justify-center flex-wrap overflow-hidden">
                    {line1.map((letter, i) => (
                        <motion.span
                            key={`L1-${i}`}
                            initial={{ opacity: 0, y: 50, rotateX: -90 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{
                                type: "spring", damping: 12, stiffness: 200, delay: i * 0.05,
                            }}
                            className={`inline-block text-5xl md:text-7xl font-black ${letter === " " ? "w-4 md:w-6" : ""} text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-slate-900 font-outfit tracking-tighter`}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </div>

                <div className="flex justify-center flex-wrap overflow-hidden">
                    {line2.map((letter, i) => (
                        <motion.span
                            key={`L2-${i}`}
                            initial={{ opacity: 0, y: 50, scale: 0.5 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                type: "spring", damping: 10, stiffness: 100, delay: (line1.length * 0.05) + (i * 0.1),
                            }}
                            className="inline-block text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-600 font-outfit drop-shadow-[0_10px_20px_rgba(37,99,235,0.3)] tracking-tighter"
                        >
                            {letter}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function ChapterTwoTwo() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 pb-24 sm:px-6 lg:px-8 mt-24">
            {/* Header Area */}
            <div className="mb-16 text-center">
                <EquationsHeaderAnimation />
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="text-3xl font-extrabold text-indigo-800 uppercase tracking-widest bg-white/60 inline-block px-10 py-3 rounded-full shadow-md backdrop-blur-md border-2 border-indigo-200"
                >
                    Unit 2: Mathematical Models
                </motion.h2>
            </div>

            {/* Video & Concept Content */}
            <FluidGlass>
                <div className="flex flex-col items-center">
                    <div className="w-full max-w-[800px] aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-cyan-100 bg-black mb-10 relative group">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/_GHdjcHxYxo"
                            title="Motion Class 9 Physics - Equations"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0"
                        />
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Start to 16:00
                        </div>
                    </div>

                    <div className="w-full prose prose-lg md:prose-xl max-w-none text-slate-700">
                        <p className="text-2xl font-medium leading-relaxed bg-cyan-50 p-8 rounded-3xl border-l-8 border-cyan-400 shadow-inner">
                            <strong>When an object moves along a straight line with uniform acceleration</strong>, we can relate its
                            velocity (<span className="text-cyan-600 font-bold font-mono bg-cyan-100 px-2 rounded">u</span>, <span className="text-cyan-600 font-bold font-mono bg-cyan-100 px-2 rounded">v</span>),
                            acceleration (<span className="text-rose-500 font-bold font-mono bg-rose-100 px-2 rounded">a</span>),
                            time (<span className="text-amber-500 font-bold font-mono bg-amber-100 px-2 rounded">t</span>), and
                            distance (<span className="text-emerald-600 font-bold font-mono bg-emerald-100 px-2 rounded">s</span>) using three fundamental equations.
                        </p>
                    </div>
                </div>
            </FluidGlass>

            {/* 3 Equations Layout */}
            <h3 className="text-4xl font-extrabold text-slate-800 text-center mb-10 mt-20">The 3 Pillars of Motion 🏛️</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

                {/* 1. Velocity-Time */}
                <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-8 rounded-[2.5rem] border-4 border-indigo-100 shadow-xl flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center mb-6 shadow-inner border-4 border-white">
                        <Sigma strokeWidth={3} className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-black text-slate-800 mb-2">1. Velocity–Time</h4>
                    <p className="text-slate-500 font-medium mb-6">Find the final velocity after a certain time has passed.</p>
                    <div className="mt-auto w-full bg-slate-50 border-4 border-indigo-50 py-4 px-2 rounded-2xl">
                        <p className="text-4xl font-mono font-black text-indigo-600 tracking-wider">v = u + at</p>
                    </div>
                </motion.div>

                {/* 2. Position-Time */}
                <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-8 rounded-[2.5rem] border-4 border-emerald-100 shadow-xl flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-inner border-4 border-white">
                        <Milestone strokeWidth={3} className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-black text-slate-800 mb-2">2. Position–Time</h4>
                    <p className="text-slate-500 font-medium mb-6">Calculate the distance covered by an object in a specific time.</p>
                    <div className="mt-auto w-full bg-slate-50 border-4 border-emerald-50 py-4 px-2 rounded-2xl flex justify-center">
                        <img src="https://login.skillizee.io/s/articles/69aa60178110a348e33facb3/images/image-20260306103321-1.png" alt="s = ut + 1/2 at^2" className="h-12 mix-blend-multiply" />
                    </div>
                </motion.div>

                {/* 3. Position-Velocity */}
                <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-8 rounded-[2.5rem] border-4 border-rose-100 shadow-xl flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mb-6 shadow-inner border-4 border-white">
                        <Combine strokeWidth={3} className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-black text-slate-800 mb-2">3. Position–Velocity</h4>
                    <p className="text-slate-500 font-medium mb-6">Find distance or velocity when time is not known.</p>
                    <div className="mt-auto w-full bg-slate-50 border-4 border-rose-50 py-4 px-2 rounded-2xl flex justify-center">
                        <img src="https://login.skillizee.io/s/articles/69aa60178110a348e33facb3/images/image-20260306103321-3.png" alt="2as = v^2 - u^2" className="h-8 mix-blend-multiply my-2" />
                    </div>
                </motion.div>

            </div>

            {/* Graphical Example */}
            <div className="w-full bg-white p-8 rounded-[3rem] shadow-xl border-4 border-slate-100 mb-16">
                <h3 className="text-3xl font-extrabold text-slate-800 text-center mb-8">Graphical Derivation Reference 📈</h3>
                <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border-8 border-slate-50 shadow-inner">
                    <img src="https://login.skillizee.io/s/articles/69aa60178110a348e33facb3/images/image-20260306103321-2.jpeg" alt="Graph of Velocity vs Time" className="w-full h-auto" />
                </div>
            </div>

            <OPhysicsK1Simulator />

            {/* 3D Simulator */}
            <h3 className="text-4xl font-extrabold text-slate-800 text-center mb-4 mt-20">The 3D Equations Simulator 🏎️</h3>
            <p className="text-center text-slate-500 text-xl font-medium mb-8">Set your initial conditions and press Drive to see the equations in action!</p>
            <Equations3DActivity />

            <EquationsDragDropActivity />

            <ChapterFooter chapterName="Equations of Motion" />
        </div>
    );
}
