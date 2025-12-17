import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, Map, BookOpen, Users, LayoutDashboard, LogOut, GraduationCap } from 'lucide-react';

class Navbar extends Component {
    render() {
        return (
            <nav className="h-[70px] border-b border-zinc-800 bg-primary/90 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 h-full flex items-center justify-between">
                    <div className="text-xl font-bold tracking-tight">
                        Campus<span className="text-accent">Guide</span>
                    </div>

                    <div className="hidden md:flex items-center gap-2 h-full">
                        <NavLink to="/chat" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            <MessageSquare size={18} /> Chat
                        </NavLink>
                        <NavLink to="/project-assistant" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            <GraduationCap size={18} /> Assistant
                        </NavLink>
                        <NavLink to="/navigation" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            <Map size={18} /> Map
                        </NavLink>

                        <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            <LayoutDashboard size={18} /> Admin
                        </NavLink>
                    </div>

                    <button
                        className="btn-secondary py-2 px-4 text-sm flex items-center gap-2 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50"
                        onClick={() => window.location.href = '/'}
                    >
                        <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </nav>
        );
    }
}

export default Navbar;
