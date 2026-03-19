import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      baseAngle: number; // Store the original angle in the circle
      vx: number;
      vy: number;
      radius: number;
      progress: number;
    }> = [];

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const baseRadius = Math.min(canvas.width, canvas.height) * 0.3;

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseAngle: (Math.PI * 2 * i) / 30,
        vx: 0,
        vy: 0,
        radius: 2,
        progress: 0
      });
    }

    let frame = 0;
    const animationDuration = 180;

    function animate() {
      if (!ctx || !canvas) return;
      frame++;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const ease = animationComplete 
        ? 1 
        : 1 - Math.pow(1 - Math.min(frame / animationDuration, 1), 3);

      // Breathing and Rotation Math
      // Noticeable but slow rotation (0.002 radians per frame)
      const rotationOffset = frame * 0.002; 
      // Subtle radius pulse (moves roughly 15px in and out)
      const pulse = Math.sin(frame * 0.015) * 15; 

      particles.forEach((p) => {
        p.progress = ease;

        // Calculate dynamic target based on rotation and pulse
        const currentAngle = p.baseAngle + rotationOffset;
        const currentRadius = baseRadius + pulse;
        
        const targetX = centerX + Math.cos(currentAngle) * currentRadius;
        const targetY = centerY + Math.sin(currentAngle) * currentRadius;

        // Smoothly move towards the dynamic target
        p.x = p.x + (targetX - p.x) * 0.05;
        p.y = p.y + (targetY - p.y) * 0.05;
      });

      if (frame >= animationDuration && !animationComplete) {
        setAnimationComplete(true);
      }

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const alpha = (1 - distance / 200) * 0.15 * Math.min(p1.progress, p2.progress);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      // Draw particles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${0.6 * p.progress})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [animationComplete]);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-zinc-50/30 to-white"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-40" 
      />
      
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center"
        style={{ opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            className="inline-block mb-6 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            AI/ML Developer
          </motion.div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-zinc-900 tracking-tight">
            Uday Pandey
          </h1>

          <p className="text-xl md:text-2xl text-zinc-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Building intelligent systems that transform data into decisions.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <motion.a
              href="https://github.com/T-Bugging"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-all duration-300 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
              <span className="font-medium">GitHub</span>
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/uday-pandey-cs"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-900 rounded-xl border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-300 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-4 h-4" />
              <span className="font-medium">LinkedIn</span>
            </motion.a>

            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-4 h-4" />
              <span className="font-medium">Contact</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: animationComplete ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}