"use client";

import { useState, forwardRef } from 'react';
import { Mesh } from 'three';
import { Float } from '@react-three/drei';

const CoffeeBean = forwardRef<Mesh>((props, ref) => {
    const [hovered, setHover] = useState(false);

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group>
                {/* Core Bean (Technological Heart) */}
                <mesh
                    // @ts-ignore
                    ref={ref}
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
            </group>
        </Float>
    );
});

CoffeeBean.displayName = 'CoffeeBean';
export default CoffeeBean;
