import { motion } from 'framer-motion';
import { Rocket, Info } from 'lucide-react';
import FluidGlass from './FluidGlass';
import ChapterFooter from './ChapterFooter';
import AccelerationActivity from './AccelerationActivity';

function AccelerationHeaderAnimation({ text }: { text: string }) {
    const words = text.split(" ");

    return (
        <div className="flex justify-center gap-3 flex-wrap mb-4 py-2 overflow-hidden">
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.5, y: 50, skewX: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0, skewX: 0 }}
                    transition={{
                        type: "spring",
                        damping: 10,
                        stiffness: 100,
                        delay: i * 0.1,
                    }}
                    className="inline-block text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500 font-outfit drop-shadow-[0_5px_15px_rgba(168,85,247,0.4)] tracking-tighter"
                >
                    {word}
                </motion.span>
            ))}
        </div>
    );
}

export default function ChapterTwoOne() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 pb-24 sm:px-6 lg:px-8 mt-24">
            {/* Header Area */}
            <div className="mb-16 text-center">
                <AccelerationHeaderAnimation text="ACCELERATION" />
                <h2 className="text-3xl font-extrabold text-fuchsia-800 uppercase tracking-widest mt-4 bg-white/50 inline-block px-8 py-2 rounded-full shadow-sm backdrop-blur-sm border-2 border-fuchsia-200">
                    Unit 1: Rate of Change of Velocity
                </h2>
            </div>

            {/* Video & Concept Content */}
            <FluidGlass>
                <div className="flex flex-col items-center">
                    <div className="w-full max-w-[800px] aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-violet-100 bg-black mb-10 relative group">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/YshnFne48pw?start=3307&end=3775"
                            title="Motion Class 9 Physics"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0"
                        />
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            55:07 to 1:02:55
                        </div>
                    </div>

                    <div className="w-full prose prose-lg md:prose-xl max-w-none text-slate-700">
                        <p className="text-2xl font-medium leading-relaxed bg-violet-50 p-8 rounded-3xl border-l-8 border-violet-400 shadow-inner">
                            <strong>In uniform motion</strong>, velocity remains constant, so the change in velocity is zero.
                            However, in <strong>non-uniform motion</strong>, velocity varies. To measure this change, we use <strong>Acceleration</strong>.
                        </p>
                    </div>
                </div>
            </FluidGlass>

            {/* Definitions & Formulas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-12">
                <FluidGlass>
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                        <div className="w-20 h-20 bg-fuchsia-100 rounded-full flex items-center justify-center mb-6 shadow-inner border-4 border-fuchsia-200">
                            <Info className="w-10 h-10 text-fuchsia-500" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 mb-6 uppercase tracking-wider">Definition</h3>
                        <p className="text-2xl font-bold text-slate-600 leading-relaxed bg-white/50 p-6 rounded-2xl">
                            Acceleration is a measure of the change in the velocity of an object per <strong>unit time</strong>.
                        </p>
                    </div>
                </FluidGlass>

                <FluidGlass>
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-inner border-4 border-indigo-200">
                            <Rocket className="w-10 h-10 text-indigo-500" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 mb-6 uppercase tracking-wider">Formula</h3>
                        <p className="text-xl font-medium text-slate-600 mb-6">
                            If the velocity of an object changes from an initial value <strong className="text-indigo-500 bg-indigo-50 px-2 rounded">u</strong> to a final value <strong className="text-indigo-500 bg-indigo-50 px-2 rounded">v</strong> in time <strong className="text-indigo-500 bg-indigo-50 px-2 rounded">t</strong>, the acceleration <strong className="text-indigo-500 bg-indigo-50 px-2 rounded">a</strong> is:
                        </p>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border-4 border-indigo-50">
                            <img src="https://login.skillizee.io/s/articles/69aa5971eedac7eead052776/images/image-20260306100509-2.png" alt="Acceleration Formula" className="h-20 object-contain mx-auto mix-blend-multiply" />
                        </div>
                    </div>
                </FluidGlass>
            </div>

            {/* Key Facts Grid */}
            <h3 className="text-4xl font-extrabold text-slate-800 text-center mb-10 mt-20">Key Facts about Acceleration ⚡</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                {[
                    { title: "Positive", emoji: "🏎️", color: "emerald", desc: "When acceleration is in the direction of velocity (speeding up!)." },
                    { title: "Negative (Retardation)", emoji: "🛑", color: "rose", desc: "When it is opposite to the direction of velocity (e.g., applying brakes)." },
                    { title: "SI Unit", emoji: "📏", color: "sky", desc: "The official unit for measuring acceleration is m/s²." },
                    { title: "Uniform", emoji: "☄️", color: "amber", desc: "When velocity changes by equal amounts in equal time intervals (like a freely falling body!)." }
                ].map((fact, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05, translateY: -5 }}
                        className={`bg-white rounded-3xl p-8 border-4 border-${fact.color}-100 shadow-xl relative overflow-hidden group`}
                    >
                        <div className={`absolute -right-6 -bottom-6 text-9xl opacity-10 group-hover:scale-125 transition-transform duration-500`}>
                            {fact.emoji}
                        </div>
                        <div className={`text-4xl mb-4`}>{fact.emoji}</div>
                        <h4 className={`text-2xl font-black text-${fact.color}-600 mb-2 uppercase tracking-wide`}>{fact.title}</h4>
                        <p className="text-xl font-medium text-slate-600 relative z-10">{fact.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* AI Evaluator Activity */}
            <AccelerationActivity />

            <ChapterFooter chapterName="Rate of Change of Velocity: Acceleration" />
        </div>
    );
}
