import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, Bike, Trophy, RefreshCcw } from 'lucide-react';

type PlotPoint = { x: number; y: number };

export default function GraphDataPlotterActivity() {
    // 0=0, 1=8:05, 2=8:10, 3=8:15, 4=8:20, 5=8:25
    const ferozCorrectPath: PlotPoint[] = [
        { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1.9 }, { x: 3, y: 2.8 }, { x: 4, y: 3.6 },
    ];

    const saniaCorrectPath: PlotPoint[] = [
        { x: 0, y: 0 }, { x: 1, y: 0.8 }, { x: 2, y: 1.6 }, { x: 3, y: 2.3 }, { x: 4, y: 3 }, { x: 5, y: 3.6 }
    ];

    const [ferozPoints, setFerozPoints] = useState<PlotPoint[]>([{ x: 0, y: 0 }]);
    const [saniaPoints, setSaniaPoints] = useState<PlotPoint[]>([{ x: 0, y: 0 }]);
    const [activePerson, setActivePerson] = useState<'feroz' | 'sania'>('feroz');
    const [isComplete, setIsComplete] = useState(false);

    const handleGridClick = (x: number, y: number) => {
        if (isComplete) return;

        if (activePerson === 'feroz') {
            const newPoints = [...ferozPoints, { x, y }].sort((a, b) => a.x - b.x);
            // Quick dedupe logic for simplicity
            const unique = newPoints.filter((v, i, a) => a.findIndex(t => (t.x === v.x)) === i);
            setFerozPoints(unique);
            if (unique.length >= ferozCorrectPath.length && saniaPoints.length >= saniaCorrectPath.length) setIsComplete(true);
        } else {
            const newPoints = [...saniaPoints, { x, y }].sort((a, b) => a.x - b.x);
            const unique = newPoints.filter((v, i, a) => a.findIndex(t => (t.x === v.x)) === i);
            setSaniaPoints(unique);
            if (ferozPoints.length >= ferozCorrectPath.length && unique.length >= saniaCorrectPath.length) setIsComplete(true);
        }
    };

    const convertToSVGPath = (points: PlotPoint[]) => {
        if (points.length === 0) return '';
        return points.map((p, i) => {
            // Map logic: width 400 (5 intervals of 80), height 300 (4 intervals of 75 - assuming max Y is 4.0km)
            const svgX = (p.x / 5) * 400;
            const svgY = 300 - ((p.y / 4) * 300);
            return `${i === 0 ? 'M' : 'L'} ${svgX} ${svgY}`;
        }).join(' ');
    };

    const yAxisLabels = [4.0, 3.0, 2.0, 1.0, 0];
    const xAxisLabels = ['8:00', '8:05', '8:10', '8:15', '8:20', '8:25'];

    const getBikePosition = (points: PlotPoint[]) => {
        if (points.length === 0) return { x: '0%', y: '100%' };
        const last = points[points.length - 1];
        return {
            x: `${(last.x / 5) * 100}%`,
            y: `${100 - (last.y / 4.0) * 100}%`
        };
    };

    return (
        <div className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-2xl border-4 border-slate-100 flex flex-col lg:flex-row gap-12 items-center">

            {/* The Table Data */}
            <div className="w-full lg:w-1/3">
                <div className="text-center mb-8">
                    <span className="bg-sky-100 text-sky-700 px-4 py-1.5 rounded-full font-black text-xs tracking-widest uppercase mb-4 inline-block">Table 7.5 Challenge</span>
                    <h3 className="text-2xl font-black text-slate-800">Plot The Race</h3>
                    <p className="text-slate-500 font-medium text-sm mt-2">Click on the grid intersections to plot Feroz and Sania's distance over time.</p>
                </div>

                <div className="overflow-hidden rounded-2xl border-2 border-slate-200">
                    <table className="w-full text-sm text-center">
                        <thead className="bg-slate-100 font-black text-slate-700">
                            <tr>
                                <th className="p-3">Time</th>
                                <th className="p-3 text-blue-600">Feroz (km)</th>
                                <th className="p-3 text-pink-600">Sania (km)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-600 bg-white">
                            <tr><td className="p-3">8:00 am</td><td className="p-3 text-blue-500">0</td><td className="p-3 text-pink-500">0</td></tr>
                            <tr><td className="p-3">8:05 am</td><td className="p-3 text-blue-500">1.0</td><td className="p-3 text-pink-500">0.8</td></tr>
                            <tr><td className="p-3">8:10 am</td><td className="p-3 text-blue-500">1.9</td><td className="p-3 text-pink-500">1.6</td></tr>
                            <tr><td className="p-3">8:15 am</td><td className="p-3 text-blue-500">2.8</td><td className="p-3 text-pink-500">2.3</td></tr>
                            <tr><td className="p-3">8:20 am</td><td className="p-3 text-blue-500">3.6</td><td className="p-3 text-pink-500">3.0</td></tr>
                            <tr><td className="p-3">8:25 am</td><td className="p-3 text-blue-500">-</td><td className="p-3 text-pink-500">3.6</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                    {!isComplete ? (
                        <>
                            <button
                                onClick={() => setActivePerson('feroz')}
                                className={`p-3 rounded-xl border-2 font-bold flex items-center justify-between transition-all ${activePerson === 'feroz' ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                            >
                                <span className="flex items-center gap-2"><Bike className="w-5 h-5" /> Plotting Feroz</span>
                                {ferozPoints.length >= 5 ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Target className="w-5 h-5" />}
                            </button>
                            <button
                                onClick={() => setActivePerson('sania')}
                                className={`p-3 rounded-xl border-2 font-bold flex items-center justify-between transition-all ${activePerson === 'sania' ? 'bg-pink-50 border-pink-400 text-pink-700 shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                            >
                                <span className="flex items-center gap-2"><Bike className="w-5 h-5" /> Plotting Sania</span>
                                {saniaPoints.length >= 6 ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Target className="w-5 h-5" />}
                            </button>
                        </>
                    ) : (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gradient-to-br from-amber-400 to-amber-600 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
                            <Trophy className="absolute -right-4 -bottom-4 w-32 h-32 opacity-20 text-white" />
                            <h4 className="text-xl font-black mb-1 drop-shadow-md">Feroz Wins! 🏆</h4>
                            <p className="text-amber-50 font-medium text-sm drop-shadow-sm mb-4">
                                Feroz reached 3.6 km at 8:20 am, completely finishing his route <strong>5 minutes faster</strong> than Sania who arrived at 8:25 am! Feroz's steeper graph slope proves his higher speed.
                            </p>
                            <button onClick={() => { setFerozPoints([{ x: 0, y: 0 }]); setSaniaPoints([{ x: 0, y: 0 }]); setIsComplete(false); setActivePerson('feroz'); }} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 font-bold rounded-lg text-sm w-fit backdrop-blur-md border border-white/30">
                                <RefreshCcw className="w-4 h-4" /> Reset Graph
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* The Plotter Grid */}
            <div className="w-full lg:w-2/3 bg-slate-50 rounded-3xl p-6 border-2 border-slate-200 relative">
                <div className="flex">
                    {/* Y Axis Labels */}
                    <div className="flex flex-col justify-between items-end pr-4 text-xs font-bold text-slate-400 h-[300px] w-12 pt-[-10px]">
                        {yAxisLabels.map((l, i) => <span key={i} className="leading-none">{l.toFixed(1)}</span>)}
                    </div>

                    {/* Grid Area */}
                    <div className="relative w-full h-[300px] border-l-2 border-b-2 border-slate-400 bg-white">
                        {/* SVG Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 400 300" preserveAspectRatio="none">
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                d={convertToSVGPath(ferozPoints)}
                                fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                                className="drop-shadow-[0_4px_4px_rgba(59,130,246,0.3)]"
                            />
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                d={convertToSVGPath(saniaPoints)}
                                fill="none" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                                className="drop-shadow-[0_4px_4px_rgba(236,72,153,0.3)]"
                            />
                        </svg>

                        {/* Interactive Grid Overlay */}
                        <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 opacity-30">
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className="border-t border-r border-slate-300 border-dashed pointer-events-none"></div>
                            ))}
                        </div>

                        {/* Animated Bikes */}
                        {ferozPoints.length > 0 && (
                            <motion.div
                                animate={{ left: getBikePosition(ferozPoints).x, top: getBikePosition(ferozPoints).y }}
                                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none drop-shadow-md"
                            >
                                <div className="bg-blue-500 text-white p-1 rounded-full border-2 border-white shadow-lg relative">
                                    <Bike className="w-4 h-4" />
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded opacity-0 lg:opacity-100">Feroz</div>
                                </div>
                            </motion.div>
                        )}

                        {saniaPoints.length > 0 && (
                            <motion.div
                                animate={{ left: getBikePosition(saniaPoints).x, top: getBikePosition(saniaPoints).y }}
                                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none drop-shadow-md"
                            >
                                <div className="bg-pink-500 text-white p-1 rounded-full border-2 border-white shadow-lg relative">
                                    <Bike className="w-4 h-4" />
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-pink-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded opacity-0 lg:opacity-100">Sania</div>
                                </div>
                            </motion.div>
                        )}

                        {/* Clickable Coordinates */}
                        <div className="absolute inset-0 flex justify-between items-end">
                            {xAxisLabels.map((_, colIdx) => (
                                <div key={`col-${colIdx}`} className="h-full flex flex-col justify-between items-center relative" style={{ width: '0px' }}>
                                    {[4.0, 3.6, 3.0, 2.8, 2.3, 1.9, 1.6, 1.0, 0.8, 0].map((yVal, rowIdx) => {
                                        // Approximate mapping for quick clicks
                                        const topPos = `${(1 - (yVal / 4.0)) * 100}%`;
                                        return (
                                            <button
                                                key={`btn-${rowIdx}`}
                                                className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full hover:bg-slate-300/50 hover:scale-150 transition-all z-20 cursor-crosshair"
                                                style={{ top: topPos }}
                                                onClick={() => handleGridClick(colIdx, yVal)}
                                            />
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* X Axis Labels */}
                <div className="flex justify-between pl-12 pr-[calc(50%/5)] mt-4 text-xs font-bold text-slate-400">
                    {xAxisLabels.map((l, i) => <span key={i} className="transform -translate-x-1/2">{l}</span>)}
                </div>
                {/* Axes Titles */}
                <div className="absolute top-1/2 -left-8 -rotate-90 text-sm font-black tracking-widest text-slate-300 uppercase">Distance (km)</div>
                <div className="text-center text-sm font-black tracking-widest text-slate-300 uppercase mt-2">Time (am)</div>
            </div>
        </div>
    );
}
