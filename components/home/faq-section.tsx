'use client'

import { faqs } from "@/lib/data";
import MaxContainer from "../shared/max-container";
import PaddingContainer from "../shared/padding-container";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FaqSection = () => {
    const [showAnswer, setShowAnswer] = useState<number | null>(1)



    return (
        <section className="py-24">
            <MaxContainer>
                <PaddingContainer>
                    <div className="space-y-4 mb-12">
                        <h2 className="text-4xl lg:text-[70px] text-center">Frequently asked questions</h2>
                        <p className="text-center md:text-lg">Everything you need to know before your appointment.</p>
                    </div>
                    <div className={cn("max-w-150 mx-auto font-medium", {
                        "space-y-6": showAnswer !== null,
                    })}>
                        {faqs.map((faq) => {
                            const isOpen = showAnswer === faq.id

                            return (
                                <div key={faq.id} className="space-y-3">
                                    <div className="text-primary flex items-center gap-3 w-fit cursor-pointer group" onClick={() => setShowAnswer(isOpen ? null : faq.id)}>
                                        <p className={cn("rounded-full text-primary border border-border/10 py-3 px-5 bg-white/50 transition-all duration-300 group-hover:bg-primary group-hover:text-white max-w-100", {
                                            "bg-secondary/70": isOpen
                                        })}>{faq.question}</p>
                                        {
                                            isOpen ? (
                                                <Minus className="border border-primary rounded-full p-1 bg-primary text-white transition-transform duration-300" />
                                            ) : (
                                                <Plus className="border border-primary rounded-full p-1 transition-all bg-background/10 duration-300 group-hover:bg-primary group-hover:text-white" />
                                            )
                                        }
                                    </div>

                                    <div
                                        className={cn(
                                            "relative max-w-110 ml-auto bg-white/80 rounded-2xl border border-border/30 overflow-hidden transform-gpu origin-top transition-all duration-500",
                                            {
                                                // closed state
                                                "max-h-0 opacity-0 scale-95 pointer-events-none": !isOpen,
                                                // open state (arbitrary max height to allow smooth reveal)
                                                "max-h-100 opacity-100 scale-100 px-5 py-3 ": isOpen,
                                            }
                                        )}
                                    >
                                        <p className={cn("transition-opacity duration-400", { "opacity-0": !isOpen, "opacity-100": isOpen })}>{faq.answer}</p>
                                        <div className={cn("absolute -bottom-3 right-6 w-4 h-4 rotate-45 bg-white/80 border border-border/30", { "opacity-0 translate-y-1": !isOpen, "opacity-100 translate-y-0": isOpen })} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </PaddingContainer>
            </MaxContainer>
        </section>
    )
}

export default FaqSection;
