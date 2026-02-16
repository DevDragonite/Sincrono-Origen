"use client";

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThree } from '@react-three/fiber';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollyControl({ beanRef }: { beanRef: any }) {
    const { camera } = useThree();

    useLayoutEffect(() => {
        if (!beanRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1, // Smooth scrubbing
            }
        });

        // Phase 1: Farm (Raw) -> Roast
        tl.to(beanRef.current.rotation, {
            y: Math.PI * 2,
            x: 0.5,
            duration: 2
        }, 0);

        tl.to(camera.position, {
            z: 4,
            duration: 2
        }, 0);

        // Phase 2: Roast -> Digital
        tl.to(beanRef.current.scale, {
            x: 1.5,
            y: 1.5,
            z: 1.5,
            duration: 2
        }, 2);

        // Color/Material shifts would likely need state or ref access to material

        return () => {
            // Cleanup
            tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [beanRef, camera]);

    return null;
}
