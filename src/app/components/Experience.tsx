import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from './hooks/useInView';
import { MapPin, Calendar } from 'lucide-react';

const experiences = [
  {
    id: 'clustor',
    title: 'AI/ML Intern',
    company: 'Clustor Computing',
    period: 'Dec 2025 – May 2026',
    location: 'Nagpur',
    badge: 'Completed',
    contributions: [
      'Built and deployed multiple machine learning systems using LightGBM, Logistic Regression, CNNs, and MobileNetV2.',
      'Developed full-stack ML applications integrating Flask APIs with React interfaces.',
      'Designed feature engineering pipelines with 125+ engineered features for real-time predictions.',
      'Achieved up to 96% model accuracy across prediction and classification tasks.'
    ]
  },
  {
    id: 'infocepts',
    title: 'Data Engineering Intern',
    company: 'Infocepts',
    period: 'Jun 2026 – Present',
    location: 'Nagpur',
    badge: 'Current Role',
    contributions: [
      'Designed a hybrid search architecture on Azure AI Search, combining BM25 keyword search with vector embeddings via reciprocal rank fusion (RRF) across multi-source content (text, code, and tabular data).',
      'Built a unified, metadata-driven indexing strategy and custom scoring profiles to improve relevance ranking, working within SDK and infrastructure cost constraints.',
      'Combined four data sources spanning over 1000+ files to build a unified data foundation for analytics and reporting.'
    ]
  }
];

export function Experience() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [activeId, setActiveId] = useState<string>(experiences[1].id);
  const activeExp = experiences.find((e) => e.id === activeId) || experiences[1];

  return (
    <section id="experience" ref={ref} className="py-32 bg-zinc-50/50 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-24 text-zinc-900 tracking-tight text-center">
            Experience
          </h2>

          {/* --- HORIZONTAL TRACK --- */}
          <div className="relative mb-20 pt-8 pb-4 max-w-3xl mx-auto">
            {/* Base Track Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-200 -translate-y-1/2" />

            <div className="relative z-10 flex items-center justify-between">
              {experiences.map((exp, index) => {
                const isActive = exp.id === activeId;
                return (
                  <div key={exp.id} className="relative flex flex-col items-center">
                    {/* Step Label Above */}
                    <span className="absolute -top-8 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      0{index + 1}
                    </span>

                    {/* Node Button */}
                    <button
                      onClick={() => setActiveId(exp.id)}
                      className="relative group focus:outline-none"
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 1.25 : 1,
                          backgroundColor: isActive ? '#4f46e5' : '#ffffff',
                          borderColor: isActive ? '#4f46e5' : '#d4d4d8'
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="w-7 h-7 rounded-full border-2 flex items-center justify-center shadow-sm cursor-pointer"
                      >
                        <div
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            isActive ? 'bg-white' : 'bg-zinc-400 group-hover:bg-indigo-500'
                          }`}
                        />
                      </motion.div>
                    </button>

                    {/* Company Title Below */}
                    <div className="absolute top-10 text-center w-40">
                      <p
                        className={`text-sm font-semibold truncate transition-colors ${
                          isActive ? 'text-indigo-600' : 'text-zinc-700'
                        }`}
                      >
                        {exp.company}
                      </p>
                      <p className="text-xs text-zinc-400 mt-1">{exp.period}</p>
                    </div>
                  </div>
                );
              })}

              {/* --- OPTION 9: MINIMALIST SQUARE CORNER FRAME TERMINAL NODE --- */}
              <div className="relative flex flex-col items-center">
                {/* Step Label Above */}
                <span className="absolute -top-8 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  03
                </span>

                {/* Square Frame Node */}
                <a
                  href="#contact"
                  className="w-6 h-6 border-2 border-zinc-300 bg-white hover:border-indigo-600 flex items-center justify-center transition-all group cursor-pointer z-10 shadow-sm"
                >
                  <div className="w-2 h-2 bg-zinc-300 group-hover:bg-indigo-600 transition-colors" />
                </a>

                {/* Labels Below */}
                <div className="absolute top-10 text-center w-40">
                  <p className="text-sm font-semibold text-zinc-900">Your Team?</p>
                  <a
                    href="#contact"
                    className="text-xs text-indigo-600 font-medium hover:underline mt-1 inline-block"
                  >
                    Let's connect &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* --- DETAIL PANEL CARD --- */}
          <div className="min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-white rounded-2xl p-8 md:p-9 shadow-sm border border-zinc-200/60"
              >
                {/* Header Row */}
                <div className="mb-6">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-indigo-50 text-indigo-600 mb-3 border border-indigo-100">
                    {activeExp.badge}
                  </span>
                  
                  {/* Reduced Role Title Size */}
                  <h3 className="text-xl font-bold text-zinc-900 mb-1">
                    {activeExp.title}
                  </h3>
                  
                  <p className="text-base text-indigo-600 font-medium mb-3">
                    {activeExp.company}
                  </p>

                  {/* Date and Location sit directly underneath with a distinct horizontal gap */}
                  <div className="flex items-center gap-6 text-zinc-500 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{activeExp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{activeExp.location}</span>
                    </div>
                  </div>
                </div>

                <hr className="border-zinc-100 my-5" />

                <div className="space-y-3.5">
                  {activeExp.contributions.map((contribution, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                      className="flex gap-3 items-start"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                      <p className="text-zinc-600 leading-relaxed text-sm">
                        {contribution}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}