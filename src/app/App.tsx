import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { NeuralTransition } from './components/NeuralTransition'; // Added Import
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Achievements } from './components/Achievements';
import { Certificates } from './components/Certificates';
import { Education } from './components/Education';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Navigation />
      <Hero />
      <About />
      
      {/* This creates the scroll-triggered animation bridge */}
      <NeuralTransition /> 
      
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Certificates />
      <Education />
      <Contact />
    </div>
  );
}