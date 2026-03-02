import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function BottomProgressRing() {
    const { scrollYProgress } = useScroll();

    // Smooth scroll physics
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // The circle path length (2 * PI * r) where r = 40 is approx 251.2
    const pathLength = 251.2;

    // We animate the stroke from full offset (hidden) to 0 (full)
    const strokeDashoffset = useTransform(smoothProgress, [0, 1], [pathLength, 0]);

    // The ship travels along the circle edge mapping progress (0 to 1) to an angle (-90deg to 270deg)
    const angleRotation = useTransform(smoothProgress, [0, 1], [0, 360]);

    return (
        <div className="fixed bottom-8 right-8 z-50 pointer-events-none flex items-center justify-center w-24 h-24">

            {/* Pulsing ring background (plasma glow effect) */}
            <motion.div
                className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Glowing background track ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-cyan-900/40"
                    strokeWidth="8"
                    fill="none"
                />

                {/* The "Plasma" filling ring */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-cyan-400"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={pathLength}
                    style={{ strokeDashoffset }}
                />
            </svg>

            {/* Center percentage text */}
            <div className="absolute inset-0 flex items-center justify-center flex-col drop-shadow-md">
                <motion.span className="text-cyan-500 font-extrabold text-xl ml-1">
                    {useTransform(smoothProgress, p => Math.round(p * 100))}
                </motion.span>
                <span className="text-cyan-800 text-[10px] font-bold -mt-1">%</span>
            </div>

            {/* The Car Icon orbiting along the SVG path */}
            <motion.div
                className="absolute top-0 bottom-0 left-0 right-0"
                style={{ rotate: angleRotation }}
            >
                {/* The car sits precisely at the top (12 o'clock) of the 40-radius plasma ring (10% from the container top) */}
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">

                    {/* Ship Thrust Flame (exhaust behind the car as it drives clockwise) */}
                    <motion.div
                        className="absolute -left-1 w-3 h-1.5 bg-cyan-300 rounded-full blur-[2px]"
                        animate={{ width: ["8px", "14px", "8px"], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                    />

                    {/* Bare Car SVG (Top-down view) rotated to face clockwise (right) */}
                    <svg viewBox="0 0 30 30" className="w-8 h-8 text-cyan-400 fill-current drop-shadow-[0_0_10px_rgba(34,211,238,1)] z-10 rotate-90">
                        {/* Car Body */}
                        <rect x="8" y="4" width="14" height="22" rx="4" className="text-cyan-600" />
                        {/* Windshield */}
                        <path d="M10,9 L20,9 L19,13 L11,13 Z" className="text-white opacity-90" />
                        {/* Rear Window */}
                        <path d="M10,21 L20,21 L19,18 L11,18 Z" className="text-white opacity-90" />
                        {/* Headlights */}
                        <rect x="9" y="4" width="3" height="2" rx="0.5" className="text-yellow-300" />
                        <rect x="18" y="4" width="3" height="2" rx="0.5" className="text-yellow-300" />
                        {/* Taillights */}
                        <rect x="9" y="24" width="3" height="2" rx="0.5" className="text-red-500" />
                        <rect x="18" y="24" width="3" height="2" rx="0.5" className="text-red-500" />
                    </svg>

                </div>
            </motion.div>

        </div>
    );
}
