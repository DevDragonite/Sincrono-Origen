import * as THREE from 'three';

export function initCoffeeBean(scene) {
    const group = new THREE.Group();
    scene.add(group);

    // 1. Geometry - Procedural Bean
    // Start with a sphere
    const geometry = new THREE.SphereGeometry(1.5, 64, 64);

    // Morph vertices to look like a bean (flatten and add crease)
    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);

        // Flatten slightly
        vertex.y *= 0.8;
        vertex.z *= 0.9;

        // The Crease (indentation along X axis mostly)
        // If z is close to 0 and x is within range...
        // Simple crease logic: push vertices inward if they are near the center line
        const distanceToCenter = Math.abs(vertex.z);
        const creaseFactor = Math.max(0, 1 - distanceToCenter * 3); // Stronger near Z=0
        if (vertex.x > 0) { // One side roughly
            // vertex.x -= creaseFactor * 0.5;
        }

        // This is tricky to do procedurally without visual feedback.
        // Let's stick to a stylized "Tech" bean: An Icosahedron that represents the 'core'
    }

    // Alternative: Use a high-poly Icosahedron for that Avant-Garde look
    const techGeometry = new THREE.IcosahedronGeometry(1.5, 1); // Detail 1

    // Materials
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0xB87333,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });

    const solidMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.4,
        metalness: 0.8,
        flatShading: true
    });

    // Mesh
    const beanMesh = new THREE.Mesh(techGeometry, wireframeMaterial);
    group.add(beanMesh);

    // Inner Core (Glowing)
    const coreGeo = new THREE.IcosahedronGeometry(0.8, 0);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xB87333 });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // State
    let targetRotationSpeed = 0.2;
    let rotationSpeed = 0.2;

    return {
        mesh: group,
        update: (time) => {
            // Idle Rotation
            group.rotation.y += rotationSpeed * 0.01;
            group.rotation.x = Math.sin(time) * 0.1;

            // Pulse Core
            const scale = 1 + Math.sin(time * 2) * 0.1;
            coreMesh.scale.set(scale, scale, scale);

            // Lerp rotation speed
            rotationSpeed += (targetRotationSpeed - rotationSpeed) * 0.05;
        },
        onScrollStep: (step) => {
            console.log("Scrolly step:", step);
            // Transform based on step
            if (step == 1) { // "The Bean"
                beanMesh.material = wireframeMaterial;
                targetRotationSpeed = 0.5;
            } else if (step == 2) { // "The Roast"
                beanMesh.material = solidMaterial; // Solidify
                coreMat.color.setHex(0xFF4400); // Heat up
                targetRotationSpeed = 2.0;
            } else if (step == 3) { // "Digital Brew"
                beanMesh.material = wireframeMaterial;
                beanMesh.material.color.setHex(0x00FFFF); // Digital Blue/Cyan? Or stay Copper?
                // techGeometry.scale(1.2, 1.2, 1.2); // Be careful mutating geometry
                coreMat.color.setHex(0xFFFFFF);
                targetRotationSpeed = 5.0;
            }
        }
    };
}
