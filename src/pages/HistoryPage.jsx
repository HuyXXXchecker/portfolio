import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import StatusBadge from '@/components/StatusBadge';
import { History, Filter, Search, Eye, Download, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

const mockHistoryData = [
  { id: 'EVT001', timestamp: '2025-06-11T14:45:00Z', type: 'Task Started', module: 'Scraper Parser', message: 'Task TSK002 (WordPress Vulnerability Check) initiated by user.', details: { taskId: 'TSK002', user: 'Admin' }, level: 'info' },
  { id: 'EVT002', timestamp: '2025-06-11T14:30:00Z', type: 'Login Attempt', module: 'System', message: 'Failed login attempt from IP 123.45.67.89.', details: { ip: '123.45.67.89', user: 'unknown' }, level: 'warning' },
  { id: 'EVT003', timestamp: '2025-06-11T11:05:00Z', type: 'Task Completed', module: 'Dehasher', message: 'Task DHK001 (Bulk URL Dehash) completed. 500 hashes processed, 320 found.', details: { taskId: 'DHK001', found: 320, total: 500 }, level: 'success' },
  { id: 'EVT004', timestamp: '2025-06-10T18:30:00Z', type: 'System Update', module: 'System', message: 'Cryoner Enterprise Suite updated to v1.0.1.', details: { version: '1.0.1' }, level: 'info' },
  { id: 'EVT005', timestamp: '2025-06-10T10:02:15Z', type: 'Task Failed', module: 'Dumper', message: 'Task DMP003 (SQLi Database Dump) failed. Target unresponsive.', details: { taskId: 'DMP003', reason: 'Target unresponsive' }, level: 'error' },
  { id: 'EVT006', timestamp: '2025-06-09T09:00:00Z', type: 'Settings Changed', module: 'System', message: 'Performance config updated: Bots set to 1000.', details: { setting: 'Bots', oldValue: 800, newValue: 1000 }, level: 'info' },
];

const logTypeOptions = ["All Types", "Task Started", "Task Completed", "Task Failed", "Login Attempt", "System Update", "Settings Changed"];
const logLevelOptions = ["All Levels", "Info", "Warning", "Error", "Success"];

const getLevelIcon = (level) => {
    switch (level) {
      case 'info': return <Info size={16} className="text-sky-400" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-400" />;
      case 'error': return <AlertTriangle size={16} className="text-red-500" />;
      case 'success': return <CheckCircle2 size={16} className="text-green-500" />;
      default: return <Info size={16} className="text-slate-500" />;
    }
  };

const HistoryPage = ({ variants, transition }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');

  const filteredHistory = mockHistoryData.filter(log =>
    (log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
     log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (log.details?.taskId && log.details.taskId.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (selectedType === 'All Types' || log.type === selectedType) &&
    (selectedLevel === 'All Levels' || log.level.toLowerCase() === selectedLevel.toLowerCase())
  ).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));

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
          <h1 className="text-3xl font-bold text-slate-100 flex items-center">
            <History size={28} className="mr-3 text-primary" /> Activity History & Logs
          </h1>
          <p className="text-sm text-slate-400">Review all system events, task activities, and security logs.</p>
        </div>
        <Button variant="outline" className="text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-slate-100">
            <Download size={16} className="mr-2"/> Export Logs
        </Button>
      </header>

      <Card className="glassmorphism-card mb-6">
        <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-200 flex items-center"><Filter size={18} className="mr-2 text-primary"/>Filter Logs</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              type="text"
              placeholder="Search logs by message, module, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/70 border-slate-700 focus:border-primary text-sm"
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="bg-slate-800/70 border-slate-700 text-slate-300 focus:border-primary text-sm">
              <SelectValue placeholder="Filter by log type..." />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
              {logTypeOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="bg-slate-800/70 border-slate-700 text-slate-300 focus:border-primary text-sm">
              <SelectValue placeholder="Filter by log level..." />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
              {logLevelOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="bg-slate-900/70 rounded-lg shadow-xl border border-slate-800 overflow-hidden flex-grow">
        <div className="overflow-x-auto h-full">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-800/50 sticky top-0 z-10">
              <tr>
                <th scope="col" className="table-header-cell w-12 text-center">Level</th>
                <th scope="col" className="table-header-cell">Timestamp</th>
                <th scope="col" className="table-header-cell">Type</th>
                <th scope="col" className="table-header-cell">Module</th>
                <th scope="col" className="table-header-cell">Message</th>
                <th scope="col" className="table-header-cell text-center">Details</th>
              </tr>
            </thead>
            <tbody className="bg-slate-900 divide-y divide-slate-800">
              {filteredHistory.map((log) => (
                <motion.tr 
                    key={log.id} 
                    className="table-row-hover"
                    initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}
                >
                  <td className="table-body-cell text-center">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span className="inline-block">{getLevelIcon(log.level)}</span>
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-800 text-slate-200 border-slate-700 text-xs"><p>{log.level.charAt(0).toUpperCase() + log.level.slice(1)}</p></TooltipContent>
                    </Tooltip>
                  </td>
                  <td className="table-body-cell text-xs text-slate-400 font-mono">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="table-body-cell text-xs text-slate-300">{log.type}</td>
                  <td className="table-body-cell text-xs text-slate-400">{log.module}</td>
                  <td className="table-body-cell text-sm text-slate-200 max-w-md truncate" title={log.message}>{log.message}</td>
                  <td className="table-body-cell text-center">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-primary">
                                <Eye size={14} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-800 text-slate-200 border-slate-700 text-xs max-w-xs">
                            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(log.details, null, 2)}</pre>
                        </TooltipContent>
                    </Tooltip>
                  </td>
                </motion.tr>
              ))}
              {filteredHistory.length === 0 && (
                <tr>
                    <td colSpan="6" className="text-center py-10 text-slate-500">
                        No log entries match your criteria.
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

export default HistoryPage;