export type ServiceKind = "service" | "addon";

export type ServicePresentation = {
    kind: ServiceKind;
    image?: string;
    images?: string[];
    featured?: boolean;
    deposit?: number;
};

export type ServiceVariation = {
    id: string; // service_variation_id — for availability + booking
    version: number; // service_variation_version — for CreateBooking
    name: string; // "Smedium - Midback"
    price: number; // dollars
    durationMinutes: number;
    teamMemberIds: string[];
};

export type Service = {
    id: string;
    name: string;
    description: string | null;
    kind?: ServiceKind;
    category: string | null;
    priceFrom: number;
    variations: ServiceVariation[];
    image: string;
    images: string[];
    featured?: boolean;
    deposit?: number | null;
};

export type Serialized<T> = T extends bigint
    ? string
    : T extends Date
      ? string // JSON also stringifies Dates
      : T extends Array<infer U>
        ? Serialized<U>[]
        : T extends object
          ? { [K in keyof T]: Serialized<T[K]> }
          : T;
