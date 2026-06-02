export interface Service {
  id: number;
  name: string;
  category: ServiceCategory;
  description: string;
  price?: number;
  pricing?: ServicePricing;
  pricingType?: PricingType;
  addOns?: AddOn[];
  hairIncluded?: boolean;
  depositRequired?: number;
  image: string;
  featured?: boolean;
}

export type ServiceCategory =
  | "Braids"
  | "Twists"
  | "Locs"
  | "Cornrows"
  | "Add-On";

export type PricingType =
  | "fixed"
  | "starting-at"
  | "per-color";

export type ServicePricing =
  | KnotlessPricing
  | MiniTwistPricing
  | PrePartPricing[]
  | LengthPricing;

export interface KnotlessPricing {
  small?: LengthPrice;
  smedium?: LengthPrice;
  medium?: LengthPrice;
  large?: LengthPrice;
}

export interface LengthPrice {
  shoulder?: number;
  bob?: number;
  midback?: number;
  waist?: number;
}

export interface MiniTwistPricing {
  small?: number;
  smedium?: number;
  medium?: number;
}

export interface PrePartPricing {
  size: string;
  rows: string;
  price: number;
}

export interface LengthPricing {
  smedium?: LengthPrice;
  medium?: LengthPrice;
}

export interface AddOn {
  name: string;
  price: number;
  description?: string;
  pricingType?: PricingType;
}

export interface BusinessRules {
  deposit: DepositPolicy;
  appointmentFees: AppointmentFees;
  policies: string[];
}

export interface DepositPolicy {
  required: boolean;
  amount: number;
  refundable: boolean;
  note: string;
}

export interface AppointmentFees {
  squeezeInAppointment: number;
  weekendStudioAppointment: number;
}