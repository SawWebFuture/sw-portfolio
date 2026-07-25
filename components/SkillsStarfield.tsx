"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SkillsGeometryFieldProps = {
  className?: string;
};

const SHAPE_COLORS = [0xff8139, 0x13b8cf, 0x0b5a6b, 0xffb36b] as const;

export function SkillsGeometryField({ className = "" }: SkillsGeometryFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0xffffff, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const materials = SHAPE_COLORS.map(
      (color) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.2, wireframe: true }),
    );
    const fillMaterials = SHAPE_COLORS.map(
      (color) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.08, side: THREE.DoubleSide }),
    );

    const geometries = [
      new THREE.TetrahedronGeometry(0.18, 0),
      new THREE.OctahedronGeometry(0.2, 0),
      new THREE.IcosahedronGeometry(0.18, 1),
      new THREE.BoxGeometry(0.24, 0.24, 0.24),
      new THREE.TorusGeometry(0.16, 0.028, 8, 28),
    ];

    const shapes = Array.from({ length: 18 }, (_, index) => {
      const geometry = geometries[index % geometries.length];
      const material = materials[index % materials.length];
      const fillMaterial = fillMaterials[index % fillMaterials.length];
      const shape = new THREE.Group();
      const fill = new THREE.Mesh(geometry, fillMaterial);
      const wire = new THREE.Mesh(geometry, material);
      shape.add(fill, wire);
      shape.userData.phase = index * 0.37;
      shape.userData.speed = 0.08 + (index % 5) * 0.018;
      shape.userData.depth = 0.85 + (index % 4) * 0.12;
      group.add(shape);
      return shape;
    });

    const connectorMaterial = new THREE.LineBasicMaterial({ color: 0x0b5a6b, transparent: true, opacity: 0.12 });
    const connectorGeometry = new THREE.BufferGeometry();
    const connectorPositions = new Float32Array((shapes.length - 1) * 2 * 3);
    connectorGeometry.setAttribute("position", new THREE.BufferAttribute(connectorPositions, 3));
    const connectors = new THREE.LineSegments(connectorGeometry, connectorMaterial);
    group.add(connectors);

    const resize = () => {
      const width = mount.clientWidth || 360;
      const height = mount.clientHeight || 280;
      const aspect = width / height;

      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const left = camera.left - 0.35;
      const right = camera.right + 0.35;
      const width = right - left;

      shapes.forEach((shape, index) => {
        const phase = shape.userData.phase;
        const progress = (elapsed * shape.userData.speed + phase) % 1;
        const lane = (index % 6) / 5;
        const x = right - progress * width;
        const y = THREE.MathUtils.lerp(0.76, -0.76, lane) + Math.sin(elapsed * 0.8 + phase) * 0.08;

        shape.position.set(x, y, Math.sin(elapsed * 0.5 + phase) * 0.12);
        shape.rotation.x = elapsed * 0.32 + phase;
        shape.rotation.y = elapsed * 0.42 + phase * 0.5;
        shape.rotation.z = -0.26 + Math.sin(elapsed * 0.45 + phase) * 0.18;
        shape.scale.setScalar(shape.userData.depth * (0.88 + Math.sin(elapsed + phase) * 0.08));
      });

      for (let index = 0; index < shapes.length - 1; index += 1) {
        const from = shapes[index].position;
        const to = shapes[index + 1].position;
        connectorPositions[index * 6] = from.x;
        connectorPositions[index * 6 + 1] = from.y;
        connectorPositions[index * 6 + 2] = from.z;
        connectorPositions[index * 6 + 3] = to.x;
        connectorPositions[index * 6 + 4] = to.y;
        connectorPositions[index * 6 + 5] = to.z;
      }
      connectorGeometry.attributes.position.needsUpdate = true;
      connectorMaterial.opacity = 0.08 + Math.sin(elapsed * 0.75) * 0.035;

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
      materials.forEach((material) => material.dispose());
      fillMaterials.forEach((material) => material.dispose());
      geometries.forEach((geometry) => geometry.dispose());
      connectorGeometry.dispose();
      connectorMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`} />;
}
