'use client'

import { useState } from "react";
import MaxContainer from "../shared/max-container";
import PaddingContainer from "../shared/padding-container";
import { bookingPolicies, appointmentPrep } from "@/lib/data";
import { cn } from "@/lib/utils";

type Tab = "policies" | "prep";

const BeforeYouBookSection = () => {
    const [activeTab, setActiveTab] = useState<Tab>("policies");

    return (
        <section className="py-10 lg:py-16">
            <PaddingContainer>
                <MaxContainer>
                    <div className="bg-secondary/30 rounded-3xl p-6 sm:p-10 lg:p-14">
                        <div className="text-center space-y-1 mb-8">
                            <p className="font-heading italic text-3xl lg:text-4xl text-primary">before you</p>
                            <h2 className="font-heading text-4xl lg:text-[55px] text-primary uppercase leading-tight">
                                Book
                            </h2>
                        </div>

                        <div className="flex items-center justify-center gap-6 lg:gap-10 mb-8 border-b border-border">
                            <button
                                onClick={() => setActiveTab("policies")}
                                className={cn(
                                    "pb-3 lg:text-lg font-medium border-b-2 -mb-px transition-colors duration-300 cursor-pointer",
                                    activeTab === "policies"
                                        ? "text-primary border-primary"
                                        : "text-muted-foreground border-transparent hover:text-primary"
                                )}
                            >
                                Booking Policies
                            </button>
                            <button
                                onClick={() => setActiveTab("prep")}
                                className={cn(
                                    "pb-3 lg:text-lg font-medium border-b-2 -mb-px transition-colors duration-300 cursor-pointer",
                                    activeTab === "prep"
                                        ? "text-primary border-primary"
                                        : "text-muted-foreground border-transparent hover:text-primary"
                                )}
                            >
                                Appointment Prep
                            </button>
                        </div>

                        {activeTab === "policies" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {bookingPolicies.map((policy, index) => (
                                    <details
                                        key={policy.category}
                                        open={index === 0}
                                        className="group bg-white/50 rounded-xl border border-border/30 overflow-hidden"
                                    >
                                        <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer font-heading uppercase tracking-wide text-sm text-primary list-none">
                                            {policy.category}
                                            <span className="text-lg leading-none text-muted-foreground group-open:hidden">+</span>
                                            <span className="text-lg leading-none text-muted-foreground hidden group-open:inline">–</span>
                                        </summary>
                                        <ul className="px-5 pb-4 space-y-2 lg:text-lg text-muted-foreground list-disc list-inside">
                                            {policy.items.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </details>
                                ))}
                            </div>
                        )}

                        {activeTab === "prep" && (
                            <div className="flex flex-col gap-3 max-w-2xl mx-auto">
                                {appointmentPrep.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-3 bg-white/50 rounded-xl border border-border/30 px-5 py-4"
                                    >
                                        <span className="size-2 rounded-full bg-primary shrink-0 mt-2" />
                                        <p className="lg:text-lg">{item}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </MaxContainer>
            </PaddingContainer>
        </section>
    )
}

export default BeforeYouBookSection
