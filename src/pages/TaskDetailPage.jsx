import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast"; // Added useToast import
import { ArrowLeft, Play, Pause, StopCircle, Download, Filter, Trash2, AlertTriangle, CheckCircle, BarChart, PieChart, Clock, Copy, Edit3, Settings, Database } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, PieChart as RechartsPieChart, Pie, Cell, Bar as RechartsBar, ComposedChart } from 'recharts';

// Mock data - replace with actual data fetching
const mockTaskDetailsStore = {
  'TSK001': {
    id: 'TSK001',
    name: 'Scraper Task #1',
    module: 'Scraper Parser',
    type: 'scraper',
    status: 'Completed',
    progress: 100,
    results: { totalLinks: 3400, valid: 3400, filtered: 2900 },
    dorkPerMinute: 3000,
    filterPerMinute: 21100,
    duration: '2m 15s',
    timeRemaining: '0m 0s',
    graphs: {
      dorkSpeed: [
        { name: '0s', speed: 1400 }, { name: '15s', speed: 1600 }, { name: '30s', speed: 2800 },
        { name: '45s', speed: 3000 }, { name: '1m', speed: 2500 }, { name: '1m15s', speed: 2200 },
        { name: '1m30s', speed: 2000 }, { name: '1m45s', speed: 1800 }, { name: '2m', speed: 1500 },
        { name: '2m15s', speed: 1450 },
      ],
      filterSpeed: [
        { name: '0s', speed: 12000 }, { name: '15s', speed: 14000 }, { name: '30s', speed: 22000 },
        { name: '45s', speed: 20000 }, { name: '1m', speed: 18000 }, { name: '1m15s', speed: 16000 },
        { name: '1m30s', speed: 15000 }, { name: '1m45s', speed: 14000 }, { name: '2m', speed: 13000 },
        { name: '2m15s', speed: 12500 },
      ]
    },
    settings: { pages: 10, country: 'US', engine: 'Google', antipublic: true, keywords: true }
  },
 'TSK002': {
    id: 'TSK002',
    name: 'Vulnerability Task #2',
    module: 'Vulnerability Scanner',
    type: 'vulnerability',
    status: 'Running',
    progress: 75, 
    results: { 
        totalLinks: 4,
        testedPerMinute: 960,
        vulnerabilities: [
            { type: 'MySQL', count: 0 }, { type: 'SQLite', count: 0 },
            { type: 'Oracle', count: 1 }, { type: 'PostgreSQL', count: 0 },
            { type: 'SQL Server', count: 3 }, { type: 'Microsoft Access', count: 0 },
            { type: 'Firebird', count: 0 }
        ]
    },
    duration: '1m 30s',
    timeRemaining: '65:30 MIN', 
    graphs: {
        testedSpeed: [
            { name: '0s', speed: 800 }, { name: '15s', speed: 1000 }, { name: '30s', speed: 1200 },
            { name: '45s', speed: 1300 }, { name: '1m', speed: 1100 }, { name: '1m15s', speed: 900 },
            { name: '1m30s', speed: 960 },
        ]
    },
    settings: {
        scanTypes: ['SQL', 'XSS', 'ADM', 'ENV', 'LFI', 'RFI'], 
        fullScan: { 'SQL': true, 'XSS': false, 'ADM': false, 'ENV': true, 'LFI': false, 'RFI': false }, 
    }
  }
};


const TaskDetailPage = ({ variants, transition }) => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const foundTask = mockTaskDetailsStore[taskId] || Object.values(mockTaskDetailsStore)[0];
      if (foundTask) {
        setTask({...foundTask, id: taskId });
      }
      setIsLoading(false);
    }, 500);
  }, [taskId]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(task.id);
    toast({ title: "Task ID Copied!", description: `${task.id} copied to clipboard.` });
  };
  
  const renderGraph = (data, dataKey, lineColor) => (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.3)" />
        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />
        <RechartsTooltip 
            contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
            }}
            itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
            labelStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
        />
        <Line type="monotone" dataKey={dataKey} stroke={lineColor} strokeWidth={2} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
      </LineChart>
    </ResponsiveContainer>
  );

  if (isLoading) { 
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Clock size={48} className="text-primary animate-spin" />
          <p className="mt-2 text-slate-400">Loading task details...</p>
        </motion.div>
      </div>
    );
  }

  if (!task) { 
    return (
      <motion.div 
        className="h-full flex flex-col items-center justify-center text-center p-6"
        initial="initial" animate="in" exit="out" variants={variants} transition={transition}
      >
        <AlertTriangle size={64} className="text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Task Not Found</h1>
        <p className="text-slate-400 mb-6">The task with ID <span className="font-mono text-primary">{taskId}</span> could not be found.</p>
        <Link to="/">
          <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Homepage
          </Button>
        </Link>
      </motion.div>
    );
  }

  const OverviewContent = () => (
    <div className="mt-6 space-y-6">
      {task.type === 'scraper' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glassmorphism-card">
              <CardHeader><CardTitle className="text-base text-slate-400 font-normal">DORK / MINUTE</CardTitle></CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary mb-2">{task.dorkPerMinute.toLocaleString()}</p>
                {renderGraph(task.graphs.dorkSpeed, "speed", "hsl(var(--primary))")}
              </CardContent>
            </Card>
            <Card className="glassmorphism-card">
              <CardHeader><CardTitle className="text-base text-slate-400 font-normal">FILTER / MINUTE</CardTitle></CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-sky-400 mb-2">{task.filterPerMinute.toLocaleString()}</p>
                {renderGraph(task.graphs.filterSpeed, "speed", "hsl(var(--accent))")}
              </CardContent>
            </Card>
            <Card className="glassmorphism-card">
              <CardHeader><CardTitle className="text-base text-slate-400 font-normal">TOTAL LINKS</CardTitle></CardHeader>
              <CardContent className="space-y-3 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Valid</span>
                    <span className="text-lg font-bold text-primary">{task.results.valid.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1 bg-slate-700 rounded-full"><div className="h-1 bg-primary rounded-full" style={{width: `${(task.results.valid/task.results.totalLinks)*100}%`}}></div></div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Filtered</span>
                    <span className="text-lg font-bold text-sky-400">{task.results.filtered.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1 bg-slate-700 rounded-full"><div className="h-1 bg-sky-400 rounded-full" style={{width: `${(task.results.filtered/task.results.totalLinks)*100}%`}}></div></div>
                  <p className="text-xs text-slate-500 pt-4 text-center">Total: {task.results.totalLinks.toLocaleString()} links processed.</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glassmorphism-card">
              <CardHeader><CardTitle className="text-base text-slate-400">Progress</CardTitle></CardHeader>
              <CardContent>
                <Progress value={task.progress} className="h-3 bg-slate-700 mb-1" indicatorClassName="bg-primary" />
                <p className="text-xs text-slate-400 text-right">{task.progress}% complete</p>
              </CardContent>
            </Card>
            <Card className="glassmorphism-card">
              <CardHeader><CardTitle className="text-base text-slate-400">Time Remaining</CardTitle></CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-200">{task.timeRemaining}</p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
      {task.type === 'vulnerability' && (
         <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glassmorphism-card md:col-span-2">
              <CardHeader><CardTitle className="text-base text-slate-400 font-normal">TESTED / MINUTE</CardTitle></CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary mb-2">{task.results.testedPerMinute.toLocaleString()}</p>
                {renderGraph(task.graphs.testedSpeed, "speed", "hsl(var(--primary))")}
              </CardContent>
            </Card>
            <Card className="glassmorphism-card">
              <CardHeader><CardTitle className="text-base text-slate-400 font-normal">TOTAL LINKS ({task.results.totalLinks})</CardTitle></CardHeader>
              <CardContent className="space-y-1.5 text-xs overflow-y-auto max-h-[180px] pr-1">
                {task.results.vulnerabilities.map(vuln => (
                    <div key={vuln.type} className="flex justify-between items-center">
                        <span className="text-slate-300">{vuln.type}</span>
                        <span className={`font-semibold ${vuln.count > 0 ? 'text-primary' : 'text-slate-500'}`}>{vuln.count}</span>
                    </div>
                ))}
              </CardContent>
            </Card>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glassmorphism-card">
              <CardHeader><CardTitle className="text-base text-slate-400">Progress</CardTitle></CardHeader>
              <CardContent>
                <Progress value={task.progress} className="h-3 bg-slate-700 mb-1" indicatorClassName="bg-primary" />
                <p className="text-xs text-slate-400 text-right">{task.progress}% complete</p>
              </CardContent>
            </Card>
            <Card className="glassmorphism-card">
              <CardHeader><CardTitle className="text-base text-slate-400">Time Remaining</CardTitle></CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-200">{task.timeRemaining}</p>
              </CardContent>
            </Card>
          </div>
         </>
      )}
    </div>
  );
  
  const SettingsContent = () => (
    <div className="mt-6 space-y-6">
      <Card className="glassmorphism-card">
        <CardHeader><CardTitle className="text-lg text-slate-200">Task Configuration</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
        {task.type === 'scraper' && (
          <>
            <div><span className="text-slate-400">Pages Parsed:</span> <span className="font-semibold text-slate-100">{task.settings.pages}</span></div>
            <div><span className="text-slate-400">Country:</span> <span className="font-semibold text-slate-100">{task.settings.country}</span></div>
            <div><span className="text-slate-400">Search Engine:</span> <span className="font-semibold text-slate-100">{task.settings.engine}</span></div>
            <div><span className="text-slate-400">Antipublic:</span> <span className={`font-semibold ${task.settings.antipublic ? 'text-green-400' : 'text-red-400'}`}>{task.settings.antipublic ? 'Enabled' : 'Disabled'}</span></div>
            <div><span className="text-slate-400">Keywords:</span> <span className={`font-semibold ${task.settings.keywords ? 'text-green-400' : 'text-red-400'}`}>{task.settings.keywords ? 'Active' : 'Inactive'}</span></div>
          </>
        )}
        {task.type === 'vulnerability' && (
           <div className="space-y-3">
            <p className="text-slate-300 font-medium">Scan Modules:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {task.settings.scanTypes.map(type => (
                    <div key={type} className="bg-slate-800/60 p-3 rounded-md border border-slate-700/50">
                        <p className="text-slate-200 font-medium">{type}</p>
                        <p className="text-xs text-slate-400">
                            Full Scan: 
                            <span className={task.settings.fullScan[type] ? "text-green-400" : "text-slate-500"}>
                                {task.settings.fullScan[type] ? " Enabled" : " Disabled"}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
           </div>
        )}
        </CardContent>
        <CardFooter className="border-t border-slate-800/50 pt-4">
            <Button variant="outline" className="text-primary border-primary/70 hover:bg-primary/10">Edit Settings (Soon)</Button>
        </CardFooter>
      </Card>
    </div>
  );


  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      className="h-full flex flex-col p-6 md:p-8 bg-slate-950 overflow-y-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div>
          <Link to="/" className="inline-flex items-center text-sm text-primary hover:underline mb-1.5">
            <ArrowLeft size={16} className="mr-1" /> Back to Homepage
          </Link>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center">
            {task.name} <span className="text-xl text-slate-500 ml-2 font-normal">- {task.module}</span>
          </h1>
        </div>
        <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleCopyId} className="text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200">
                <Copy size={14} className="mr-2"/> Copy Task ID
            </Button>
            <Button variant="outline" size="sm" className="text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200">
                <Edit3 size={14} className="mr-2"/> Rename Task
            </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <Tabs defaultValue="overview" className="w-full sm:w-auto">
          <TabsList className="bg-slate-800/70 border border-slate-700/50">
            <TabsTrigger value="overview" className="text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-primary">Overview</TabsTrigger>
            <TabsTrigger value="settings" className="text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-primary">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex space-x-2">
          {task.status === 'Running' && (
            <Button variant="destructive" size="sm">
              <StopCircle size={16} className="mr-2" /> Stop
            </Button>
          )}
          <Button variant="outline" size="sm" className="text-primary border-primary/70 hover:bg-primary/10">
            <Download size={16} className="mr-2" /> Download
          </Button>
          <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/10 hover:text-red-400">
            <Trash2 size={16} className="mr-2" /> Delete
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="flex-grow">
        <TabsContent value="overview" className="mt-0">
          <OverviewContent />
        </TabsContent>
        <TabsContent value="settings" className="mt-0">
          <SettingsContent />
        </TabsContent>
      </Tabs>

    </motion.div>
  );
};

export default TaskDetailPage;