import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Save, Settings as SettingsIcon, Wifi, WifiOff, Filter, FilterX, ShieldCheck, ShieldOff, Bot, Clock, FileDigit, KeySquare } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const SettingsSection = ({ title, children }) => (
  <div className="mb-6 p-4 border border-slate-700/50 rounded-md bg-slate-800/30 shadow-md">
    <h2 className="text-lg font-semibold text-slate-200 mb-3 border-b border-slate-700 pb-2">{title}</h2>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const SettingItem = ({ label, children, icon: Icon, statusText, statusColor = "text-green-400" }) => (
  <div className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-b-0">
    <div className="flex items-center">
      {Icon && <Icon size={18} className="mr-3 text-slate-500" />}
      <Label className="text-sm text-slate-300">{label}</Label>
    </div>
    <div className="flex items-center space-x-2">
      {statusText && <span className={`text-xs font-medium ${statusColor}`}>{statusText}</span>}
      {children}
    </div>
  </div>
);


const SettingsPage = ({ variants, transition }) => {
  const { toast } = useToast();

  // API Settings
  const [googleApi3, setGoogleApi3] = useState(true);
  const [googleApi2, setGoogleApi2] = useState(true);
  const [proxyless, setProxyless] = useState(true);
  const [filtering1, setFiltering1] = useState(false); // Assuming first filtering is OFF
  const [filtering2, setFiltering2] = useState(true);  // Assuming second filtering is ON

  // Performance Config
  const [bots, setBots] = useState(800);
  const [timeout, setTimeoutVal] = useState(5);
  const [pages, setPages] = useState(15);
  const [dorkCkees, setDorkCkees] = useState(true); // DorkCKEES

  // Security
  const [checkDb, setCheckDb] = useState(true);
  const [importBad, setImportBad] = useState(false);

  const handleSaveChanges = () => {
    // Logic to save settings (e.g., to localStorage or backend)
    toast({
      title: "Settings Saved!",
      description: "Your configurations have been updated.",
    });
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      className="h-full flex flex-col p-6 md:p-8 bg-slate-950 overflow-y-auto items-center"
    >
      <div className="w-full max-w-3xl">
        <header className="mb-8 text-center">
          <SettingsIcon size={48} className="mx-auto text-primary mb-3" />
          <h1 className="text-3xl font-bold text-slate-100">System Configuration</h1>
          <p className="text-sm text-slate-400">Fine-tune your Cryoner Enterprise Suite settings.</p>
        </header>

        <Card className="glassmorphism-card shadow-2xl shadow-black/30">
          <CardContent className="p-6">
            <SettingsSection title="API SETTINGS">
              <SettingItem label="Google API 3" icon={googleApi3 ? Wifi : WifiOff} statusText={googleApi3 ? "ON" : "OFF"} statusColor={googleApi3 ? "text-green-400" : "text-red-400"}>
                <Switch checked={googleApi3} onCheckedChange={setGoogleApi3} id="googleApi3" />
              </SettingItem>
              <SettingItem label="Google API 2" icon={googleApi2 ? Wifi : WifiOff} statusText={googleApi2 ? "ON" : "OFF"} statusColor={googleApi2 ? "text-green-400" : "text-red-400"}>
                <Switch checked={googleApi2} onCheckedChange={setGoogleApi2} id="googleApi2" />
              </SettingItem>
              <SettingItem label="Proxyless" icon={proxyless ? Wifi : WifiOff} statusText={proxyless ? "ON" : "OFF"} statusColor={proxyless ? "text-green-400" : "text-red-400"}>
                <Switch checked={proxyless} onCheckedChange={setProxyless} id="proxyless" />
              </SettingItem>
              <SettingItem label="Filtering (Primary)" icon={filtering1 ? Filter : FilterX} statusText={filtering1 ? "ON" : "OFF"} statusColor={filtering1 ? "text-green-400" : "text-red-400"}>
                <Switch checked={filtering1} onCheckedChange={setFiltering1} id="filtering1" />
              </SettingItem>
              <SettingItem label="Filtering (Secondary)" icon={filtering2 ? Filter : FilterX} statusText={filtering2 ? "ON" : "OFF"} statusColor={filtering2 ? "text-green-400" : "text-red-400"}>
                <Switch checked={filtering2} onCheckedChange={setFiltering2} id="filtering2" />
              </SettingItem>
            </SettingsSection>

            <SettingsSection title="PERFORMANCE CONFIG">
              <SettingItem label="Bots" icon={Bot}>
                <Input type="number" value={bots} onChange={e => setBots(Number(e.target.value))} id="bots" className="w-24 h-8 bg-slate-800/70 border-slate-700 text-sm text-right" />
              </SettingItem>
              <SettingItem label="Timeout (s)" icon={Clock}>
                <Input type="number" value={timeout} onChange={e => setTimeoutVal(Number(e.target.value))} id="timeout" className="w-24 h-8 bg-slate-800/70 border-slate-700 text-sm text-right" />
              </SettingItem>
              <SettingItem label="Pages" icon={FileDigit}>
                <Input type="number" value={pages} onChange={e => setPages(Number(e.target.value))} id="pages" className="w-24 h-8 bg-slate-800/70 border-slate-700 text-sm text-right" />
              </SettingItem>
              <SettingItem label="DorkCKEES" icon={KeySquare} statusText={dorkCkees ? "ON" : "OFF"} statusColor={dorkCkees ? "text-green-400" : "text-red-400"}>
                <Switch checked={dorkCkees} onCheckedChange={setDorkCkees} id="dorkCkees" />
              </SettingItem>
            </SettingsSection>

            <SettingsSection title="SECURITY">
              <SettingItem label="CheckDB" icon={ShieldCheck} statusText={checkDb ? "ON" : "OFF"} statusColor={checkDb ? "text-green-400" : "text-red-400"}>
                <Switch checked={checkDb} onCheckedChange={setCheckDb} id="checkDb" />
              </SettingItem>
              <SettingItem label="ImportBad" icon={ShieldOff} statusText={importBad ? "ON" : "OFF"} statusColor={importBad ? "text-green-400" : "text-red-400"}>
                <Switch checked={importBad} onCheckedChange={setImportBad} id="importBad" />
              </SettingItem>
            </SettingsSection>

            <div className="mt-8 flex justify-end">
              <Button onClick={handleSaveChanges} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                <Save size={16} className="mr-2" /> Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default SettingsPage;