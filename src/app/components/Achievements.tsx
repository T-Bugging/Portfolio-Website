import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Trophy } from 'lucide-react';

export function Achievements() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section id="achievements" ref={ref} className="py-32 bg-zinc-50/50 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-zinc-900 tracking-tight">
            Achievements
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-10 border border-zinc-200/60 hover:border-zinc-300 hover:shadow-sm transition-all duration-300"
          >
            <div className="flex items-start gap-6">
              <div className="p-3 bg-indigo-50 rounded-xl">
                <Trophy className="w-6 h-6 text-indigo-600" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 text-zinc-900">
                  Global Nominee in NASA Space Apps Challenge
                </h3>
                <p className="text-zinc-600 leading-relaxed">
                  Secured 2nd place at my college-level hackathon of the NASA Space Apps Challenge, 
                  one of the world's largest global hackathons organized by NASA. Our project was 
                  selected as a global nominee, advancing to a pool of nearly of 1,293 teams worldwide.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
