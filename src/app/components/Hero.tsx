import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect } from 'react';
import { Github, Linkedin } from 'lucide-react';
import * as THREE from 'three';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.98]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    
    // --- ZOOMED IN CAMERA SETTINGS ---
    // Lower FOV (40 instead of 55) creates a "telephoto" zoom effect
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 2000);
    // Physically moved the camera closer (from 600 down to 350-400)
    camera.position.set(-350, 300, 450); 
    camera.lookAt(0, -50, 0); 

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);

    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      return new THREE.CanvasTexture(canvas);
    };

    const rows = 100;
    const cols = 100;
    const count = rows * cols;
    const spacing = 18;
    
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const blueColor = new THREE.Color(0x2563eb); 

    for (let i = 0; i < count; i++) {
      const x = (i % cols) * spacing - (cols * spacing) / 2;
      const z = Math.floor(i / cols) * spacing - (rows * spacing) / 2;
      positions[i * 3] = x;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = z;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 5, // Slightly larger particles to match the zoom
      color: blueColor,
      transparent: true,
      opacity: 0.5,
      map: createCircleTexture(),
      alphaTest: 0.05,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let time = 0;
    const animate = () => {
      time += 0.012;
      const pos = particles.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = pos[i3];
        const z = pos[i3 + 2];

        const wave1 = Math.sin(x * 0.003 + time) * 45;
        const wave2 = Math.sin(z * 0.002 + time * 0.5) * 35;
        const wave3 = Math.sin((x + z) * 0.002 + time) * 20;
        
        pos[i3 + 1] = wave1 + wave2 + wave3;
      }

      particles.geometry.attributes.position.needsUpdate = true;
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
      if (canvasRef.current) canvasRef.current.innerHTML = '';
    };
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <div ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-70" />
      
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity, scale }}
      >
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold border border-blue-100 uppercase tracking-widest">
          AI/ML Engineer
        </div>
        <h1 className="text-7xl md:text-9xl font-bold mb-6 text-zinc-900 tracking-tighter">
          Uday Pandey
        </h1>
        <p className="text-xl md:text-2 text-zinc-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Bridging the gap between complex data and actionable insights.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <motion.a 
            href="https://github.com/T-Bugging" 
            target="_blank" 
            className="px-8 py-4 bg-zinc-900 text-white rounded-2xl flex items-center gap-3 font-bold shadow-xl" 
            whileHover={{ y: -5 }}
          >
            <Github size={22}/> GitHub
          </motion.a>
          <motion.a 
            href="https://linkedin.com/in/uday-pandey-cs" 
            target="_blank" 
            className="px-8 py-4 bg-white text-zinc-900 border border-zinc-200 rounded-2xl flex items-center gap-3 font-bold shadow-sm" 
            whileHover={{ y: -5 }}
          >
            <Linkedin size={22}/> LinkedIn
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}