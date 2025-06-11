import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import StatusBadge from '@/components/StatusBadge';
import { FileText, UploadCloud, Settings2, BarChartHorizontalBig, ListChecks, Zap, Clock, Play, Eye, Trash2, Edit3, PlusCircle, Info } from 'lucide-react';

const mockTasks = [
  { id: 'TSK001', module: 'Google Dorker', status: 'Completed', progress: 100, results: 1253, duration: '2m 15s' },
  { id: 'TSK002', module: 'Site Analyzer', status: 'Running', progress: 65, results: 450, duration: '1m 30s' },
  { id: 'TSK003', module: 'Keyword Scraper', status: 'Pending', progress: 0, results: 0, duration: '0m 0s' },
  { id: 'TSK004', module: 'Google Dorker', status: 'Failed', progress: 30, results: 89, duration: '0m 45s' },
  { id: 'TSK005', module: 'Backlink Checker', status: 'Queued', progress: 0, results: 0, duration: '0m 0s' },
];


const ParserPage = ({ variants, transition }) => {
  const [selectedModule, setSelectedModule] = useState('google_dorker');
  const [threadsCount, setThreadsCount] = useState(5);
  const [timeout, setTimeoutVal] = useState(30); // timeout in seconds
  
  const [tasks, setTasks] = useState(mockTasks);
  const [isCreatingTask, setIsCreatingTask] = useState(false); // For future use

  const { toast } = useToast();

  const handleConfirmTask = () => {
    // This would eventually create a new task and add it to the list
    toast({
      title: "Task Confirmed (Simulated)",
      description: `Module: ${selectedModule}, Threads: ${threadsCount}, Timeout: ${timeout}s.`,
    });
    // Example: Add a new task
    const newTask = {
      id: `TSK${String(tasks.length + 1).padStart(3, '0')}`,
      module: selectedModule.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      status: 'Queued',
      progress: 0,
      results: 0,
      duration: '0m 0s'
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
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
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Tasks Dashboard</h1>
        <p className="text-sm text-slate-400">Manage and monitor your SEO parsing tasks.</p>
      </header>

      {/* Top Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {/* Builder Settings */}
        <Card className="glassmorphism-card lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-200 flex items-center">
              <Settings2 size={18} className="mr-2 text-primary" />
              Builder Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="moduleSelect" className="text-xs font-medium text-slate-400 mb-1 block">Select your module</Label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger id="moduleSelect" className="bg-slate-800/70 border-slate-700 text-slate-200 focus:border-primary h-9 text-sm">
                  <SelectValue placeholder="Choose module" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                  <SelectItem value="google_dorker">Google Dorker</SelectItem>
                  <SelectItem value="site_analyzer" disabled>Site Analyzer (Soon)</SelectItem>
                  <SelectItem value="keyword_scraper" disabled>Keyword Scraper (Soon)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="threadsCount" className="text-xs font-medium text-slate-400 mb-1 block">Threads count</Label>
              <Select value={String(threadsCount)} onValueChange={(val) => setThreadsCount(Number(val))}>
                <SelectTrigger id="threadsCount" className="bg-slate-800/70 border-slate-700 text-slate-200 focus:border-primary h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                  {[1, 5, 10, 20, 50].map(tc => <SelectItem key={tc} value={String(tc)}>{tc} Threads</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timeout" className="text-xs font-medium text-slate-400 mb-1 block">Timeout (seconds)</Label>
              <Select value={String(timeout)} onValueChange={(val) => setTimeoutVal(Number(val))}>
                <SelectTrigger id="timeout" className="bg-slate-800/70 border-slate-700 text-slate-200 focus:border-primary h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                  {[15, 30, 60, 120].map(t => <SelectItem key={t} value={String(t)}>{t}s</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Upload List & Proxies */}
        <Card className="glassmorphism-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-200 flex items-center">
              <FileText size={18} className="mr-2 text-primary" />
              Upload List
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-full pb-6">
            <Button variant="outline" className="w-full border-dashed border-slate-600 hover:border-primary hover:bg-primary/10 text-slate-400 hover:text-primary h-20 text-sm">
              <UploadCloud size={20} className="mr-2" /> Upload your list
            </Button>
            <p className="text-xs text-slate-500 mt-2">(.txt, .csv)</p>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-200 flex items-center">
              <BarChartHorizontalBig size={18} className="mr-2 text-primary" />
              Upload Proxies <span className="ml-1 text-xs text-slate-500">(Optional)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-full pb-6">
             <Button variant="outline" className="w-full border-dashed border-slate-600 hover:border-primary hover:bg-primary/10 text-slate-400 hover:text-primary h-20 text-sm">
              <UploadCloud size={20} className="mr-2" /> Upload your proxies
            </Button>
            <p className="text-xs text-slate-500 mt-2">(ip:port:user:pass)</p>
          </CardContent>
        </Card>

        {/* Task Overview & Confirm */}
        <Card className="glassmorphism-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-200 flex items-center">
              <ListChecks size={18} className="mr-2 text-primary" />
              Task Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center"><Zap size={14} className="mr-1.5 text-slate-500"/>Threads:</span>
              <span className="font-semibold text-primary">{threadsCount}</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center"><Clock size={14} className="mr-1.5 text-slate-500"/>Timeout:</span>
              <span className="font-semibold text-primary">{timeout}s</span>
            </div>
             <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center"><Info size={14} className="mr-1.5 text-slate-500"/>Module:</span>
              <span className="font-semibold text-primary truncate max-w-[100px]">{selectedModule.replace('_', ' ')}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleConfirmTask} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              <Play size={16} className="mr-2"/> Confirm Task
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Tasks Table */}
      <div className="bg-slate-900/70 rounded-lg shadow-xl border border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-100">Active Tasks</h2>
            <Button variant="outline" size="sm" className="text-primary border-primary/70 hover:bg-primary/10 hover:text-primary">
                <PlusCircle size={16} className="mr-2" /> Create New Task
            </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-800/50">
              <tr>
                <th scope="col" className="table-header-cell">Task ID</th>
                <th scope="col" className="table-header-cell">Module</th>
                <th scope="col" className="table-header-cell">Status</th>
                <th scope="col" className="table-header-cell">Progress</th>
                <th scope="col" className="table-header-cell text-right">Results</th>
                <th scope="col" className="table-header-cell text-center">Manage</th>
              </tr>
            </thead>
            <tbody className="bg-slate-900 divide-y divide-slate-800">
              {tasks.map((task) => (
                <tr key={task.id} className="table-row-hover">
                  <td className="table-body-cell font-mono text-primary/80">{task.id}</td>
                  <td className="table-body-cell">{task.module}</td>
                  <td className="table-body-cell">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="table-body-cell">
                    <div className="flex items-center">
                      <Progress value={task.progress} className="w-24 h-1.5 mr-2 bg-slate-700" indicatorClassName="bg-primary" />
                      <span className="text-xs text-slate-400">{task.progress}%</span>
                    </div>
                  </td>
                  <td className="table-body-cell text-right font-mono text-slate-300">{task.results.toLocaleString()}</td>
                  <td className="table-body-cell text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link to={`/task/${task.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                              <Eye size={16} />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-800 text-slate-200 border-slate-700"><p>View Details</p></TooltipContent>
                      </Tooltip>
                       <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-yellow-400" disabled={task.status !== 'Pending' && task.status !== 'Queued'}>
                            <Edit3 size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-800 text-slate-200 border-slate-700"><p>Edit Task (Soon)</p></TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-destructive">
                            <Trash2 size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-800 text-slate-200 border-slate-700"><p>Delete Task</p></TooltipContent>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
               {tasks.length === 0 && (
                <tr>
                    <td colSpan="6" className="text-center py-10 text-slate-500 font-roboto-mono">
                        No tasks found. Create one to get started!
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default ParserPage;