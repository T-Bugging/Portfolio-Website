import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Submit to serverless function (Netlify/Vercel)
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-32 bg-zinc-50/50 relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-zinc-900 tracking-tight">
            Get In Touch
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
                I'm always interested in hearing about new projects and opportunities. 
                Feel free to reach out!
              </p>

              <div className="space-y-4">
                <motion.a
                  href="mailto:pandey2928uday@gmail.com"
                  className="flex items-center gap-4 p-5 bg-white rounded-xl border border-zinc-200/60 hover:border-zinc-300 hover:shadow-sm transition-all group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <p className="text-zinc-900">
                      pandey2928uday@gmail.com
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/uday-pandey-cs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-white rounded-xl border border-zinc-200/60 hover:border-zinc-300 hover:shadow-sm transition-all group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                    <Linkedin className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">
                      LinkedIn
                    </p>
                    <p className="text-zinc-900">
                      linkedin.com/in/uday-pandey-cs
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://github.com/T-Bugging"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-white rounded-xl border border-zinc-200/60 hover:border-zinc-300 hover:shadow-sm transition-all group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                    <Github className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">
                      GitHub
                    </p>
                    <p className="text-zinc-900">
                      github.com/T-Bugging
                    </p>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label 
                    htmlFor="name"
                    className="block text-sm font-medium text-zinc-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all text-zinc-900"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all text-zinc-900"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="message"
                    className="block text-sm font-medium text-zinc-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all text-zinc-900 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md font-medium disabled:bg-indigo-400 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send className="w-4 h-4" />
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-xl"
                  >
                    <p className="text-sm text-green-700 font-medium">
                      ✓ Message sent successfully! I'll get back to you soon.
                    </p>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <p className="text-sm text-red-700 font-medium">
                      ✗ Failed to send message. Please try again or contact me directly.
                    </p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 lg:px-8 mt-24 pt-8 border-t border-zinc-200"
      >
        <p className="text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Uday Pandey. Built with React, Tailwind CSS, and Motion.
        </p>
      </motion.div>
    </section>
  );
}
