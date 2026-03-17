import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { FileDown } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' }
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'achievements', 'certificates', 'education', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-zinc-200/60' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* flex justify-between ensures the center group stays exactly in the middle of the available space */}
        <div className="flex items-center justify-between h-20">
          
          {/* 1. Left Group: Favicon Logo */}
          <div className="flex items-center justify-start">
            <motion.div
              onClick={scrollToTop}
              className="cursor-pointer w-10 h-10 flex items-center justify-center bg-zinc-900 rounded-xl shadow-md"
              whileHover={{ 
                scale: 1.1, 
                y: -2, // Slight popup effect
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-mono font-bold text-lg">{`>_`}</span>
            </motion.div>
          </div>

          {/* 2. Center Group: Nav Links (Equidistant) */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeSection === link.href.slice(1)
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* 3. Right Group: Resume Button */}
          <div className="flex items-center justify-end">
            <motion.a
              href="https://drive.google.com/uc?export=download&id=1WllM5pTQG16ULHJW8-sCOsdFG2Ds2s5u"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-zinc-900/10 active:scale-95"
              whileHover={{ 
                scale: 1.05,
                y: -2, // Consistent popup effect
                boxShadow: "0 10px 20px -5px rgba(79, 70, 229, 0.3)" 
              }}
            >
              <FileDown className="w-4 h-4" />
              <span>Resume</span>
            </motion.a>
          </div>
          
        </div>
      </div>
    </motion.nav>
  );
}