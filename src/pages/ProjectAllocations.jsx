import React, { Component } from 'react';
import { Users, Search, CheckCircle, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';

class ProjectAllocations extends Component {
    state = {
        search: '',
        allocations: [
            { id: 1, student: "John Smith", project: "Smart Campus App", supervisor: "Dr. Alice Web", status: "In Progress", department: "CS" },
            { id: 2, student: "Sarah Connor", project: "AI Defense System", supervisor: "Dr. T. Model", status: "Approved", department: "CS" },
            { id: 3, student: "Mike Ross", project: "Legal Case Prediction", supervisor: "Dr. Pearson", status: "Pending", department: "Law" },
            { id: 4, student: "Rachel Green", project: "Fashion Trend Analysis", supervisor: "Prof. Geller", status: "In Progress", department: "Arts" },
        ]
    };

    render() {
        const filtered = this.state.allocations.filter(a =>
            a.student.toLowerCase().includes(this.state.search.toLowerCase()) ||
            a.project.toLowerCase().includes(this.state.search.toLowerCase())
        );

        return (
            <div className="min-h-screen bg-primary">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8">Project <span className="text-accent">Allocations</span></h1>

                    <div className="glass-panel p-4 rounded-xl mb-8 max-w-xl">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <input
                                className="input-field pl-12 bg-zinc-800/50"
                                placeholder="Search student or project..."
                                value={this.state.search}
                                onChange={e => this.setState({ search: e.target.value })}
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
            </div>
        );
    }
}

export default ProjectAllocations;
