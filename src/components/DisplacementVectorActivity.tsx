import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DisplacementVectorActivity() {
    // A 2D grid simulation for the "Farmer" from the textbook activity
    // Field is a 10m x 10m square. We'll map this to a coordinate grid.

    // Grid sizes
    const fieldSize = 300; // px

    // Farmer position percentage (0 to 100 representing perimeter walk)
    // 0 = A, 25 = B, 50 = C, 75 = D, 100 = A
    const [progress, setProgress] = useState(0);

    // Calculate Coordinates based on 0-100 progress around the square
    const getCoordinates = (p: number) => {
        let x = 0;
        let y = 0;
        const sideP = p % 100;

        if (sideP < 25) {
            // A -> B (Top edge)
            x = (sideP / 25) * fieldSize;
            y = 0;
        } else if (sideP < 50) {
            // B -> C (Right edge)
            x = fieldSize;
            y = ((sideP - 25) / 25) * fieldSize;
        } else if (sideP < 75) {
            // C -> D (Bottom edge)
            x = fieldSize - ((sideP - 50) / 25) * fieldSize;
            y = fieldSize;
        } else {
            // D -> A (Left edge)
            x = 0;
            y = fieldSize - ((sideP - 75) / 25) * fieldSize;
        }
        return { x, y };
    };

    const currentPos = getCoordinates(progress);

    // Calculate Physics Metrics
    // Perimeter = 40m. 
    // 100% progress = 40m distance.
    const distanceMeters = (progress / 100) * 40;

    // Displacement = shortest straight line from A (0,0) to current (x,y)
    // Scale: fieldSize px = 10m. So 1px = (10/fieldSize) meters
    const scaleFactor = 10 / fieldSize;
    const displacementMeters = Math.sqrt(Math.pow(currentPos.x * scaleFactor, 2) + Math.pow(currentPos.y * scaleFactor, 2));

    return (
        <div className="w-full bg-white p-12 rounded-[3.5rem] border-8 border-teal-200 shadow-xl mb-16 relative overflow-hidden">
            <h3 className="text-4xl font-extrabold text-teal-900 mb-6 text-center">Interactive: The Farmer's Grid 👨‍🌾</h3>
            <p className="text-xl text-teal-700 font-medium text-center max-w-2xl mx-auto mb-10">
                A farmer moves along the boundary of a square field (10m x 10m). Slide to walk him around the border and watch the exact difference between <b>Distance</b> and <b>Displacement</b>!
            </p>

            <div className="flex flex-col md:flex-row gap-16 items-center justify-center">

                {/* 2D Canvas Map */}
                <div className="relative border-[6px] border-slate-300 rounded-2xl bg-[#e0f2fe] shadow-inner" style={{ width: fieldSize + 12, height: fieldSize + 12 }}>
                    {/* Grid Lines Pattern */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                    {/* The Square Field Boundary */}
                    <div className="absolute border-4 border-dashed border-teal-500 m-[2px]" style={{ width: fieldSize, height: fieldSize, top: 0, left: 0 }} />

                    {/* Corner Labels */}
                    <span className="absolute -top-8 -left-4 font-bold text-slate-600">Start (0,0)</span>
                    <span className="absolute -top-8 -right-4 font-bold text-slate-600">10m</span>
                    <span className="absolute -bottom-8 -right-4 font-bold text-slate-600">20m</span>
                    <span className="absolute -bottom-8 -left-4 font-bold text-slate-600">30m</span>

                    {/* Displacement Vector Line (Hypotenuse) */}
                    <svg className="absolute inset-0 pointer-events-none z-10 overflow-visible" width={fieldSize + 12} height={fieldSize + 12}>
                        <motion.line
                            x1={2} y1={2} x2={currentPos.x + 2} y2={currentPos.y + 2}
                            stroke="rgba(236,72,153,0.8)" // Pink-500
                            strokeWidth="4"
                            strokeDasharray="8 8"
                        />
                    </svg>

                    {/* The Farmer Marker */}
                    <div
                        className="absolute w-10 h-10 bg-white rounded-full border-4 border-teal-600 shadow-lg flex items-center justify-center text-xl z-20 m-[2px]"
                        style={{ left: currentPos.x - 20, top: currentPos.y - 20 }}
                    >
                        👨‍🌾
                    </div>
                </div>

                {/* Dashboard */}
                <div className="w-full md:w-1/2 flex flex-col gap-8">
                    {/* Slider */}
                    <div className="bg-slate-50 p-8 rounded-3xl border-4 border-slate-200">
                        <label className="block text-xl font-bold text-slate-700 mb-4">Walk the farmer (Distance):</label>
                        <input
                            type="range"
                            min="0" max="250" // Let him walk 2.5 laps!
                            value={progress}
                            onChange={(e) => setProgress(Number(e.target.value))}
                            className="w-full h-4 bg-teal-200 rounded-full appearance-none cursor-pointer outline-none"
                        />
                        <div className="flex justify-between text-sm font-bold text-slate-500 mt-2">
                            <span>0m</span>
                            <span>40m (1 Lap)</span>
                            <span>100m</span>
                        </div>
                    </div>

                    {/* Real-Time Stats */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-blue-50 p-6 rounded-2xl border-[4px] border-blue-200 shadow-sm text-center">
                            <h4 className="text-xl font-bold text-blue-900 mb-2">Distance</h4>
                            <p className="text-4xl font-extrabold text-blue-600">{distanceMeters.toFixed(1)} m</p>
                            <p className="text-sm font-medium text-blue-500 mt-2">Always increasing linearly!</p>
                        </div>
                        <div className="bg-pink-50 p-6 rounded-2xl border-[4px] border-pink-200 shadow-sm text-center">
                            <h4 className="text-xl font-bold text-pink-900 mb-2">Displacement</h4>
                            <p className="text-4xl font-extrabold text-pink-600">{displacementMeters.toFixed(1)} m</p>
                            <p className="text-sm font-medium text-pink-500 mt-2">Length of the dashed line.</p>
                        </div>
                    </div>

                    {/* The Zero Rule Highlight */}
                    {displacementMeters < 0.1 && distanceMeters > 5 && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-emerald-100 p-4 rounded-xl border-2 border-emerald-400 text-center font-bold text-emerald-800"
                        >
                            🎉 The Zero Rule! He made a full lap. Measurement = 0m!
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
