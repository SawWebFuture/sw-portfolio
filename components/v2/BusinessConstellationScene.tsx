"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { AgentId } from "@/data/v2/agents";
import type { Business, BusinessId } from "@/data/v2/businesses";

type BusinessConstellationSceneProps = {
  businesses: Business[];
  selectedBusinessId: BusinessId;
  completed: Partial<Record<BusinessId, AgentId>>;
  onSelectBusiness: (businessId: BusinessId) => void;
};

const NODE_COLORS = {
  selected: 0xff8139,
  completed: 0x13b8cf,
  idle: 0x0b5a6b,
};

export function BusinessConstellationScene({
  businesses,
  selectedBusinessId,
  completed,
  onSelectBusiness,
}: BusinessConstellationSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef(selectedBusinessId);
  const completedRef = useRef(completed);

  useEffect(() => {
    selectedRef.current = selectedBusinessId;
    completedRef.current = completed;
  }, [selectedBusinessId, completed]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0.1, 6.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 1.4);
    light.position.set(2, 3, 5);
    scene.add(light);

    const nodeGeometry = new THREE.IcosahedronGeometry(0.28, 1);
    const ringGeometry = new THREE.TorusGeometry(0.48, 0.012, 8, 64);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x9edfe8, transparent: true, opacity: 0.38 });
    const nodes = new Map<BusinessId, THREE.Group>();
    const nodeMaterials: THREE.MeshPhysicalMaterial[] = [];
    const ringMaterials: THREE.MeshBasicMaterial[] = [];

    businesses.forEach((business) => {
      const group = new THREE.Group();
      group.position.set(business.position[0], business.position[1], business.position[2]);
      group.userData.businessId = business.id;

      const material = new THREE.MeshPhysicalMaterial({
        color: NODE_COLORS.idle,
        roughness: 0.24,
        metalness: 0.12,
        transmission: 0.36,
        thickness: 0.8,
        transparent: true,
        opacity: 0.82,
      });
      nodeMaterials.push(material);

      const node = new THREE.Mesh(nodeGeometry, material);
      group.add(node);

      const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xff8139, transparent: true, opacity: 0.22 });
      ringMaterials.push(ringMaterial);
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2.4;
      group.add(ring);

      root.add(group);
      nodes.set(business.id, group);
    });

    const linePoints = businesses.map((business) => new THREE.Vector3(...business.position));
    const path = new THREE.BufferGeometry().setFromPoints([...linePoints, linePoints[0]]);
    const line = new THREE.Line(path, lineMaterial);
    root.add(line);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 640 ? 6.9 : 6.2;
      camera.updateProjectionMatrix();
    };

    const handlePointerDown = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const intersections = raycaster.intersectObjects([...nodes.values()], true);
      const hit = intersections[0]?.object;
      const group = hit?.parent;
      const businessId = group?.userData.businessId as BusinessId | undefined;
      if (businessId) onSelectBusiness(businessId);
    };

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let frame = 0;
    const startedAt = performance.now();
    const animate = () => {
      const elapsed = (performance.now() - startedAt) / 1000;
      root.rotation.y = Math.sin(elapsed * 0.12) * 0.08;

      businesses.forEach((business, index) => {
        const group = nodes.get(business.id);
        if (!group) return;
        const node = group.children[0] as THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>;
        const ring = group.children[1] as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
        const isSelected = selectedRef.current === business.id;
        const isCompleted = Boolean(completedRef.current[business.id]);
        const targetColor = isSelected ? NODE_COLORS.selected : isCompleted ? NODE_COLORS.completed : NODE_COLORS.idle;
        node.material.color.lerp(new THREE.Color(targetColor), 0.08);
        node.rotation.x = elapsed * (0.18 + index * 0.03);
        node.rotation.y = elapsed * (0.26 + index * 0.02);
        const pulse = isSelected ? 1 + Math.sin(elapsed * 3) * 0.08 : isCompleted ? 1.05 : 1;
        group.scale.setScalar(pulse);
        ring.material.opacity = isSelected ? 0.58 : isCompleted ? 0.42 : 0.2;
        ring.rotation.z = elapsed * (isSelected ? 0.8 : 0.25);
      });

      renderer.render(scene, camera);
      if (!prefersReducedMotion) frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.remove();
      nodeGeometry.dispose();
      ringGeometry.dispose();
      path.dispose();
      lineMaterial.dispose();
      nodeMaterials.forEach((material) => material.dispose());
      ringMaterials.forEach((material) => material.dispose());
      renderer.dispose();
    };
  }, [businesses, onSelectBusiness]);

  return <div ref={mountRef} className="absolute inset-0" />;
}
