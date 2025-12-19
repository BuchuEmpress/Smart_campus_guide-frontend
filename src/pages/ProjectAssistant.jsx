import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
    Menu, MessageSquare, Send, ArrowLeft, Bot,
    Search, Filter, BookOpen, GraduationCap, ArrowRight,
    Users, CheckCircle, Clock
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import topicService from '../api/topicService';
import sessionUtils from '../utils/sessionUtils';

class ProjectAssistant extends Component {
    state = {
        // UI State
        isSidebarOpen: false,
        activeTab: 'assistant', // 'assistant', 'allocations', 'defense'

        // Assistant State
        selectedAssistantDepartment: null,
        messages: [],
        chatInput: '',
        isTyping: false,
        sessionId: sessionUtils.getSessionId(),

        // Defense Archive State
        defenseSearch: '',
        defenseDepartmentFilter: 'All',
        defenseTopics: [],
        isArchiveLoading: false,

        // Allocations State (Mock for now as per docs)
        allocationSearch: '',
        allocations: [
            { id: 1, student: "John Smith", project: "Smart Campus App", supervisor: "Dr. Alice Web", status: "In Progress", department: "CS" },
            { id: 2, student: "Sarah Connor", project: "AI Defense System", supervisor: "Dr. T. Model", status: "Approved", department: "CS" },
            { id: 3, student: "Mike Ross", project: "Legal Case Prediction", supervisor: "Dr. Pearson", status: "Pending", department: "Law" },
            { id: 4, student: "Rachel Green", project: "Fashion Trend Analysis", supervisor: "Prof. Geller", status: "In Progress", department: "Arts" },
        ]
    };

    componentDidMount() {
        this.fetchDefenseTopics();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.activeTab !== this.state.activeTab && this.state.activeTab === 'defense') {
            this.fetchDefenseTopics();
        }
    }

    fetchDefenseTopics = async () => {
        const { defenseSearch, defenseDepartmentFilter } = this.state;
        this.setState({ isArchiveLoading: true });
        try {
            const results = await topicService.search(defenseSearch, defenseDepartmentFilter);
            // Always check that results.topics is an array before calling .map()
            const topics = Array.isArray(results.topics) ? results.topics : [];

            const mapped = topics.map(t => ({
                id: t.topic_id,
                title: t.title,
                student: t.student || "N/A",
                supervisor: t.supervisor || "N/A",
                department: t.department,
                year: t.year || 2024
            }));

            this.setState({ defenseTopics: mapped, isArchiveLoading: false });
        } catch (error) {
            console.error('Archive fetch error:', error);
            this.setState({ isArchiveLoading: false });
        }
    };

    toggleSidebar = () => {
        this.setState(prevState => ({ isSidebarOpen: !prevState.isSidebarOpen }));
    };

    // --- Assistant Methods ---
    selectDepartment = (dept) => {
        this.setState({
            selectedAssistantDepartment: dept,
            defenseDepartmentFilter: dept.id, // Set the defense filter to the selected department
            messages: [{
                id: 1,
                text: `Welcome to the ${dept.name} project assistant! I'm here to help you with research, methodology, and technical guidance specific to your field. What are you working on?`,
                sender: 'bot'
            }]
        });
    };

    handleChatSend = async (e) => {
        e.preventDefault();
        if (!this.state.chatInput.trim()) return;

        const { chatInput, sessionId, selectedAssistantDepartment } = this.state;
        const userMsg = { id: Date.now(), text: chatInput, sender: 'user' };

        this.setState(prev => ({
            messages: [...prev.messages, userMsg],
            chatInput: '',
            isTyping: true
        }));

        try {
            const response = await topicService.chat(chatInput, sessionId, selectedAssistantDepartment.id);
            const botMsg = {
                id: Date.now() + 1,
                text: response.message || "I'm sorry, I couldn't process that suggestion.",
                sender: 'bot'
            };
            this.setState(prev => ({
                messages: [...prev.messages, botMsg],
                isTyping: false
            }));
        } catch (error) {
            console.error('Assistant error:', error);
            const botMsg = {
                id: Date.now() + 1,
                text: "I'm having trouble connecting to the academic advisor service. Please try again later.",
                sender: 'bot'
            };
            this.setState(prev => ({ messages: [...prev.messages, botMsg], isTyping: false }));
        }
    }

    renderAssistant() {
        const departments = [
            { id: 'sen', name: 'Software Engineering', icon: '💻', desc: 'Software Systems & Development' },
            { id: 'cnsm', name: 'Computer Networking and System Maintenance', icon: '📡', desc: 'Networks, Hardware & Security' },
            { id: 'das', name: 'Data Science', icon: '📊', desc: 'Big Data, AI & Analytics' },
        ];

        if (!this.state.selectedAssistantDepartment) {
            return (
                <div className="animate-fade-in">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Choose your <span className="text-accent">Option</span>
                        </h2>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                            Connect with a specialized AI assistant that can help guide you through your final year project journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {departments.map(dept => (
                            <button
                                key={dept.id}
                                onClick={() => this.selectDepartment(dept)}
                                className="group glass-panel p-6 rounded-2xl text-left transition-all duration-300 hover:bg-accent/5 hover:border-accent/50 hover:-translate-y-1"
                            >
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{dept.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent">{dept.name}</h3>
                                <p className="text-zinc-400 text-sm">{dept.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div className="animate-fade-in h-[calc(100vh-200px)] flex flex-col">
                <button
                    onClick={() => this.setState({ selectedAssistantDepartment: null })}
                    className="mb-4 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors w-fit"
                >
                    <ArrowLeft size={18} /> Back to Options
                </button>

                <div className="flex-1 glass-panel rounded-2xl overflow-hidden flex flex-col border border-white/10">
                    <div className="p-4 border-b border-white/5 bg-zinc-900/50 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/20">
                            <Bot size={20} className="text-accent" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">{this.state.selectedAssistantDepartment.name} Assistant</h3>
                            <span className="text-xs text-green-500 flex items-center gap-1">● Online</span>
                        </div>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto space-y-4">
                        {this.state.messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-4 rounded-2xl ${msg.sender === 'user'
                                    ? 'bg-accent text-white rounded-br-none'
                                    : 'bg-zinc-800 text-zinc-100 rounded-tl-none border border-white/5'
                                    }`}>
                                    {msg.sender === 'bot' ? (
                                        <div className="ai-message-content">
                                            <ReactMarkdown
                                                components={{
                                                    code: ({ inline, className, children, ...props }) => {
                                                        const match = /language-(\w+)/.exec(className || '');
                                                        return !inline && match ? (
                                                            <SyntaxHighlighter
                                                                style={atomOneDark}
                                                                language={match[1]}
                                                                PreTag="div"
                                                                {...props}
                                                            >
                                                                {String(children).replace(/\n$/, '')}
                                                            </SyntaxHighlighter>
                                                        ) : (
                                                            <code className={className} {...props}>
                                                                {children}
                                                            </code>
                                                        );
                                                    }
                                                }}
                                            >
                                                {msg.text}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            </div>
                        ))}
                        {this.state.isTyping && (
                            <div className="text-sm text-zinc-500 italic p-2">Assistant is thinking...</div>
                        )}
                    </div>

                    <form onSubmit={this.handleChatSend} className="p-4 bg-zinc-900/80 border-t border-white/5 flex gap-3">
                        <input
                            className="flex-1 bg-zinc-800 border-zinc-700/50 rounded-full px-6 py-3 text-white focus:outline-none focus:border-accent"
                            placeholder={`Ask about ${this.state.selectedAssistantDepartment.name} projects...`}
                            value={this.state.chatInput}
                            onChange={e => this.setState({ chatInput: e.target.value })}
                        />
                        <button
                            type="submit"
                            className="bg-accent hover:bg-accent-hover text-white px-6 rounded-lg flex items-center justify-center transition-colors font-semibold"
                        >
                            <span className="mr-2">Ask Me</span>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    renderAllocations() {
        const filtered = this.state.allocations.filter(a =>
            a.student.toLowerCase().includes(this.state.allocationSearch.toLowerCase()) ||
            a.project.toLowerCase().includes(this.state.allocationSearch.toLowerCase())
        );

        return (
            <div className="animate-fade-in">
                <div className="glass-panel p-4 rounded-xl mb-8 max-w-xl">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <input
                            className="w-full bg-zinc-800/50 border border-transparent focus:border-accent rounded-lg py-2 pl-12 pr-4 text-white focus:outline-none transition-colors"
                            placeholder="Search student or project..."
                            value={this.state.allocationSearch}
                            onChange={e => this.setState({ allocationSearch: e.target.value })}
                        />
                    </div>
                </div>

                <div className="glass-panel rounded-xl overflow-hidden border border-white/5">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/5 text-zinc-400 text-sm uppercase tracking-wider">
                                    <th className="p-4 font-semibold">Student</th>
                                    <th className="p-4 font-semibold">Project Title</th>
                                    <th className="p-4 font-semibold">Supervisor</th>
                                    <th className="p-4 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filtered.map(alloc => (
                                    <tr key={alloc.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-medium text-white">{alloc.student}</td>
                                        <td className="p-4 text-zinc-400">{alloc.project}</td>
                                        <td className="p-4 text-zinc-300">{alloc.supervisor}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${alloc.status === 'Approved' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                                alloc.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                                                    'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                                                }`}>
                                                {alloc.status === 'Approved' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                                {alloc.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filtered.length === 0 && (
                        <div className="p-8 text-center text-zinc-500">
                            No allocations found.
                        </div>
                    )}
                </div>
            </div>
        );
    }

    renderDefenseArchive() {
        const filtered = this.state.defenseTopics.filter(t =>
            (this.state.defenseDepartmentFilter === 'All' || t.department === this.state.defenseDepartmentFilter) &&
            (t.title.toLowerCase().includes(this.state.defenseSearch.toLowerCase()) || t.student.toLowerCase().includes(this.state.defenseSearch.toLowerCase()))
        );

        return (
            <div className="animate-fade-in">
                <div className="glass-panel p-4 rounded-xl mb-8 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <input
                            className="w-full bg-zinc-800/50 border border-transparent focus:border-accent rounded-lg py-2 pl-12 pr-4 text-white focus:outline-none transition-colors"
                            placeholder="Search by title or student..."
                            value={this.state.defenseSearch}
                            onChange={e => this.setState({ defenseSearch: e.target.value }, this.fetchDefenseTopics)}
                        />
                    </div>
                    <div className="relative w-full md:w-auto min-w-[200px]">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <select
                            className="w-full bg-zinc-800/50 border border-transparent focus:border-accent rounded-lg py-2 pl-12 pr-4 text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                            value={this.state.defenseDepartmentFilter}
                            onChange={e => this.setState({ defenseDepartmentFilter: e.target.value }, this.fetchDefenseTopics)}
                        >
                            <option value="All">All Departments</option>
                            <option value="EPE">Electric Power Engineering (EPE)</option>
                            <option value="EEE">Electrical & Electronic Engineering (EEE)</option>
                            <option value="APT">Animal Production Technology (APT)</option>
                            <option value="CEN">Computer Engineering (CEN)</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(topic => (
                        <div key={topic.id} className="glass-panel p-6 rounded-xl hover:translate-y-[-4px] transition-all duration-300 group cursor-pointer border border-white/5 hover:border-accent/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold border border-accent/20">
                                    {topic.department}
                                </span>
                                <span className="text-zinc-400 text-sm flex items-center gap-1">
                                    <GraduationCap size={14} /> {topic.year}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-4 leading-snug group-hover:text-accent transition-colors text-white">
                                {topic.title}
                            </h3>
                            <div className="pt-4 border-t border-zinc-800/50 text-sm space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-zinc-500">Student:</span>
                                    <span className="text-zinc-200 font-medium">{topic.student}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-500">Supervisor:</span>
                                    <span className="text-zinc-200">{topic.supervisor}</span>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                                    View Abstract <ArrowRight size={12} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full py-12 text-center text-zinc-500">
                            <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
                            <p className="text-lg">No defense topics found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    render() {
        const { activeTab } = this.state;

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

                {/* Top Navbar with Hamburger */}
                <nav className="h-[70px] border-b border-zinc-800 bg-primary/90 backdrop-blur-xl sticky top-0 z-30 px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div />

                        <h1 className="text-xl font-bold tracking-tight text-white">
                            Project<span className="text-accent">Assistant</span>
                        </h1>
                    </div>

                    <div className="flex bg-zinc-900 rounded-lg p-1 border border-white/5">
                        {['assistant', 'allocations', 'defense'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => this.setState({ activeTab: tab })}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === tab
                                    ? 'bg-accent text-white shadow-lg'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </nav>

                <main className="container mx-auto px-4 py-8 max-w-6xl">
                    {activeTab === 'assistant' && this.renderAssistant()}
                    {activeTab === 'allocations' && this.renderAllocations()}
                    {activeTab === 'defense' && this.renderDefenseArchive()}
                </main>
            </div>
        );
    }
}

export default ProjectAssistant;
