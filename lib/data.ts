import { Service } from "@/interface";

export const navItems = [
    {
        name: "Catalog",
        link: "/catalog",
    },
    {
        name: "Contact Us",
        link: "/contact-us",
    },
];

export const testimonials = [
    {
        id: 1,
        name: "Amara Johnson",
        role: "University Student",
        image: "/french-curls.png",
        review: "Stylesbyclaire always delivers the neatest braids. The experience feels professional, relaxing, and the styles last beautifully for weeks.",
        rating: 5,
    },
    {
        id: 2,
        name: "Danielle Brooks",
        role: "Marketing Professional",
        image: "/french-curls.png",
        review: "From consultation to final styling, everything felt premium. Claire pays attention to detail and makes every appointment feel effortless.",
        rating: 4,
    },
    {
        id: 3,
        name: "Sophia Mensah",
        role: "Beauty Content Creator",
        image: "/french-curls.png",
        review: "I’ve received so many compliments on my knotless braids. The styling was clean, lightweight, and exactly the luxury look I wanted.",
        rating: 5,
    },
    {
        id: 4,
        name: "Grace Williams",
        role: "Parent",
        image: "/french-curls.png",
        review: "Claire was incredibly patient and gentle with my daughter’s hair. The braids were neat, comfortable, and lasted so well.",
        rating: 5,
    },
    {
        id: 5,
        name: "Nia Roberts",
        role: "Entrepreneur",
        image: "/french-curls.png",
        review: "Booking was smooth, the atmosphere was welcoming, and the final style exceeded my expectations. Truly a luxury braiding experience.",
        rating: 4,
    },
];

export const faqs = [
    {
        id: 1,
        question: "How do I book an appointment?",
        answer: "You can book directly through the website by selecting your preferred braid style, choosing a date and time, and completing the booking process.",
    },
    {
        id: 2,
        question: "Do I need to come with my hair washed?",
        answer: "Yes, clients are expected to arrive with clean and properly detangled hair unless a wash service has been added to the appointment.",
    },
    {
        id: 3,
        question: "Is the fixed deposit refundable?",
        answer: "No, the fixed deposit is non-refundable. Deposits secure your appointment slot and help prevent last-minute cancellations.",
    },
    {
        id: 4,
        question: "How long do braid appointments usually take?",
        answer: "Appointment duration depends on the selected style and hair length. Most braid services typically take between 3 to 8 hours.",
    },
    {
        id: 6,
        question: "Do you provide hair extensions?",
        answer: "Yes, hair extensions can be provided for selected styles. Details will be included in the service description before booking.",
    },
];

export const services: Service[] = [
    {
        id: 1,
        name: "Knotless Braids / Twists",
        category: "Braids",
        description:
            "Lightweight and versatile knotless braids or twists with a natural finish. Hair included unless stated otherwise.",
        pricing: {
            small: {
                shoulder: 210,
                midback: 265,
                waist: 335,
            },
            smedium: {
                shoulder: 195,
                midback: 240,
                waist: 285,
            },
            medium: {
                shoulder: 180,
                midback: 215,
                waist: 245,
            },
            large: {
                shoulder: 160,
                midback: 185,
                waist: 205,
            },
        },
        addOns: [
            {
                name: "Boho Service",
                price: 15,
                description: "Adds boho styling (boho curls not included).",
            },
        ],
        hairIncluded: true,
        depositRequired: 25,
        image: "/services/knotless-braids.jpg",
        featured: true,
    },

    {
        id: 2,
        name: "Soft Locs (Extensions)",
        category: "Locs",
        description:
            "Protective soft loc extension style with a lightweight and natural appearance.",
        price: 160,
        pricingType: "starting-at",
        hairIncluded: false,
        depositRequired: 25,
        image: "/services/soft-locs.jpg",
    },

    {
        id: 3,
        name: "Regular Cornrows",
        category: "Cornrows",
        description:
            "Classic scalp braiding style suitable for everyday wear and protective styling.",
        price: 60,
        hairIncluded: false,
        depositRequired: 25,
        image: "/services/regular-cornrows.jpg",
    },

    {
        id: 4,
        name: "Mini Braids",
        category: "Braids",
        description:
            "Small individual braids that provide a long-lasting protective style.",
        price: 95,
        hairIncluded: false,
        depositRequired: 25,
        image: "/services/mini-braids.jpg",
    },

    {
        id: 5,
        name: "2 Strand Twists (Regular)",
        category: "Twists",
        description:
            "Classic two-strand twists that offer a clean and natural protective style.",
        price: 85,
        hairIncluded: false,
        depositRequired: 25,
        image: "/services/two-strand-twists.jpg",
    },

    {
        id: 6,
        name: "Tribal Braids (Front Only)",
        category: "Braids",
        description:
            "Stylish tribal-inspired braiding focused on the front section of the hair.",
        price: 60,
        hairIncluded: false,
        depositRequired: 25,
        image: "/services/tribal-braids.jpg",
    },

    {
        id: 7,
        name: "Fulani Braids",
        category: "Braids",
        description:
            "Traditional Fulani braids featuring detailed parting and decorative styling.",
        price: 185,
        pricingType: "starting-at",
        hairIncluded: false,
        depositRequired: 25,
        image: "/services/fulani-braids.jpg",
    },

    {
        id: 8,
        name: "Mini Twists",
        category: "Twists",
        description:
            "Small twists with synthetic hair included for a fuller and longer-lasting style.",
        pricing: {
            small: 255,
            smedium: 220,
        },
        hairIncluded: true,
        depositRequired: 25,
        image: "/services/mini-twists.jpg",
    },

    {
        id: 9,
        name: "Pre-Part Service",
        category: "Add-On",
        description:
            "Pre-parting service to reduce appointment time and improve styling efficiency.",
        pricing: [
            {
                size: "Small",
                rows: "10 rows",
                price: 75,
            },
            {
                size: "Smedium",
                rows: "8 rows",
                price: 60,
            },
            {
                size: "Medium",
                rows: "6-7 rows",
                price: 50,
            },
        ],
        image: "/services/pre-part.jpg",
    },

    {
        id: 10,
        name: "Marley Twists",
        category: "Twists",
        description:
            "Natural-looking Marley twists with hair included for a lightweight protective style.",
        pricing: {
            smedium: {
                bob: 195,
                midback: 255,
                waist: 310,
            },
        },
        hairIncluded: true,
        depositRequired: 25,
        image: "/services/marley-twists.jpg",
    },

    {
        id: 11,
        name: "French Curls",
        category: "Braids",
        description:
            "Elegant French curl braids with soft, flowing curls. Hair included.",
        pricing: {
            smedium: {
                bob: 220,
                midback: 255,
                waist: 285,
            },
        },
        addOns: [
            {
                name: "Boho",
                price: 20,
            },
            {
                name: "Silky Texture",
                price: 15,
            },
            {
                name: "Pop of Color",
                price: 20,
                pricingType: "per-color",
            },
        ],
        hairIncluded: true,
        depositRequired: 25,
        image: "/services/french-curls.jpg",
        featured: true,
    },
];

export const businessRules = {
    deposit: {
        required: true,
        amount: 25,
        refundable: false,
        note: "Deposit goes towards total service price.",
    },

    appointmentFees: {
        squeezeInAppointment: 70,
        weekendStudioAppointment: 40,
    },

    policies: [
        "Hair is included in all styles except Soft Locs and Boho Curls (Knotless).",
        "Styles or sizes not listed can be discussed prior to booking.",
        "Weekend appointments are studio appointments only.",
    ],
};
