import React, { Component } from 'react';
import { BarChart, Users, FileText, AlertTriangle, ArrowUpRight, Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';

class AdminDashboard extends Component {
    state = {
        isSidebarOpen: false
    };

    toggleSidebar = () => {
        this.setState(prevState => ({ isSidebarOpen: !prevState.isSidebarOpen }));
    };

    render() {
        return (
            <div className="min-h-screen bg-primary">
                <Sidebar
                    isOpen={this.state.isSidebarOpen}
                    onClose={() => this.setState({ isSidebarOpen: false })}
                />

                <button
                    onClick={this.toggleSidebar}
                    className="fixed left-0 top-4 z-40 bg-zinc-900 border border-white/10 p-3 rounded-r-xl shadow-xl text-accent hover:bg-zinc-800 transition-all hover:pl-4"
                    aria-label="Open Menu"
                >
                    <Menu size={24} />
                </button>

                {/* Top Navbar Header Only */}
                <nav className="h-[70px] border-b border-zinc-800 bg-primary/90 backdrop-blur-xl sticky top-0 z-30 px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div />
                        <h1 className="text-xl font-bold tracking-tight text-white">
                            Admin<span className="text-accent">Dashboard</span>
                        </h1>
                    </div>
                </nav>

                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <StatCard icon={<Users size={24} />} title="Active Students" value="1,245" change="+12% from last month" />
                        <StatCard icon={<BarChart size={24} />} title="Chat Queries" value="45,982" change="+8% this week" />
                        <StatCard icon={<FileText size={24} />} title="Defense Topics" value="845" change="+3 new today" />
                        <StatCard icon={<AlertTriangle size={24} />} title="Lost Items" value="12" change="2 recovered" color="text-yellow-500" bg="bg-yellow-500/10" />
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        <div className="glass-panel p-6 rounded-2xl border border-white/5">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                                <button className="text-sm text-accent hover:text-white transition-colors">View All</button>
                            </div>
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="p-4 bg-white/5 rounded-xl flex justify-between items-center hover:bg-white/10 transition-colors cursor-default">
                                        <div>
                                            <p className="font-semibold text-white">New Location Added</p>
                                            <p className="text-sm text-zinc-300">Admin added "Engineering Block D"</p>
                                        </div>
                                        <span className="text-xs text-zinc-400">2h ago</span>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}

const StatCard = ({ icon, title, value, change, color, bg }) => (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
        <div className="absolute top-0 right-0 p-6 opacity-5 scale-[2.5] group-hover:scale-[3] transition-transform duration-500 pointer-events-none text-white">
            {icon}
        </div>
        <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 rounded-xl ${bg || 'bg-accent/10'} ${color || 'text-accent'} shadow-lg`}>
                {icon}
            </div>
        </div>
        <div className="text-4xl font-bold mb-1 tracking-tight text-white">{value}</div>
        <div className="text-zinc-300 text-sm mb-2 font-medium">{title}</div>
        {change && (
            <div className={`text-xs ${color || 'text-green-500'} flex items-center gap-1 font-semibold`}>
                {change}
            </div>
        )}
    </div>
);

export default AdminDashboard;
