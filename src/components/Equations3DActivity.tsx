import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';
function RacingCar({ position, speed }: { position: [number, number, number], speed: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const wheelsRef = useRef<THREE.Mesh[]>([]);

    useFrame((_, delta) => {
        if (groupRef.current) {
            // Wheels rotation based on speed
            wheelsRef.current.forEach(wheel => {
                if (wheel) wheel.rotation.x -= speed * delta * 5;
            });
            // Slight tilt/wobble for realism
            if (speed > 0) {
                groupRef.current.rotation.z = Math.sin(Date.now() * 0.01) * 0.01;
            } else {
                groupRef.current.rotation.z = 0;
            }
        }
    });

    return (
        <group ref={groupRef} position={position} scale={[0.5, 0.5, 0.5]}>
            {/* Car Body */}
            <mesh position={[0, 0.5, 0]} castShadow>
                <boxGeometry args={[2.2, 0.8, 4]} />
                <meshStandardMaterial color="#f43f5e" roughness={0.2} metalness={0.8} />
            </mesh>
            {/* Car Roof */}
            <mesh position={[0, 1.2, -0.5]} castShadow>
                <boxGeometry args={[1.8, 0.6, 2]} />
                <meshStandardMaterial color="#333333" roughness={0.1} metalness={0.9} />
            </mesh>
            {/* Headlights */}
            <mesh position={[-0.8, 0.5, 2.01]}>
                <boxGeometry args={[0.4, 0.2, 0.1]} />
                <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0.8, 0.5, 2.01]}>
                <boxGeometry args={[0.4, 0.2, 0.1]} />
                <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} />
            </mesh>

            {/* Wheels */}
            {[-1.1, 1.1].map((x, i) => (
                [-1.2, 1.2].map((z, j) => (
                    <mesh
                        key={`${i}-${j}`}
                        position={[x, 0.4, z]}
                        rotation={[0, 0, Math.PI / 2]}
                        ref={(el) => { if (el) wheelsRef.current.push(el) }}
                        castShadow
                    >
                        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
                        <meshStandardMaterial color="#111111" roughness={0.9} />
                    </mesh>
                ))
            ))}
        </group>
    );
}

function GridRoad({ speed }: { speed: number }) {
    const gridRef = useRef<THREE.GridHelper>(null);
    useFrame((_, delta) => {
        if (gridRef.current) {
            gridRef.current.position.z += speed * delta;
            if (gridRef.current.position.z > 10) {
                gridRef.current.position.z -= 10;
            }
        }
    });

    return (
        <group>
            {/* Solid Asphalt */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                <planeGeometry args={[100, 200]} />
                <meshStandardMaterial color="#1e293b" side={THREE.DoubleSide} />
            </mesh>
            {/* Moving Grid Lines for Speed Illusion */}
            <gridHelper ref={gridRef} args={[100, 100, '#475569', '#334155']} position={[0, 0.01, 0]} />

            {/* Moving Center Line */}
            {Array.from({ length: 20 }).map((_, i) => (
                <mesh key={i} position={[0, 0.02, -100 + i * 10]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.2, 4]} />
                    <meshStandardMaterial color="#fbbf24" />
                </mesh>
            ))}
        </group>
    );
}

export default function Equations3DActivity() {
    const [u, setU] = useState<number>(0);
    const [a, setA] = useState<number>(2);
    const [t, setT] = useState<number>(5);
    const [customT, setCustomT] = useState<string>('');

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentV, setCurrentV] = useState(u);
    const [currentS, setCurrentS] = useState(0);

    // Run the physical simulation
    useEffect(() => {
        let animationFrame: number;
        let lastTime = performance.now();

        const updateSimulation = (now: number) => {
            if (!isPlaying) return;

            const delta = (now - lastTime) / 1000;
            lastTime = now;

            setCurrentTime((prev) => {
                const newTime = prev + delta;
                if (newTime >= t) {
                    setIsPlaying(false);
                    return t; // Cap at max time
                }
                return newTime;
            });

            animationFrame = requestAnimationFrame(updateSimulation);
        };

        if (isPlaying) {
            lastTime = performance.now();
            animationFrame = requestAnimationFrame(updateSimulation);
        }

        return () => cancelAnimationFrame(animationFrame);
    }, [isPlaying, t]);

    // Recalculate kinematics based on current time
    useEffect(() => {
        const v = u + (a * currentTime);
        const s = (u * currentTime) + (0.5 * a * currentTime * currentTime);
        setCurrentV(v);
        setCurrentS(s);
    }, [currentTime, u, a]);

    const handleStart = () => {
        setCurrentTime(0);
        setCurrentV(u);
        setCurrentS(0);
        setIsPlaying(true);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setCurrentV(u);
        setCurrentS(0);
    };

    // Calculate Final Goal for Display
    const finalV = u + (a * t);
    const finalS = (u * t) + (0.5 * a * t * t);

    return (
        <div className="w-full bg-slate-900 rounded-[3rem] border-8 border-slate-700 shadow-2xl my-16 overflow-hidden flex flex-col md:flex-row h-[700px]">

            {/* Control Panel (Left) */}
            <div className="w-full md:w-1/3 bg-slate-800 p-8 flex flex-col gap-6 text-slate-200 shadow-xl z-10 border-r-4 border-slate-700">
                <h3 className="text-2xl font-black text-rose-400 uppercase tracking-widest mb-2 font-mono">Control Desk</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-1">Initial Velocity (u) m/s</label>
                        <input type="range" min="0" max="50" step="1" value={u} onChange={(e) => { setU(Number(e.target.value)); handleReset(); }} disabled={isPlaying} className="w-full accent-rose-500" />
                        <div className="text-right font-mono text-xl">{u}</div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-1">Acceleration (a) m/s²</label>
                        <input type="range" min="-10" max="20" step="1" value={a} onChange={(e) => { setA(Number(e.target.value)); handleReset(); }} disabled={isPlaying} className="w-full accent-emerald-500" />
                        <div className="text-right font-mono text-xl">{a}</div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-1">Time Goal (t) sec</label>
                        <div className="flex gap-2">
                            <input type="range" min="1" max="20" step="1" value={t} onChange={(e) => { setT(Number(e.target.value)); setCustomT(''); handleReset(); }} disabled={isPlaying} className="w-full accent-sky-500" />
                            <input 
                                type="number" 
                                placeholder="sec"
                                value={customT}
                                onChange={(e) => {
                                    setCustomT(e.target.value);
                                    const num = Number(e.target.value);
                                    if (num > 0) {
                                        setT(num);
                                        handleReset();
                                    }
                                }}
                                disabled={isPlaying}
                                className="w-16 h-8 bg-slate-900 border border-slate-600 rounded text-center text-sm font-bold text-white outline-sky-500 hide-arrows"
                            />
                        </div>
                        <div className="text-right font-mono text-xl">{t}</div>
                    </div>
                </div>

                <div className="flex gap-4 mt-4">
                    <button
                        onClick={isPlaying ? handleReset : handleStart}
                        className={`flex-1 py-4 rounded-xl font-black text-xl uppercase transition-colors ${isPlaying ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900'}`}
                    >
                        {isPlaying ? 'STOP' : 'DRIVE'}
                    </button>
                    {!isPlaying && currentTime > 0 && (
                        <button onClick={handleReset} className="px-6 bg-slate-600 hover:bg-slate-500 rounded-xl font-bold uppercase">Reset</button>
                    )}
                </div>

                <div className="mt-auto bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-2">Equations Check</p>
                    <p className="font-mono text-sm mb-1"><span className="text-emerald-400">v</span> = {u} + ({a})({t}) = <strong className="text-emerald-400">{finalV.toFixed(1)}</strong></p>
                    <p className="font-mono text-sm"><span className="text-sky-400">s</span> = {u}({t}) + ½({a})({t})² = <strong className="text-sky-400">{finalS.toFixed(1)}</strong></p>
                </div>
            </div>

            {/* 3D Simulation Canvas (Right) */}
            <div className="w-full md:w-2/3 h-full relative">

                {/* HUD Overlay */}
                <div className="absolute top-6 left-6 z-10 flex gap-4 pointer-events-none">
                    <div className="bg-slate-800/80 backdrop-blur-md px-6 py-3 rounded-2xl border-2 border-slate-600">
                        <p className="text-xs text-slate-400 font-bold uppercase">Time (t)</p>
                        <p className="text-3xl font-mono font-black text-white">{currentTime.toFixed(1)} <span className="text-sm">s</span></p>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur-md px-6 py-3 rounded-2xl border-2 border-slate-600">
                        <p className="text-xs text-slate-400 font-bold uppercase">Velocity (v)</p>
                        <p className="text-3xl font-mono font-black text-emerald-400">{currentV.toFixed(1)} <span className="text-sm">m/s</span></p>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur-md px-6 py-3 rounded-2xl border-2 border-slate-600">
                        <p className="text-xs text-slate-400 font-bold uppercase">Distance (s)</p>
                        <p className="text-3xl font-mono font-black text-sky-400">{currentS.toFixed(1)} <span className="text-sm">m</span></p>
                    </div>
                </div>

                <Canvas shadows>
                    {/* First-person camera: inside the car roof */}
                    <PerspectiveCamera makeDefault position={[0, 1.2, -0.5]} fov={75} />
                    <color attach="background" args={['#0f172a']} />
                    <fog attach="fog" args={['#0f172a', 10, 50]} />

                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
                    <Environment preset="night" />

                    <GridRoad speed={currentV} />
                    <RacingCar position={[0, 0, -2]} speed={currentV} />

                    {/* Animated Data Label positioned near the car */}
                    <Text position={[3, 2, -2]} fontSize={0.6} color="#fbbf24" anchorX="left">
                        {`v = ${currentV.toFixed(1)}`}
                    </Text>
                    <Text position={[3, 1.2, -2]} fontSize={0.6} color="#38bdf8" anchorX="left">
                        {`s = ${currentS.toFixed(1)}`}
                    </Text>

                </Canvas>
            </div>
        </div>
    );
}
