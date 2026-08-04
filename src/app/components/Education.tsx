import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { GraduationCap, BookOpen } from 'lucide-react';

export function Education() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section id="education" ref={ref} className="py-32 bg-white relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-zinc-900 tracking-tight">
            Education
          </h2>

          <div className="space-y-6">
            {/* Bachelor's Degree */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-2xl p-8 border border-zinc-200/60 hover:border-zinc-300 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-indigo-600" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-zinc-900">
                    B.Tech Computer Science and Engineering
                  </h3>
                  <p className="text-zinc-600 mb-4">
                    G H Raisoni University, Amravati
                  </p>
                  
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-50 rounded-lg">
                    <span className="text-sm text-zinc-600">CGPA</span>
                    <span className="text-lg font-semibold text-zinc-900">9.43 / 10</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 12th Grade */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white rounded-2xl p-8 border border-zinc-200/60 hover:border-zinc-300 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-zinc-900">
                    Higher Secondary Certificate (12th)
                  </h3>
                  <p className="text-zinc-600 mb-4">
                    G H Raisoni Vidyaniketan
                  </p>
                  
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-50 rounded-lg">
                    <span className="text-sm text-zinc-600">Percentage</span>
                    <span className="text-lg font-semibold text-zinc-900">82.6%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
