"use client";

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Sparkles } from '@react-three/drei';
import CoffeeBean from './CoffeeBean';
import ScrollyControl from './ScrollyControl';
import { Mesh } from 'three';

export default function Scene() {
    const beanRef = useRef<Mesh>(null);

    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                {/* Atmosphere */}
                <color attach="background" args={['#050505']} />
                <fog attach="fog" args={['#050505', 5, 15]} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} color="#B87333" />
                <pointLight position={[-10, -10, -10]} intensity={5} color="#2E8B57" />

                {/* Content */}
                <CoffeeBean ref={beanRef} />
                <ScrollyControl beanRef={beanRef} />

                {/* Particles / Steam */}
                <Sparkles
                    count={50}
                    scale={6}
                    size={2}
                    speed={0.4}
                    opacity={0.5}
                    color="#B87333"
                />

                {/* Controls (Optional, disabled zoom for scroll feel) */}
                <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
            </Canvas>
        </div>
    );
}
