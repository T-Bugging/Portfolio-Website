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
    
    // --- TIGHTER ZOOM SETTINGS ---
    const camera = new THREE.PerspectiveCamera(32, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(-320, 280, 380); 
    camera.lookAt(0, -40, 0); 

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);

    // --- GPU SHADER LOGIC FOR SMOOTHNESS ---
    const vertexShader = `
      uniform float uTime;
      varying float vOpacity;
      void main() {
        vec3 pos = position;
        float wave1 = sin(pos.x * 0.003 + uTime) * 45.0;
        float wave2 = sin(pos.z * 0.002 + uTime * 0.5) * 35.0;
        float wave3 = sin((pos.x + pos.z) * 0.002 + uTime) * 20.0;
        pos.y = wave1 + wave2 + wave3;
        
        vOpacity = (pos.y + 100.0) / 200.0;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = 2.5* (1000.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying float vOpacity;
      void main() {
        float d = distance(gl_PointCoord, vec2(0.5));
        if (d > 0.5) discard;
        gl_FragColor = vec4(0.145, 0.388, 0.921, vOpacity * 0.5);
      }
    `;

    const rows = 100;
    const cols = 100;
    const count = rows * cols;
    const spacing = 18;
    
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (i % cols) * spacing - (cols * spacing) / 2;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.floor(i / cols) * spacing - (rows * spacing) / 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let time = 0;
    const animate = () => {
      time += 0.012;
      material.uniforms.uTime.value = time;
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
        {/* Kept your badge styling exactly as provided */}
        <div className="inline-block mb-6 px-4 py-1 rounded-full bg-[#f0f3ff] text-[#6366f1] text-[12px] font-semibold border border-[#e0e7ff] uppercase tracking-[0.15em] backdrop-blur-sm">
          AI/ML Engineer
        </div>

        {/* Kept your title changes exactly as provided */}
        <h1 className="text-7xl md:text-[6rem] font-bold mb-6 text-zinc-900 tracking-tighter">
          Uday Pandey
        </h1>

        {/* Kept your paragraph exactly as provided */}
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