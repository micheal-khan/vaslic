export default function Loading() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8">
            <div className="space-y-6 text-center">
                <div className="w-full h-1 bg-[#222] relative overflow-hidden max-w-sm mx-auto">
                    <div className="absolute inset-y-0 left-0 bg-white animate-[pulse_1s_infinite] w-full" />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-500">Loading Archive...</p>
            </div>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&display=swap');
                div { font-family: 'Space Grotesk', sans-serif; }
            `}</style>
        </div>
    );
}