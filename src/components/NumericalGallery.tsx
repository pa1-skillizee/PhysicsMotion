import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Trophy, Sparkles } from 'lucide-react';

type Challenge = {
    id: number;
    question: string;
    steps: { label: string; value: string }[];
    category: string;
};

const puzzles: Challenge[] = [
    {
        id: 1,
        category: "Acceleration",
        question: "A bus decreases its speed from 80 km h⁻¹ to 60 km h⁻¹ in 5 s. Find the acceleration.",
        steps: [
            { label: "Given", value: "Initial velocity u = 80 km/h, Final velocity v = 60 km/h, Time t = 5 s" },
            { label: "Conversion", value: "Convert to m/s: u = 22.22 m/s, v = 16.66 m/s" },
            { label: "Formula", value: "a = (v - u) / t" },
            { label: "Calculation", value: "a = (16.66 - 22.22) / 5" },
            { label: "Result", value: "a = -1.11 m s⁻² (Retardation)" }
        ]
    },
    {
        id: 2,
        category: "Graph Logic",
        question: "What is the quantity measured by the area occupied below the velocity-time graph?",
        steps: [
            { label: "Identify", value: "Consider a Velocity-Time graph." },
            { label: "Geometry", value: "Area = Height (Velocity) × Base (Time)" },
            { label: "Physics", value: "Since Velocity × Time = Displacement..." },
            { label: "Result", value: "The area represents the magnitude of Displacement (Distance)." }
        ]
    },
    {
        id: 3,
        category: "Definitions",
        question: "When will you say a body is in (i) uniform and (ii) non-uniform acceleration?",
        steps: [
            { label: "Uniform", value: "If velocity changes by equal amounts in equal intervals of time." },
            { label: "Non-Uniform", value: "If velocity changes by unequal amounts in equal intervals of time." }
        ]
    },
    {
        id: 4,
        category: "Trains",
        question: "A train starting from a station attains a speed of 40 km/h in 10 minutes. Find its acceleration.",
        steps: [
            { label: "Given", value: "Start from rest (u = 0), Final v = 40 km/h, Time t = 10 mins" },
            { label: "Conversion", value: "v = 11.11 m/s, t = 600 seconds" },
            { label: "Formula", value: "a = (v - u) / t" },
            { label: "Result", value: "a = 11.11 / 600 = 0.0185 m s⁻²" }
        ]
    },
    {
        id: 5,
        category: "Distance",
        question: "A bus starting from rest moves with a acceleration of 0.1 m s⁻² for 2 minutes. Find distance.",
        steps: [
            { label: "Given", value: "u = 0, a = 0.1 m/s², t = 120 seconds" },
            { label: "Step 1: Speed", value: "v = u + at = 0 + (0.1 × 120) = 12 m/s" },
            { label: "Step 2: Distance", value: "s = ut + ½at²" },
            { label: "Calculation", value: "s = 0 + 0.5 × 0.1 × (120)²" },
            { label: "Result", value: "s = 720 meters" }
        ]
    },
    {
        id: 6,
        category: "Braking",
        question: "A train at 90 km/h applies brakes producing a = -0.5 m/s². How far will it go before rest?",
        steps: [
            { label: "Given", value: "u = 90 km/h (25 m/s), a = -0.5 m/s², v = 0 (at rest)" },
            { label: "Formula", value: "v² - u² = 2as" },
            { label: "Calculation", value: "0² - 25² = 2 × (-0.5) × s" },
            { label: "Solve", value: "-625 = -1 × s" },
            { label: "Result", value: "s = 625 meters" }
        ]
    },
    {
        id: 7,
        category: "Inclines",
        question: "A trolley on an inclined plane has a = 2 cm/s². What is its velocity 3s after start?",
        steps: [
            { label: "Given", value: "u = 0, a = 2 cm/s², t = 3 s" },
            { label: "Formula", value: "v = u + at" },
            { label: "Calculation", value: "v = 0 + (2 × 3)" },
            { label: "Result", value: "v = 6 cm/s" }
        ]
    },
    {
        id: 8,
        category: "Racing",
        question: "A racing car has a uniform acceleration of 4 m s⁻². What distance will it cover in 10 s?",
        steps: [
            { label: "Given", value: "u = 0, a = 4 m/s², t = 10 s" },
            { label: "Formula", value: "s = ut + ½at²" },
            { label: "Calculation", value: "s = 0 + 0.5 × 4 × (10)²" },
            { label: "Result", value: "s = 200 meters" }
        ]
    },
    {
        id: 9,
        category: "Basics",
        question: "An object moves for 10s with 2m/s² acceleration from rest. Find speed acquired.",
        steps: [
            { label: "Given", value: "u = 0, a = 2 m/s², t = 10 s" },
            { label: "Formula", value: "v = u + at" },
            { label: "Result", value: "v = 0 + 20 = 20 m/s" }
        ]
    },
    {
        id: 10,
        category: "Gravity",
        question: "A stone is thrown up at 5 m/s. Downward a = 10 m/s². Find max height attained.",
        steps: [
            { label: "Given", value: "u = 5 m/s, a = -10 m/s² (Opposing motion), v = 0 (at peak)" },
            { label: "Formula", value: "v² - u² = 2as" },
            { label: "Calculation", value: "0 - 5² = 2 × (-10) × s" },
            { label: "Solve", value: "-25 = -20s" },
            { label: "Result", value: "s = 1.25 meters" }
        ]
    }
];

export default function NumericalGallery() {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <div className="w-full my-24 px-4">
            <div className="text-center mb-16">
                <span className="bg-amber-100 text-amber-700 px-6 py-2 rounded-full font-black text-sm tracking-widest uppercase italic">The Physics Arena</span>
                <h3 className="text-5xl font-black text-slate-900 mt-4 mb-4">Numerical Challenge Elite 10</h3>
                <p className="text-slate-500 font-medium max-w-2xl mx-auto">Master the equations of motion by solving these legendary problems. Click any card to reveal the secret step-by-step solution!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {puzzles.map((item) => (
                    <motion.div
                        key={item.id}
                        layout
                        onClick={() => setSelected(selected === item.id ? null : item.id)}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className={`cursor-pointer group relative bg-white rounded-[2.5rem] border-4 transition-all duration-300 overflow-hidden ${selected === item.id
                            ? 'border-indigo-500 shadow-indigo-100 shadow-2xl p-10 ring-4 ring-indigo-50 leading-relaxed lg:col-span-2'
                            : 'border-slate-100 hover:border-indigo-200 shadow-xl p-8 hover:shadow-2xl'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors px-4 py-1.5 rounded-2xl font-black text-[10px] tracking-widest uppercase border border-slate-100">
                                {item.category}
                            </span>
                            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 font-black">
                                {item.id}
                            </div>
                        </div>

                        <h4 className={`text-xl font-bold leading-tight transition-colors ${selected === item.id ? 'text-indigo-900 mb-8 text-2xl' : 'text-slate-700'}`}>
                            {item.question}
                        </h4>

                        <AnimatePresence>
                            {selected === item.id ? (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="pt-6 border-t-2 border-indigo-100"
                                >
                                    <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest mb-6">
                                        <Sparkles className="w-4 h-4" />
                                        Step-by-Step Breakdown
                                    </div>

                                    <div className="space-y-4">
                                        {item.steps.map((step, idx) => (
                                            <div key={idx} className="flex gap-4 items-start group/step">
                                                <div className="mt-1 w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-black shrink-0 group-hover/step:bg-indigo-600 group-hover/step:text-white transition-colors">
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter block mb-0.5">{step.label}</span>
                                                    <p className={`font-mono font-bold leading-relaxed ${step.label === 'Result' ? 'text-emerald-600 text-xl' : 'text-slate-600 text-lg'}`}>
                                                        {step.value}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 flex items-center gap-3 bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                                        <div className="p-2 bg-white rounded-lg shadow-sm">
                                            <Trophy className="w-5 h-5 text-indigo-500" />
                                        </div>
                                        <p className="text-indigo-900 font-bold text-sm italic">
                                            "A true physicist notices the small details in the math!"
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="mt-6 flex items-center gap-2 text-indigo-400 group-hover:text-indigo-600 font-black text-xs uppercase tracking-widest transition-colors">
                                    Analyze Solution <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

