import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'motion/react';
import { Github, Plus, X, ExternalLink } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const projects = [
  {
    title: 'Automated Book Publication Workflow',
    description: 'An AI-powered system that automatically extracts, rewrites, reviews, and stores book chapters using intelligent agents and semantic memory.',
    contributions: [
      'Built a modular AI pipeline to scrape book chapters and transform them into structured publication-ready content.',
      'Implemented AI Writer and Reviewer agents to generate and refine rewritten text in multiple styles.',
      'Added human-in-the-loop editing allowing manual control at every stage of the workflow.',
      'Implemented semantic search using ChromaDB vector database.',
      'Designed an RL-inspired ranking system that improves search results based on user feedback.',
      'Built automated scraping and screenshot capture using Playwright.'
    ],
    technologies: ['Python', 'NLP', 'ChromaDB', 'Playwright', 'Gemini API'],
    github: 'https://github.com/T-Bugging/Automated-Book-Publication-Workflow'
  },
  {
    title: 'Real-Time Transit Overcrowding Prediction',
    description: 'A full-stack system that predicts public transit overcrowding levels and visualizes routes using interactive maps.',
    contributions: [
      'Trained a LightGBM model to predict bus occupancy using time-based features.',
      'Built a Flask API backend exposing prediction and ticket endpoints.',
      'Developed a React + Leaflet frontend dashboard for route visualization.',
      'Implemented ticket booking and lookup with real-time occupancy predictions.',
      'Built short-term forecasting for transit routes using model-based predictions.',
      'Designed preprocessing pipelines using StandardScaler and OneHotEncoder.'
    ],
    technologies: ['LightGBM', 'Flask', 'React', 'Leaflet', 'Scikit-learn'],
    github: 'https://github.com/T-Bugging/Real-Time-Transit-Overcrowding-Prediction'
  },
  {
    title: 'Cartoon Character Image Classification',
    description: 'A deep learning system that classifies cartoon characters using CNNs and transfer learning.',
    contributions: [
      'Built a custom CNN architecture for multi-class image classification.',
      'Designed a full training pipeline including preprocessing, augmentation, and evaluation.',
      'Implemented transfer learning with MobileNetV2 to improve accuracy.',
      'Improved model performance from 74% to 92% accuracy.',
      'Performed detailed evaluation using class-wise metrics and F1 scores.'
    ],
    technologies: ['TensorFlow', 'CNN', 'MobileNetV2', 'Python', 'Pandas'],
    github: 'https://github.com/T-Bugging/Cartoon-Character-Image-Classification-using-CNN-Transfer-Learning'
  },
  {
    title: 'AI Tutor with Personalized Learning Recommendation System',
    description: 'An AI-powered learning assistant that analyzes quiz results and identifies weak mathematical skills.',
    contributions: [
      'Built a machine learning system that analyzes quiz results using 125+ engineered features.',
      'Implemented skill detection based on success-rate thresholds.',
      'Created a recommendation system that suggests learning resources for weak skills.',
      'Developed a Flask ML API and React frontend quiz interface.',
      'Designed a pipeline that converts quiz responses into structured ML features.'
    ],
    technologies: ['Python', 'Machine Learning', 'Flask', 'React'],
    github: 'https://github.com/T-Bugging/AI-Tutor-Personalized-Learning-Recommendation-System'
  },
  {
    title: 'Local AI Chatbot (DialoGPT)',
    description: 'A locally running conversational AI chatbot using a pretrained language model.',
    contributions: [
      'Implemented a chatbot using DialoGPT-medium (345M parameters).',
      'Built conversation memory using tokenized chat history.',
      'Generated responses using sampling techniques (top-k, top-p, temperature).',
      'Designed a lightweight CLI interface that runs fully on CPU.'
    ],
    technologies: ['PyTorch', 'HuggingFace Transformers', 'NLP'],
    github: 'https://github.com/T-Bugging/Chatbot-using-DialoGPT'
  }
];

export function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // Prevents background website scrolling when the detail card is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Range adjusted to -145% to ensure all cards fully transit
  const xRaw = useTransform(scrollYProgress, [0, 1], ["0%", "-115%"]);
  const x = useSpring(xRaw, { stiffness: 200, damping: 50, mass: 0.5 });

  return (
    <section id='projects' ref={targetRef} className="relative h-[290vh] bg-white">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        <div className="px-6 md:px-24 mb-12 pt-24">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            Projects
          </h2>
          <p className="text-zinc-400 mt-2 font-medium uppercase text-[10px] tracking-[0.2em]">
            R&D Engineering / 05 Selected
          </p>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-6 md:px-24 items-center">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              onClick={() => setSelectedProject(project)}
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.08)" 
              }}
              className="group relative flex-shrink-0 w-[300px] md:w-[480px] aspect-square bg-white border border-zinc-200/60 p-10 rounded-[3rem] flex flex-col justify-between transition-all duration-300 z-10 hover:z-20 cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50/50 px-3 py-1.5 rounded-full">
                    0{index + 1}
                  </span>
                  <div className="flex gap-3">
                    {project.technologies.slice(0, 2).map(tech => (
                       <span key={tech} className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest">
                         {tech}
                       </span>
                    ))}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-zinc-900 mb-4 leading-tight">
                  {project.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-4">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-zinc-50">
                <button 
                  className="flex items-center gap-2 text-sm font-bold text-zinc-900 group/btn"
                >
                  <Plus className="w-4 h-4 text-indigo-600 transition-transform group-hover/btn:rotate-90" />
                  View Details
                </button>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-zinc-400 hover:text-zinc-900 transition-all transform hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
          <div className="flex-shrink-0 w-[70vw]" />
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-zinc-900/10 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              /* FIX: max-h-[90vh] keeps the card inside the window.
                 overflow-y-auto allows internal scrolling for long project info.
              */
              className="bg-white rounded-[2.5rem] p-8 md:p-14 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-100 relative z-[110]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="sticky top-0 float-right p-2 text-zinc-400 hover:text-zinc-900 transition-colors bg-white/80 backdrop-blur-md rounded-full z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="clear-both">
                <h3 className="text-2xl font-bold text-zinc-900 mb-4">{selectedProject.title}</h3>
                <p className="text-zinc-500 leading-relaxed text-sm md:text-base mb-10">{selectedProject.description}</p>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-4">Core Contributions</h4>
                    <ul className="space-y-4">
                      {selectedProject.contributions.map((c, i) => (
                        <li key={i} className="text-sm text-zinc-600 flex gap-4 leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map(tech => (
                      <span key={tech} className="px-4 py-2 bg-zinc-50 text-zinc-600 text-[10px] font-bold rounded-xl uppercase border border-zinc-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-100 flex justify-end">
                  <a 
                    href={selectedProject.github} 
                    target="_blank"
                    className="flex items-center gap-2 px-8 py-3 bg-zinc-900 text-white rounded-2xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-zinc-900/10"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}