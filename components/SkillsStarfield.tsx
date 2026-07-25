"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SkillsStarfieldProps = {
  className?: string;
};

export function SkillsStarfield({ className = "" }: SkillsStarfieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0xffffff, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const starCount = 130;
    const starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const twinkles = new Float32Array(starCount);

    for (let index = 0; index < starCount; index += 1) {
      positions[index * 3] = Math.random() * 4 - 2;
      positions[index * 3 + 1] = Math.random() * 2.6 - 1.3;
      positions[index * 3 + 2] = Math.random() * 0.4;
      twinkles[index] = Math.random() * Math.PI * 2;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0x0b5a6b,
      size: 0.014,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const streakMaterial = new THREE.LineBasicMaterial({ color: 0xff8139, transparent: true, opacity: 0.56 });
    const streaks = Array.from({ length: 7 }, (_, index) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.38, 0.12, 0),
      ]);
      const line = new THREE.Line(geometry, streakMaterial);
      line.userData.speed = 0.22 + index * 0.045;
      line.userData.phase = index / 7;
      scene.add(line);
      return line;
    });

    const resize = () => {
      const width = mount.clientWidth || 360;
      const height = mount.clientHeight || 320;
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
      const positionAttribute = starGeometry.getAttribute("position") as THREE.BufferAttribute;

      for (let index = 0; index < starCount; index += 1) {
        const x = positionAttribute.getX(index) - 0.0008;
        positionAttribute.setX(index, x < camera.left - 0.1 ? camera.right + 0.1 : x);
      }
      positionAttribute.needsUpdate = true;
      starMaterial.opacity = 0.26 + Math.sin(elapsed * 0.8 + twinkles[0]) * 0.08;

      streaks.forEach((streak) => {
        const progress = (elapsed * streak.userData.speed + streak.userData.phase) % 1;
        const x = THREE.MathUtils.lerp(camera.right + 0.5, camera.left - 0.7, progress);
        const y = THREE.MathUtils.lerp(0.95, -0.75, progress) + Math.sin(progress * Math.PI * 2) * 0.12;
        streak.position.set(x, y, 0.1);
        streak.rotation.z = -0.32;
        streak.scale.setScalar(0.72 + Math.sin(progress * Math.PI) * 0.55);
      });

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
      starGeometry.dispose();
      starMaterial.dispose();
      streaks.forEach((streak) => streak.geometry.dispose());
      streakMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`} />;
}
