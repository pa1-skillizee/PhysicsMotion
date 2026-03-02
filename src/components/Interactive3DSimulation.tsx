import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// A simple Kid-Friendly 3D Car Component
function ToyCar({ color, position, isMoving, speedMultiplier = 1 }: { color: string, position: [number, number, number], isMoving: boolean, speedMultiplier?: number }) {
    const carRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (carRef.current && isMoving) {
            // Move car along X axis
            carRef.current.position.x += 0.05 * speedMultiplier;
            // Loop back
            if (carRef.current.position.x > 10) {
                carRef.current.position.x = -15; // loop far back
            }
        }
    });

    return (
        <group ref={carRef} position={position}>
            {/* Body */}
            <mesh position={[0, 0.5, 0]} castShadow>
                <boxGeometry args={[3, 1, 1.5]} />
                <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
            </mesh>
            {/* Cabin */}
            <mesh position={[-0.2, 1.2, 0]} castShadow>
                <boxGeometry args={[1.5, 0.8, 1.2]} />
                <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
            </mesh>
            {/* Wheels */}
            {[-1, 1].map((x) =>
                [-0.8, 0.8].map((z, i) => (
                    <mesh key={`wheel-${x}-${z}-${i}`} position={[x, 0.2, z]} castShadow>
                        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
                        <meshStandardMaterial color="#1f2937" roughness={0.8} />
                    </mesh>
                ))
            )}

            {/* Label */}
            <Html position={[0, 2.5, 0]} center prepend>
                <div className={`px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold shadow-lg border-2 ${color === '#ef4444' ? 'border-red-400 text-red-600' : 'border-blue-400 text-blue-600'}`}>
                    {color === '#ef4444' ? 'Car A' : 'Car B'}
                </div>
            </Html>
        </group>
    );
}

// Fixed Reference Point (Tree)
function Tree({ position, isMovingBackground }: { position: [number, number, number], isMovingBackground: boolean }) {
    const treeRef = useRef<THREE.Group>(null);

    useFrame(() => {
        // If we view from Car A, the world moves backwards relative to Car A's speed (equivalent to speedMultiplier 1)
        if (treeRef.current && isMovingBackground) {
            treeRef.current.position.x -= 0.05;
            if (treeRef.current.position.x < -15) {
                treeRef.current.position.x = 15;
            }
        }
    });

    return (
        <group ref={treeRef} position={position}>
            {/* Trunk */}
            <mesh position={[0, 1, 0]} castShadow>
                <cylinderGeometry args={[0.3, 0.4, 2]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} />
            </mesh>
            {/* Leaves */}
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                <mesh position={[0, 2.5, 0]} castShadow>
                    <dodecahedronGeometry args={[1.5]} />
                    <meshStandardMaterial color="#22c55e" roughness={0.8} />
                </mesh>
            </Float>
            <Html position={[0, 4.5, 0]} center prepend>
                <div className="px-3 py-1 bg-green-100 rounded-full text-green-800 text-sm font-bold shadow-lg border-2 border-green-400">
                    Tree (Fixed)
                </div>
            </Html>
        </group>
    );
}

// Separate component for the scene contents to manage logic
function SceneContents({ referencePoint }: { referencePoint: 'tree' | 'carA' }) {
    // We adjust the camera center position slightly based on reference
    useFrame((state) => {
        const targetX = referencePoint === 'carA' ? -5 : 0; // Car A's initial X position is -5
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
        state.camera.lookAt(targetX, 0, 0);
    });

    const isMovingBackground = referencePoint === 'carA';

    return (
        <group>
            {/* Infinite Road */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#94a3b8" />
            </mesh>

            {/* Road markings */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 1.5]} receiveShadow>
                <planeGeometry args={[100, 0.2]} />
                <meshStandardMaterial color="#fcd34d" />
            </mesh>

            {/* Tree scenery instances. If reference is carA, they move backwards! */}
            <Tree position={[0, 0, -3]} isMovingBackground={isMovingBackground} />
            <Tree position={[-12, 0, -4]} isMovingBackground={isMovingBackground} />
            <Tree position={[12, 0, -2]} isMovingBackground={isMovingBackground} />

            {/* Car A: If tracking Tree, it moves forward (+0.05). If tracking Car A, it sits still! */}
            <ToyCar color="#ef4444" position={[-5, 0, 0]} isMoving={referencePoint === 'tree'} speedMultiplier={1} />

            {/* Car B: If tracking Tree, moves faster (+0.075). If tracking Car A, it moves slowly forward (+0.025) because we mathematically subtract Car A's speed (0.05) from Car B's absolute speed (0.075) */}
            {/* We simulate this effectively by dropping the speed multiplier if tracking carA */}
            <ToyCar color="#3b82f6" position={[-8, 0, 3]} isMoving={true} speedMultiplier={referencePoint === 'tree' ? 1.5 : 0.5} />
        </group>
    );
}

export default function Interactive3DSimulation() {
    const [referencePoint, setReferencePoint] = useState<'tree' | 'carA'>('tree');

    return (
        <div className="p-12 rounded-[3.5rem] bg-white border-8 border-pink-200 shadow-[0_20px_0_0_rgba(251,207,232,1)] hover:-translate-y-2 transition-transform duration-300 mt-16 w-full">
            <h3 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Activity 2: 3D Reference Points</h3>
            <p className="text-xl text-gray-600 font-medium text-center max-w-2xl mx-auto mb-10">
                Interact with the 3D scene! See how the perception of "speed" and "motion" changes completely depending on what you choose as your reference point.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-10 justify-center">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setReferencePoint('tree')}
                    className={`px-8 py-4 rounded-[2rem] font-bold text-xl transition-all border-[4px] ${referencePoint === 'tree' ? 'bg-green-500 text-white border-green-700 shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)]' : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200 shadow-[0_6px_0_0_rgba(209,213,219,1)]'}`}
                >
                    👀 View from Tree
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setReferencePoint('carA')}
                    className={`px-8 py-4 rounded-[2rem] font-bold text-xl transition-all border-[4px] ${referencePoint === 'carA' ? 'bg-red-500 text-white border-red-700 shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)]' : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200 shadow-[0_6px_0_0_rgba(209,213,219,1)]'}`}
                >
                    🏎️ View from Car A
                </motion.button>
            </div>

            <div className="w-full h-[450px] bg-sky-100 rounded-[2.5rem] overflow-hidden border-8 border-gray-200 shadow-inner relative cursor-grab active:cursor-grabbing">
                <Canvas shadows camera={{ position: [0, 8, 15], fov: 45 }}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 20, 10]} castShadow intensity={1} shadow-mapSize={[1024, 1024]} />

                    <SceneContents referencePoint={referencePoint} />

                    <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 4} enablePan={false} />
                </Canvas>
            </div>

            {/* Explanation box */}
            <div className="mt-8 bg-pink-50 p-8 rounded-[2rem] border-[4px] border-pink-200 flex flex-col items-center text-center">
                <h4 className="text-2xl font-extrabold text-pink-900 mb-2">Observation</h4>
                <p className="text-gray-800 text-xl font-medium">
                    {referencePoint === 'tree'
                        ? "From the tree's perspective, both cars are moving forward, with Car B moving faster."
                        : "From Car A's perspective, the tree is moving backwards! Car B is still moving forward, but it appears slower because you are subtracting your own speed."}
                </p>
            </div>
        </div>
    );
}
