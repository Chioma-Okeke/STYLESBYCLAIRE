"use client"

import { Service } from "@/interface";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import Image from "next/image";
import { useState } from "react";
import { businessRules } from "@/lib/data";
import { Check } from "lucide-react";

const StyleDetails = ({ service }: { service: Service }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <SheetTrigger asChild>
                <Button variant="outline">View Details</Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto pb-2">
                <SheetHeader className="flex items-center justify-between">
                    <SheetTitle className="text-2xl font-semibold">{service?.name}</SheetTitle>
                </SheetHeader>
                <div className="px-5 space-y-5 font-medium">
                    <div className="flex flex-col gap-4">
                        <div className="relative overflow-hidden aspect-4/5">
                            <Image src="/french-curls.png" alt="style image" fill className="object-cover" />
                        </div>
                        <div className="grid grid-cols-3 gap-4 items-center">
                            {[1, 2, 3].map((index) => {
                                return (
                                    <div key={index} className="relative overflow-hidden aspect-4/5 rounded-xl">
                                        <Image src="/french-curls.png" alt={`Style ${index}`} fill className="object-cover" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-xl lg:text-[22px] font-semibold">Starting at $160</h3>
                        <p>{service?.description}</p>
                        <p>Hair Included</p>
                        <p>Deposit Required: <span className="font-semibold">$25</span></p>
                        <Button className="mt-3 h-auto py-4 ">Book Appointment</Button>
                    </div>
                    <hr className="border-border" />
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[22px]">Add-ons</h3>
                        <p>Boho services +$15</p>
                    </div>
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
                    <Button className="mt-3 h-auto py-4 w-full">Book Now</Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default StyleDetails;