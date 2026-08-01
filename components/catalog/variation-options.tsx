import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Check } from "lucide-react"
import { Service } from "@/interface"

interface VariationOptionsProps {
    addon: Service
    selectedAddonIds: Set<string>
    toggleAddon: (id: string) => void
}

export const VariationOptions = ({ addon, selectedAddonIds, toggleAddon }: VariationOptionsProps) => {
    const hasSelection = addon.variations.some((variation) => selectedAddonIds.has(variation.id));


    return (
        <Accordion collapsible type="single">
            <AccordionItem value={addon.id}>
                <AccordionTrigger className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-200 cursor-pointer",
                    hasSelection ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                )}>
                    <div className="flex items-center gap-3">
                        <span className={cn(
                            "flex size-4 shrink-0 items-center justify-center rounded border",
                            hasSelection ? "bg-primary border-primary" : "border-border"
                        )}>
                            {hasSelection && <Check className="size-3 text-white" />}
                        </span>
                        <p>{addon.name}</p>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                    {addon.variations.map((variation) => {
                        const isChecked = selectedAddonIds.has(variation.id);
                        return (
                            <button
                                key={variation.id}
                                type="button"
                                onClick={() => toggleAddon(variation.id)}
                                className={cn(
                                    "w-full flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-colors duration-200 cursor-pointer",
                                    isChecked ? "bg-primary/5" : "hover:bg-primary/5"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={cn(
                                        "flex size-4 shrink-0 items-center justify-center rounded border",
                                        isChecked ? "bg-primary border-primary" : "border-border"
                                    )}>
                                        {isChecked && <Check className="size-3 text-white" />}
                                    </span>
                                    <p>{variation.name}</p>
                                </div>
                                <p className="tabular-nums shrink-0">+${variation.price}</p>
                            </button>
                        )
                    })}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
