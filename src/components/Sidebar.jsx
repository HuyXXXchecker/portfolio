import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ListChecks, Settings, HelpCircle, LogOut, PlusSquare, DatabaseZap, Hash, Server, FileText, History as HistoryIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { name: 'Homepage', path: '/', icon: Home, exact: true },
  { name: 'Tasks', path: '/tasks', icon: ListChecks },
  { name: 'Builder', path: '/builder', icon: PlusSquare },
  { name: 'Dumper', path: '/dumper', icon: DatabaseZap },
  { name: 'Dehasher', path: '/dehasher', icon: Hash },
  { name: 'Machines', path: '/machines', icon: Server },
  { name: 'Files', path: '/files', icon: FileText },
  { name: 'History', path: '/history', icon: HistoryIcon },
];

const bottomNavItems = [
  { name: 'Settings', path: '/settings', icon: Settings },
  // { name: 'Help', path: '/help', icon: HelpCircle }, 
  // { name: 'Logout', path: '/logout', icon: LogOut }, 
];

const Sidebar = () => {
  const location = useLocation();

  const NavLinkItem = ({ item }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link to={item.path}>
          <motion.div
            className={`flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer transition-colors duration-200
              ${(item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path))
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                : 'text-slate-400 hover:bg-slate-700/60 hover:text-slate-100'
              }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon size={20} />
          </motion.div>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-slate-800 text-slate-200 border-slate-700">
        <p>{item.name}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className="w-20 bg-slate-900 border-r border-slate-800/70 flex flex-col items-center py-5 space-y-5 shadow-2xl"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/" className="p-1.5 rounded-lg hover:bg-slate-700/50 transition-colors">
            <motion.div 
              className="w-11 h-11 bg-gradient-to-br from-primary to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-md"
              whileHover={{ rotate: 10, scale: 1.05 }}
            >
              D+
            </motion.div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-slate-800 text-slate-200 border-slate-700">
          <p>DorkPlus Tool</p>
        </TooltipContent>
      </Tooltip>
      
      <nav className="flex flex-col items-center space-y-3.5">
        {navItems.map((item) => (
          <NavLinkItem key={item.name} item={item} />
        ))}
      </nav>

      <div className="flex-grow"></div>

      <nav className="flex flex-col items-center space-y-3.5">
        {bottomNavItems.map((item) => (
          <NavLinkItem key={item.name} item={item} />
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;