import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bus, TreePine, PersonStanding } from 'lucide-react';
import FluidGlass from './FluidGlass';
import Interactive3DSimulation from './Interactive3DSimulation';
import IframeActivity from './IframeActivity';
import ChapterFooter from './ChapterFooter';
import MotionIsRelativeImg from '../assets/Motion is relative.png';

// Reusable Video Component
function VideoFrame({ url }: { url: string }) {
    const videoId = url.split('/').pop()?.split('?')[0] || url;

    return (
        <div className="w-[800px] max-w-full aspect-video rounded-[3rem] overflow-hidden bg-white p-4 border-[6px] border-gray-200 shadow-[0_16px_0_0_rgba(229,231,235,1)] my-12 mx-auto transform transition-transform hover:-translate-y-2">
            <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative bg-black shadow-inner">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0"
                ></iframe>
            </div>
        </div>
    );
}

function WaveText({ text }: { text: string }) {
    // We use Framer Motion to recreate the Supah text wave effect
    // with a slight delay per character.
    const chars = text.split("");

    return (
        <h1 className="text-7xl md:text-9xl font-extrabold text-blue-900 font-outfit drop-shadow-sm mb-4 flex justify-center tracking-tight">
            {chars.map((char, index) => (
                <motion.span
                    key={index}
                    className="inline-block"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, index % 2 === 0 ? 5 : -5, 0] // Slight wobble
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.1, // Sequence effect
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </h1>
    );
}

export default function ChapterContent() {
    const containerRef = useRef(null);

    const { scrollY } = useScroll();
    const headerY = useTransform(scrollY, [0, 400], [0, 150]);
    const headerOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const headerScale = useTransform(scrollY, [0, 400], [1, 1.1]);

    return (
        <div className="w-full max-w-5xl mx-auto px-6" ref={containerRef}>

            {/* Smooth Parallax Header with Wave Text */}
            <motion.header
                style={{ y: headerY, opacity: headerOpacity, scale: headerScale }}
                className="h-[60vh] flex flex-col justify-center items-center text-center pointer-events-none"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-white/40 backdrop-blur-2xl px-12 py-12 rounded-[3.5rem] border-[4px] border-white/80 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1),inset_0_0_20px_rgba(255,255,255,0.8)] min-w-[300px]"
                >
                    <span className="text-xl font-bold text-gray-700 tracking-[0.2em] uppercase mb-4 block opacity-70">Chapter 1</span>

                    <WaveText text="MOTION" />

                    <p className="text-2xl text-gray-800 font-medium max-w-2xl mx-auto leading-relaxed mt-4">
                        Discover how objects move, how we measure movement, and how to represent it mathematically.
                    </p>
                </motion.div>
            </motion.header>

            {/* Main Content Modules */}
            <div className="flex flex-col gap-16 pb-32 mt-[-5vh]">

                <VideoFrame url="FNqMDCMXV4I" />
                <VideoFrame url="M3FeYI85Y6A" />

                {/* Module 1 Section */}
                <motion.div
                    className="p-12 rounded-[3rem] bg-white border-8 border-blue-200 shadow-[0_16px_0_0_rgba(191,219,254,1)] relative overflow-hidden group cursor-default"
                    whileHover={{ y: -8, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-pastel-blue rounded-[40%_60%_70%_30%] blur-3xl opacity-50 animate-[spin_10s_linear_infinite] group-hover:scale-125 transition-transform duration-700"></div>

                    <motion.h2
                        className="text-4xl font-extrabold text-blue-900 mb-8 inline-block bg-pastel-blue px-8 py-3 rounded-[2rem] border-4 border-blue-300 shadow-sm relative z-10"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                        Module 1: The Basics of Motion & Displacement 📐
                    </motion.h2>

                    <p className="text-gray-700 text-2xl mb-10 leading-relaxed font-medium relative z-10 transform transition-transform group-hover:translate-x-2">
                        This module covers how we define "rest" versus "motion" and the critical difference between the path traveled and the actual change in position.
                    </p>

                    <div className="bg-blue-50/50 border-4 border-blue-100 rounded-[2.5rem] p-10 shadow-inner relative z-10 group/card transition-colors hover:bg-blue-100/50">
                        <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-6">
                            <span className="text-blue-600 bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-blue-200">1.</span>
                            <span className="group-hover/card:text-blue-700 transition-colors">Describe the position of an object</span>
                        </h3>
                        <p className="text-gray-800 text-xl mb-8 leading-relaxed bg-white p-8 rounded-[2rem] border-4 border-gray-100 shadow-sm transition-transform hover:-translate-y-2">
                            <b className="text-blue-900">Reference Point (Origin):</b> To describe the position of an object, we need a starting point. Motion is relative; for example, a tree is "moving" to someone in a bus but "at rest" to someone on the sidewalk.
                        </p>

                        <div className="bg-pastel-green/40 p-8 rounded-[2rem] border-4 border-green-300 transform transition-all hover:scale-[1.02] shadow-[0_8px_0_0_rgba(134,239,172,0.4)]">
                            <h4 className="font-extrabold text-green-900 text-2xl mb-4 flex items-center gap-3">📍 The Reference Point (Origin)</h4>
                            <p className="text-gray-800 text-xl font-medium">To describe the location or position of any object, we must first choose a fixed point to compare it to. This fixed point is called the Reference Point or the Origin.</p>
                            <ul className="list-disc ml-10 mt-6 space-y-4 text-gray-800 text-xl">
                                <li><b>Definition:</b> A point used to find or describe the location of an object.</li>
                                <li><b>Example:</b> If a school is 2 km north of a railway station, the railway station is the reference point.</li>
                                <li><b>Flexibility:</b> We can choose any reference point based on our convenience. For instance, you could describe the school's location relative to a bus stand instead of the railway station.</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Discussion Card - FluidGlass */}
                <FluidGlass>
                    <motion.h3
                        className="text-3xl font-extrabold text-blue-900 mb-6 flex items-center gap-3 cursor-default"
                        whileHover={{ scale: 1.05, x: 10 }}
                    >
                        <span className="text-4xl">🤔</span> Think and Act
                    </motion.h3>
                    <p className="text-gray-800 text-xl italic font-medium leading-relaxed bg-white/60 p-8 rounded-[2rem] border-2 border-white">
                        We sometimes are endangered by the motion of objects around us, especially if that motion is erratic and uncontrolled as observed in a flooded river, a hurricane or a tsunami. On the other hand, controlled motion can be a service to human beings such as in the generation of hydro-electric power. Do you feel the necessity to study the erratic motion of some objects and learn to control them?
                    </p>
                </FluidGlass>

                {/* Motion is Relative */}
                <motion.div
                    className="p-12 rounded-[3rem] bg-white border-8 border-yellow-200 shadow-[0_16px_0_0_rgba(254,240,138,1)] cursor-default group"
                    whileHover={{ y: -8, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <motion.h2
                        className="text-4xl font-extrabold text-yellow-900 mb-8 flex items-center gap-6"
                        whileHover={{ scale: 1.05, y: -5, rotate: -2 }}
                    >
                        <span className="bg-white text-yellow-600 px-4 py-2 rounded-xl shadow-sm border-2 border-yellow-200">2.</span>
                        Motion is Relative 🚌
                    </motion.h2>

                    <div className="rounded-[2.5rem] overflow-hidden mb-10 border-[12px] border-gray-100 shadow-xl transform group-hover:rotate-1 transition-transform group-hover:scale-[1.02] duration-500">
                        <img src={MotionIsRelativeImg} alt="Motion Diagram" className="w-full h-auto object-cover" />
                    </div>

                    {/* Video 1.1-2 moved to top, removing extra video here */}

                    <p className="text-gray-800 text-2xl font-medium mb-10 p-8 bg-pastel-yellow border-4 border-yellow-400 rounded-[2rem] shadow-[0_8px_0_0_rgba(250,204,21,0.5)] transition-transform group-hover:-translate-y-2">
                        An object can be in motion and at rest at the same time, depending on who is looking at it. This is why we say motion is "relative."
                    </p>

                    <h3 className="text-3xl font-bold text-gray-800 mb-6 bg-gray-100 inline-block px-6 py-3 rounded-[1.5rem]">The "Moving Bus" Example</h3>
                    <p className="text-gray-700 text-xl mb-8 font-medium">To understand how motion depends on the observer, consider these three perspectives:</p>

                    <div className="overflow-x-auto rounded-[2.5rem] border-8 border-gray-200 shadow-inner bg-white">
                        <table className="w-full text-left border-collapse text-xl">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-6 border-b-4 border-gray-200 font-extrabold text-gray-700">Observer</th>
                                    <th className="p-6 border-b-4 border-gray-200 font-extrabold text-gray-700">Object observed</th>
                                    <th className="p-6 border-b-4 border-gray-200 font-extrabold text-gray-700">Perception</th>
                                    <th className="p-6 border-b-4 border-gray-200 font-extrabold text-gray-700">Why?</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-blue-50 transition-colors bg-white">
                                    <td className="p-6 border-b-4 border-gray-100 font-bold text-gray-800">👨‍💼 A person on the roadside</td>
                                    <td className="p-6 border-b-4 border-gray-100 font-medium text-gray-600">The Bus</td>
                                    <td className="p-6 border-b-4 border-gray-100 font-extrabold text-blue-600 bg-blue-50/50">Moving</td>
                                    <td className="p-6 border-b-4 border-gray-100 text-gray-600 leading-relaxed">The bus changes position relative to the stationary ground.</td>
                                </tr>
                                <tr className="hover:bg-red-50 transition-colors bg-gray-50">
                                    <td className="p-6 border-b-4 border-gray-100 font-bold text-gray-800">🧑‍🎓 A passenger in the bus</td>
                                    <td className="p-6 border-b-4 border-gray-100 font-medium text-gray-600">Roadside trees</td>
                                    <td className="p-6 border-b-4 border-gray-100 font-extrabold text-red-500 bg-red-50/50">Moving backwards</td>
                                    <td className="p-6 border-b-4 border-gray-100 text-gray-600 leading-relaxed">Relative to the moving bus, the trees appear to be shifting away.</td>
                                </tr>
                                <tr className="hover:bg-green-50 transition-colors bg-white">
                                    <td className="p-6 font-bold text-gray-800">🧑‍🎓 A passenger in the bus</td>
                                    <td className="p-6 font-medium text-gray-600">A fellow passenger</td>
                                    <td className="p-6 font-extrabold text-green-600 bg-green-50/50">At rest</td>
                                    <td className="p-6 text-gray-600 leading-relaxed">Their positions relative to each other inside the bus do not change.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Inferred Motion - Fluid Glass */}
                <FluidGlass>
                    <motion.h2
                        className="text-4xl font-extrabold text-green-900 mb-8 cursor-default"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                        3. Inferred Motion 🍃
                    </motion.h2>
                    <p className="text-gray-800 text-2xl font-medium mb-10 leading-relaxed">Sometimes we cannot see motion directly, but we know it is happening because of its effects. This is indirect evidence.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <motion.div
                            className="p-8 rounded-[2.5rem] bg-white border-4 border-blue-300 shadow-[0_10px_0_0_rgba(147,197,253,1)] flex flex-col gap-6"
                            whileHover={{ y: -5 }}
                        >
                            <div className="bg-pastel-blue p-5 rounded-[1.5rem] w-max border-4 border-blue-400"><TreePine className="text-blue-700" size={48} /></div>
                            <div>
                                <h4 className="font-extrabold text-3xl text-gray-800 mb-3">Motion of Air</h4>
                                <p className="text-xl text-gray-600 font-medium leading-relaxed">We don't see air moving, but we see leaves rustling and dust blowing.</p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="p-8 rounded-[2.5rem] bg-white border-4 border-yellow-300 shadow-[0_10px_0_0_rgba(253,224,71,1)] flex flex-col gap-6"
                            whileHover={{ y: -5 }}
                        >
                            <div className="bg-pastel-yellow p-5 rounded-[1.5rem] w-max border-4 border-yellow-400"><PersonStanding className="text-yellow-700" size={48} /></div>
                            <div>
                                <h4 className="font-extrabold text-3xl text-gray-800 mb-3">Motion of the Earth</h4>
                                <p className="text-xl text-gray-600 font-medium leading-relaxed">We don't "feel" the Earth spinning or moving through space, but we know it moves because we observe the sunrise, sunset, and the changing of seasons.</p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="bg-[#1e293b] p-10 rounded-[3rem] border-8 border-gray-700 text-white shadow-[0_12px_0_0_rgba(15,23,42,1)] relative overflow-hidden transform hover:scale-[1.02] transition-transform">
                        <div className="absolute -right-10 -bottom-10 opacity-20"><Bus size={240} /></div>
                        <h3 className="text-3xl font-extrabold mb-6 flex items-center gap-4 text-yellow-300">✨ Summary Insight</h3>
                        <p className="text-gray-200 text-2xl leading-relaxed relative z-10 font-medium">
                            Whether an object is "moving" depends entirely on the Reference Point chosen by the observer. Without a reference point, the word "motion" has no meaning.
                        </p>
                    </div>
                </FluidGlass >

                {/* Gamification Activities Content inline */}
                <hr className="border-4 border-white/40 rounded-full my-8 mix-blend-overlay" />
                <ActivitiesContent />
            </div>
        </div >
    );
}

function ActivitiesContent() {
    const [pov, setPov] = useState<'ground' | 'bus'>('ground');

    return (
        <div className="flex flex-col gap-12">
            <FluidGlass>
                <motion.h2
                    className="text-5xl font-extrabold text-purple-900 mb-6 cursor-default"
                    whileHover={{ scale: 1.05, y: -5, rotate: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                    Interactive Activities 🎮
                </motion.h2>
                <p className="text-2xl text-purple-900/80 font-bold mb-4">Play and Learn about motion from different perspectives!</p>
            </FluidGlass>

            <div className="p-12 rounded-[3.5rem] bg-white border-8 border-purple-200 shadow-[0_20px_0_0_rgba(233,213,255,1)] hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Activity 1: The Perspective Switcher</h3>

                <div className="flex flex-col sm:flex-row gap-8 mb-12 justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPov('ground')}
                        className={`px-10 py-5 rounded-[2rem] font-extrabold text-2xl transition-all border-[6px] ${pov === 'ground' ? 'bg-blue-500 text-white border-blue-700 shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)]' : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200 shadow-[0_8px_0_0_rgba(209,213,219,1)] hover:translate-y-1 hover:shadow-[0_4px_0_0_rgba(209,213,219,1)]'}`}
                    >
                        🚶‍♂️ Standing on Ground
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPov('bus')}
                        className={`px-10 py-5 rounded-[2rem] font-extrabold text-2xl transition-all border-[6px] ${pov === 'bus' ? 'bg-green-500 text-white border-green-700 shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)]' : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200 shadow-[0_8px_0_0_rgba(209,213,219,1)] hover:translate-y-1 hover:shadow-[0_4px_0_0_rgba(209,213,219,1)]'}`}
                    >
                        🚌 Sitting in Bus
                    </motion.button>
                </div>

                <div className="relative w-full h-[28rem] bg-gradient-to-b from-blue-300 to-blue-200 rounded-[3rem] overflow-hidden border-[10px] border-gray-800 mb-12 flex items-end shadow-[inset_0_4px_20px_rgba(0,0,0,0.2)] isolate">
                    {/* Ground / Road */}
                    <div className="w-[300%] h-24 bg-gray-600 absolute bottom-0 border-t-[10px] border-gray-700 z-10 flex items-center">
                        <div className="w-full h-3 border-y-4 border-dashed border-yellow-400 opacity-60"></div>
                    </div>

                    {/* Trees Background */}
                    <motion.div
                        className="absolute bottom-24 flex gap-40 w-[300%] px-10 z-0"
                        animate={pov === 'bus' ? { x: [-100, -800] } : { x: 0 }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                    >
                        {[...Array(12)].map((_, i) => (
                            <TreePine key={i} size={140} className="text-green-800 drop-shadow-xl" />
                        ))}
                    </motion.div>

                    {/* Person on ground */}
                    <motion.div
                        className="absolute bottom-20 left-24 text-gray-800 z-20 drop-shadow-2xl"
                        animate={pov === 'bus' ? { x: [-100, -800] } : { x: 0 }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                    >
                        <PersonStanding size={100} />
                    </motion.div>

                    {/* Bus */}
                    <motion.div
                        className="absolute bottom-20 z-30 drop-shadow-2xl"
                        initial={{ left: "20%" }}
                        animate={pov === 'ground' ? { x: [0, 800] } : { x: 0, scale: 1.1, left: "40%" }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                    >
                        <div className="w-64 h-32 bg-yellow-400 rounded-3xl flex items-center justify-center relative border-[6px] border-yellow-600 shadow-[inset_0_-10px_0_rgba(0,0,0,0.2)]">
                            <Bus size={64} className="text-gray-800" />
                            <div className="absolute top-3 right-5 w-20 h-10 bg-blue-100/90 rounded-xl border-4 border-gray-400 shadow-inner"></div>
                            {/* Wheels */}
                            <div className="absolute -bottom-6 left-6 w-14 h-14 bg-gray-800 rounded-full border-[6px] border-gray-300 shadow-lg"></div>
                            <div className="absolute -bottom-6 right-6 w-14 h-14 bg-gray-800 rounded-full border-[6px] border-gray-300 shadow-lg"></div>
                        </div>
                    </motion.div>
                </div>

                <div className="bg-purple-50 p-10 rounded-[2.5rem] border-[6px] border-purple-200 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                    <div className="text-7xl animate-bounce">💡</div>
                    <div>
                        <p className="text-purple-900 text-3xl font-extrabold mb-3">When you are <span className="underline decoration-wavy decoration-purple-400 underline-offset-8">{pov === 'ground' ? 'on the ground' : 'in the bus'}</span>...</p>
                        <p className="text-gray-800 text-2xl font-medium leading-relaxed bg-white/50 p-4 rounded-xl">
                            {pov === 'ground'
                                ? "The bus changes its position relative to you. Thus, you see the bus moving while the trees and yourself are at rest."
                                : "The bus is at rest relative to you. However, you see the outside world (trees, people) moving backwards relative to your frame of reference."}
                        </p>
                    </div>
                </div>
            </div>

            <IframeActivity
                title="PhET: Forces & Motion Basics"
                description="Explore the forces at work when pulling against a cart, and pushing a refrigerator, crate, or person! Create an applied force and see how it fundamentally makes objects move and accelerate."
                url="https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_en.html"
            />

            <Interactive3DSimulation />

            <ChapterFooter chapterName="1 ⏤ Motion" />
        </div>
    );
}

export { ActivitiesContent };
