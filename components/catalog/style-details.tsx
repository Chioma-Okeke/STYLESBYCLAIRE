"use client"

import { Service } from "@/interface";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import Image from "next/image";
import { useState } from "react";
import { businessRules } from "@/lib/data";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

const StyleDetails = ({ service }: { service: Service }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeImage, setActiveImage] = useState<string>(service.images.length > 0 ? service.images?.[0] : service.image);

    return (
        <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <SheetTrigger asChild>
                <Button className="h-auto py-3 border-primary/60" variant="outline">View Details</Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto pb-5">
                <SheetHeader className="flex items-center justify-between">
                    <SheetTitle className="text-2xl font-semibold">{service?.name}</SheetTitle>
                </SheetHeader>
                <div className="px-5 space-y-5 font-medium">
                    <div className="flex flex-col gap-4">
                        <div className="relative overflow-hidden aspect-4/5 rounded-2xl bg-muted">
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={activeImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                    className="absolute inset-0"
                                >
                                    <motion.div
                                        initial={{ scale: 1.08 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative h-full w-full"
                                    >
                                        <Image
                                            src={activeImage}
                                            alt={service.name}
                                            fill
                                            sizes="100vw"
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className={cn("grid grid-cols-3 gap-2 lg:gap-4 items-center", !service?.images && "hidden")}>
                            {Array.isArray(service?.images) && service?.images.map((image, index) => {
                                return (
                                    <div
                                        onClick={() => {
                                            setActiveImage(image)
                                        }}
                                        key={index}
                                        className="relative overflow-hidden aspect-4/5 rounded-xl bg-muted cursor-pointer border-2 border-transparent hover:border-primary/50 transition-all duration-300 ease-in-out"
                                    >
                                        <Image
                                            src={image}
                                            alt={`Style ${index}`}
                                            fill
                                            className={`h-24 w-24 rounded-xl object-cover transition-all duration-300 ${activeImage === image
                                                ? "ring-2 ring-primary opacity-100"
                                                : "opacity-70 hover:opacity-100"
                                                }`} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-xl lg:text-[22px] font-semibold">Starting at $160</h3>
                        <p>{service?.description}</p>
                        <div className="flex gap-4">
                            {service?.hairIncluded && <p className="text-green-500">Hair Included</p>}
                            {service?.depositRequired && (
                                <p className="text-red-500">Deposit Required: <span className="font-semibold">$25</span></p>
                            )}
                        </div>
                        <Button className="mt-3 h-auto py-3">Book Appointment</Button>
                    </div>
                    <hr className="border-border" />
                    {service?.addOns && (
                        <div className="flex flex-col gap-2">
                            <h3 className="text-[22px]">Add-ons</h3>
                            {service.addOns.map((addon) => (
                                <div className="flex items-center gap-3" key={addon.name}>
                                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/5">
                                        <Check className="size-2.5 text-primary" />
                                    </div>
                                    <p>{addon.name} <span className="font-semibold">+${addon.price.toFixed(2)}</span></p>
                                </div>
                            ))}
                        </div>
                    )}
                    <hr className="border-border" />
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[22px]">What to Know</h3>
                        <ul className="space-y-2">
                            {businessRules.policies.map((policy) => (
                                <li key={policy} className="flex items-center gap-3">
                                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/5">
                                        <Check className="size-2.5 text-primary" />
                                    </div>

                                    <p className="leading-relaxed">
                                        {policy}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Button className="mt-3 h-auto py-3 w-full">Book Now</Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default StyleDetails;