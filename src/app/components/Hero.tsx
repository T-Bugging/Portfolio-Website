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
    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 2500);
    camera.position.set(-450, 400, 550); 
    camera.lookAt(0, -100, 0); 

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, // Re-enabled for smoother dot edges since we optimized elsewhere
      alpha: true,
      powerPreference: "high-performance" 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
    canvasRef.current.appendChild(renderer.domElement);

    const vertexShader = `
      uniform float uTime;
      attribute float aDist;
      varying float vHeight;
      varying float vPulse;

      void main() {
        vec3 pos = position;
        
        // Speed halved (0.5x of previous state)
        float t = uTime * 0.5;
        
        float noise = sin(pos.x * 0.01 + t) * cos(pos.z * 0.01 + t) * 40.0;
        float pulseProgress = (sin(t * 1.3) * 0.5 + 0.5) * 1100.0;
        float pulse = smoothstep(250.0, 0.0, abs(aDist - pulseProgress));
        
        pos.y = noise + (pulse * 60.0);
        vHeight = pos.y;
        vPulse = pulse;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        
        // Slightly bigger dots (Base increased to 2.2)
        gl_PointSize = (2.2 + (pulse * 3.0)) * (1000.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying float vHeight;
      varying float vPulse;
      void main() {
        float d = distance(gl_PointCoord, vec2(0.5));
        if (d > 0.5) discard;
        
        vec3 lowColor = vec3(0.14, 0.38, 0.92);
        vec3 highColor = vec3(0.45, 0.65, 1.0);
        
        vec3 color = mix(lowColor, highColor, vPulse + (vHeight + 40.0) / 80.0);
        
        // Slightly higher opacity for the bigger dots
        gl_FragColor = vec4(color, 0.25 + vPulse * 0.5);
      }
    `;

    const rows = 80; 
    const cols = 80;
    const spacing = 18;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(rows * cols * 3);
    const distances = new Float32Array(rows * cols);

    for (let i = 0; i < rows * cols; i++) {
      const x = (i % cols) * spacing - (cols * spacing) / 2;
      const z = Math.floor(i / cols) * spacing - (rows * spacing) / 2;
      positions[i * 3] = x;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = z;
      distances[i] = Math.sqrt(x * x + z * z);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aDist', new THREE.BufferAttribute(distances, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });

    const terrain = new THREE.Points(geometry, material);
    scene.add(terrain);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      // Use Clock to get precise elapsed time for buttery smooth motion
      material.uniforms.uTime.value = clock.getElapsedTime();
      
      terrain.rotation.y += 0.0004; 
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
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
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (canvasRef.current) canvasRef.current.innerHTML = '';
    };
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <div ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />
      
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity, scale }}
      >
        <div className="inline-block mb-6 px-4 py-1 rounded-full bg-[#f0f3ff] text-[#6366f1] text-[12px] font-semibold border border-[#e0e7ff] uppercase tracking-[0.15em] backdrop-blur-sm">
          AI/ML Engineer
        </div>

        <h1 className="text-7xl md:text-[6rem] font-bold mb-6 text-zinc-900 tracking-tighter leading-tight">
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