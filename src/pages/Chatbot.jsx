import React, { Component } from 'react';
import { Send, User, Menu, Bot } from 'lucide-react';
import { withRouter } from '../utils/withRouter';
import Sidebar from '../components/Sidebar';
import navigationService from '../api/navigationService';
import sessionUtils from '../utils/sessionUtils';

class Chatbot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                { id: 1, text: "Hello! I'm Core. How can I help you navigate the campus today?", sender: 'bot' }
            ],
            input: '',
            isTyping: false,
            isSidebarOpen: false,
            sessionId: sessionUtils.getSessionId()
        };
        this.messagesEndRef = React.createRef();
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    handleSend = async (e) => {
        e.preventDefault();
        if (!this.state.input.trim()) return;

        const { input, sessionId, messages } = this.state;
        const userMsg = { id: Date.now(), text: input, sender: 'user' };

        this.setState(prev => ({
            messages: [...prev.messages, userMsg],
            input: '',
            isTyping: true
        }));

        try {
            // Get location if possible
            const location = await sessionUtils.getCurrentLocation();

            // Call API
            const response = await navigationService.chat(input, sessionId, location);

            const botMsg = {
                id: Date.now() + 1,
                text: response.message || "I'm sorry, I couldn't process that.",
                sender: 'bot'
            };

            this.setState(prev => ({
                messages: [...prev.messages, botMsg],
                isTyping: false
            }));
        } catch (error) {
            console.error('Chat error:', error);
            const isNetworkError = error.message === 'Network Error';
            const errorDetail = error.response?.data?.detail || error.message;
            const errorMsg = {
                id: Date.now() + 1,
                text: (
                    <span>
                        {`Oops! I'm having trouble connecting to my brain. (${errorDetail}).`}
                        {isNetworkError && (
                            <div className="mt-2 text-xs">
                                <span className="text-zinc-400">If the server is sleeping, try to </span>
                                <a
                                    href="https://smart-campus-guide-backend.onrender.com/api/topics/statistics"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent hover:underline font-bold"
                                >
                                    Wake it Up here
                                </a>
                                <span className="text-zinc-400"> and then try again.</span>
                            </div>
                        )}
                    </span>
                ),
                sender: 'bot'
            };
            this.setState(prev => ({
                messages: [...prev.messages, errorMsg],
                isTyping: false
            }));
        }
    }

    toggleSidebar = () => {
        this.setState(prevState => ({ isSidebarOpen: !prevState.isSidebarOpen }));
    };

    render() {
        return (
            <div className="flex flex-col h-screen bg-primary">
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
                <div className="flex-1 container mx-auto p-4 max-w-5xl h-[calc(100vh-80px)]">
                    <div className="glass-panel h-full rounded-3xl flex flex-col overflow-hidden shadow-2xl relative border-zinc-800">
                        {/* Header */}
                        <div className="p-6 bg-zinc-900/50 border-b border-white/5 flex items-center gap-4 backdrop-blur-md sticky top-0 z-10">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-purple-800 flex items-center justify-center text-white font-bold text-xl shadow-lg ring-2 ring-white/10">C</div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-zinc-900 animate-pulse"></div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Core</h3>
                                <span className="text-sm text-zinc-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
                                </span>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                            {this.state.messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl shadow-md backdrop-blur-sm transition-all duration-300 ${msg.sender === 'user'
                                        ? 'bg-accent text-white rounded-br-none shadow-[0_4px_15px_rgba(217,70,239,0.3)]'
                                        : 'bg-zinc-800 text-zinc-100 rounded-tl-none border border-white/5'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {this.state.isTyping && (
                                <div className="flex items-center gap-2 p-2">
                                    <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce"></div>
                                    <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce delay-75"></div>
                                    <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce delay-150"></div>
                                </div>
                            )}
                            <div ref={this.messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={this.handleSend}
                            className="p-6 bg-zinc-900/80 backdrop-blur-md border-t border-white/5 flex gap-4 items-center"
                        >
                            <input
                                className="input-field rounded-full px-6 py-4 bg-zinc-800/50 border-zinc-700/50 focus:bg-zinc-800 transition-colors"
                                value={this.state.input}
                                onChange={e => this.setState({ input: e.target.value })}
                                placeholder="Ask about a location, topic, or person..."
                            />
                            <button
                                type="submit"
                                className="btn-primary rounded-full w-14 h-14 p-0 flex items-center justify-center flex-shrink-0 hover:rotate-12 transition-transform"
                                disabled={!this.state.input.trim()}
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Chatbot);
