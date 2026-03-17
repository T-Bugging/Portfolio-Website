import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  id: number;
}

interface Connection {
  from: number;
  to: number;
  distance: number;
  opacity: number;
}

const PARTICLE_COUNT = 50;
const CONNECTION_DISTANCE = 120;
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 600;

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const animationProgress = useRef(0);

  // Initialize particles
  useEffect(() => {
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * CANVAS_WIDTH,
      y: Math.random() * CANVAS_HEIGHT,
      targetX: 0,
      targetY: 0,
      vx: 0,
      vy: 0
    }));

    // Set target positions in a neural network-like grid pattern
    const cols = 7;
    const rows = 8;
    const spacingX = CANVAS_WIDTH / (cols + 1);
    const spacingY = CANVAS_HEIGHT / (rows + 1);

    particlesRef.current.forEach((particle, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      particle.targetX = spacingX * (col + 1);
      particle.targetY = spacingY * (row + 0.5);
    });
  }, []);

  // Handle scroll-driven animation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress (0 to 1)
      // Animation starts when section triggers into view and completes as we pass through
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const containerHeight = sectionBottom - sectionTop;

      if (sectionTop < windowHeight && sectionBottom > 0) {
        // Calculate progress as a value between 0 and 1
        const progressValue = Math.max(
          0,
          Math.min(1, (windowHeight - sectionTop) / (windowHeight + containerHeight))
        );
        animationProgress.current = progressValue;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const progress = animationProgress.current;

      // Update particle positions with easing
      const easeProgress = Math.sin(progress * Math.PI) * 0.5 + 0.5; // Smooth easing

      particlesRef.current.forEach((particle) => {
        // Lerp towards target position
        const targetX =
          particle.x + (particle.targetX - particle.x) * easeProgress * 0.15;
        const targetY =
          particle.y + (particle.targetY - particle.y) * easeProgress * 0.15;

        particle.vx = (targetX - particle.x) * 0.1;
        particle.vy = (targetY - particle.y) * 0.1;

        particle.x += particle.vx;
        particle.y += particle.vy;
      });

      // Clear canvas
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw connections
      const connections: Connection[] = [];
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            const opacity = (1 - distance / CONNECTION_DISTANCE) * progress * 0.3;
            connections.push({ from: i, to: j, distance, opacity });
          }
        }
      }

      // Draw connection lines
      connections.forEach(({ from, to, opacity }) => {
        const p1 = particlesRef.current[from];
        const p2 = particlesRef.current[to];

        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw particles
      particlesRef.current.forEach((particle) => {
        const size = 2 + progress * 1;
        const opacity = 0.6 + progress * 0.4;

        ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-white flex items-center justify-center overflow-hidden"
    >
      {/* Background particles */}
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="absolute inset-0 m-auto opacity-60"
      />

      {/* Overlay gradient for visual effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />

      {/* Center text/content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
          From Data to Intelligence
        </h3>
        <p className="text-lg text-zinc-600 max-w-xl mx-auto">
          Transforming unstructured knowledge into organized, connected systems
        </p>
      </motion.div>
    </div>
  );
}
