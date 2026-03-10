import { motion } from 'framer-motion';
import ChapterFooter from './ChapterFooter';
import { RotateCw, MoveRight, BookOpen, CheckCircle, Zap } from 'lucide-react';
import PolygonToCircleActivity from './PolygonToCircleActivity';
import StoneThreadActivity from './StoneThreadActivity';

function CircleHeaderAnimation() {
    return (
        <div className="relative h-64 w-full rounded-[3rem] overflow-hidden mb-16 shadow-2xl bg-slate-900 border-4 border-slate-800">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black opacity-80"></div>

            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    className="w-48 h-48 border-4 border-dashed border-indigo-500/30 rounded-full flex items-center justify-center relative"
                >
                    {/* Orbiting element */}
                    <div className="absolute -top-3 w-6 h-6 bg-rose-500 rounded-full shadow-[0_0_20px_rgba(244,63,94,0.8)]"></div>
                </motion.div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-rose-400 tracking-tight"
                >
                    CIRCULAR MOTION
                </motion.h2>
                <p className="text-indigo-200 mt-2 font-bold tracking-widest uppercase text-sm md:text-base">Infinite Direction Changes</p>
            </div>
        </div>
    );
}

export default function ChapterThreeTwo() {
    return (
        <div className="min-h-screen font-sans text-slate-800 pt-24 pb-12 px-4 sm:px-8 relative z-10 w-full max-w-6xl mx-auto selection:bg-rose-200 selection:text-rose-900">
            <CircleHeaderAnimation />

            <div className="space-y-16">

                {/* Intro Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-white/90 backdrop-blur-xl p-10 lg:p-14 rounded-[3rem] shadow-xl border-4 border-slate-100 flex flex-col md:flex-row gap-12 items-center"
                >
                    <div className="flex-1">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 mb-6 shadow-inner">
                            <RotateCw className="text-indigo-600" size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 mb-6">Unit 2: Uniform Circular Motion</h3>
                        <p className="text-xl text-slate-600 leading-relaxed font-medium">
                            Acceleration occurs when an object's velocity changes. This change can be in <strong>magnitude</strong> (speed), <strong>direction</strong>, or both. Uniform circular motion is a unique case where the speed stays the same, but the object is <span className="underline decoration-wavy decoration-rose-400 font-bold text-rose-600">constantly accelerating</span> because its direction is always changing.
                        </p>
                    </div>
                </motion.div>

                {/* Polygons to Circle Content */}
                <div className="bg-slate-50 p-10 lg:p-14 rounded-[3rem] shadow-inner border-2 border-slate-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-200 rounded-bl-full opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                    <h3 className="text-3xl font-black text-slate-800 mb-6 relative z-10">From Polygons to a Circle</h3>
                    <p className="text-xl text-slate-600 leading-relaxed font-medium mb-12 relative z-10 max-w-4xl">
                        When an athlete runs on a completely circular track, they are changing direction at <strong>every single point</strong> on the path. If they run at a constant speed, the only change in velocity is due to this constant direction change. Therefore, it is an <strong>accelerated motion</strong>.
                    </p>

                    <PolygonToCircleActivity />
                </div>

                {/* Defining Uniform Circular Motion */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-white/90 backdrop-blur-xl p-10 lg:p-14 rounded-[3rem] shadow-xl border-4 border-slate-100 flex flex-col md:flex-row gap-12 items-center text-center md:text-left"
                >
                    <div className="flex-1">
                        <span className="bg-sky-100 text-sky-700 px-4 py-1.5 rounded-full font-black text-xs tracking-widest uppercase mb-4 inline-block">Definition</span>
                        <h3 className="text-3xl font-black text-slate-800 mb-6">Defining Uniform Circular Motion</h3>
                        <p className="text-xl text-slate-600 leading-relaxed font-medium">
                            When an object moves in a circular path with <strong>constant speed</strong>, its motion is called <strong className="text-sky-600">Uniform Circular Motion</strong>. Even though the speed is constant, it is considered an <strong className="text-rose-600">accelerated motion</strong> because the direction of velocity is constantly changing.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 flex justify-center">
                        <div className="w-40 h-40 bg-slate-50 rounded-full border-8 border-slate-100 shadow-inner flex items-center justify-center relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                className="absolute inset-2 border-4 border-dashed border-sky-400 rounded-full"
                            />
                            <Zap className="text-amber-500 w-12 h-12" />
                        </div>
                    </div>
                </motion.div>

                {/* The Formula Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-indigo-600 p-10 lg:p-14 rounded-[3rem] shadow-2xl border-4 border-indigo-500 text-white flex flex-col items-center text-center relative overflow-hidden"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/50 to-transparent"></div>

                    <div className="relative z-10 max-w-3xl">
                        <h3 className="text-3xl font-black mb-6 drop-shadow-md">Calculating Speed in a Circle</h3>
                        <p className="text-xl text-indigo-100 font-medium mb-8">
                            We know that the circumference of a circle of radius <strong className="text-rose-300">r</strong> is given by <strong className="text-rose-300">2πr</strong>. If the athlete takes <strong className="text-cyan-300">t</strong> seconds to go once around the circular path, the speed <strong className="text-white">v</strong> is given by:
                        </p>

                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-xl inline-block">
                            <div className="flex items-center gap-6 text-4xl lg:text-6xl font-black font-serif">
                                <span className="text-white italic">v</span>
                                <span>=</span>
                                <div className="flex flex-col items-center">
                                    <span className="border-b-4 border-rose-300 pb-2 text-rose-300">2πr</span>
                                    <span className="pt-2 text-cyan-300 italic">t</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Direction of Motion Activity Layer */}
                <div className="bg-white p-10 lg:p-14 rounded-[3rem] shadow-xl border-4 border-slate-100">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-rose-100 rounded-2xl text-rose-600">
                            <MoveRight size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-800">Direction of Motion (The Tangent)</h3>
                    </div>
                    <p className="text-xl text-slate-600 leading-relaxed font-medium mb-12 max-w-4xl">
                        If you take a piece of thread, tie a stone to one end, and spin it in a circle at a constant speed, what happens when you suddenly let go? It demonstrates that at any given moment, an object in circular motion wants to move in a straight line (a <strong>tangent</strong>).
                    </p>

                    <StoneThreadActivity />

                    <div className="mt-12 bg-rose-50 p-8 rounded-3xl border-2 border-rose-100">
                        <h4 className="text-rose-800 font-bold text-lg mb-4">Real-World Examples of Uniform Circular Motion:</h4>
                        <ul className="text-rose-700 font-medium space-y-3 pl-4 border-l-4 border-rose-300">
                            <li>• The motion of the Moon or satellites orbiting the Earth.</li>
                            <li>• A cyclist moving on a circular track at a constant speed.</li>
                            <li>• An athlete throwing a hammer or discus after rotating their body to build speed.</li>
                        </ul>
                    </div>
                </div>

                {/* What have you learnt Summary Section */}
                <div className="bg-slate-900 text-white p-10 lg:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden border-4 border-slate-800">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent"></div>

                    <div className="flex items-center gap-4 mb-8 relative z-10">
                        <div className="p-3 bg-sky-500/20 rounded-2xl text-sky-400">
                            <BookOpen size={32} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-white">What Have You Learnt?</h3>
                            <p className="text-slate-400 font-medium mt-1">
                                Motion is a change of position; it can be described in terms of the distance moved or the displacement.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 flex gap-4">
                            <CheckCircle className="text-emerald-400 shrink-0 mt-1" />
                            <p className="text-slate-300 font-medium">The motion of an object could be uniform or non-uniform depending on whether its velocity is constant or changing.</p>
                        </div>
                        <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 flex gap-4">
                            <CheckCircle className="text-emerald-400 shrink-0 mt-1" />
                            <p className="text-slate-300 font-medium">The speed of an object is the distance covered per unit time, and velocity is the displacement per unit time.</p>
                        </div>
                        <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 flex gap-4">
                            <CheckCircle className="text-emerald-400 shrink-0 mt-1" />
                            <p className="text-slate-300 font-medium">The acceleration of an object is the change in velocity per unit time. Uniform and non-uniform motions can be shown through graphs.</p>
                        </div>
                        <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 flex gap-4">
                            <CheckCircle className="text-emerald-400 shrink-0 mt-1" />
                            <p className="text-slate-300 font-medium">If an object moves in a circular path with uniform speed, its motion is called uniform circular motion.</p>
                        </div>
                    </div>

                    <div className="mt-8 bg-indigo-900/40 p-8 rounded-3xl border border-indigo-500/30 relative z-10">
                        <h4 className="text-xl font-black text-indigo-300 mb-4">The Equations of Motion</h4>
                        <p className="text-indigo-100 font-medium mb-6">
                            The motion of an object moving at uniform acceleration can be described with the help of the following equations, where <strong className="text-sky-300">u</strong> is initial velocity, <strong className="text-rose-300">a</strong> is uniform acceleration for time <strong className="text-amber-300">t</strong>, <strong className="text-emerald-300">v</strong> is final velocity and <strong className="text-purple-300">s</strong> is distance travelled:
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <span className="bg-white/10 px-6 py-3 rounded-2xl font-black text-2xl font-serif text-white shadow-inner backdrop-blur-sm border border-white/20">v = u + at</span>
                            <span className="bg-white/10 px-6 py-3 rounded-2xl font-black text-2xl font-serif text-white shadow-inner backdrop-blur-sm border border-white/20 flex items-center gap-2">
                                <span>s = ut +</span>
                                <div className="flex flex-col items-center justify-center text-[0.6em] leading-none mt-1">
                                    <span className="border-b-2 border-white pb-[2px] w-full text-center">1</span>
                                    <span className="pt-[2px]">2</span>
                                </div>
                                <span>at²</span>
                            </span>
                            <span className="bg-white/10 px-6 py-3 rounded-2xl font-black text-2xl font-serif text-white shadow-inner backdrop-blur-sm border border-white/20">2as = v² - u²</span>
                        </div>
                    </div>
                </div>

            </div>

            <ChapterFooter chapterName="3.2 ⏤ Uniform Circular Motion" />
        </div>
    );
}
