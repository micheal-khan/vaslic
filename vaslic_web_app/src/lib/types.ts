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
