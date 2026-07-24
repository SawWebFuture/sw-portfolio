"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function AgenticHeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.25, 6.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const cubeGeometry = new THREE.BoxGeometry(2.05, 2.05, 2.05, 10, 10, 10);
    const cubeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x22d3ee,
      emissive: 0x053d49,
      emissiveIntensity: 0.32,
      metalness: 0.42,
      roughness: 0.18,
      transmission: 0.16,
      transparent: true,
      opacity: 0.86,
      clearcoat: 0.8,
      clearcoatRoughness: 0.22,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.rotation.set(0.55, 0.75, 0.15);
    group.add(cube);

    const edgeGeometry = new THREE.EdgesGeometry(cubeGeometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.34 });
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    cube.add(edges);

    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xff8139, transparent: true, opacity: 0.96 });
    const nodeGeometry = new THREE.SphereGeometry(0.045, 16, 16);
    const nodes = new THREE.Group();
    const nodePositions = [
      [-1.55, 1.35, 0.4],
      [-0.62, -1.55, 0.9],
      [1.52, -0.72, -0.2],
      [1.05, 1.45, 0.65],
      [-1.25, 0.1, -1.05],
      [0.1, -0.25, 1.5],
      [1.72, 0.42, 1.0],
    ];

    nodePositions.forEach(([x, y, z]) => {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(x, y, z);
      nodes.add(node);
    });
    group.add(nodes);

    const ringMaterial = new THREE.LineBasicMaterial({ color: 0x8ee8f8, transparent: true, opacity: 0.32 });
    const ringGroup = new THREE.Group();
    [2.85, 3.45, 4.05].forEach((radius, index) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.54, 0, Math.PI * 2);
      const points = curve.getPoints(120).map((point) => new THREE.Vector3(point.x, point.y, 0));
      const ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), ringMaterial);
      ring.rotation.x = Math.PI / 2 + index * 0.18;
      ring.rotation.z = index * 0.56;
      ringGroup.add(ring);
    });
    group.add(ringGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 4, 5);
    const accentLight = new THREE.PointLight(0xff8139, 22, 8);
    accentLight.position.set(-2.8, -1.6, 2.4);
    scene.add(ambientLight, keyLight, accentLight);

    const resize = () => {
      const width = mount.clientWidth || 480;
      const height = mount.clientHeight || 520;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      group.position.y = Math.sin(elapsed * 0.65) * 0.18;
      cube.rotation.x = 0.55 + Math.sin(elapsed * 0.42) * 0.1;
      cube.rotation.y = 0.75 + elapsed * 0.22;
      cube.rotation.z = 0.15 + Math.sin(elapsed * 0.36) * 0.08;
      nodes.rotation.y = -elapsed * 0.18;
      ringGroup.rotation.y = elapsed * 0.13;
      ringGroup.rotation.z = Math.sin(elapsed * 0.28) * 0.16;
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
      cubeMaterial.dispose();
      edgeGeometry.dispose();
      edgeMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      ringGroup.children.forEach((ring) => {
        const line = ring as THREE.Line;
        line.geometry.dispose();
      });
      ringMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-95"
    />
  );
}
