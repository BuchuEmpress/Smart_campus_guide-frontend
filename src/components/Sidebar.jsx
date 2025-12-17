import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
    X,
    Home,
    MessageSquare,
    Map,
    BookOpen,
    Users,
    LayoutDashboard,
    LogOut,
    GraduationCap
} from 'lucide-react';

class Sidebar extends Component {
    render() {
        const { isOpen, onClose } = this.props;

        const overlayClass = isOpen
            ? "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 opacity-100"
            : "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 opacity-0 pointer-events-none";

        const sidebarClass = isOpen
            ? "fixed top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 z-50 transform transition-transform duration-300 translate-x-0 shadow-2xl"
            : "fixed top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 z-50 transform transition-transform duration-300 -translate-x-full shadow-2xl";

        const linkClass = ({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                ? 'bg-accent/10 text-accent font-semibold border-l-2 border-accent'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`;

        return (
            <>
                {/* Overlay */}
                <div className={overlayClass} onClick={onClose} />

                {/* Sidebar */}
                <div className={sidebarClass}>
                    <div className="flex flex-col h-full">
                        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold tracking-tight text-white">
                                Campus<span className="text-accent">Guide</span>
                            </h2>
                            <button onClick={onClose} className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                            <NavLink to="/welcome" className={linkClass} onClick={onClose}>
                                <Home size={20} /> Home
                            </NavLink>
                            <NavLink to="/chat" className={linkClass} onClick={onClose}>
                                <MessageSquare size={20} /> General Chat
                            </NavLink>
                            <NavLink to="/project-assistant" className={linkClass} onClick={onClose}>
                                <GraduationCap size={20} /> Project Assistant
                            </NavLink>
                            <NavLink to="/navigation" className={linkClass} onClick={onClose}>
                                <Map size={20} /> Navigation
                            </NavLink>

                            <div className="pt-4 mt-4 border-t border-zinc-800">
                                <NavLink to="/admin" className={linkClass} onClick={onClose}>
                                    <LayoutDashboard size={20} /> Admin Dashboard
                                </NavLink>
                            </div>
                        </nav>

                        <div className="p-4 border-t border-zinc-800">
                            <button
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                                onClick={() => window.location.href = '/'}
                            >
                                <LogOut size={20} /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Sidebar;
