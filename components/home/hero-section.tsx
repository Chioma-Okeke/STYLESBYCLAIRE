"use client"

import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import MaxContainer from "../shared/max-container";
import PaddingContainer from "../shared/padding-container";

const heroImages = [
    "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1780522757/IMG_2214_t4kmzu.heic",
    "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1780522755/IMG_4273_qizqod.heic",
    "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1780522755/IMG_5436_1_wrppvw.heic",
    "https://res.cloudinary.com/djrp3aaq9/image/upload/f_auto,q_auto/v1780426919/IMG_4879_os0sb8.heic",
    "https://res.cloudinary.com/djrp3aaq9/image/upload/v1780426919/IMG_5392_leoltg.jpg",
];

const HeroSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[85vh] lg:min-h-screen overflow-hidden bg-black">
            <AnimatePresence initial={false}>
                <motion.div
                    key={heroImages[activeIndex]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <div
                        className="relative h-full w-full aspect-4/5"
                    >
                        <Image
                            src={heroImages[activeIndex]}
                            alt="Stylesbyclaire braided hairstyle"
                            fill
                            sizes="100vw"
                            priority={activeIndex === 0}
                            className="object-cover"
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/50" />

            <PaddingContainer className="relative z-10 flex min-h-[85vh] lg:min-h-screen items-center">
                <MaxContainer className="relative">
                    <div className="w-full absolute left-1/2 -translate-x-1/2  flex flex-col items-center gap-5 text-center mx-auto max-w-2xl">
                        <h1 className="hidden lg:block font-heading text-5xl lg:text-[80px] text-white leading-tight">
                            Stylesbyclaire
                        </h1>
                        <p className="text-white font-medium text-lg max-w-md">
                            Where every style tells a story braids &amp; twists, crafted just for you.
                        </p>
                        <Button size="lg" className="h-auto px-6 py-3">Book Now</Button>
                        <div className="flex items-center gap-2 text-white pt-2">
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((_, index) => (
                                    <Star key={index} className="size-4 fill-white text-white" />
                                ))}
                            </div>
                            <span>•</span>
                            <p className="text-white">Tempe, AZ</p>
                        </div>
                    </div>
                </MaxContainer>
            </PaddingContainer>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
                {heroImages.map((image, index) => (
                    <button
                        key={image}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Show hero image ${index + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ease-in-out cursor-pointer ${index === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                            }`}
                    />
                ))}
            </div>
        </section>
    )
}

export default HeroSection;
