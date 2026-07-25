"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ServicesAssemblySceneProps = {
  className?: string;
};

const BOX_TARGETS = [
  [-0.5, -0.5, -0.5],
  [0, -0.5, -0.5],
  [0.5, -0.5, -0.5],
  [-0.5, 0, -0.5],
  [0, 0, -0.5],
  [0.5, 0, -0.5],
  [-0.5, 0.5, -0.5],
  [0, 0.5, -0.5],
  [0.5, 0.5, -0.5],
  [-0.5, -0.5, 0],
  [0, -0.5, 0],
  [0.5, -0.5, 0],
  [-0.5, 0, 0],
  [0, 0, 0],
  [0.5, 0, 0],
  [-0.5, 0.5, 0],
  [0, 0.5, 0],
  [0.5, 0.5, 0],
  [-0.5, -0.5, 0.5],
  [0, -0.5, 0.5],
  [0.5, -0.5, 0.5],
  [-0.5, 0, 0.5],
  [0, 0, 0.5],
  [0.5, 0, 0.5],
  [-0.5, 0.5, 0.5],
  [0, 0.5, 0.5],
  [0.5, 0.5, 0.5],
] as const;

export function ServicesAssemblyScene({ className = "" }: ServicesAssemblySceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.18, 5.6);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0xffffff, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.width = "100%";
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const cubeGeometry = new THREE.BoxGeometry(0.42, 0.42, 0.42);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x13b8cf,
      emissive: 0x0b5a6b,
      emissiveIntensity: 0.08,
      metalness: 0.08,
      roughness: 0.1,
      transparent: true,
      opacity: 0.22,
      transmission: 0.35,
      thickness: 0.45,
      clearcoat: 0.9,
    });
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x0b5a6b, transparent: true, opacity: 0.38 });
    const edgeGeometry = new THREE.EdgesGeometry(cubeGeometry);

    const cubes = BOX_TARGETS.map(([x, y, z], index) => {
      const group = new THREE.Group();
      const mesh = new THREE.Mesh(cubeGeometry, glassMaterial);
      const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
      group.add(mesh, edges);
      group.userData.target = new THREE.Vector3(x, y, z);
      group.userData.origin = new THREE.Vector3(
        (Math.random() - 0.5) * 4.3,
        (Math.random() - 0.5) * 2.7,
        (Math.random() - 0.5) * 2.4,
      );
      group.userData.phase = index * 0.19;
      root.add(group);
      return group;
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(2.5, 3, 4.5);
    const accentLight = new THREE.PointLight(0xff8139, 14, 7);
    accentLight.position.set(-2, -1.3, 3);
    scene.add(ambientLight, keyLight, accentLight);

    const resize = () => {
      const width = mount.clientWidth || 360;
      const height = mount.clientHeight || 360;
      const compact = width < 520;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = compact ? 6.25 : 5.65;
      root.scale.setScalar(compact ? 1.08 : 1.24);
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const cycle = (Math.sin(elapsed * 0.62) + 1) / 2;
      const assemble = THREE.MathUtils.smoothstep(cycle, 0.2, 0.86);

      root.rotation.x = Math.sin(elapsed * 0.24) * 0.16;
      root.rotation.y = elapsed * 0.18;

      cubes.forEach((cube) => {
        const target = cube.userData.target as THREE.Vector3;
        const origin = cube.userData.origin as THREE.Vector3;
        const phase = cube.userData.phase as number;
        const float = Math.sin(elapsed * 1.15 + phase) * (1 - assemble) * 0.1;
        cube.position.lerpVectors(origin, target, assemble);
        cube.position.y += float;
        cube.rotation.x = elapsed * (0.16 + (1 - assemble) * 0.42) + phase;
        cube.rotation.y = elapsed * (0.2 + (1 - assemble) * 0.52) + phase;
        cube.scale.setScalar(0.82 + assemble * 0.16);
      });

      glassMaterial.opacity = 0.14 + assemble * 0.18;
      edgeMaterial.opacity = 0.24 + assemble * 0.24;
      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      mount.removeChild(renderer.domElement);
      cubeGeometry.dispose();
      edgeGeometry.dispose();
      glassMaterial.dispose();
      edgeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`} />;
}
