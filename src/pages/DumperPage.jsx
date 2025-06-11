
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import StatusBadge from '@/components/StatusBadge';
import { DatabaseZap, UploadCloud, Play, ListFilter, Download, ArrowRight, Server, Settings, Target } from 'lucide-react';

const mockDumpTargets = [
  { id: 'wp_sites.txt', name: 'WordPress Sites List (wp_sites.txt)', count: 1520, type: 'file' },
  { id: 'cpanel_logins.txt', name: 'cPanel Logins (cpanel_logins.txt)', count: 890, type: 'file' },
  { id: 'sqli_targets.txt', name: 'SQLi Vulnerable URLs (sqli_targets.txt)', count: 340, type: 'file' },
  { id: 'live_db_conn_1', name: 'Live DB Connection (Prod DB1)', type: 'connection' },
];

const DumperPage = ({ variants, transition, startNewTask }) => {
  const { toast } = useToast();
  const [targets, setTargets] = useState('');
  const [selectedTargetFile, setSelectedTargetFile] = useState(null);
  const [dumpMethod, setDumpMethod] = useState('auto_detect');
  const [currentDump, setCurrentDump] = useState(null); // { name: string, progress: number, status: string }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedTargetFile(file);
      setTargets(''); // Clear textarea if file is selected
      toast({ title: "File Selected", description: `${file.name} ready for upload.` });
    }
  };

  const handleStartDump = () => {
    if (!targets && !selectedTargetFile) {
      toast({ title: "No Targets", description: "Please enter target URLs/IPs or upload a list.", variant: "destructive" });
      return;
    }
    const taskName = selectedTargetFile ? `Dumping from ${selectedTargetFile.name}` : `Dumping custom targets`;
    setCurrentDump({ name: taskName, progress: 0, status: 'Queued' });
    startNewTask(taskName); // For bottom bar
    
    // Simulate dumping process
    let progress = 0;
    setCurrentDump(prev => ({...prev, status: 'Running'}));
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setCurrentDump(prev => ({...prev, progress, status: 'Completed'}));
        toast({ title: "Dump Completed!", description: `${taskName} finished successfully.` });
      } else {
        setCurrentDump(prev => ({...prev, progress, status: 'Running'}));
      }
    }, 700);
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
        <h1 className="text-3xl font-bold text-slate-100 flex items-center">
          <DatabaseZap size={28} className="mr-3 text-primary" /> Data Dumper Module
        </h1>
        <p className="text-sm text-slate-400">Automate data extraction from various sources.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <Card className="glassmorphism-card lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-200 flex items-center"><Settings size={18} className="mr-2 text-primary"/>Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="targets" className="text-sm font-medium text-slate-300 mb-1 block">Target List (URLs/IPs, one per line)</Label>
              <Textarea 
                id="targets" 
                placeholder="e.g., http://example.com/vuln.php?id=1&#10;192.168.1.10" 
                value={targets}
                onChange={(e) => {setTargets(e.target.value); setSelectedTargetFile(null);}}
                className="bg-slate-800/70 border-slate-700 focus:border-primary h-32 text-sm"
                disabled={!!selectedTargetFile}
              />
            </div>
            <div className="text-center text-xs text-slate-500 my-2">OR</div>
            <div>
                <input type="file" id="targetFile" onChange={handleFileChange} accept=".txt" className="hidden" />
                <Button variant="outline" className="w-full justify-start text-left border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-700/50 text-slate-400 h-10 text-sm" onClick={() => document.getElementById('targetFile').click()}>
                    <UploadCloud size={16} className="mr-2 text-slate-500" />
                    {selectedTargetFile ? selectedTargetFile.name : "Upload Target File (.txt)"}
                </Button>
            </div>
             <div>
              <Label htmlFor="dumpMethod" className="text-sm font-medium text-slate-300 mb-1 block">Dumping Method</Label>
              <Select value={dumpMethod} onValueChange={setDumpMethod}>
                <SelectTrigger id="dumpMethod" className="bg-slate-800/70 border-slate-700 text-slate-300 focus:border-primary text-sm">
                  <SelectValue placeholder="Choose method" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                  <SelectItem value="auto_detect">Auto-Detect</SelectItem>
                  <SelectItem value="sqli_union">SQLi (Union-based)</SelectItem>
                  <SelectItem value="sqli_error">SQLi (Error-based)</SelectItem>
                  <SelectItem value="wp_creds">WordPress Credentials</SelectItem>
                  <SelectItem value="cpanel_backup">cPanel Backup Exploit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleStartDump} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-2" disabled={!!currentDump && currentDump.status === 'Running'}>
              <Play size={16} className="mr-2"/> Start Dump
            </Button>
          </CardContent>
        </Card>

        {/* Current Dump Status & Results */}
        <Card className="glassmorphism-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-200 flex items-center"><Target size={18} className="mr-2 text-primary"/>Live Dump Overview</CardTitle>
            <CardDescription className="text-slate-400 text-xs">Monitor current dumping operations and view results.</CardDescription>
          </CardHeader>
          <CardContent>
            {currentDump ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-200 truncate" title={currentDump.name}>{currentDump.name}</p>
                    <StatusBadge status={currentDump.status}/>
                </div>
                <Progress value={currentDump.progress} className="h-2 bg-slate-700" indicatorClassName={currentDump.status === 'Failed' ? 'bg-destructive' : 'bg-primary'} />
                <div className="flex justify-between text-xs text-slate-400">
                    <span>Progress: {currentDump.progress}%</span>
                    <span>Status: {currentDump.status}</span>
                </div>
                {currentDump.status === 'Completed' && (
                    <div className="mt-4 p-4 bg-slate-800/50 rounded-md border border-slate-700">
                        <h4 className="font-semibold text-slate-100 mb-2">Dump Results:</h4>
                        <p className="text-sm text-green-400">Successfully extracted 1.2 GB of data.</p>
                        <p className="text-xs text-slate-400 mt-1">Contains: User credentials, Database tables, System logs.</p>
                        <Button variant="outline" size="sm" className="mt-3 text-primary border-primary/70 hover:bg-primary/10">
                            <Download size={14} className="mr-2"/> Download Dump Archive
                        </Button>
                    </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10">
                <Server size={40} className="mx-auto text-slate-600 mb-3" />
                <p className="text-slate-500">No active dump operation.</p>
                <p className="text-xs text-slate-600">Configure and start a new dump to see live progress.</p>
              </div>
            )}
            
            <div className="mt-8 border-t border-slate-700/50 pt-6">
                <h3 className="text-md font-semibold text-slate-300 mb-3">Available Target Lists</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {mockDumpTargets.map(target => (
                        <div key={target.id} className="flex justify-between items-center p-2.5 bg-slate-800/40 rounded-md hover:bg-slate-700/40 text-xs">
                            <span className="text-slate-300 truncate" title={target.name}>{target.name}</span>
                            {target.type === 'file' && <span className="text-slate-500 font-mono">{target.count} entries</span>}
                            <Button variant="ghost" size="sm" className="h-auto py-0.5 px-1.5 text-primary/70 hover:text-primary text-xs" onClick={() => setTargets(target.type === 'file' ? `LOAD_FILE:${target.id}` : `CONNECT_DB:${target.id}`)}>
                                Use <ArrowRight size={12} className="ml-1"/>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default DumperPage;