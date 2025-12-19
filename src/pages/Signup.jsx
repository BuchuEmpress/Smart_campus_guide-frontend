import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';
import { User, Mail, School, Lock } from 'lucide-react';

class Signup extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        department: 'Computer Science'
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.router.navigate('/');
    };

    render() {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-primary px-4 py-8">
                <h1 className="text-4xl md:text-5xl mb-8 font-extrabold tracking-tight">
                    Join <span className="text-accent drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">CampusGuide</span>
                </h1>
                <form
                    className="glass-panel w-full max-w-md p-8 rounded-2xl animate-fade-in space-y-5"
                    onSubmit={this.handleSubmit}
                >
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <input
                                name="name"
                                className="input-field pl-10"
                                placeholder="John Doe"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Department</label>
                        <div className="relative">
                            <School className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <select
                                name="department"
                                className="input-field pl-10 appearance-none"
                                value={this.state.department}
                                onChange={this.handleChange}
                            >
                                <option value="Computer Science">Computer Science</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Arts">Arts</option>
                                <option value="Business">Business</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <input
                                name="email"
                                type="email"
                                className="input-field pl-10"
                                placeholder="student@university.edu"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <input
                                name="password"
                                type="password"
                                className="input-field pl-10"
                                placeholder="••••••••"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary w-full shadow-lg shadow-accent/20 mt-4">
                        Create Account
                    </button>

                    <p className="text-center text-sm text-zinc-400 pt-4">
                        Already have an account? <span
                            className="text-accent hover:text-accent-hover cursor-pointer font-semibold transition-colors"
                            onClick={() => this.props.router.navigate('/')}
                        >Login</span>
                    </p>
                </form>
            </div>
        );
    }
}

Signup.displayName = 'Signup';
// eslint-disable-next-line react-refresh/only-export-components
export default withRouter(Signup);
