import React, { Component } from 'react';
import { Search, Filter, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

class DefenseTopics extends Component {
    state = {
        search: '',
        department: 'All',
        topics: [
            { id: 1, title: "Deep Learning for Smart Agriculture", student: "Alice Johnson", supervisor: "Dr. A. Smith", department: "CS", year: 2024 },
            { id: 2, title: "Blockchain in Supply Chain Management", student: "Bob Wilson", supervisor: "Prof. B. Jones", department: "Business", year: 2023 },
            { id: 3, title: "Renewable Energy Grid Optimization", student: "Charlie Brown", supervisor: "Dr. C. White", department: "Engineering", year: 2024 },
            { id: 4, title: "Sentiment Analysis of Social Media Trends", student: "David Lee", supervisor: "Dr. A. Smith", department: "CS", year: 2023 },
            { id: 5, title: "IoT Based Home Automation", student: "Eve Davis", supervisor: "Dr. E. Black", department: "CS", year: 2024 },
            { id: 6, title: "Impact of AI on Digital Marketing", student: "Frank Miller", supervisor: "Prof. B. Jones", department: "Business", year: 2023 },
        ]
    };

    render() {
        const filtered = this.state.topics.filter(t =>
            (this.state.department === 'All' || t.department === this.state.department) &&
            (t.title.toLowerCase().includes(this.state.search.toLowerCase()) || t.student.toLowerCase().includes(this.state.search))
        );

        return (
            <div className="min-h-screen bg-primary">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <h1 className="text-3xl font-bold">Defense Topic <span className="text-accent">Archive</span></h1>
                    </div>

                    <div className="glass-panel p-4 rounded-xl mb-8 flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <input
                                className="input-field pl-12 bg-zinc-800/50"
                                placeholder="Search by title or student..."
                                value={this.state.search}
                                onChange={e => this.setState({ search: e.target.value })}
                            />
                        </div>
                        <div className="relative w-full md:w-auto min-w-[200px]">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <select
                                className="input-field pl-12 bg-zinc-800/50 appearance-none cursor-pointer"
                                value={this.state.department}
                                onChange={e => this.setState({ department: e.target.value })}
                            >
                                <option value="All">All Departments</option>
                                <option value="CS">Computer Science</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Business">Business</option>
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
                                    <span className="text-zinc-500 text-sm flex items-center gap-1">
                                        <GraduationCap size={14} /> {topic.year}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-4 leading-snug group-hover:text-accent transition-colors">
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
            </div>
        );
    }
}
export default DefenseTopics;
