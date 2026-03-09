import { motion } from 'framer-motion';
import ChapterFooter from './ChapterFooter';
import InteractiveGraphSimulator from './InteractiveGraphSimulator';
import GraphDataPlotterActivity from './GraphDataPlotterActivity';
import OPhysicsK3Simulator from './OPhysicsK3Simulator';
import { LineChart, Play, CheckCircle } from 'lucide-react';

function GraphHeaderAnimation() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl mx-auto bg-white/60 backdrop-blur-xl border-2 border-white p-12 rounded-[3.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.05)] mb-12 relative overflow-hidden"
        >
            <div className="absolute top-0 w-full h-3 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 left-0" />

            <div className="flex flex-col items-center justify-center text-center relative z-10">
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 bg-violet-100 rounded-[2.5rem] flex items-center justify-center text-violet-600 mb-8 border-4 border-white shadow-lg"
                >
                    <LineChart className="w-12 h-12" />
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter mb-2 font-outfit">
                    VISUALIZING
                </h1>
                <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-violet-600 to-fuchsia-600 tracking-tighter drop-shadow-sm font-outfit">
                    MOTION GRAPHS
                </h2>
            </div>

            {/* Decorative background grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, slate-400 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        </motion.div>
    );
}

export default function ChapterThreeOne() {
    return (
        <div className="w-full min-h-screen bg-slate-50/50 pb-20">
            {/* Header Section */}
            <div className="pt-20 px-4">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="max-w-4xl mx-auto mb-8 pl-4"
                >
                    <div className="flex items-center gap-3 bg-white/80 border-2 border-white px-6 py-3 rounded-full w-fit shadow-sm backdrop-blur-md">
                        <span className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white font-black text-sm shadow-md">1</span>
                        <h4 className="text-slate-600 font-black tracking-widest uppercase text-sm">Unit 1: Motion Graphs</h4>
                    </div>
                </motion.div>

                <GraphHeaderAnimation />
            </div>

            <div className="max-w-7xl mx-auto px-4">

                {/* Introduction */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-white p-10 rounded-[3rem] border-4 border-slate-100 shadow-xl mb-16 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50 rounded-bl-full flex items-start justify-end p-6">
                        <LineChart className="text-violet-400 opacity-50" size={48} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-800 mb-4">Distance-Time Graphs</h3>
                    <p className="text-xl text-slate-600 leading-relaxed font-medium max-w-4xl mb-8">
                        The change in position of an object with time can be represented on a distance-time graph. Time is taken along the <strong className="text-violet-600 bg-violet-50 px-2 rounded-md">x-axis</strong> and distance along the <strong className="text-pink-600 bg-pink-50 px-2 rounded-md">y-axis</strong>.
                    </p>

                    <div className="w-full flex justify-center mb-8">
                        <iframe
                            className="w-full max-w-[800px] aspect-video rounded-3xl shadow-xl border-4 border-slate-100"
                            src="https://www.youtube.com/embed/5VGL-wF-WyQ"
                            title="Motion Graphs Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </motion.div>

                {/* Graph Simulator Section */}
                <div className="mb-24">
                    <div className="text-center mb-10">
                        <span className="bg-fuchsia-100 text-fuchsia-700 px-6 py-2 rounded-full font-black text-sm tracking-widest uppercase">Experiential Learning</span>
                        <h3 className="text-4xl font-black text-slate-900 mt-4 mb-4">The Live Graph Simulator</h3>
                        <p className="text-slate-500 font-medium max-w-2xl mx-auto">Toggle the motion state of the car and watch how the graphs draw themselves in real-time!</p>
                    </div>

                    <InteractiveGraphSimulator />

                    <OPhysicsK3Simulator />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
                    <div className="bg-gradient-to-br from-violet-500 to-indigo-600 p-10 rounded-[3rem] text-white shadow-xl">
                        <h4 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">1</span>
                            Uniform Speed
                        </h4>
                        <div className="space-y-4 text-violet-100 font-medium text-lg leading-relaxed">
                            <p>The distance-time graph is a <strong className="text-white">straight line passing through the origin</strong>.</p>
                            <p>This shows that distance is directly proportional to time. The object travels equal distances in equal intervals.</p>
                            <div className="mt-6 p-4 bg-white/10 rounded-2xl border border-white/20">
                                <p className="font-bold text-white mb-2">Calculating Speed (v)</p>
                                <p className="font-mono text-sm">Slope = (s₂ - s₁) / (t₂ - t₁)</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-10 rounded-[3rem] text-white shadow-xl">
                        <h4 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">2</span>
                            Non-Uniform Speed
                        </h4>
                        <div className="space-y-4 text-pink-100 font-medium text-lg leading-relaxed">
                            <p>When an object covers unequal distances in equal intervals of time (Accelerated Motion).</p>
                            <p>The nature of the graph is a <strong className="text-white">curve (non-linear)</strong>.</p>
                            <div className="mt-6 p-4 bg-white/10 rounded-2xl border border-white/20">
                                <p className="font-bold text-white mb-2">Example</p>
                                <p className="text-sm">A car covering 1m in 2s, then 4m in 4s, then 9m in 6s shows a non-linear variation.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Velocity Time Graphs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-white p-10 rounded-[3rem] border-4 border-slate-100 shadow-xl mb-16"
                >
                    <h3 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-4">
                        <span className="bg-blue-100 text-blue-600 p-3 rounded-2xl">
                            <LineChart size={32} />
                        </span>
                        Velocity-Time Graphs
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                        <div>
                            <h5 className="text-xl font-bold text-slate-700 mb-3">Uniform Motion</h5>
                            <ul className="space-y-3 text-slate-600 font-medium list-disc list-inside">
                                <li>The height of the graph does not change.</li>
                                <li>It is a <span className="text-blue-600 font-bold">straight line parallel to the x-axis</span>.</li>
                                <li>The area underneath gives the <strong>distance</strong> (magnitude of displacement).</li>
                                <li className="font-mono bg-slate-50 p-2 rounded-lg mt-2 text-sm">s = AC × CD = Area of Rectangle</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-xl font-bold text-slate-700 mb-3">Uniform Acceleration</h5>
                            <ul className="space-y-3 text-slate-600 font-medium list-disc list-inside">
                                <li>Velocity changes by equal amounts in equal intervals.</li>
                                <li>The graph is a <span className="text-emerald-600 font-bold">straight line with a slope</span>.</li>
                                <li>The <span className="bg-emerald-50 text-emerald-700 font-bold px-1">slope</span> represents the acceleration.</li>
                                <li className="font-mono bg-slate-50 p-2 rounded-lg mt-2 text-sm text-[12px]">s = Area of Rectangle + Area of Triangle</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Feroz and Sania Plotter Section */}
                <div className="mb-24">
                    <div className="bg-white p-10 rounded-t-[3rem] border-4 border-b-0 border-slate-100 relative">
                        <h4 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-3">
                            <Play className="text-rose-500 fill-current w-6 h-6" /> Activity: Feroz and Sania
                        </h4>
                        <p className="text-lg text-slate-600 font-medium max-w-4xl">
                            Feroz and his sister Sania go to school on their bicycles. Both of them start at the same time from their home but take different times to reach the school although they follow the same route. Table 7.5 shows the distance travelled by them in different times. Plot the distance-time graph for their motions on the same scale and interpret.
                        </p>
                    </div>
                    <GraphDataPlotterActivity />
                </div>

                {/* Summary Table */}
                <div className="mb-24">
                    <h3 className="text-4xl font-black text-center text-slate-900 mb-10">The Graph Matrix</h3>
                    <div className="bg-white rounded-[3rem] border-4 border-slate-100 shadow-2xl overflow-hidden max-w-5xl mx-auto">
                        <div className="grid grid-cols-3 bg-slate-50 border-b-4 border-slate-100 p-6">
                            <div className="font-black text-slate-400 tracking-widest uppercase text-sm">Graph Type</div>
                            <div className="font-black text-slate-400 tracking-widest uppercase text-sm">Key Feature</div>
                            <div className="font-black text-slate-400 tracking-widest uppercase text-sm">Physical Quantity</div>
                        </div>

                        <div className="grid grid-cols-3 p-6 border-b-2 border-slate-50 items-center hover:bg-violet-50/50 transition-colors">
                            <div className="font-bold text-slate-700 text-lg flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-violet-500" /> Distance-Time
                            </div>
                            <div className="font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-xl w-fit">Slope</div>
                            <div className="font-black text-violet-600 text-xl">Speed</div>
                        </div>

                        <div className="grid grid-cols-3 p-6 border-b-2 border-slate-50 items-center hover:bg-emerald-50/50 transition-colors">
                            <div className="font-bold text-slate-700 text-lg flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-emerald-500" /> Velocity-Time
                            </div>
                            <div className="font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-xl w-fit">Slope</div>
                            <div className="font-black text-emerald-600 text-xl">Acceleration</div>
                        </div>

                        <div className="grid grid-cols-3 p-6 items-center hover:bg-pink-50/50 transition-colors">
                            <div className="font-bold text-slate-700 text-lg flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-pink-500" /> Velocity-Time
                            </div>
                            <div className="font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-xl w-fit">Area Under Curve</div>
                            <div className="font-black text-pink-600 text-xl">Displacement (Distance)</div>
                        </div>
                    </div>
                </div>

                {/* Review Questions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-slate-800 p-10 lg:p-14 rounded-[3rem] shadow-xl mb-24 text-white relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-700 rounded-bl-full flex items-start justify-end p-12 opacity-50 z-0 text-slate-600">
                        <CheckCircle size={100} />
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-3xl font-black text-white mb-8">Questions from the Text</h3>

                        <div className="space-y-8">
                            <div className="bg-slate-700/50 p-6 rounded-2xl border border-slate-600">
                                <p className="text-lg font-medium mb-4"><strong>1.</strong> What is the nature of the distance-time graphs for uniform and non-uniform motion of an object?</p>
                                <div className="bg-emerald-500/10 text-emerald-300 p-4 rounded-xl font-medium flex gap-3 border border-emerald-500/20">
                                    <CheckCircle className="shrink-0 mt-0.5" />
                                    <span><strong>Uniform:</strong> A straight line passing through origin.<br /><strong>Non-Uniform:</strong> A curved (non-linear) line.</span>
                                </div>
                            </div>

                            <div className="bg-slate-700/50 p-6 rounded-2xl border border-slate-600">
                                <p className="text-lg font-medium mb-4"><strong>2.</strong> What can you say about the motion of an object whose distance-time graph is a straight line parallel to the time axis?</p>
                                <div className="bg-emerald-500/10 text-emerald-300 p-4 rounded-xl font-medium flex gap-3 border border-emerald-500/20">
                                    <CheckCircle className="shrink-0 mt-0.5" />
                                    <span>The object is at <strong>rest</strong> (its position is not changing as time passes).</span>
                                </div>
                            </div>

                            <div className="bg-slate-700/50 p-6 rounded-2xl border border-slate-600">
                                <p className="text-lg font-medium mb-4"><strong>3.</strong> What can you say about the motion of an object if its speed-time graph is a straight line parallel to the time axis?</p>
                                <div className="bg-emerald-500/10 text-emerald-300 p-4 rounded-xl font-medium flex gap-3 border border-emerald-500/20">
                                    <CheckCircle className="shrink-0 mt-0.5" />
                                    <span>The object is moving with <strong>uniform speed</strong> (zero acceleration).</span>
                                </div>
                            </div>

                            <div className="bg-slate-700/50 p-6 rounded-2xl border border-slate-600">
                                <p className="text-lg font-medium mb-4"><strong>4.</strong> What is the quantity which is measured by the area occupied below the velocity-time graph?</p>
                                <div className="bg-emerald-500/10 text-emerald-300 p-4 rounded-xl font-medium flex gap-3 border border-emerald-500/20">
                                    <CheckCircle className="shrink-0 mt-0.5" />
                                    <span>The magnitude of displacement (or distance traveled).</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>

            <ChapterFooter chapterName="3.1 ⏤ Motion Graphs" />
        </div>
    );
}
