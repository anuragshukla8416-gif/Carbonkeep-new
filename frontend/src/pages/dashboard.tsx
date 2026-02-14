import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf, Droplets, Zap, ShieldCheck } from 'lucide-react';

const data = [
  { month: 'Jan', carbon: 400, energy: 240, water: 2400 },
  { month: 'Feb', carbon: 300, energy: 139, water: 2210 },
  { month: 'Mar', carbon: 200, energy: 980, water: 2290 },
  { month: 'Apr', carbon: 278, energy: 390, water: 2000 },
  { month: 'May', carbon: 189, energy: 480, water: 2181 },
  { month: 'Jun', carbon: 239, energy: 380, water: 2500 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold text-white">Hotel GreenView Dashboard</h1>
          <p className="text-slate-400">Welcome back, Carbon Saver.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-emerald-900/30 border border-emerald-500/30 px-4 py-2 rounded-full">
            <ShieldCheck className="text-emerald-400 w-5 h-5" />
            <span className="text-sm font-semibold text-emerald-400">GOLD CERTIFIED</span>
          </div>
          <button className="bg-emerald-600 px-6 py-2 rounded-lg font-bold hover:bg-emerald-500 transition-all">
            New Audit
          </button>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<Leaf className="text-emerald-400"/>} label="Total Carbon Saved" value="12.4 Tons" trend="+12%" />
        <StatCard icon={<Zap className="text-yellow-400"/>} label="Energy Savings" value="8,402 kWh" trend="+5%" />
        <StatCard icon={<Droplets className="text-blue-400"/>} label="Water Optimization" value="45,000 L" trend="+18%" />
        <StatCard icon={<ShieldCheck className="text-purple-400"/>} label="Sustainability Score" value="88/100" trend="+2%" />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-lg font-semibold mb-6">Efficiency Trends</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                <Area type="monotone" dataKey="carbon" stroke="#10b981" fillOpacity={1} fill="url(#colorCarbon)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-lg font-semibold mb-6">Priority Actions</h2>
          <div className="space-y-4">
            <ActionItem priority="High" title="HVAC Calibration" desc="Compressor stress detected in Room 402." />
            <ActionItem priority="Medium" title="LED Retrofit" desc="30% old lighting in corridor B." />
            <ActionItem priority="Low" title="Low Flow Valves" desc="Kitchen faucet optimization." />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend }: any) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/30 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-800 rounded-lg">{icon}</div>
        <span className="text-emerald-400 text-xs font-bold">{trend}</span>
      </div>
      <p className="text-slate-400 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function ActionItem({ priority, title, desc }: any) {
  const color = priority === 'High' ? 'text-red-400' : priority === 'Medium' ? 'text-yellow-400' : 'text-blue-400';
  return (
    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
      <div className="flex justify-between mb-1">
        <span className={`text-xs font-bold uppercase ${color}`}>{priority} Priority</span>
      </div>
      <h3 className="font-semibold text-sm">{title}</h3>
      <p className="text-xs text-slate-400">{desc}</p>
    </div>
  );
}
