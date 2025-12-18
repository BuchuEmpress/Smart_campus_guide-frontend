import React, { Component } from 'react';
import { Search, MapPin, Navigation as NavIcon, Menu, Wifi, WifiOff } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import navigationService from '../api/navigationService';
import cacheService from '../api/cacheService';
import sessionUtils from '../utils/sessionUtils';

class Navigation extends Component {
    state = {
        search: '',
        selectedLocation: null,
        locations: [],
        isSidebarOpen: false,
        isOnline: navigator.onLine,
        isLoading: false
    };

    componentDidMount() {
        this.fetchLocations();
        window.addEventListener('online', this.updateOnlineStatus);
        window.addEventListener('offline', this.updateOnlineStatus);

        // Sync cache if needed
        if (cacheService.shouldSync()) {
            cacheService.downloadArchive().catch(console.error);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.updateOnlineStatus);
        window.removeEventListener('offline', this.updateOnlineStatus);
    }

    updateOnlineStatus = () => {
        this.setState({ isOnline: navigator.onLine });
    };

    fetchLocations = async () => {
        const { search, isOnline } = this.state;
        this.setState({ isLoading: true });

        try {
            if (isOnline) {
                const results = await navigationService.search(search || "University");
                this.setState({ locations: results, isLoading: false });
            } else {
                const results = cacheService.searchOffline(search);
                this.setState({ locations: results, isLoading: false });
            }
        } catch (error) {
            console.error('Fetch error:', error);
            // Fallback to offline on error
            const results = cacheService.searchOffline(search);
            this.setState({ locations: results, isLoading: false });
        }
    };

    toggleSidebar = () => {
        this.setState(prevState => ({ isSidebarOpen: !prevState.isSidebarOpen }));
    };

    handleSearch = (e) => {
        this.setState({ search: e.target.value }, () => {
            // Debounce or immediate search
            this.fetchLocations();
        });
    };

    handleGetDirections = async () => {
        const { selectedLocation } = this.state;
        if (!selectedLocation) return;

        try {
            const userLoc = await sessionUtils.getCurrentLocation();
            const response = await navigationService.navigate(selectedLocation.name, userLoc);
            alert(`Directions: ${response.message}`);
        } catch (error) {
            alert("Could not calculate directions. Please try again.");
        }
    };

    render() {
        const filtered = this.state.locations.filter(l =>
            l.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
            l.type.toLowerCase().includes(this.state.search.toLowerCase())
        );

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
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">Campus <span className="text-accent">Navigation</span></h1>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${this.state.isOnline ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                            {this.state.isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
                            {this.state.isOnline ? 'Online' : 'Offline Mode'}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
                        {/* Sidebar List */}
                        <div className="glass-panel p-6 rounded-2xl h-fit">
                            <div className="relative mb-6">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                <input
                                    className="input-field pl-12 bg-zinc-800/50"
                                    placeholder="Search locations..."
                                    value={this.state.search}
                                    onChange={this.handleSearch}
                                />
                            </div>

                            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-700">
                                {filtered.map(loc => (
                                    <div
                                        key={loc.id}
                                        className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${this.state.selectedLocation?.id === loc.id
                                            ? 'bg-accent/10 border-accent/50 shadow-[0_0_15px_rgba(217,70,239,0.1)]'
                                            : 'bg-zinc-800/30 border-transparent hover:bg-zinc-800/80 hover:border-zinc-700'
                                            }`}
                                        onClick={() => this.setState({ selectedLocation: loc })}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-semibold text-zinc-100">{loc.name}</h4>
                                            <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">{loc.type}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                            <MapPin size={14} className="text-accent" /> {loc.coords} • {loc.floor}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map View */}
                        <div className="glass-panel rounded-2xl min-h-[500px] flex items-center justify-center relative overflow-hidden bg-black/40">
                            {/* Grid Background */}
                            <div className="absolute inset-0 opacity-20" style={{
                                backgroundImage: 'radial-gradient(#3f3f46 1px, transparent 1px)',
                                backgroundSize: '24px 24px'
                            }}></div>

                            {this.state.selectedLocation ? (
                                <div className="text-center relative z-10 animate-fade-in p-8 bg-black/60 backdrop-blur-sm rounded-2xl border border-white/10">
                                    <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(217,70,239,0.3)] border border-accent/30">
                                        <NavIcon size={40} className="text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">Navigate to {this.state.selectedLocation.name}</h2>
                                    <p className="text-zinc-400 mb-6 font-medium">
                                        {this.state.selectedLocation.floor}, {this.state.selectedLocation.coords}
                                    </p>
                                    <button
                                        className="btn-primary flex items-center gap-2 mx-auto"
                                        onClick={this.handleGetDirections}
                                    >
                                        <NavIcon size={18} /> Start Walking Directions
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center text-zinc-500">
                                    <MapPin size={64} className="mx-auto mb-4 opacity-50" />
                                    <p className="text-lg">Select a location to view on map</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navigation;
