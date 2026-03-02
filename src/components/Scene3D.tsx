import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

// A single block that can be tiled
function CityBlock({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            {/* Ground */}
            <mesh receiveShadow position={[0, -0.5, 0]}>
                <boxGeometry args={[10, 1, 10]} />
                <meshStandardMaterial color="#E4F4D9" roughness={0.8} />
            </mesh>

            {/* Roads */}
            <mesh receiveShadow position={[0, 0.01, 0]}>
                <planeGeometry args={[10, 4]} />
                <meshStandardMaterial color="#cbd5e1" roughness={0.9} />
            </mesh>
            <mesh receiveShadow position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[4, 10]} />
                <meshStandardMaterial color="#cbd5e1" roughness={0.9} />
            </mesh>

            {/* Buildings with playful colors */}
            <mesh castShadow receiveShadow position={[-3, 1.5, -3]}>
                <boxGeometry args={[2, 3, 2]} />
                <meshStandardMaterial color="#818cf8" roughness={0.4} />
            </mesh>
            <mesh castShadow receiveShadow position={[3, 2, -3]}>
                <boxGeometry args={[2.5, 4, 2]} />
                <meshStandardMaterial color="#f472b6" roughness={0.4} />
            </mesh>
            <mesh castShadow receiveShadow position={[-3, 1, 3]}>
                <boxGeometry args={[3, 2, 2.5]} />
                <meshStandardMaterial color="#fbbf24" roughness={0.4} />
            </mesh>
            <mesh castShadow receiveShadow position={[3, 2.5, 3]}>
                <boxGeometry args={[2, 5, 2]} />
                <meshStandardMaterial color="#34d399" roughness={0.4} />
            </mesh>

            {/* Trees */}
            <group position={[-1.5, 0.5, -1.5]}>
                <mesh castShadow position={[0, 0, 0]}><cylinderGeometry args={[0.2, 0.2, 1]} /><meshStandardMaterial color="#8B4513" /></mesh>
                <mesh castShadow position={[0, 1, 0]}><sphereGeometry args={[0.8]} /><meshStandardMaterial color="#10b981" /></mesh>
            </group>
            <group position={[1.5, 0.5, 1.5]}>
                <mesh castShadow position={[0, 0, 0]}><cylinderGeometry args={[0.2, 0.2, 1]} /><meshStandardMaterial color="#8B4513" /></mesh>
                <mesh castShadow position={[0, 1, 0]}><sphereGeometry args={[0.8]} /><meshStandardMaterial color="#10b981" /></mesh>
            </group>
        </group>
    );
}

// Moving Car
function Car({ offset, speed, color, laneZ, direction }: { offset: number, speed: number, color: string, laneZ: number, direction: number }) {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime();
            // Loop over a large area (e.g. 100 units)
            const x = (((t * speed * direction + offset) % 100) + 100) % 100 - 50;
            ref.current.position.x = x;
        }
    });

    return (
        <group ref={ref} position={[0, 0.5, laneZ]}>
            {/* Body */}
            <mesh castShadow position={[0, 0.2, 0]}>
                <boxGeometry args={[1.5, 0.6, 1]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
            </mesh>
            {/* Cabin */}
            <mesh castShadow position={[direction * -0.1, 0.7, 0]}>
                <boxGeometry args={[0.8, 0.5, 0.8]} />
                <meshPhysicalMaterial color="#ffffff" roughness={0.1} transmission={0.9} thickness={0.5} />
            </mesh>
        </group>
    );
}

// Generates a 5x5 grid of blocks
function CityGrid() {
    const offsets = [-20, -10, 0, 10, 20];
    return (
        <group>
            {offsets.map((x, i) =>
                offsets.map((z, j) => (
                    <CityBlock key={`${i}-${j}`} position={[x, 0, z]} />
                ))
            )}
        </group>
    );
}

// Scene Root to handle pointer parallax
function SceneContent() {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const targetPosition = useRef(new THREE.Vector3(25, 30, 25)); // Base Camera Position

    const cars = useMemo(() => [
        { offset: 0, speed: 4, color: "#ef4444", laneZ: -1, direction: 1 },
        { offset: 25, speed: 5, color: "#3b82f6", laneZ: 1, direction: -1 },
        { offset: 45, speed: 4.5, color: "#f59e0b", laneZ: 9, direction: 1 },
        { offset: 15, speed: 6, color: "#8b5cf6", laneZ: 11, direction: -1 },
        { offset: 20, speed: 4, color: "#10b981", laneZ: -9, direction: 1 },
        { offset: 60, speed: 5.5, color: "#ec4899", laneZ: -11, direction: -1 },
        { offset: 10, speed: 5, color: "#fb923c", laneZ: 19, direction: 1 },
        { offset: 35, speed: 6, color: "#2dd4bf", laneZ: 21, direction: -1 },
        { offset: 50, speed: 4, color: "#a855f7", laneZ: -19, direction: 1 },
        { offset: 75, speed: 4.8, color: "#eab308", laneZ: -21, direction: -1 },
    ], []);

    // Use a global listener for mouse movement to ensure it picks up strokes anywhere on the window
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // Normalize mouse to -1 to 1
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((_, delta) => {
        if (cameraRef.current) {
            // We pan the camera itself rather than tilting the entire city world. This keeps it strictly horizontal/flat.
            // We calculate target pan relative to the base vector (25, 30, 25)
            const panX = mouse.current.x * 5;  // 5 units pan left/right
            const panZ = -mouse.current.y * 5; // 5 units pan up/down along the Z axis based on mouse Y

            targetPosition.current.set(25 + panX, 30, 25 + panZ);

            // Smoothly move the camera to target
            cameraRef.current.position.lerp(targetPosition.current, delta * 3);

            // Always look at the center of the city.
            cameraRef.current.lookAt(0, 0, 0);
        }
    });

    return (
        <>
            {/* makeDefault ensures Fiber uses this specific camera so our ref.current works */}
            <PerspectiveCamera ref={cameraRef as any} makeDefault position={[25, 30, 25]} fov={35} />

            <color attach="background" args={['#bae6fd']} />
            <fog attach="fog" args={['#bae6fd', 30, 80]} />

            <ambientLight intensity={1.2} />
            <directionalLight
                castShadow
                position={[20, 30, 10]}
                intensity={1.5}
                shadow-mapSize={[2048, 2048]}
                shadow-camera-near={0.5}
                shadow-camera-far={100}
                shadow-camera-left={-30}
                shadow-camera-right={30}
                shadow-camera-top={30}
                shadow-camera-bottom={-30}
            />

            {/* Kept totally flat and centered. No rotation or tilt applied to the world. */}
            <group position={[0, -2, 0]}>
                <CityGrid />
                {cars.map((car, idx) => (
                    <Car key={idx} {...car} />
                ))}
                <ContactShadows position={[0, -0.49, 0]} opacity={0.6} scale={60} blur={2.5} far={4} />
            </group>

            <Environment preset="city" />
        </>
    );
}

export default function Scene3D() {
    return (
        // Make sure Canvas ignores pointer events itself so it doesn't block the HTML scroll area
        <Canvas shadows className="pointer-events-none">
            <SceneContent />
        </Canvas>
    );
}
