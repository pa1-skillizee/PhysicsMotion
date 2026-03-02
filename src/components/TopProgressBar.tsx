import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function TopProgressBar() {
    const { scrollYProgress } = useScroll();

    // Smooth the scroll progress for both animations
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // By mapping scroll progress to % width, we can use it to pinpoint exact attachment
    const progressPercent = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    return (
        // The track stops exactly 4rem (w-16) from the right edge, giving the 4rem long car perfect space to dock.
        <div className="fixed top-0 left-0 right-16 h-1.5 z-50 pointer-events-none">

            {/* The smoke-styled progress bar fill using width to avoid stretching the inner gradient */}
            <motion.div
                className="absolute top-0 bottom-0 left-0 z-10 overflow-hidden shadow-[0_2px_10px_rgba(107,114,128,0.5)] rounded-r-full bg-gray-400"
                style={{ width: progressPercent }}
            >
                {/* Flowing animated smoke gradient inside the exact width of the progress bar */}
                <motion.div
                    className="absolute inset-0 w-[200vw] bg-gradient-to-r from-gray-200 via-gray-500 to-gray-400 opacity-90"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                />
            </motion.div>

            {/* The Car seamlessly attached to the exact end of the progress bar */}
            <motion.div
                className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center"
                style={{ left: progressPercent }}
            >
                {/* Animated Smoke Trails right at the exhaust (behind the car) */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute left-0 w-3 h-3 rounded-full bg-gray-400/80 blur-[1px]"
                            animate={{
                                x: [0, -25 - (Math.random() * 15)],
                                y: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 20],
                                scale: [1, 1.5 + Math.random()],
                                opacity: [0.9, 0]
                            }}
                            transition={{
                                duration: 0.5 + Math.random() * 0.5,
                                repeat: Infinity,
                                delay: i * 0.1
                            }}
                        />
                    ))}
                </div>

                {/* SVG Smaller Lamborghini Silhouette attached exactly with no gaps */}
                <svg
                    viewBox="0 0 120 35"
                    className="w-16 h-5 drop-shadow-[0_3px_5px_rgba(0,0,0,0.6)] z-30 text-rose-600 fill-current -ml-1"
                >
                    {/* Aggressive angled thicker body */}
                    <path d="M5,28 L15,15 L35,12 L50,10 L75,12 L105,20 L115,28 L115,30 L5,30 Z" />
                    {/* Sharp spoiler */}
                    <path d="M5,18 L15,12 L15,18 Z" />
                    {/* Darker Windows */}
                    <path d="M45,12 L65,14 L85,18 L45,18 Z" className="text-gray-900 fill-current opacity-95" />
                    {/* Exotic Wheels (Lowered and larger) */}
                    <circle cx="25" cy="27" r="8" className="text-gray-900 fill-current" />
                    <circle cx="25" cy="27" r="4" className="text-gray-300 fill-current" />
                    <circle cx="90" cy="27" r="8" className="text-gray-900 fill-current" />
                    <circle cx="90" cy="27" r="4" className="text-gray-300 fill-current" />
                    {/* Front Headlight flare */}
                    <path d="M100,22 L110,24 L105,20 Z" className="text-yellow-300 fill-current opacity-80" />
                </svg>
            </motion.div>
        </div>
    );
}
