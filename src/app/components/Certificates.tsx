import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { ExternalLink } from 'lucide-react';

const certificates = [
  {
    title: 'Introduction to Model Context Protocol',
    issuer: 'Anthropic',
    year: '2026',
    link: 'https://verify.skilljar.com/c/qxg3xwvwot4h',
  },
  {
    title: 'AI Fluency Framework & Foundations',
    issuer: 'Anthropic',
    year: '2026',
    link: 'https://verify.skilljar.com/c/jy63x5ng8sjs',
   
  },
  {
    title: 'OCI Data Science Professional',
    issuer: 'Oracle',
    year: '2025',
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=482562E1AD41CBCAC219DC7AF7D0159355E92C21FCAE76310084C985CAEED6FF',
  },
  {
    title: 'OCI Generative AI Professional',
    issuer: 'Oracle',
    year: '2025',
    link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=95B4A38145546E45C15A8FB12F43B922372F3F2A4806254FFDB0FD38A0C442BF',
  },
  {
    title: 'Google Cloud Agentic AI Day',
    issuer: 'Hack2Skill',
    year: '2025',
    link: 'https://certificate.hack2skill.com/user/aidayideasubmission/2025H2S06AID-I26799',
    
  }
];

export function Certificates() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="certificates" ref={ref} className="py-32 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-zinc-900 tracking-tight">
            Certifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.a
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group bg-white rounded-2xl p-6 border border-zinc-200/60 hover:border-zinc-300 hover:shadow-md transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 transition-colors" />
                </div>

                <h3 className="text-base font-semibold text-zinc-900 mb-2 leading-snug">
                  {cert.title}
                </h3>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                  <span className="text-sm text-zinc-600">
                    {cert.issuer}
                  </span>
                  <span className="text-sm text-zinc-500">
                    {cert.year}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
