import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function InteractiveMascot() {
    const mascotRef = useRef<HTMLDivElement>(null);
    const speechRef = useRef<HTMLDivElement>(null);
    const [factIndex, setFactIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const location = useLocation();

    // Custom Mascot logic per route
    let funFacts = [];
    let gradientStyle = "";
    let mascotFace = "😊";

    if (location.pathname.includes("chapter-1.1")) {
        // Module 1 Base
        funFacts = [
            "Did you know? Light travels at 300,000 km per second! 🚀",
            "Everything in the universe is constantly moving! 🌌",
            "Motion is totally relative to your reference point! 🚌"
        ];
        gradientStyle = "from-blue-500 to-cyan-400";
        mascotFace = "🤓";
    } else if (location.pathname.includes("chapter-1.2")) {
        // Distance vs Displacement
        funFacts = [
            "Displacement can be zero even if distance is huge! 🏎️",
            "Displacement is the ultimate shortcut! ✂️",
            "Distance is scalar, meaning direction doesn't matter! 📏"
        ];
        gradientStyle = "from-purple-500 to-pink-400";
        mascotFace = "😜";
    } else if (location.pathname.includes("chapter-1.3")) {
        // Displacement Vectors
        funFacts = [
            "Displacement is a VECTOR! Magnitude + Direction! 🧭",
            "Running a full lap means exactly 0m displacement! 🎉",
            "The magnitude of displacement is NEVER greater than distance! 📉"
        ];
        gradientStyle = "from-emerald-500 to-teal-400";
        mascotFace = "😎";
    } else if (location.pathname.includes("chapter-1.4")) {
        // Speed and Velocity
        funFacts = [
            "Whoosh! Speed is just distance divided by time! 🏎️",
            "Did you know? The speed of light is the ultimate speed limit: 300,000 km per second! ⚡",
            "A speedometer shows Instantaneous Speed, but calculating your total trip is Average Speed! ⏱️",
            "Velocity is just Speed WITH a direction! Turning corners means changing velocity! 🔄",
            "Thunder takes 3 seconds to travel 1 kilometer! ⛈️"
        ];
        gradientStyle = "from-orange-500 to-red-400";
        mascotFace = "🏎️";
    } else {
        // Fallback
        funFacts = ["Motion is everywhere! Keep exploring! ⚛️"];
        gradientStyle = "from-gray-500 to-slate-400";
        mascotFace = "🧐";
    }

    // Reset fact index when route changes
    useEffect(() => {
        setFactIndex(0);
    }, [location.pathname]);

    useEffect(() => {
        // Idle floating animation using GSAP
        if (mascotRef.current) {
            gsap.to(mascotRef.current, {
                y: -15,
                rotation: 5,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }, []);

    const handleClick = () => {
        // Pop animation on click
        if (mascotRef.current) {
            gsap.fromTo(mascotRef.current,
                { scale: 0.8 },
                { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" }
            );
        }
        setFactIndex((prev) => (prev + 1) % funFacts.length);
    };

    return (
        <div className="fixed bottom-[10%] left-8 z-50">
            {/* Speech Bubble (only shows on hover) */}
            <motion.div
                ref={speechRef}
                initial={{ opacity: 0, scale: 0.5, x: -20, y: 20 }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.5,
                    x: isHovered ? 0 : -20,
                    y: isHovered ? 0 : 20
                }}
                className="absolute bottom-full left-full mb-4 w-64 bg-white p-4 rounded-3xl rounded-bl-sm shadow-xl border-4 border-purple-200 pointer-events-none origin-bottom-left"
            >
                <p className="text-gray-700 font-bold text-sm">
                    {funFacts[factIndex]}
                </p>
                <p className="text-xs text-purple-400 mt-2 font-medium">Click me for another fact!</p>
            </motion.div>

            {/* Mascot Body */}
            <div
                ref={mascotRef}
                className="cursor-pointer relative drop-shadow-2xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleClick}
            >
                {/* Body shape using simple generic CSS blob styling */}
                <div className={`w-24 h-24 bg-gradient-to-tr ${gradientStyle} rounded-[40%_60%_70%_30%] flex flex-col items-center justify-center border-4 border-white shadow-[0_0_30px_rgba(255,255,255,0.4)] relative overflow-hidden group transition-all duration-700`}>
                    <span className="text-4xl filter drop-shadow-md group-hover:scale-125 transition-transform duration-300">{mascotFace}</span>
                </div>
                {/* Floating Shadow */}
                <div className="w-16 h-4 bg-black/10 rounded-[100%] mx-auto mt-4 blur-md" />
            </div>
        </div>
    );
}
