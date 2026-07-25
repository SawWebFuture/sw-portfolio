"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type AboutAnimationMode = "Autonomy" | "Business Fit" | "Quality";

type AboutAiSystemSceneProps = {
  className?: string;
  mode?: AboutAnimationMode;
};

const CONNECTIONS = [
  [-1.9, 0.55, 0, -0.25, 0.08, 0],
  [-1.72, -0.55, 0, -0.25, 0.08, 0],
  [-1.18, 0, 0, -0.25, 0.08, 0],
  [-0.25, 0.08, 0, 1.32, 0.18, 0],
  [-0.25, 0.08, 0, 1.55, -0.58, 0],
] as const;

const NATURE_STILLS = [
  { path: "/images/poly-pizza/nature-megakit/tree.webp", position: [-1.08, -0.74, 0.08], scale: [0.74, 0.5, 1] },
  { path: "/images/poly-pizza/nature-megakit/bush-flowers.webp", position: [-1.08, 0.78, 0.08], scale: [0.74, 0.5, 1] },
  { path: "/images/poly-pizza/nature-megakit/fern.webp", position: [1.12, -0.74, 0.08], scale: [0.74, 0.5, 1] },
  { path: "/images/poly-pizza/nature-megakit/clover.webp", position: [1.12, 0.78, 0.08], scale: [0.74, 0.5, 1] },
] as const;

export function AboutAiSystemScene({ className = "", mode = "Autonomy" }: AboutAiSystemSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const modeSettings = {
      Autonomy: { pulseSpeed: 0.48, coreSpeed: 0.58, businessPulse: 0.03, qualityPulse: 0.06 },
      "Business Fit": { pulseSpeed: 0.3, coreSpeed: 0.28, businessPulse: 0.16, qualityPulse: 0.08 },
      Quality: { pulseSpeed: 0.38, coreSpeed: 0.34, businessPulse: 0.05, qualityPulse: 0.22 },
    }[mode];
    const scene = new THREE.Scene();
    const cameraGrid = 3;
    const subCameras: THREE.PerspectiveCamera[] = [];

    for (let y = 0; y < cameraGrid; y += 1) {
      for (let x = 0; x < cameraGrid; x += 1) {
        const subCamera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        subCamera.viewport = new THREE.Vector4();
        subCamera.position.set(
          ((x / (cameraGrid - 1)) - 0.5) * 1.35,
          (0.5 - (y / (cameraGrid - 1))) * 0.95,
          6.2,
        );
        subCamera.lookAt(0, 0, 0);
        subCameras.push(subCamera);
      }
    }

    const camera = new THREE.ArrayCamera(subCameras);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.width = "100%";
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const aiCore = new THREE.Group();
    root.add(aiCore);

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x13b8cf,
      emissive: 0x074b58,
      emissiveIntensity: 0.42,
      metalness: 0.25,
      roughness: 0.24,
      transparent: true,
      opacity: 0.9,
      clearcoat: 0.7,
    });
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xff8139, transparent: true, opacity: 0.95 });
    const qualityMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffb36b,
      emissive: 0xff8139,
      emissiveIntensity: 0.24,
      metalness: 0.18,
      roughness: 0.2,
      clearcoat: 0.85,
    });
    const businessMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x0b5a6b,
      emissiveIntensity: 0.18,
      metalness: 0.12,
      roughness: 0.32,
      transparent: true,
      opacity: 0.86,
      clearcoat: 0.5,
    });

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.56, 2), coreMaterial);
    core.position.set(-1.46, 0, 0);
    aiCore.add(core);

    const smallNodeGeometry = new THREE.SphereGeometry(0.1, 20, 20);
    const nodePositions = [
      [-1.9, 0.55, 0],
      [-1.72, -0.55, 0],
      [-1.18, 0.72, 0],
      [-0.95, -0.38, 0],
    ];
    nodePositions.forEach(([x, y, z]) => {
      const node = new THREE.Mesh(smallNodeGeometry, nodeMaterial);
      node.position.set(x, y, z);
      aiCore.add(node);
    });

    const business = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.95, 0.34), businessMaterial);
    base.position.set(-0.02, -0.23, 0);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.68, 0.46, 4), businessMaterial);
    roof.position.set(-0.02, 0.49, 0);
    roof.rotation.y = Math.PI / 4;
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.44, 0.36), nodeMaterial);
    door.position.set(-0.02, -0.48, 0.02);
    business.add(base, roof, door);
    root.add(business);

    const quality = new THREE.Group();
    const diamond = new THREE.Mesh(new THREE.OctahedronGeometry(0.45, 1), qualityMaterial);
    diamond.position.set(1.52, 0.18, 0);
    quality.add(diamond);
    const sparkleGeometry = new THREE.TetrahedronGeometry(0.13, 0);
    [[1.1, 0.7, 0], [1.96, 0.55, 0], [1.78, -0.55, 0]].forEach(([x, y, z]) => {
      const sparkle = new THREE.Mesh(sparkleGeometry, qualityMaterial);
      sparkle.position.set(x, y, z);
      quality.add(sparkle);
    });
    root.add(quality);

    const textureLoader = new THREE.TextureLoader();
    const stillGeometry = new THREE.PlaneGeometry(1, 0.68);
    const stillCards = NATURE_STILLS.map((still, index) => {
      const texture = textureLoader.load(still.path);
      texture.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.88,
        side: THREE.DoubleSide,
      });
      const card = new THREE.Mesh(stillGeometry, material);
      card.position.set(still.position[0], still.position[1], still.position[2]);
      card.userData.baseY = still.position[1];
      card.scale.set(still.scale[0], still.scale[1], still.scale[2]);
      card.rotation.z = index % 2 === 0 ? -0.08 : 0.08;
      root.add(card);
      return { card, material, texture };
    });

    const mathGroup = new THREE.Group();
    const mathMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.28 });
    const circlePoints = new THREE.EllipseCurve(0, 0, 0.62, 0.62, 0, Math.PI * 2)
      .getPoints(72)
      .map((point) => new THREE.Vector3(point.x, point.y, 0));
    const circle = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(circlePoints), mathMaterial);
    circle.position.set(0.78, 0.82, -0.18);
    const triangle = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-0.56, -0.32, 0),
        new THREE.Vector3(0.56, -0.32, 0),
        new THREE.Vector3(0, 0.58, 0),
      ]),
      mathMaterial,
    );
    triangle.position.set(-0.78, 0.9, -0.16);
    mathGroup.add(circle, triangle);
    root.add(mathGroup);

    const formulaMaterial = new THREE.LineBasicMaterial({ color: 0xffb36b, transparent: true, opacity: 0.42 });
    const wavePoints = Array.from({ length: 80 }, (_, index) => {
      const x = -1.05 + index * 0.027;
      return new THREE.Vector3(x, Math.sin(index * 0.28) * 0.08 - 0.96, -0.1);
    });
    const waveLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(wavePoints), formulaMaterial);
    root.add(waveLine);

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x8ee8f8, transparent: true, opacity: 0.44 });
    const lines = CONNECTIONS.map(([x1, y1, z1, x2, y2, z2]) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x1, y1, z1),
        new THREE.Vector3(x2, y2, z2),
      ]);
      const line = new THREE.Line(geometry, lineMaterial);
      root.add(line);
      return line;
    });

    const pulseMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
    const pulseGeometry = new THREE.SphereGeometry(0.045, 14, 14);
    const pulses = CONNECTIONS.map(() => {
      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
      root.add(pulse);
      return pulse;
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.1);
    keyLight.position.set(2.5, 3, 5);
    const accentLight = new THREE.PointLight(0xff8139, 18, 7);
    accentLight.position.set(1.8, -1.2, 2.3);
    scene.add(ambientLight, keyLight, accentLight);

    const resize = () => {
      const width = mount.clientWidth || 360;
      const height = mount.clientHeight || 360;
      const compact = width < 520;

      renderer.setSize(width, height, false);
      const pixelRatio = renderer.getPixelRatio();
      const drawingWidth = Math.floor(width * pixelRatio);
      const drawingHeight = Math.floor(height * pixelRatio);
      const tileWidth = Math.ceil(drawingWidth / cameraGrid);
      const tileHeight = Math.ceil(drawingHeight / cameraGrid);

      subCameras.forEach((subCamera, index) => {
        const x = index % cameraGrid;
        const y = Math.floor(index / cameraGrid);
        subCamera.viewport?.set(
          Math.floor(x * tileWidth),
          Math.floor((cameraGrid - y - 1) * tileHeight),
          tileWidth,
          tileHeight,
        );
        subCamera.aspect = tileWidth / tileHeight;
        subCamera.position.z = compact ? 5.45 : 5.85;
        subCamera.lookAt(0, 0, 0);
        subCamera.updateProjectionMatrix();
        subCamera.updateMatrixWorld();
      });

      root.scale.setScalar(compact ? 1.16 : 1.22);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      root.position.y = Math.sin(elapsed * 0.65) * 0.05;
      core.rotation.x = elapsed * modeSettings.coreSpeed * 0.7;
      core.rotation.y = elapsed * modeSettings.coreSpeed;
      aiCore.rotation.z = Math.sin(elapsed * 0.7) * (mode === "Autonomy" ? 0.1 : 0.04);
      const businessScale = 1 + Math.sin(elapsed * 1.4) * modeSettings.businessPulse;
      business.scale.setScalar(businessScale);
      quality.rotation.y = elapsed * (mode === "Quality" ? 0.7 : 0.38);
      quality.rotation.z = Math.sin(elapsed * 0.58) * (0.1 + modeSettings.qualityPulse);
      const qualityScale = 1 + Math.sin(elapsed * 1.8) * modeSettings.qualityPulse;
      quality.scale.setScalar(qualityScale);
      stillCards.forEach(({ card }, index) => {
        card.position.y = card.userData.baseY + Math.sin(elapsed * 0.85 + index) * 0.045;
        card.rotation.y = Math.sin(elapsed * 0.42 + index) * 0.08;
      });
      mathGroup.rotation.z = elapsed * (mode === "Quality" ? 0.18 : 0.08);
      waveLine.rotation.z = Math.sin(elapsed * 0.55) * 0.04;

      CONNECTIONS.forEach(([x1, y1, z1, x2, y2, z2], index) => {
        const progress = (elapsed * modeSettings.pulseSpeed + index * 0.17) % 1;
        pulses[index].position.set(
          THREE.MathUtils.lerp(x1, x2, progress),
          THREE.MathUtils.lerp(y1, y2, progress),
          THREE.MathUtils.lerp(z1, z2, progress),
        );
        pulses[index].scale.setScalar(0.8 + Math.sin((progress + elapsed) * Math.PI) * 0.22);
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
      core.geometry.dispose();
      coreMaterial.dispose();
      smallNodeGeometry.dispose();
      nodeMaterial.dispose();
      base.geometry.dispose();
      roof.geometry.dispose();
      door.geometry.dispose();
      businessMaterial.dispose();
      diamond.geometry.dispose();
      sparkleGeometry.dispose();
      qualityMaterial.dispose();
      stillGeometry.dispose();
      stillCards.forEach(({ material, texture }) => {
        texture.dispose();
        material.dispose();
      });
      circle.geometry.dispose();
      triangle.geometry.dispose();
      mathMaterial.dispose();
      waveLine.geometry.dispose();
      formulaMaterial.dispose();
      lines.forEach((line) => line.geometry.dispose());
      lineMaterial.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();
      renderer.dispose();
    };
  }, [mode]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
