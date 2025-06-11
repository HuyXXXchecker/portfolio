import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, ShieldCheck, FileCheck, KeyRound, Combine, Code, Settings, CheckCircle } from 'lucide-react'; // Added CheckCircle
import { useToast } from "@/components/ui/use-toast";

const modules = [
  { id: 'scraper', title: 'Scraper Parser', description: 'Extract data from search engines using dorks.', icon: Search, enabled: true },
  { id: 'vulnerability', title: 'Vulnerability Scanner', description: 'Scan websites for common vulnerabilities (SQLi, XSS, etc.).', icon: ShieldCheck, enabled: true },
  { id: 'dorks_checker', title: 'Dorks Checker', description: 'Validate and check the effectiveness of your dorks.', icon: FileCheck, enabled: true },
  { id: 'keywords', title: 'Keywords', description: 'Generate and manage keyword lists for scraping.', icon: KeyRound, enabled: false },
  { id: 'url_variable', title: '?url=value&variable', description: 'Advanced URL parameter manipulation tools.', icon: Combine, enabled: false },
  { id: 'code_injector', title: 'Code Injector', description: 'Tools for testing code injection vulnerabilities.', icon: Code, enabled: false },
];

const BuilderPage = ({ variants, transition }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSelectModule = (moduleId) => {
    const module = modules.find(m => m.id === moduleId);
    if (module && module.enabled) {
      setSelectedModule(moduleId);
    } else {
       toast({
        title: "Module Disabled",
        description: "This module is not yet available. Coming soon!",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (selectedModule) {
      navigate(`/builder/configure/${selectedModule}`);
    } else {
      toast({
        title: "No Module Selected",
        description: "Please select a module to continue.",
        variant: "destructive",
      });
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      className="h-full flex flex-col p-6 md:p-8 bg-slate-950 overflow-y-auto"
    >
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Create New Task</h1>
          <p className="text-sm text-slate-400">Choose a module to start building your task.</p>
        </div>
        <div className="flex items-center space-x-2">
            <Button variant="outline" className="text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200 h-9">
                Prev
            </Button>
            <Button 
                onClick={handleNext} 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-9"
                disabled={!selectedModule}
            >
                Next <ArrowRight size={16} className="ml-2" />
            </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            onClick={() => handleSelectModule(module.id)}
          >
            <Card 
              className={`glassmorphism-card h-full flex flex-col transition-all duration-200 ease-in-out cursor-pointer
                ${selectedModule === module.id ? 'border-primary shadow-primary/30 scale-105' : 'border-slate-800 hover:border-slate-700'}
                ${!module.enabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <module.icon size={36} className={selectedModule === module.id ? "text-primary" : "text-slate-500"} />
                    {module.enabled && selectedModule === module.id && <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>}
                    {!module.enabled && <span className="text-xs text-amber-400 font-semibold">SOON</span>}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardTitle className="text-lg font-semibold text-slate-100 mb-1">{module.title}</CardTitle>
                <CardDescription className="text-xs text-slate-400">{module.description}</CardDescription>
              </CardContent>
              {module.enabled && (
                <div className={`p-4 pt-0 flex justify-end ${selectedModule === module.id ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                  <div className="bg-primary text-primary-foreground rounded-full p-1.5">
                    <CheckCircle size={14}/>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuilderPage;