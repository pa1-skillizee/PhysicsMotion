import { useState } from 'react';
import { motion } from 'framer-motion';

export default function InteractivePathActivity() {
    // We will build a simple state-driven interactive line where user drags a car from O -> A -> B
    // and the Math updates in real-time.
    const [currentPos, setCurrentPos] = useState(0); // 0 to 100 percentage based
    const [hasReachedEnd, setHasReachedEnd] = useState(false);

    // Points defined by percentage of width
    const points = {
        O: 5,   // Home (0km)
        B: 45,  // Park (35km)
        A: 95   // School (60km)
    };

    // Calculate Game Logic
    let distance = 0;
    let displacement = 0;

    if (!hasReachedEnd) {
        // Going from O to A
        const currentKm = (currentPos / points.A) * 60;
        distance = Math.max(0, currentKm);
        displacement = distance;

        if (currentPos >= points.A - 2) { // Give a little buffer
            setHasReachedEnd(true);
        }
    } else {
        // At A, or returning from A to B
        distance = 60 + ((points.A - currentPos) / (points.A - points.B)) * 25;
        displacement = 60 - ((points.A - currentPos) / (points.A - points.B)) * 25;
        // Clamp it to stop at B (45) if they drag too far back
        if (currentPos < points.B) {
            distance = 85;
            displacement = 35;
        }
    }

    return (
        <div className="p-12 rounded-[3.5rem] bg-white border-8 border-purple-200 shadow-[0_20px_0_0_rgba(233,213,255,1)] w-full mt-16">
            <h3 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Interactive Activity!</h3>
            <p className="text-xl text-gray-600 font-medium text-center max-w-2xl mx-auto mb-10">
                {!hasReachedEnd
                    ? "Drag the car from Home (O) all the way to School (A)!"
                    : "Great! Now drag the car back to the Park (B)."
                }
            </p>

            <div className="w-full max-w-4xl mx-auto bg-slate-50 p-12 rounded-3xl border-[4px] border-slate-200 relative overflow-hidden select-none">
                <div className="h-4 bg-gray-300 rounded-full w-full relative mb-16">

                    {/* Destination Dots */}
                    <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${points.O}%` }}>
                        <div className="w-8 h-8 rounded-full bg-blue-500 border-4 border-white shadow-md z-10" />
                        <span className="mt-4 font-bold text-xl text-gray-700">O</span>
                        <span className="text-sm text-gray-500 font-medium whitespace-nowrap">Home (0km)</span>
                    </div>

                    <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center opacity-70" style={{ left: `${points.B}%` }}>
                        <div className="w-6 h-6 rounded-full bg-green-500 border-4 border-white shadow-md z-10" />
                        <span className="mt-4 font-bold text-lg text-gray-700">B</span>
                        <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Park (35km)</span>
                    </div>

                    <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${points.A}%` }}>
                        <div className="w-8 h-8 rounded-full bg-red-500 border-4 border-white shadow-md z-10" />
                        <span className="mt-4 font-bold text-xl text-gray-700">A</span>
                        <span className="text-sm text-gray-500 font-medium whitespace-nowrap">School (60km)</span>
                    </div>

                    {/* Progress Bar Fill */}
                    <div
                        className="absolute top-0 bottom-0 left-0 bg-blue-400 rounded-full opacity-60"
                        style={{ width: `${currentPos}%`, minWidth: `${points.O}%` }}
                    />

                    {/* Draggable Car/Dot */}
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 -ml-6 cursor-grab active:cursor-grabbing z-20"
                        style={{ left: `${Math.max(points.O, currentPos)}%` }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }} // We're using onDrag to update percentages, not letting framer handle absolute X
                        onDrag={(_, info) => {
                            // Convert pixel offset to percentage (simplified estimation based on parent container)
                            const screenWidth = window.innerWidth > 1000 ? 900 : window.innerWidth - 100;
                            const newPosPercent = currentPos + (info.delta.x / screenWidth) * 100;

                            // Clamp values based on state
                            let clampedPos = newPosPercent;
                            if (!hasReachedEnd) {
                                clampedPos = Math.max(points.O, Math.min(points.A, newPosPercent));
                            } else {
                                clampedPos = Math.max(points.B, Math.min(points.A, newPosPercent));
                            }

                            setCurrentPos(clampedPos);
                        }}
                    >
                        <div className="w-12 h-12 bg-yellow-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-xl hover:scale-110 transition-transform">
                            🚗
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-8 mt-24">
                    <div className="bg-white p-6 rounded-2xl border-[4px] border-blue-100 shadow-sm text-center transform transition-all duration-300 hover:-translate-y-1">
                        <h4 className="text-2xl font-bold text-gray-800 mb-2">Total Distance</h4>
                        <p className="text-5xl font-extrabold text-blue-600 transition-all">{Math.round(distance)} km</p>
                        <p className="text-sm font-medium text-gray-500 mt-2">Always increasing!</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border-[4px] border-green-100 shadow-sm text-center transform transition-all duration-300 hover:-translate-y-1">
                        <h4 className="text-2xl font-bold text-gray-800 mb-2">Displacement</h4>
                        <p className="text-5xl font-extrabold text-green-600 transition-all">{Math.round(displacement)} km</p>
                        <p className="text-sm font-medium text-gray-500 mt-2">Shortest path from start</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
