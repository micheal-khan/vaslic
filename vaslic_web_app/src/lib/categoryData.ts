export type CategorySlug = "gothic" | "bohemian" | "avant-garde" | "street" | "funky";

export interface Product {
    id: string;
    name: string;
    tagline: string;
    price: number;
    units: number;
    unitsLeft?: number;
    dropNumber: string;
    soldOut?: boolean;
}

export interface RetiredDrop {
    id: string;
    name: string;
    year: string;
    note: string;
    diedDate?: string;
    goneIn?: string;
}

export interface CategoryData {
    slug: CategorySlug;
    theme: string;
    name: string;
    headline: string;
    subheadline: string;
    quote?: string;
    accentColor: string;
    retiredSectionTitle: string;
    retiredSectionTagline: string;
    products: Product[];
    retired: RetiredDrop[];
}

export const categories: Record<CategorySlug, CategoryData> = {
    gothic: {
        slug: "gothic",
        theme: "gothic",
        name: "GOTHIC",
        headline: "The Shadow Archive",
        subheadline: "The architecture of shadows.",
        quote: "Wear the darkness. These are not clothes — they are relics.",
        accentColor: "#8b0000",
        retiredSectionTitle: "The Cemetery",
        retiredSectionTagline: "These garments lived and died in darkness. They shall not rise again.",
        products: [
            {
                id: "vlk-goth-009",
                name: "The Mourning Shroud",
                tagline: "Hand-draped charcoal silk, weighted hem, zero symmetry.",
                price: 340,
                units: 12,
                unitsLeft: 3,
                dropNumber: "009",
            },
            {
                id: "vlk-goth-010",
                name: "Reliquary Boots",
                tagline: "Sterling-hardware lacing. Reclaimed leather. Built to outlast you.",
                price: 490,
                units: 8,
                unitsLeft: 8,
                dropNumber: "010",
            },
            {
                id: "vlk-goth-011",
                name: "Sinner's Rosary",
                tagline: "Obsidian beads, 925 silver skull clasp. Limited to 20.",
                price: 195,
                units: 20,
                unitsLeft: 5,
                dropNumber: "011",
            },
            {
                id: "vlk-goth-012",
                name: "Cathedral Cape",
                tagline: "Floor-length black wool. Architectural collar. 7 units only.",
                price: 620,
                units: 7,
                unitsLeft: 2,
                dropNumber: "012",
            },
        ],
        retired: [
            { id: "vlk-goth-001", name: "Obsidian Drift Coat", year: "2023", note: "Gone in 4 days", diedDate: "12.OCT.23" },
            { id: "vlk-goth-004", name: "Void Veil", year: "2023", note: "Gone in 2 hours", diedDate: "31.OCT.23" },
            { id: "vlk-goth-006", name: "Phantom Corset", year: "2024", note: "Sold out at midnight", diedDate: "14.FEB.24" },
            { id: "vlk-goth-007", name: "Gravedigger Gloves", year: "2024", note: "Gone in 90 minutes", diedDate: "01.MAR.24" },
        ],
    },

    bohemian: {
        slug: "bohemian",
        theme: "bohemian",
        name: "BOHEMIAN",
        headline: "Bohemian Rhapsody",
        subheadline: "Organic flow, earth-bound spirit.",
        quote: "Like wildflowers — beautiful, brief, never the same twice.",
        accentColor: "#c77b4a",
        retiredSectionTitle: "The Pressed Archive",
        retiredSectionTagline: "Faded memories pressed between the pages of time. Never reprinted.",
        products: [
            {
                id: "vlk-boho-012",
                name: "The Solar Wrap",
                tagline: "Hand-dyed linen in sun-bleached terracotta. Artisan-knotted fringe.",
                price: 280,
                units: 15,
                unitsLeft: 7,
                dropNumber: "012",
            },
            {
                id: "vlk-boho-013",
                name: "Feather Vest",
                tagline: "Ethically sourced pheasant feathers. Earthy suede base. 10 made.",
                price: 445,
                units: 10,
                unitsLeft: 4,
                dropNumber: "013",
            },
            {
                id: "vlk-boho-014",
                name: "Windswept Silk",
                tagline: "Flowing dupioni silk panels. Desert-rose palette. One-size ritual garment.",
                price: 320,
                units: 18,
                unitsLeft: 11,
                dropNumber: "014",
            },
            {
                id: "vlk-boho-015",
                name: "Workshop Scraps",
                tagline: "Patchwork from every previous Bohemian drop. No two identical.",
                price: 195,
                units: 25,
                unitsLeft: 9,
                dropNumber: "015",
            },
        ],
        retired: [
            { id: "vlk-boho-001", name: "Sun-Drenched Reverie", year: "2023", note: "Sun-drenched reverie" },
            { id: "vlk-boho-007", name: "Wanderer's Path Coat", year: "2023", note: "Wanderer's Path" },
            { id: "vlk-boho-009", name: "Harvest Moon Dress", year: "2024", note: "Gone at dawn" },
            { id: "vlk-boho-011", name: "Desert Rain Shawl", year: "2024", note: "Sold during equinox" },
        ],
    },

    "avant-garde": {
        slug: "avant-garde",
        theme: "avant-garde",
        name: "AVANT-GARDE",
        headline: "Decommissioned Gallery",
        subheadline: "Experimental forms. Defying the expected.",
        quote: "Art is not meant to be mass produced. Neither is this.",
        accentColor: "#008DB9",
        retiredSectionTitle: "Decommissioned Gallery",
        retiredSectionTagline:
            "These artifacts have been permanently removed from circulation. We do not restock. We do not revisit.",
        products: [
            {
                id: "vlk-avnt-015",
                name: "The Asymmetric Void",
                tagline:
                    "Hand-cut from reclaimed heavy-grain linen. Each stitch is a permanent record of the maker's movement.",
                price: 890,
                units: 6,
                unitsLeft: 2,
                dropNumber: "015",
            },
            {
                id: "vlk-avnt-016",
                name: "Chromatic Dysphoria",
                tagline:
                    "A collision of industrial permanence and fragile luxury. Features sand-cast hardware weighing 0.4kg.",
                price: 1240,
                units: 5,
                unitsLeft: 5,
                dropNumber: "016",
                soldOut: false,
            },
        ],
        retired: [
            { id: "vlk-avnt-001", name: "The Glass Shroud", year: "2022", note: "Permanent archive" },
            { id: "vlk-avnt-002", name: "Industrial Spine", year: "2023", note: "Decommissioned 2023" },
            { id: "vlk-avnt-010", name: "Unseen Echo", year: "2023", note: "Permanent archive" },
            { id: "vlk-avnt-012", name: "Void Membrane Coat", year: "2024", note: "Edition of 3 — all claimed" },
        ],
    },

    street: {
        slug: "street",
        theme: "street",
        name: "STREET",
        headline: "RAWKINETICSOUL",
        subheadline: "Brutalist aesthetics. Concrete playground. Urban armor.",
        quote: "Every unit is buffed from the servers upon final sale. No digital footprint remains.",
        accentColor: "#f5e642",
        retiredSectionTitle: "The Buffed Wall",
        retiredSectionTagline:
            "These units have been permanently removed from the digital record. Gone from servers. Gone forever.",
        products: [
            {
                id: "vlk-str-047",
                name: "The Archive Hoodie",
                tagline: "600gsm garment-dyed cotton with encrypted QR drop history stitched at the hem.",
                price: 240,
                units: 50,
                unitsLeft: 22,
                dropNumber: "047",
            },
            {
                id: "vlk-str-048",
                name: "Cargo System v2",
                tagline: "Modular utility pant. 11 pockets. Ripstop nylon. Urban armor for the daily mission.",
                price: 295,
                units: 35,
                unitsLeft: 14,
                dropNumber: "048",
            },
            {
                id: "vlk-str-049",
                name: "Kinetic Graphic Tee",
                tagline: "Screen-printed with reactive ink that shifts with body heat. Edition of 100.",
                price: 110,
                units: 100,
                unitsLeft: 38,
                dropNumber: "049",
            },
        ],
        retired: [
            { id: "vlk-str-099", name: "Buffed Wall Jacket", year: "2023", note: "Gone in 18 days • 100 pieces" },
            { id: "vlk-str-088", name: "Concrete Stitch Pant", year: "2023", note: "Sold in 6 hours" },
            { id: "vlk-str-075", name: "Ghost Tag Hoodie", year: "2022", note: "All buffed" },
            { id: "vlk-str-062", name: "Brutalist Windbreaker", year: "2022", note: "No reprints" },
        ],
    },

    funky: {
        slug: "funky",
        theme: "funky",
        name: "FUNKY",
        headline: "THE CURATED CHAOS COLLECTION",
        subheadline: "Retro-future pop. Electric energy. Stand out in the void.",
        quote:
            "Limited edition artifacts for the retro-future enthusiast. Each drop is a heartbeat in time. Once it's partied out, it's gone!",
        accentColor: "#00f5d4",
        retiredSectionTitle: "The Setlist — Retired Releases",
        retiredSectionTagline: "SCARCITY ALERT: ONCE IT'S PARTIED OUT, IT'S GONE! NO ENCORES!",
        products: [
            {
                id: "vlk-fnk-031",
                name: "NEON PULSE VEST",
                tagline: "Experimental weave technology paired with 80s synthwave aesthetics.",
                price: 189,
                units: 30,
                unitsLeft: 12,
                dropNumber: "031",
            },
            {
                id: "vlk-fnk-032",
                name: "CHRONOS DECK",
                tagline:
                    "Analog feedback loop processor in a handheld polycarbonate chassis.",
                price: 420,
                units: 10,
                unitsLeft: 3,
                dropNumber: "032",
            },
            {
                id: "vlk-fnk-033",
                name: "STATIC CAPSULE",
                tagline: "Wearable digital storage that looks like a glitch in the simulation.",
                price: 89,
                units: 60,
                unitsLeft: 48,
                dropNumber: "033",
            },
        ],
        retired: [
            { id: "vlk-fnk-vibe-01", name: "VOID WALKER BOOTS", year: "2023", note: "Only 25 made • Sold in 12h" },
            { id: "vlk-fnk-chrd-09", name: "LASER-CUT KIMONO v2", year: "2023", note: "Only 10 made • Sold in 3m" },
            { id: "vlk-fnk-001", name: "CYBER-PUNK HEADSET ALPHA", year: "2024", note: "No Reprints" },
            { id: "vlk-fnk-002", name: "OBLIVION GLASSES", year: "2024", note: "Out of existence" },
        ],
    },
};
