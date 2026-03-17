import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { MapPin, Calendar } from 'lucide-react';

const experience = {
  title: 'AI/ML Intern',
  company: 'Cluster Computing',
  period: 'Dec 2025 – May 2026',
  location: 'Nagpur (Onsite)',
  contributions: [
    'Built and deployed multiple machine learning systems using LightGBM, Logistic Regression, CNNs, and MobileNetV2.',
    'Developed full-stack ML applications integrating Flask APIs with React interfaces.',
    'Designed feature engineering pipelines with 125+ engineered features for real-time predictions.',
    'Achieved up to 96% model accuracy across prediction and classification tasks.'
  ]
};

export function Experience() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section id="experience" ref={ref} className="py-32 bg-zinc-50/50 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-zinc-900 tracking-tight">
            Experience
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-zinc-200/60 hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-zinc-900">
                  {experience.title}
                </h3>
                <p className="text-lg text-indigo-600 font-medium mb-3">
                  {experience.company}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b border-zinc-100">
              <div className="flex items-center gap-2 text-zinc-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{experience.period}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{experience.location}</span>
              </div>
            </div>

            <div className="space-y-3">
              {experience.contributions.map((contribution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="flex gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                  <p className="text-zinc-600 leading-relaxed">
                    {contribution}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
