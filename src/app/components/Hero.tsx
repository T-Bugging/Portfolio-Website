import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import * as THREE from 'three';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  useEffect(() => {
    setIsLoaded(true); // Trigger text visibility immediately

    if (!canvasContainerRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 1100;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainerRef.current.appendChild(renderer.domElement);

    // 2. Data Structures
    const particlesCount = 15000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const targets = {
      cube: new Float32Array(particlesCount * 3),
      pillar: new Float32Array(particlesCount * 3),
      brain: new Float32Array(particlesCount * 3)
    };

    const indigo = new THREE.Color(0x4f46e5);
    const magenta = new THREE.Color(0xdb2777);

    // 3. Generate Targets
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;

      // --- CUBE ---
      const face = i % 6;
      const u = Math.random() * 400 - 200;
      const v = Math.random() * 400 - 200;
      const fixed = 200;
      if (face === 0) { targets.cube[i3] = u; targets.cube[i3+1] = v; targets.cube[i3+2] = fixed; }
      else if (face === 1) { targets.cube[i3] = u; targets.cube[i3+1] = v; targets.cube[i3+2] = -fixed; }
      else if (face === 2) { targets.cube[i3] = u; targets.cube[i3+1] = fixed; targets.cube[i3+2] = v; }
      else if (face === 3) { targets.cube[i3] = u; targets.cube[i3+1] = -fixed; targets.cube[i3+2] = v; }
      else if (face === 4) { targets.cube[i3] = fixed; targets.cube[i3+1] = u; targets.cube[i3+2] = v; }
      else { targets.cube[i3] = -fixed; targets.cube[i3+1] = u; targets.cube[i3+2] = v; }

      // --- DATA PILLAR ---
      const radius = 250;
      const height = 1000;
      const theta = Math.random() * Math.PI * 2;
      const h = Math.random() * height - (height / 2);
      const strand = Math.floor(theta * 8) / 8;
      targets.pillar[i3] = Math.cos(strand) * radius + (Math.random() - 0.5) * 30;
      targets.pillar[i3 + 1] = h;
      targets.pillar[i3 + 2] = Math.sin(strand) * radius + (Math.random() - 0.5) * 30;

      // --- BRAIN ---
      const phi = Math.random() * Math.PI * 2;
      const thetaB = Math.acos((Math.random() * 2) - 1);
      const r = 320 + (Math.sin(phi * 10) * Math.cos(thetaB * 10) * 45);
      targets.brain[i3] = r * Math.sin(thetaB) * Math.cos(phi);
      targets.brain[i3 + 1] = (r * 1.1) * Math.sin(thetaB) * Math.sin(phi) + 50;
      targets.brain[i3 + 2] = r * Math.cos(thetaB);

      // Start everything at Cube
      positions[i3] = targets.cube[i3];
      positions[i3+1] = targets.cube[i3+1];
      positions[i3+2] = targets.cube[i3+2];
      
      colors[i3] = indigo.r; colors[i3+1] = indigo.g; colors[i3+2] = indigo.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 4.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // 4. Animation State
    const states = ['cube', 'pillar', 'brain'] as const;
    let currentStateIdx = 0;
    let lastSwitch = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - lastSwitch;
      const posAttr = particlesMesh.geometry.attributes.position;
      const colAttr = particlesMesh.geometry.attributes.color;

      if (elapsed > 3500) {
        lastSwitch = now;
        currentStateIdx = (currentStateIdx + 1) % states.length;
      }

      const currentTarget = targets[states[currentStateIdx]];

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;

        // Smooth Movement (The "Magnet" effect)
        const dx = currentTarget[i3] - posAttr.array[i3];
        const dy = currentTarget[i3+1] - posAttr.array[i3+1];
        const dz = currentTarget[i3+2] - posAttr.array[i3+2];

        posAttr.array[i3] += dx * 0.04;
        posAttr.array[i3+1] += dy * 0.04;
        posAttr.array[i3+2] += dz * 0.04;

        // Smooth Color Shift based on distance
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const targetColor = distance > 100 ? magenta : indigo;

        colAttr.array[i3] += (targetColor.r - colAttr.array[i3]) * 0.03;
        colAttr.array[i3+1] += (targetColor.g - colAttr.array[i3+1]) * 0.03;
        colAttr.array[i3+2] += (targetColor.b - colAttr.array[i3+2]) * 0.03;
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      particlesMesh.rotation.y += 0.002;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <div ref={canvasContainerRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />
      
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity, scale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium border border-indigo-100">
          AI/ML Engineer
        </div>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-zinc-900 tracking-tight">
          Uday Pandey
        </h1>
        <p className="text-xl md:text-2xl text-zinc-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          Bridge the gap between complex data and actionable insights.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.a href="https://github.com/T-Bugging" target="_blank" className="px-6 py-3 bg-zinc-900 text-white rounded-xl flex items-center gap-2" whileHover={{ scale: 1.05 }}><Github size={18}/> GitHub</motion.a>
          <motion.a href="https://linkedin.com/in/uday-pandey-cs" target="_blank" className="px-6 py-3 bg-white text-zinc-900 border border-zinc-200 rounded-xl flex items-center gap-2" whileHover={{ scale: 1.05 }}><Linkedin size={18}/> LinkedIn</motion.a>
        </div>
      </motion.div>
    </section>
  );
}