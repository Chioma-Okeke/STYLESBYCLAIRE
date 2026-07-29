import { ServicePresentation } from "@/interface";

export const servicePresentation: Record<string, ServicePresentation> = {
    Z3ONIS3TEQEN6LWXCQX6BM5S: {
        kind: "service",
        image: "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1785349409/two_strand_twist_1_vvfsac.heic",
        deposit: 25,
    }, // Two Strand Twists
    NIBWT2KRPAOFI56MQVGAVV7O: {
        kind: "service",
        image: "https://res.cloudinary.com/djrp3aaq9/image/upload/v1784155210/Logo_j1hiri.png",
        deposit: 25,
    }, //braids (Natural)
    "6LR5V4COFJXSFI3H7UEKHMHV": {
        kind: "service",
        image: "https://res.cloudinary.com/djrp3aaq9/image/upload/v1784155210/Logo_j1hiri.png", // TODO: real photo
        deposit: 25,
    }, //Regular Cornrows
    "4BUORYE4PUWO2X4ZZ7SC5VEE": {
        kind: "service",
        images: [
            "https://res.cloudinary.com/djrp3aaq9/image/upload/v1785349406/fulani_1_frmkxy.jpg",
            "https://res.cloudinary.com/djrp3aaq9/image/upload/v1785349406/fulani_3_okzwmq.jpg",
            "https://res.cloudinary.com/djrp3aaq9/image/upload/v1785349406/fulani_4_qj2mhj.jpg",
        ], // TODO: real photo
        deposit: 25,
    }, // Fulani quick weave
    FRTO73NVENWG6EBZVE3BSOK2: {
        kind: "service",
        image: "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1780522755/IMG_5122_jdpfg2.heic",
        featured: true,
        deposit: 25,
    }, //Knotless braids
    OGFNAROPZTWAE27M46DDOOAV: {
        kind: "service",
        images: [
            "https://res.cloudinary.com/djrp3aaq9/image/upload/v1780426919/IMG_5392_leoltg.jpg",
            "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1780522755/IMG_5122_jdpfg2.heic",
            "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1780426919/IMG_5258_podp7j.heic",
            "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1780426919/IMG_4755_x1musj.heic",
            "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1780522755/IMG_4159_z2mqx6.heic",
        ],
        featured: true,
        deposit: 25,
    }, //French Curls
    IYM2LHYGHX3Q34J2RXU6XBKH: {
        kind: "service",
        images: [
            "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1780522757/IMG_2214_t4kmzu.heic",
            "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1780426921/IMG_2257_ehutyv.heic",
            "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1780426919/IMG_5462_stashq.heic",
        ],
        deposit: 25,
    }, //Marley Twists
    RJ4MUMQJINAEOQQYOVSQ7LTR: {
        kind: "service",
        deposit: 25,
        images: [
            "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1780522755/IMG_5436_1_wrppvw.heic",
            "https://res.cloudinary.com/djrp3aaq9/image/upload/v1785349408/mini_twist_2_bo3xtp.jpg",
            "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1780426919/IMG_4879_os0sb8.heic",
        ],
    }, //Mini Twists
    X42G7FZMZE5BCEGQXZJXYGZ7: {
        kind: "service",
        deposit: 25,
        images: [
            "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1780522757/IMG_2425_wibng4.heic",
            "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1785349408/locs_1_tcnbif.heic",
            "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1785349541/locs_2_la8y5x.heic",
        ],
    }, // Soft Locs
    MZB3EGOWO5QTDEFMBIO56AWZ: {
        kind: "service",
        deposit: 25,
    }, // Miracle Knots
    T7OR3J7SEPSUDCD2XTSQYGO5: { kind: "addon" }, // Hair Add-Ons (boho upgrades)
    "3PBWBZDIV6FQSPCP2JB6EKJG": { kind: "addon" }, // Pop of Color
    YVG52EB2HLVML35ESCJRPJVN: { kind: "addon" }, // Curly Ends
    M7N2WTPMELDKZYL3DSJYKF33: { kind: "addon" }, // Pre-parting
};

export const FALLBACK_IMAGE =
    "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1780522755/IMG_5135_udbzv3.heic";
