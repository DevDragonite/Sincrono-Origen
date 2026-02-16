import * as THREE from 'three';

export function initParticles(scene) {
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const opacities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        resetParticle(positions, i);
        // Randomize initial positions Y to fill space
        positions[i * 3 + 1] = Math.random() * 5 - 2;
        speeds[i] = 0.01 + Math.random() * 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom material (using points for now, could use Sprite)
    // For 'webgl fluid' feel without shaders, we use many small transparent dots
    const material = new THREE.PointsMaterial({
        color: 0xcccccc,
        size: 0.05,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    return {
        update: (time) => {
            const positions = points.geometry.attributes.position.array;

            for (let i = 0; i < particleCount; i++) {
                // Move Up
                positions[i * 3 + 1] += speeds[i];

                // Spiral / Noise movement
                positions[i * 3] += Math.sin(time + i) * 0.002;

                // Reset if too high
                if (positions[i * 3 + 1] > 4) {
                    resetParticle(positions, i);
                }
            }
            points.geometry.attributes.position.needsUpdate = true;
        }
    };
}

function resetParticle(positions, i) {
    positions[i * 3] = (Math.random() - 0.5) * 3;     // X
    positions[i * 3 + 1] = -2;                        // Y (Bottom)
    positions[i * 3 + 2] = (Math.random() - 0.5) * 3; // Z
}
