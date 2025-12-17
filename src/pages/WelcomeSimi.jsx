import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';
import { Bot, Sparkles } from 'lucide-react';

class WelcomeSimi extends Component {
    render() {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-primary px-4 text-center">
                <div className="relative mb-10 group">
                    <div className="absolute inset-0 bg-accent rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-slow"></div>
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-accent to-purple-900 border-4 border-white/10 flex items-center justify-center relative z-10 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                        <Bot size={80} className="text-white drop-shadow-lg" />
                    </div>
                    <Sparkles className="absolute top-0 right-0 text-yellow-300 animate-bounce delay-700" />
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                    Hi, I'm <span className="text-accent drop-shadow-[0_0_20px_rgba(217,70,239,0.5)]">Simi</span>
                </h1>

                <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                    Welcome to your personal Smart Campus Guide. I'm here to help you navigate, find resources, and manage your academic life.
                </p>

                <div className="glass-panel p-8 rounded-2xl max-w-lg w-full mb-12 text-left border border-white/5 bg-zinc-900/50">
                    <p className="text-white font-semibold mb-4 text-lg">Try asking me:</p>
                    <ul className="space-y-3 text-zinc-400">
                        <li className="flex items-center gap-3 bg-zinc-800/50 p-3 rounded-lg hover:bg-zinc-800 transition-colors cursor-default">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> "Where is Amphi 750?"
                        </li>
                        <li className="flex items-center gap-3 bg-zinc-800/50 p-3 rounded-lg hover:bg-zinc-800 transition-colors cursor-default">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> "How do I find Dr. Smith's office?"
                        </li>
                        <li className="flex items-center gap-3 bg-zinc-800/50 p-3 rounded-lg hover:bg-zinc-800 transition-colors cursor-default">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> "Show me defense topics"
                        </li>
                    </ul>
                </div>

                <button
                    className="btn-primary text-xl px-12 py-4 rounded-full shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:scale-105 transition-transform"
                    onClick={() => this.props.router.navigate('/chat')}
                >
                    ASK ME
                </button>
            </div>
        );
    }
}

export default withRouter(WelcomeSimi);
