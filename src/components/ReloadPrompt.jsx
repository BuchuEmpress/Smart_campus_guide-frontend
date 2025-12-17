import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, WifiOff } from 'lucide-react';

function ReloadPrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ' + r);
        },
        onRegisterError(error) {
            console.log('SW registration error', error);
        },
    });

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    if (!offlineReady && !needRefresh) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 p-4 rounded-xl glass-panel border border-accent/20 shadow-2xl animate-fade-in max-w-sm">
            <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    {needRefresh ? <RefreshCw size={20} /> : <WifiOff size={20} />}
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-white text-sm mb-1">
                        {needRefresh ? 'Update Available' : 'Ready for Offline'}
                    </h3>
                    <p className="text-zinc-400 text-xs mb-3">
                        {needRefresh
                            ? 'A new version of CampusGuide is available. Refresh to update.'
                            : 'App is ready to work offline.'}
                    </p>
                    <div className="flex gap-2">
                        {needRefresh && (
                            <button
                                className="btn-primary py-1.5 px-3 text-xs"
                                onClick={() => updateServiceWorker(true)}
                            >
                                Reload
                            </button>
                        )}
                        <button
                            className="btn-secondary py-1.5 px-3 text-xs"
                            onClick={close}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReloadPrompt;
