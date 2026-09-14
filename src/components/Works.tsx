import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectCardImage } from './ProjectCardImage';

export const Works: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'all.全部作品' },
    { id: 'web', label: 'code.技术渲染' },
    { id: 'design', label: 'type.平面排版' },
    { id: 'art', label: 'art.视觉表达' },
    { id: 'audio', label: 'dsp.声音交互' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((item) => item.category === activeCategory);

  return (
    <section id="works" className="py-24 bg-[#0A0B08] border-b-2 border-[#9ACD32] relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#9ACD32]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[#9ACD32] uppercase tracking-[0.3em] text-xs flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" /> [ selected work index ]
            </span>
            <h2 className="font-brat text-4xl sm:text-6xl text-white tracking-tighter mt-3 uppercase text-blur-sm">
              works.作品展示
            </h2>
          </motion.div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 font-brat text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                    active
                      ? 'bg-[#9ACD32] text-black scale-105 border-transparent font-bold text-blur-sm'
                      : 'bg-[#141614] text-gray-400 hover:text-white border border-[#9ACD32]/20 hover:border-[#9ACD32]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#141614] border-2 border-[#9ACD32]/30 hover:border-[#9ACD32] transition-all duration-300 flex flex-col group rounded-none relative overflow-hidden"
            >
              {/* Graphic container */}
              <div className="border-b border-[#9ACD32]/20 relative">
                <ProjectCardImage image={project.image} />
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-sm font-mono text-[9px] text-[#9ACD32] uppercase border border-[#9ACD32]/30">
                  {project.year}
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 bg-[#9ACD32]" />
                    <span className="font-mono text-[10px] text-[#9ACD32] uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-brat text-2xl text-white group-hover:text-[#9ACD32] transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-gray-400 mt-1 uppercase tracking-tight">
                    {project.subtitle}
                  </p>
                  <p className="text-sm text-gray-300 font-sans mt-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-zinc-900 text-gray-400 font-mono text-[9px] uppercase border border-zinc-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* External link */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 font-brat text-xs text-[#9ACD32] hover:text-white uppercase tracking-wider"
                  >
                    view project <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
