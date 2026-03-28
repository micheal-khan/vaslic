"use client";
// Exact Stitch marquee: bg-primary-container (#289bc8), 30s animation
// Text: white / tertiary-fixed (#f5e642) / white / secondary (#ffb4a8)
const segments = [
    { text: "Once it's gone, it's gone. Forever.", color: "#ffffff" },
    { text: "No reprints.", color: "#f5e642" },
    { text: "No restocks.", color: "#ffffff" },
    { text: "No exceptions.", color: "#ffb4a8" },
];
const doubled = [...segments, ...segments, ...segments, ...segments];

export function ManifestoStrip() {
    return (
        <div
            className="overflow-hidden border-y border-white/10"
            style={{ background: "#289bc8", padding: "24px 0" }}
            aria-label="VASLIC manifesto"
        >
            <div
                className="flex whitespace-nowrap"
                style={{ animation: "marquee 30s linear infinite" }}
            >
                {doubled.map((seg, i) => (
                    <span
                        key={i}
                        className="font-headline font-black uppercase text-3xl"
                        style={{ color: seg.color, padding: "0 2rem" }}
                    >
                        {seg.text}
                    </span>
                ))}
            </div>
        </div>
    );
}
