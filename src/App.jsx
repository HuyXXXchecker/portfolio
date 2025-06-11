import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from '@/components/Sidebar';
import BottomTaskBar from '@/components/BottomTaskBar';

// Page Imports
import Homepage from '@/pages/Homepage.jsx';
import BuilderPage from '@/pages/BuilderPage.jsx';
import TaskConfigPage from '@/pages/TaskConfigPage.jsx';
import TaskDetailPage from '@/pages/TaskDetailPage.jsx';
import SettingsPage from '@/pages/SettingsPage.jsx';
import TasksListPage from '@/pages/TasksListPage.jsx';
import DumperPage from '@/pages/DumperPage.jsx';
import DehasherPage from '@/pages/DehasherPage.jsx';
import MachinesPage from '@/pages/MachinesPage.jsx';
import FilesPage from '@/pages/FilesPage.jsx';
import HistoryPage from '@/pages/HistoryPage.jsx';


const App = () => {
  const location = useLocation();
  const [activeTask, setActiveTask] = useState(null); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (activeTask && activeTask.progress < 100) {
        setActiveTask(prev => ({ ...prev, progress: Math.min(100, prev.progress + 5) }));
      } else if (activeTask && activeTask.progress >= 100) {
        // setActiveTask(null); 
      }
    }, 2000);
    return () => clearInterval(intervalId);
  }, [activeTask]);

  const startNewTask = (taskName) => {
    setActiveTask({ name: taskName, progress: 0 });
  };
  const clearActiveTask = () => {
    setActiveTask(null);
  }


  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4,
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-950 text-slate-200 flex selection:bg-emerald-500 selection:text-white">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden relative"> 
          <Toaster />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <Homepage
                    variants={pageVariants}
                    transition={pageTransition}
                    startNewTask={startNewTask}
                  />
                }
              />
              <Route
                path="/builder"
                element={
                  <BuilderPage
                    variants={pageVariants}
                    transition={pageTransition}
                    startNewTask={startNewTask}
                  />
                }
              />
              <Route
                path="/builder/configure/:moduleType"
                element={
                  <TaskConfigPage
                    variants={pageVariants}
                    transition={pageTransition}
                    startNewTask={startNewTask}
                  />
                }
              />
              <Route 
                path="/task/:taskId"
                element={
                  <TaskDetailPage 
                    variants={pageVariants}
                    transition={pageTransition}
                    startNewTask={startNewTask} 
                  />
                }
              />
              <Route
                path="/tasks" 
                element={
                  <TasksListPage 
                    variants={pageVariants}
                    transition={pageTransition}
                  />
                }
              />
               <Route
                path="/dumper"
                element={
                  <DumperPage 
                    variants={pageVariants}
                    transition={pageTransition}
                    startNewTask={startNewTask}
                  />
                }
              />
               <Route
                path="/dehasher"
                element={
                  <DehasherPage
                    variants={pageVariants}
                    transition={pageTransition}
                    startNewTask={startNewTask}
                  />
                }
              />
               <Route
                path="/machines"
                element={
                  <MachinesPage
                    variants={pageVariants}
                    transition={pageTransition}
                  />
                }
              />
              <Route
                path="/files"
                element={
                  <FilesPage
                    variants={pageVariants}
                    transition={pageTransition}
                  />
                }
              />
              <Route
                path="/history"
                element={
                  <HistoryPage
                    variants={pageVariants}
                    transition={pageTransition}
                  />
                }
              />
              <Route
                path="/settings"
                element={
                  <SettingsPage 
                    variants={pageVariants}
                    transition={pageTransition}
                  />
                }
              />
            </Routes>
          </AnimatePresence>
          {activeTask && <BottomTaskBar task={activeTask} onClearTask={clearActiveTask} />}
        </main>
      </div>
    </TooltipProvider>
  );
};

export default App;