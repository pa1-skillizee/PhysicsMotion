import { motion } from 'framer-motion';
import ChapterFooter from './ChapterFooter';
import ProblemSolverActivity from './ProblemSolverActivity';
import NumericalGallery from './NumericalGallery';
import { Target, Zap, Rocket } from 'lucide-react';

function PracticalHeaderAnimation() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto bg-white/40 backdrop-blur-xl border border-white/60 p-12 rounded-[3.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.05)] mb-12 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500"></div>

            <div className="flex flex-col items-center justify-center text-center">
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 bg-emerald-100 rounded-[2rem] flex items-center justify-center text-emerald-600 mb-6 border-4 border-emerald-50"
                >
                    <Target className="w-10 h-10" />
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-800 to-slate-900 font-outfit tracking-tighter mb-2">
                    PRACTICAL
                </h1>
                <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-teal-600 to-cyan-600 font-outfit tracking-tighter drop-shadow-[0_10px_20px_rgba(16,185,129,0.3)]">
                    APPLICATIONS
                </h2>

                <p className="mt-6 text-slate-500 font-bold tracking-widest uppercase text-sm flex items-center gap-3">
                    <Zap className="w-4 h-4 text-amber-500" /> Solving Real World Physics <Zap className="w-4 h-4 text-amber-500" />
                </p>
            </div>
        </motion.div>
    );
}

export default function ChapterTwoThree() {
    return (
        <div className="w-full min-h-screen bg-slate-50/50 pb-20">
            {/* Removed empty box */}

            {/* Header Section */}
            <div className="pt-20 px-4">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="max-w-4xl mx-auto mb-8 pl-4"
                >
                    <div className="flex items-center gap-3 bg-white/80 border-2 border-white px-6 py-3 rounded-full w-fit shadow-sm backdrop-blur-md">
                        <span className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-black text-sm">3</span>
                        <h4 className="text-slate-600 font-black tracking-widest uppercase text-sm">Unit 3: Practical Application (Example)</h4>
                    </div>
                </motion.div>

                <PracticalHeaderAnimation />
            </div>

            <div className="max-w-7xl mx-auto px-4">

                {/* Introduction Case Study */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center my-20">
                    <div className="lg:col-span-3 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-white p-12 rounded-[3.5rem] border-4 border-slate-100 shadow-xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16"></div>
                            <h3 className="text-4xl font-black text-slate-900 mb-6 italic">"How do we actually use these equations?"</h3>
                            <p className="text-2xl text-slate-600 leading-relaxed font-medium">
                                Physics isn't just about formulas on paper—it's the manual for the universe! Whether you are <span className="text-blue-500 font-bold">paddling a bicycle</span> like Rahul or <span className="text-rose-500 font-bold">applying brakes</span> on a high-speed train, the Equations of Motion are working behind the scenes.
                            </p>
                        </motion.div>

                        <div className="flex gap-4">
                            <div className="flex-1 bg-gradient-to-br from-indigo-500 to-blue-600 p-8 rounded-[2.5rem] text-white shadow-lg">
                                <Rocket className="w-8 h-8 mb-4 opacity-80" />
                                <h5 className="text-xl font-black mb-2">Acceleration</h5>
                                <p className="text-indigo-100 font-medium">Speeding up or launching into action!</p>
                            </div>
                            <div className="flex-1 bg-gradient-to-br from-slate-700 to-slate-900 p-8 rounded-[2.5rem] text-white shadow-lg">
                                <div className="w-8 h-8 rounded-lg bg-rose-500 mb-4" />
                                <h5 className="text-xl font-black mb-2">Retardation</h5>
                                <p className="text-slate-300 font-medium">Coming to a safe, controlled stop.</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-emerald-400 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                            <div className="relative bg-white p-6 rounded-[3rem] border-8 border-slate-100 shadow-2xl overflow-hidden transform group-hover:scale-[1.02] transition-transform">
                                <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" alt="Robot Calculating" className="w-full h-[400px] object-cover rounded-[2.2rem]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
                                    <p className="text-white text-xl font-black">Applied Science in Motion</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ProblemSolverActivity />

                <NumericalGallery />
            </div>

            <ChapterFooter chapterName="Practical Application Sums" />
        </div>
    );
}
