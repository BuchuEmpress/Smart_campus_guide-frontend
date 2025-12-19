import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';
import { Lock, Mail } from 'lucide-react';

class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.email && this.state.password) {
            this.props.onLogin();
            this.props.router.navigate('/welcome');
        }
    };

    render() {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-primary px-4">
                <h1 className="text-5xl md:text-6xl mb-8 font-extrabold tracking-tighter">
                    Campus<span className="text-accent drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">Guide</span>
                </h1>
                <form
                    className="glass-panel w-full max-w-md p-8 md:p-10 rounded-2xl animate-fade-in"
                    onSubmit={this.handleSubmit}
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                        <p className="text-zinc-400">Access your smart campus assistant</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                <input
                                    name="email"
                                    type="email"
                                    className="input-field pl-10"
                                    placeholder="student@university.edu"
                                    value={this.state.email}
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
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary w-full shadow-lg shadow-accent/20">
                            Login to Account
                        </button>

                        <p className="text-center text-sm text-zinc-400 mt-6">
                            New here? <span
                                className="text-accent hover:text-accent-hover cursor-pointer font-semibold transition-colors"
                                onClick={() => this.props.router.navigate('/signup')}
                            >Create Account</span>
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}

const LoginWithRouter = withRouter(Login);
LoginWithRouter.displayName = 'LoginWithRouter';
export default LoginWithRouter;
