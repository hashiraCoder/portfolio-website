import { motion } from 'framer-motion';
import { FaCode, FaServer, FaDesktop, FaDatabase, FaTools, FaCloud } from 'react-icons/fa';

const skillGroups = [
  {
    icon: <FaCode />,
    name: 'Languages & Markup',
    items: ['TypeScript', 'JavaScript (ES6+)', 'C', 'C++', 'HTML5', 'CSS3', 'SQL'],
  },
  {
    icon: <FaServer />,
    name: 'Backend & APIs',
    items: ['Node.js', 'Express.js', 'RESTful APIs', 'Asynchronous Worker Queues', 'Webhooks', 'Microservices'],
  },
  {
    icon: <FaDesktop />,
    name: 'Frontend & UI',
    items: ['React.js', 'Tailwind CSS', 'Vite', 'State Management', 'Responsive Design', 'DOM Optimization'],
  },
  {
    icon: <FaDatabase />,
    name: 'Databases & Queues',
    items: ['PostgreSQL', 'MongoDB', 'Redis (In-Memory Caching & Queues)', 'SQLite', 'BullMQ'],
  },
  {
    icon: <FaTools />,
    name: 'DevOps, Testing & Tools',
    items: ['Docker', 'Git', 'GitHub Actions', 'Postman', 'Linux/Bash', 'Burp Suite', 'Vitest'],
  },
  {
    icon: <FaCloud />,
    name: 'Cloud Platforms',
    items: ['AWS (EC2)', 'Vercel', 'Netlify', 'Railway'],
  },
];

const Skills = () => (
  <section className="py-20 px-4 md:px-16 lg:px-32">
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-4xl font-bold text-center mb-12"
    >
      My Tech <span className="text-neon-purple">Stack</span>
    </motion.h2>
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {skillGroups.map((group, index) => (
        <motion.div
          key={group.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="p-6 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm hover:border-neon-blue transition-colors"
        >
          <div className="flex items-center gap-3 mb-4 text-neon-blue">
            <span className="text-2xl" aria-hidden="true">{group.icon}</span>
            <h3 className="text-lg font-bold text-white">{group.name}</h3>
          </div>
          <ul className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li key={item} className="bg-neon-blue/10 text-gray-200 text-sm px-3 py-1.5 rounded-full border border-white/10">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Skills;
