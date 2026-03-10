import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlignCenterVertical, GitCommit, Route } from 'lucide-react';

type EquationCard = {
    id: string;
    name: string;
    formula: string;
    icon: React.ElementType;
    color: string;
};

type Scenario = {
    id: string;
    text: string;
    correctMatch: string;
};

const EQUATIONS: EquationCard[] = [
    { id: 'v-t', name: 'Velocity-Time', formula: 'v = u + at', icon: GitCommit, color: 'indigo' },
    { id: 'p-t', name: 'Position-Time', formula: 's = ut + ½at²', icon: Route, color: 'emerald' },
    { id: 'p-v', name: 'Position-Velocity', formula: '2as = v² - u²', icon: AlignCenterVertical, color: 'rose' }
];

const SCENARIOS: Scenario[] = [
    { id: 's1', text: "Finding out how fast a rocket is going 10 seconds after Launch 🚀", correctMatch: 'v-t' },
    { id: 's2', text: "Calculating the total distance a train traveled before coming to a complete stop 🚂", correctMatch: 'p-v' },
    { id: 's3', text: "Figuring out exactly where a dropped water balloon is after falling for 3 seconds 🎈", correctMatch: 'p-t' },
    { id: 's4', text: "Determining the final speed of a cheetah accelerating for 5 seconds 🐆", correctMatch: 'v-t' },
    { id: 's5', text: "Finding the braking distance of a car hitting the brakes at 30 m/s 🛑", correctMatch: 'p-v' },
    { id: 's6', text: "Calculating the height of a cliff by timing a dropped stone ⛰️", correctMatch: 'p-t' },
    { id: 's7', text: "Knowing the speed a superhero reaches after flying upwards for 8s 🦸‍♂️", correctMatch: 'v-t' },
    { id: 's8', text: "Finding the runway length needed for an airplane to reach takeoff speed ✈️", correctMatch: 'p-v' },
    { id: 's9', text: "Predicting where a sliding baseball player will stop ⚾", correctMatch: 'p-t' },
    { id: 's10', text: "Calculating the velocity of a bullet right before hitting a target 🎯", correctMatch: 'v-t' },
    { id: 's11', text: "Figuring out the stopping distance of a bicycle on wet grass 🚲", correctMatch: 'p-v' },
    { id: 's12', text: "Determining the fall distance of a skydiver in the first 10 seconds 🪂", correctMatch: 'p-t' },
    { id: 's13', text: "Finding the speed of a roller coaster at the bottom of a drop 🎢", correctMatch: 'v-t' },
    { id: 's14', text: "Calculating the distance a sprinter covers while accelerating to max speed 🏃", correctMatch: 'p-t' },
    { id: 's15', text: "Finding the speed of a spaceship after a 5-minute engine burn 🛸", correctMatch: 'v-t' },
    { id: 's16', text: "Determining how deep a well is by dropping a coin and timing the splash 🪙", correctMatch: 'p-t' },
    { id: 's17', text: "Calculating the minimum track length for a dragster to hit 300 mph 🏎️", correctMatch: 'p-v' },
    { id: 's18', text: "Finding the velocity of a bowling ball after rolling for 4 seconds 🎳", correctMatch: 'v-t' },
    { id: 's19', text: "Determining the stopping distance of a ship reversing engines 🚢", correctMatch: 'p-v' },
    { id: 's20', text: "Calculating the distance an elevator falls in 2 seconds if the cable snaps 🏢", correctMatch: 'p-t' }
];

export default function EquationsDragDropActivity() {
    const [currentPage, setCurrentPage] = useState(0);
    const scenariosPerPage = 3;
    
    // Get current scenarios slice
    const currentScenarios = SCENARIOS.slice(
        currentPage * scenariosPerPage, 
        (currentPage + 1) * scenariosPerPage
    );

    // Initial matches state based on current slice
    const initialMatches = currentScenarios.reduce((acc, curr) => {
        acc[curr.id] = null;
        return acc;
    }, {} as Record<string, string | null>);

    const [matches, setMatches] = useState<Record<string, string | null>>(initialMatches);
    const [draggedScenario, setDraggedScenario] = useState<string | null>(null);
    const [isComplete, setIsComplete] = useState<boolean>(false);

    // Reset matches when page changes
    useEffect(() => {
        const newInitialMatches = currentScenarios.reduce((acc, curr) => {
            acc[curr.id] = null;
            return acc;
        }, {} as Record<string, string | null>);
        setMatches(newInitialMatches);
        setIsComplete(false);
    }, [currentPage]);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData("text/plain", id);
        setDraggedScenario(id);
    };

    const handleDrop = (e: React.DragEvent, equationId: string) => {
        e.preventDefault();
        const scenarioId = e.dataTransfer.getData("text/plain");

        const scenario = SCENARIOS.find(s => s.id === scenarioId);
        if (scenario && scenario.correctMatch === equationId) {
            setMatches(prev => {
                const newMatches = { ...prev, [scenarioId]: equationId };
                // Check if all are matched
                if (Object.values(newMatches).every(val => val !== null)) {
                    setIsComplete(true);
                }
                return newMatches as any;
            });
        }
        setDraggedScenario(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); // Necessary to allow drop
    };

    return (
        <div className="w-full bg-slate-50 p-8 md:p-12 rounded-[3.5rem] border-8 border-slate-200 shadow-xl my-16">
            <h3 className="text-4xl font-extrabold text-slate-800 mb-4 text-center">🧩 The Equation Match-Up Challenge</h3>
            <p className="text-lg text-slate-500 font-medium text-center max-w-3xl mx-auto mb-10">
                Drag the real-world physics problems from the left and drop them onto the correct Mathematical Equation on the right!
            </p>

            {isComplete && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-emerald-100 border-4 border-emerald-400 p-6 rounded-3xl text-center mb-8 shadow-lg"
                >
                    <h4 className="text-3xl font-black text-emerald-600 mb-2">🎉 Master Physicist Unlocked! 🎉</h4>
                    <p className="text-emerald-800 font-medium">You know exactly which mathematical tool to use for every job!</p>
                </motion.div>
            )}

            <div className="flex flex-col md:flex-row gap-8">

                {/* Draggable Scenarios */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <div className="flex justify-between items-center mb-2 pl-4">
                        <h4 className="text-xl font-bold text-slate-400 uppercase tracking-widest">Real World Problems</h4>
                        <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                            Set {currentPage + 1} of {Math.ceil(SCENARIOS.length / scenariosPerPage)}
                        </span>
                    </div>
                    {currentScenarios.map(scenario => {
                        const isMatched = matches[scenario.id] !== null;
                        return (
                            <motion.div
                                key={scenario.id}
                                draggable={!isMatched}
                                onDragStart={(e: any) => handleDragStart(e, scenario.id)}
                                onDragEnd={() => setDraggedScenario(null)}
                                whileHover={!isMatched ? { scale: 1.02, y: -2 } : {}}
                                className={`p-6 rounded-3xl border-4 text-lg font-bold shadow-md transition-all ${isMatched
                                    ? 'bg-slate-200 border-slate-300 text-slate-400 opacity-50 cursor-not-allowed'
                                    : 'bg-white border-blue-200 text-slate-700 cursor-grab active:cursor-grabbing hover:border-blue-400'
                                    }`}
                            >
                                {scenario.text}
                            </motion.div>
                        );
                    })}

                    <button
                        onClick={() => setCurrentPage((prev) => (prev + 1) % Math.ceil(SCENARIOS.length / scenariosPerPage))}
                        className="mt-4 py-4 rounded-2xl border-4 border-slate-300 text-slate-500 font-bold uppercase tracking-widest hover:bg-slate-200 hover:text-slate-700 transition-colors w-full bg-slate-100"
                    >
                        Load More Questions 🔄
                    </button>
                </div>

                {/* Drop Zones (Equations) */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <h4 className="text-xl font-bold text-slate-400 uppercase tracking-widest mb-2 pl-4">The Equations</h4>
                    {EQUATIONS.map((eq: any) => {
                        const matchedScenario = Object.keys(matches).find((key: any) => matches[key] === eq.id);
                        const isHovered = draggedScenario !== null;

                        return (
                            <div
                                key={eq.id}
                                onDrop={(e: any) => handleDrop(e, eq.id)}
                                onDragOver={handleDragOver}
                                className={`relative p-8 rounded-3xl border-4 flex flex-col items-center justify-center min-h-[140px] transition-colors ${matchedScenario
                                    ? `bg-${eq.color}-50 border-${eq.color}-400 shadow-inner`
                                    : isHovered
                                        ? 'bg-slate-100 border-dashed border-slate-400'
                                        : 'bg-slate-50 border-dashed border-slate-300'
                                    }`}
                            >
                                {!matchedScenario ? (
                                    <>
                                        <eq.icon className={`w-10 h-10 text-${eq.color}-400 mb-3 opacity-50`} />
                                        <p className="text-2xl font-black font-mono text-slate-400 tracking-wider blur-[1px]">{eq.formula}</p>
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2 opacity-60">Drop Here</p>
                                    </>
                                ) : (
                                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center text-center">
                                        <div className={`bg-${eq.color}-500 text-white px-6 py-2 rounded-full font-black text-xl font-mono shadow-md mb-4 -mt-12 border-4 border-white`}>
                                            {eq.formula}
                                        </div>
                                        <p className={`text-lg font-bold text-${eq.color}-800`}>
                                            {currentScenarios.find(s => s.id === matchedScenario)?.text}
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
