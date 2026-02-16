"use client";

import { useState, forwardRef } from 'react';
import { Group } from 'three';
import { Float } from '@react-three/drei';

const CoffeeBean = forwardRef<Group>((props, ref) => {
    const [hovered, setHover] = useState(false);

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group
                scale={1.5}
                // @ts-ignore
                ref={ref}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                {/* Left Half */}
                <mesh position={[-0.2, 0, 0]} rotation={[0, 0, 0.2]} castShadow receiveShadow
                    scale={hovered ? 1.05 : 1}
                >
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial
                        color="#5D4037"
                        roughness={0.6}
                        metalness={0.1}
                    />
                </mesh>

                {/* Right Half */}
                <mesh position={[0.2, 0, 0]} rotation={[0, 0, -0.2]} castShadow receiveShadow scale={hovered ? 1.05 : 1}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial
                        color="#5D4037"
                        roughness={0.6}
                        metalness={0.1}
                    />
                </mesh>

                {/* Crease (Dark Line) */}
                <mesh position={[0, 0, 0]} scale={[0.1, 1.8, 1.8]}>
                    <boxGeometry />
                    <meshBasicMaterial color="#2a1e16" />
                </mesh>
            </group>
        </Float>
    );
});

CoffeeBean.displayName = 'CoffeeBean';
export default CoffeeBean;
