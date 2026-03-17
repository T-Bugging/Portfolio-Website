import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';

export function About() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section id="about" ref={ref} className="py-32 bg-white relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-zinc-900 tracking-tight">
            About
          </h2>

          <div className="space-y-6 text-lg text-zinc-600 leading-relaxed font-light">
            <p>
              I believe in efficient design, systems that do exactly what they need to, nothing more, nothing less. 
              Good engineering isn't about complexity; it's about clarity, intention, and solving problems with precision.
            </p>
            <p>
              Whether I'm building machine learning pipelines or AI-powered applications, my focus is on creating 
              tools that work reliably and scale intelligently. Every decision is deliberate, every component purposeful.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
