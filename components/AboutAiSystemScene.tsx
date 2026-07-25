"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type AboutAnimationMode = "Autonomy" | "Business Fit" | "Quality";

type AboutAiSystemSceneProps = {
  className?: string;
  mode?: AboutAnimationMode;
};

const MODE_SETTINGS = {
  Autonomy: { speed: 0.42, z: 5.2, compactZ: 5.55, scale: 1.34, compactScale: 1.18 },
  "Business Fit": { speed: 0.72, z: 5.0, compactZ: 5.35, scale: 1.22, compactScale: 1.06 },
  Quality: { speed: 0.34, z: 4.7, compactZ: 5.0, scale: 1.25, compactScale: 1.04 },
} satisfies Record<AboutAnimationMode, { speed: number; z: number; compactZ: number; scale: number; compactScale: number }>;

function makeCircleGeometry(radius: number, segments = 128) {
  return new THREE.BufferGeometry().setFromPoints(
    new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2)
      .getPoints(segments)
      .map((point) => new THREE.Vector3(point.x, point.y, 0)),
  );
}

export function AboutAiSystemScene({ className = "", mode = "Autonomy" }: AboutAiSystemSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const settings = MODE_SETTINGS[mode];
    const scene = new THREE.Scene();
    const cameraGrid = 3;
    const subCameras: THREE.PerspectiveCamera[] = [];

    for (let y = 0; y < cameraGrid; y += 1) {
      for (let x = 0; x < cameraGrid; x += 1) {
        const subCamera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        subCamera.viewport = new THREE.Vector4();
        subCamera.position.set(
          ((x / (cameraGrid - 1)) - 0.5) * 1.1,
          (0.5 - (y / (cameraGrid - 1))) * 0.82,
          settings.z,
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

    const disposables: Array<{ dispose: () => void }> = [];
    const flowerLines: THREE.LineLoop[] = [];
    const waterLines: THREE.Line[] = [];
    const waterPlaneSegments: THREE.Mesh[] = [];
    const treeParts: THREE.Object3D[] = [];

    if (mode === "Autonomy") {
      const cyan = new THREE.LineBasicMaterial({ color: 0x8ee8f8, transparent: true, opacity: 0.88 });
      const orange = new THREE.LineBasicMaterial({ color: 0xffb36b, transparent: true, opacity: 0.7 });
      const white = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.42 });
      disposables.push(cyan, orange, white);

      const radius = 0.46;
      const ringCenters: Array<[number, number, THREE.Material]> = [
        [0, 0, cyan],
        ...Array.from({ length: 6 }, (_, index): [number, number, THREE.Material] => {
          const angle = (index / 6) * Math.PI * 2;
          return [Math.cos(angle) * radius, Math.sin(angle) * radius, index % 2 === 0 ? orange : cyan];
        }),
        ...Array.from({ length: 12 }, (_, index): [number, number, THREE.Material] => {
          const angle = (index / 12) * Math.PI * 2;
          return [Math.cos(angle) * radius * 1.72, Math.sin(angle) * radius * 1.72, white];
        }),
      ];

      ringCenters.forEach(([x, y, material], index) => {
        const geometry = makeCircleGeometry(radius, 144);
        const circle = new THREE.LineLoop(geometry, material);
        circle.position.set(x, y, 0);
        circle.userData.spin = index % 2 === 0 ? 1 : -1;
        circle.userData.baseScale = index > 6 ? 0.82 : 1;
        flowerLines.push(circle);
        disposables.push(geometry);
        root.add(circle);
      });

      const coreGeometry = new THREE.IcosahedronGeometry(0.2, 2);
      const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      disposables.push(coreGeometry, coreMaterial);
      root.add(core);
    }

    if (mode === "Business Fit") {
      const waterMaterial = new THREE.LineBasicMaterial({ color: 0x8ee8f8, transparent: true, opacity: 0.9 });
      const deepWater = new THREE.MeshBasicMaterial({ color: 0x0b5a6b, transparent: true, opacity: 0.22, side: THREE.DoubleSide });
      const highlightWater = new THREE.MeshBasicMaterial({ color: 0x13b8cf, transparent: true, opacity: 0.16, side: THREE.DoubleSide });
      disposables.push(waterMaterial, deepWater, highlightWater);

      Array.from({ length: 8 }).forEach((_, index) => {
        const geometry = new THREE.PlaneGeometry(3.45, 0.22);
        const segment = new THREE.Mesh(geometry, index % 2 === 0 ? deepWater : highlightWater);
        segment.position.set(0, -1.05 + index * 0.3, -0.18);
        segment.rotation.z = index % 2 === 0 ? 0.03 : -0.035;
        segment.userData.phase = index * 0.48;
        waterPlaneSegments.push(segment);
        disposables.push(geometry);
        root.add(segment);
      });

      Array.from({ length: 13 }).forEach((_, row) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(
          Array.from({ length: 130 }, (_, index) => {
            const x = -1.8 + index * 0.028;
            const y = -1.18 + row * 0.2 + Math.sin(index * 0.18 + row) * 0.06;
            return new THREE.Vector3(x, y, 0.08);
          }),
        );
        const stream = new THREE.Line(geometry, waterMaterial);
        stream.userData.baseY = -1.18 + row * 0.2;
        stream.userData.phase = row * 0.62;
        waterLines.push(stream);
        disposables.push(geometry);
        root.add(stream);
      });
    }

    if (mode === "Quality") {
      const textureLoader = new THREE.TextureLoader();
      const treeTexture = textureLoader.load("/images/poly-pizza/nature-megakit/tree.webp");
      treeTexture.colorSpace = THREE.SRGBColorSpace;
      const textureMaterial = new THREE.MeshBasicMaterial({ map: treeTexture, transparent: true, opacity: 0.98, side: THREE.DoubleSide });
      const trunkMaterial = new THREE.MeshPhysicalMaterial({ color: 0x8b5a2b, roughness: 0.62, clearcoat: 0.24 });
      const leafMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x78d96f,
        emissive: 0x0b5a6b,
        emissiveIntensity: 0.16,
        roughness: 0.34,
        clearcoat: 0.5,
      });
      disposables.push(treeTexture, textureMaterial, trunkMaterial, leafMaterial);

      const texturePlaneGeometry = new THREE.PlaneGeometry(2.25, 2.55);
      const texturePlane = new THREE.Mesh(texturePlaneGeometry, textureMaterial);
      texturePlane.position.set(0.08, 0.08, 0.16);
      texturePlane.scale.setScalar(0.92);
      treeParts.push(texturePlane);
      disposables.push(texturePlaneGeometry);
      root.add(texturePlane);

      const trunkGeometry = new THREE.CylinderGeometry(0.12, 0.2, 1.36, 12);
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.set(0, -0.56, 0.04);
      treeParts.push(trunk);
      disposables.push(trunkGeometry);
      root.add(trunk);

      const canopyPositions = [
        [0, 0.46, 0.08, 0.62],
        [-0.45, 0.2, 0.04, 0.46],
        [0.48, 0.2, 0.04, 0.46],
        [-0.22, 0.0, 0.12, 0.42],
        [0.24, -0.02, 0.12, 0.42],
      ] as const;
      canopyPositions.forEach(([x, y, z, size]) => {
        const geometry = new THREE.IcosahedronGeometry(size, 2);
        const leaf = new THREE.Mesh(geometry, leafMaterial);
        leaf.position.set(x, y, z);
        treeParts.push(leaf);
        disposables.push(geometry);
        root.add(leaf);
      });
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.65);
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.25);
    keyLight.position.set(2.5, 3, 5);
    const accentLight = new THREE.PointLight(0xff8139, 16, 7);
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
        subCamera.position.z = compact ? settings.compactZ : settings.z;
        subCamera.lookAt(0, 0, 0);
        subCamera.updateProjectionMatrix();
        subCamera.updateMatrixWorld();
      });

      root.scale.setScalar(compact ? settings.compactScale : settings.scale);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      root.position.y = Math.sin(elapsed * 0.52) * 0.04;

      flowerLines.forEach((line, index) => {
        const pulse = 1 + Math.sin(elapsed * 1.2 + index * 0.35) * 0.055;
        line.rotation.z = elapsed * settings.speed * line.userData.spin;
        line.scale.setScalar(line.userData.baseScale * pulse);
      });

      waterLines.forEach((stream) => {
        stream.position.x = Math.sin(elapsed * settings.speed + stream.userData.phase) * 0.28;
        stream.position.y = Math.sin(elapsed * 2.2 + stream.userData.phase) * 0.035;
      });
      waterPlaneSegments.forEach((segment) => {
        segment.position.x = Math.sin(elapsed * 0.9 + segment.userData.phase) * 0.12;
        segment.scale.x = 1 + Math.sin(elapsed * 1.1 + segment.userData.phase) * 0.06;
      });

      treeParts.forEach((part, index) => {
        part.rotation.y = Math.sin(elapsed * settings.speed + index * 0.45) * 0.1;
        part.rotation.z = Math.sin(elapsed * 0.38 + index) * 0.025;
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
      disposables.forEach((item) => item.dispose());
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
