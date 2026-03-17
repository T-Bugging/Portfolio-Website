import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';

const skillCategories = [
  {
    category: 'Machine Learning',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'LightGBM', 'XGBoost']
  },
  {
    category: 'Deep Learning',
    skills: ['CNNs', 'Transfer Learning', 'MobileNetV2', 'Computer Vision']
  },
  {
    category: 'NLP & AI',
    skills: ['HuggingFace', 'Transformers', 'DialoGPT', 'Gemini API', 'LangChain']
  },
  {
    category: 'Data & Databases',
    skills: ['ChromaDB', 'Vector Databases', 'Pandas', 'NumPy', 'SQL']
  },
  {
    category: 'Backend',
    skills: ['Flask', 'REST APIs', 'Python', 'Node.js']
  },
  {
    category: 'Frontend',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'Leaflet', 'HTML/CSS']
  }
];

export function Skills() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="skills" ref={ref} className="py-32 bg-zinc-50/50 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-zinc-900 tracking-tight">
            Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl p-6 border border-zinc-200/60 hover:border-zinc-300 hover:shadow-sm transition-all duration-300"
              >
                <h3 className="text-sm font-semibold text-zinc-900 mb-4 uppercase tracking-wider">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05, duration: 0.4 }}
                      className="px-3 py-1.5 bg-zinc-50 text-zinc-600 text-sm rounded-lg hover:bg-zinc-100 transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
