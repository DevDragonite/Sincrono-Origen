"use client";

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { Float, Html } from '@react-three/drei';

export default function CoffeeBean() {
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Rotation
            meshRef.current.rotation.y += delta * 0.2;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group>
                {/* Core Bean (Technological Heart) */}
                <mesh
                    ref={meshRef}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                    scale={hovered ? 1.1 : 1}
                >
                    <icosahedronGeometry args={[1.5, 0]} />
                    <meshStandardMaterial
                        color="#B87333"
                        wireframe={true}
                        emissive="#B87333"
                        emissiveIntensity={0.5}
                        transparent
                        opacity={0.8}
                    />
                </mesh>

                {/* Inner Solid Core */}
                <mesh scale={0.8}>
                    <icosahedronGeometry args={[1.2, 0]} />
                    <meshStandardMaterial color="#1C1C1C" roughness={0.2} metalness={0.8} />
                </mesh>

                {/* Floating Label (Example of Html in 3D) */}
                <Html position={[2, 0, 0]} className="pointer-events-none">
                    <div className="bg-black/50 backdrop-blur-md p-2 border border-brand-copper/30 rounded text-xs text-brand-copper whitespace-nowrap">
                        System: Active
                    </div>
                </Html>
            </group>
        </Float>
    );
}
