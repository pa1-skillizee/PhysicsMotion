import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function FluidGlass({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-[2.5rem] p-1 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.15)] bg-slate-50/20 ${className}`}
        >
            {/* Interactive cursor-tracking blobs */}
            <motion.div
                className="absolute w-80 h-80 bg-pastel-blue rounded-[40%_60%_70%_30%] mix-blend-multiply opacity-80 blur-[60px] pointer-events-none"
                style={{
                    x: useTransform(smoothX, x => x * 0.8),
                    y: useTransform(smoothY, y => y * 0.8),
                    left: 'calc(50% - 10rem)',
                    top: 'calc(50% - 10rem)',
                }}
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
            />
            <motion.div
                className="absolute w-96 h-96 bg-pastel-yellow rounded-[60%_40%_30%_70%] mix-blend-multiply opacity-70 blur-[70px] pointer-events-none"
                style={{
                    x: useTransform(smoothX, x => x * -0.5),
                    y: useTransform(smoothY, y => y * -0.5),
                    left: 'calc(50% - 12rem)',
                    top: 'calc(50% - 12rem)',
                }}
                animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, scale: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
            />
            <motion.div
                className="absolute w-72 h-72 bg-pastel-pink rounded-[50%_50%_60%_40%] mix-blend-multiply opacity-70 blur-[50px] pointer-events-none"
                style={{
                    x: useTransform(smoothX, x => x * 0.3),
                    y: useTransform(smoothY, y => y * 0.3),
                    left: 'calc(50% - 9rem)',
                    top: 'calc(50% - 9rem)',
                }}
                animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 12, repeat: Infinity, ease: "easeInOut" } }}
            />

            {/* Semi-transparent Glass Container */}
            <div className="relative h-full w-full bg-white/40 backdrop-blur-[40px] border-[3px] border-white/60 rounded-[2.2rem] z-10 p-8 shadow-[inset_0_0_20px_rgba(255,255,255,0.8)]">
                {children}
            </div>
        </div>
    );
}
