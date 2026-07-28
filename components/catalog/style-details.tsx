"use client"

import { Service } from "@/interface";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { bookingPolicies, appointmentPrep } from "@/lib/data";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { searchAvailability, createBooking, type TimeSlot } from "@/lib/actions/booking";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import type { TokenResult } from "@square/web-sdk";

type Step = "details" | "addons" | "review" | "payment" | "confirmation";
const STEPS: { key: Step; label: string }[] = [
    { key: "details", label: "Size" },
    { key: "addons", label: "Add-ons" },
    { key: "review", label: "Details" },
    { key: "payment", label: "Payment" },
];

const DEPOSIT = 25;

const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (hours && mins) return `${hours}hr ${mins}min`;
    if (hours) return `${hours}hr`;
    return `${mins}min`;
};

const DOW = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const dateKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const StyleDetails = ({ service, addons }: { service: Service; addons: Service[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<Step>("details");
    const [activeImage, setActiveImage] = useState<string>(service.images.length > 0 ? service.images?.[0] : service.image);
    const [selectedVariationId, setSelectedVariationId] = useState<string | undefined>(service.variations[0]?.id);
    const [selectedAddonIds, setSelectedAddonIds] = useState<Set<string>>(new Set());

    const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);
    const [calCursor, setCalCursor] = useState({ year: today.getFullYear(), month: today.getMonth() });
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [availability, setAvailability] = useState<Record<string, TimeSlot[]>>({});
    const [loadingAvailability, setLoadingAvailability] = useState(false);

    const [contact, setContact] = useState({ name: "", email: "", phone: "", notes: "" });

    const [paymentPending, setPaymentPending] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [bookingId, setBookingId] = useState<string | null>(null);

    const selectedVariation = service.variations.find((v) => v.id === selectedVariationId);
    const selectedAddons = addons.filter((a) => selectedAddonIds.has(a.id));
    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.priceFrom, 0);
    const total = (selectedVariation?.price ?? 0) + addonsTotal;

    const stepIndex = STEPS.findIndex((s) => s.key === step);

    useEffect(() => {
        if (step !== "review" || !selectedVariation) return;

        let cancelled = false;

        async function loadAvailability(variation: NonNullable<typeof selectedVariation>) {
            setLoadingAvailability(true);
            const monthStart = new Date(calCursor.year, calCursor.month, 1);
            const monthEnd = new Date(calCursor.year, calCursor.month + 1, 0, 23, 59, 59);
            const rangeStart = monthStart < today ? today : monthStart;
            try {
                const result = await searchAvailability(
                    variation.id,
                    variation.teamMemberIds,
                    rangeStart.toISOString(),
                    monthEnd.toISOString(),
                );
                if (!cancelled) setAvailability(result);
            } finally {
                if (!cancelled) setLoadingAvailability(false);
            }
        }

        loadAvailability(selectedVariation);
        return () => { cancelled = true; };
    }, [step, calCursor, selectedVariation, today]);

    const resetFlow = () => {
        setStep("details");
        setSelectedAddonIds(new Set());
        setSelectedDate(null);
        setSelectedSlot(null);
        setContact({ name: "", email: "", phone: "", notes: "" });
        setPaymentError(null);
        setBookingId(null);
    };

    const toggleAddon = (id: string) => {
        setSelectedAddonIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    const goNext = () => {
        if (step === "details") setStep(addons.length > 0 ? "addons" : "review");
        else if (step === "addons") setStep("review");
        else if (step === "review") setStep("payment");
    };

    const goBack = () => {
        if (step === "payment") setStep("review");
        else if (step === "review") setStep(addons.length > 0 ? "addons" : "details");
        else if (step === "addons") setStep("details");
    };

    const shiftMonth = (dir: number) => {
        setCalCursor((prev) => {
            let month = prev.month + dir;
            let year = prev.year;
            if (month < 0) { month = 11; year--; }
            if (month > 11) { month = 0; year++; }
            return { year, month };
        });
    };

    const handleCardToken = async (token: TokenResult) => {
        if (token.status !== "OK") {
            const message = token.status === "Error" || token.status === "Invalid"
                ? (token.errors?.[0]?.message ?? "Card was declined. Please try another card.")
                : "Card entry was cancelled. Please try again.";
            setPaymentError(message);
            return;
        }
        if (!selectedVariation || !selectedSlot) return;

        setPaymentPending(true);
        setPaymentError(null);

        const result = await createBooking({
            variationId: selectedVariation.id,
            variationVersion: selectedVariation.version,
            teamMemberId: selectedVariation.teamMemberIds[0],
            startAt: selectedSlot.startAt,
            addons: selectedAddons
                .map((addon) => {
                    const variation = addon.variations[0];
                    if (!variation) return null;
                    return {
                        id: variation.id,
                        version: variation.version,
                        teamMemberId: variation.teamMemberIds[0] ?? selectedVariation.teamMemberIds[0],
                    };
                })
                .filter((a): a is NonNullable<typeof a> => !!a),
            customer: contact,
            sourceId: token.token,
            depositAmount: DEPOSIT,
        });

        setPaymentPending(false);
        if (result.success) {
            setBookingId(result.bookingId);
            setStep("confirmation");
        } else {
            setPaymentError(result.error);
        }
    };

    const firstOfMonth = new Date(calCursor.year, calCursor.month, 1);
    const daysInMonth = new Date(calCursor.year, calCursor.month + 1, 0).getDate();
    const canGoPrevMonth = !(calCursor.year === today.getFullYear() && calCursor.month === today.getMonth());

    return (
        <Sheet open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetFlow(); }}>
            <SheetTrigger asChild>
                <Button className="h-auto py-3 border-primary/60" variant="outline">View Details</Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto pb-5">
                <SheetHeader className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        {step !== "details" && step !== "confirmation" ? (
                            <button type="button" onClick={goBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                                <ChevronLeft className="size-4" /> Back
                            </button>
                        ) : <span />}
                        <SheetTitle className="text-2xl font-semibold">{service?.name}</SheetTitle>
                        <span className="w-10" />
                    </div>

                    {step !== "details" && step !== "confirmation" && (
                        <div className="flex items-center">
                            {STEPS.map((s, i) => (
                                <div key={s.key} className="flex-1 flex flex-col items-center gap-1 relative">
                                    {i > 0 && (
                                        <span className={cn("absolute top-2.5 right-1/2 w-full h-px", i <= stepIndex ? "bg-primary" : "bg-border")} />
                                    )}
                                    <span
                                        className={cn(
                                            "z-10 flex size-5 items-center justify-center rounded-full border text-[10px]",
                                            i < stepIndex ? "bg-primary border-primary text-white" :
                                                i === stepIndex ? "border-primary text-primary font-semibold" :
                                                    "border-border text-muted-foreground bg-background"
                                        )}
                                    >
                                        {i < stepIndex ? <Check className="size-2.5" /> : i + 1}
                                    </span>
                                    <span className={cn("text-[10px] uppercase tracking-wide", i === stepIndex ? "text-primary" : "text-muted-foreground")}>{s.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </SheetHeader>

                <div className="px-5 space-y-5 font-medium">
                    {step === "details" && (
                        <>
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
                                {service?.category && (
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{service.category}</p>
                                )}
                                <h3 className="text-xl lg:text-[22px] font-semibold">Starting at ${service.priceFrom}</h3>
                                {service?.description && (
                                    <p className="whitespace-pre-line">{service.description}</p>
                                )}
                            </div>

                            {service.variations.length > 0 && (
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-[22px]">Choose Your Size</h3>
                                    <div className="flex flex-col gap-2">
                                        {service.variations.map((variation) => {
                                            const isSelected = variation.id === selectedVariationId;
                                            return (
                                                <button
                                                    key={variation.id}
                                                    type="button"
                                                    onClick={() => setSelectedVariationId(variation.id)}
                                                    className={cn(
                                                        "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-200 cursor-pointer",
                                                        isSelected
                                                            ? "border-primary bg-primary/5"
                                                            : "border-border hover:border-primary/40"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span
                                                            className={cn(
                                                                "flex size-4 shrink-0 items-center justify-center rounded-full border",
                                                                isSelected ? "border-primary" : "border-border"
                                                            )}
                                                        >
                                                            {isSelected && <span className="size-2 rounded-full bg-primary" />}
                                                        </span>
                                                        <div>
                                                            <p>{variation.name}</p>
                                                            <p className="text-sm text-muted-foreground font-normal">{formatDuration(variation.durationMinutes)}</p>
                                                        </div>
                                                    </div>
                                                    <p className="tabular-nums shrink-0">${variation.price}</p>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {!!service.deposit && (
                                <p className="text-red-500 text-sm">
                                    ${service.deposit} non-refundable deposit required to secure this appointment.
                                </p>
                            )}

                            <Button className="h-auto py-3 w-full" disabled={!selectedVariation} onClick={goNext}>
                                {selectedVariation ? `Continue — $${selectedVariation.price}` : "Continue"}
                            </Button>

                            <hr className="border-border" />

                            <div className="flex flex-col gap-4">
                                <h3 className="text-[22px]">Before You Book</h3>
                                {bookingPolicies.map((group) => (
                                    <div key={group.category} className="space-y-2">
                                        <p className="text-sm uppercase tracking-wide text-primary">{group.category}</p>
                                        <ul className="space-y-2">
                                            {group.items.map((item) => (
                                                <li key={item} className="flex items-start gap-3">
                                                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/5 mt-0.5">
                                                        <Check className="size-2.5 text-primary" />
                                                    </div>
                                                    <p className="leading-relaxed">{item}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-border" />

                            <div className="flex flex-col gap-2">
                                <h3 className="text-[22px]">Before Your Appointment</h3>
                                <ul className="space-y-2">
                                    {appointmentPrep.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <div className="flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/5 mt-0.5">
                                                <Check className="size-2.5 text-primary" />
                                            </div>
                                            <p className="leading-relaxed">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}

                    {step === "addons" && (
                        <div className="flex flex-col gap-4">
                            <div>
                                <h3 className="text-[22px]">Add-ons</h3>
                                <p className="text-sm text-muted-foreground font-normal">Optional upgrades for your appointment.</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                {addons.map((addon) => {
                                    const isChecked = selectedAddonIds.has(addon.id);
                                    return (
                                        <button
                                            key={addon.id}
                                            type="button"
                                            onClick={() => toggleAddon(addon.id)}
                                            className={cn(
                                                "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-200 cursor-pointer",
                                                isChecked ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={cn(
                                                    "flex size-4 shrink-0 items-center justify-center rounded border",
                                                    isChecked ? "bg-primary border-primary" : "border-border"
                                                )}>
                                                    {isChecked && <Check className="size-3 text-white" />}
                                                </span>
                                                <p>{addon.name}</p>
                                            </div>
                                            <p className="tabular-nums shrink-0">+${addon.priceFrom}</p>
                                        </button>
                                    )
                                })}
                            </div>
                            <div className="flex items-center justify-between rounded-xl bg-muted px-4 py-3">
                                <p className="text-sm uppercase tracking-wide text-muted-foreground">Total</p>
                                <p className="tabular-nums text-lg font-semibold">${total}</p>
                            </div>
                            <Button className="h-auto py-3 w-full" onClick={goNext}>Continue</Button>
                        </div>
                    )}

                    {step === "review" && (
                        <div className="flex flex-col gap-5">
                            <div>
                                <h3 className="text-[22px]">Review &amp; Your Details</h3>
                            </div>

                            <div className="flex flex-col gap-2 rounded-xl border border-border p-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span>{service.name}</span>
                                    <span>{selectedVariation?.name}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-muted-foreground font-normal">
                                    <span>{selectedAddons.length ? selectedAddons.map((a) => a.name).join(", ") : "No add-ons"}</span>
                                    {addons.length > 0 && (
                                        <button type="button" className="text-primary underline text-xs" onClick={() => setStep("addons")}>Edit</button>
                                    )}
                                </div>
                                {selectedDate && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Appointment</span>
                                        <span>{selectedDate.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}{selectedSlot ? `, ${selectedSlot.label}` : ""}</span>
                                    </div>
                                )}
                                <hr className="border-border" />
                                <div className="flex items-center justify-between font-semibold">
                                    <span>Total</span>
                                    <span className="tabular-nums">${total}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-muted-foreground font-normal">Choose a date</p>
                                    {loadingAvailability && <Loader2 className="size-3.5 animate-spin text-muted-foreground" />}
                                </div>
                                <div className="rounded-xl border border-border p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <button type="button" disabled={!canGoPrevMonth} onClick={() => shiftMonth(-1)} className="disabled:opacity-30 cursor-pointer disabled:cursor-default">
                                            <ChevronLeft className="size-4" />
                                        </button>
                                        <p className="text-sm">{MONTHS[calCursor.month]} {calCursor.year}</p>
                                        <button type="button" onClick={() => shiftMonth(1)} className="cursor-pointer">
                                            <ChevronRight className="size-4" />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1">
                                        {DOW.map((d, i) => (
                                            <p key={i} className="text-center text-[10px] text-muted-foreground">{d}</p>
                                        ))}
                                        {Array.from({ length: firstOfMonth.getDay() }).map((_, i) => (
                                            <span key={`blank-${i}`} />
                                        ))}
                                        {Array.from({ length: daysInMonth }).map((_, i) => {
                                            const day = i + 1;
                                            const date = new Date(calCursor.year, calCursor.month, day);
                                            const daySlots = availability[dateKey(date)] ?? [];
                                            const available = date >= today && daySlots.length > 0;
                                            const isSelected = !!selectedDate && date.getTime() === selectedDate.getTime();
                                            return (
                                                <button
                                                    key={day}
                                                    type="button"
                                                    disabled={!available}
                                                    onClick={() => { setSelectedDate(date); setSelectedSlot(null); }}
                                                    className={cn(
                                                        "aspect-square rounded-lg text-xs flex items-center justify-center",
                                                        !available && "text-muted-foreground/40",
                                                        available && !isSelected && "font-semibold hover:bg-primary/10 cursor-pointer",
                                                        isSelected && "bg-primary text-white font-semibold cursor-pointer"
                                                    )}
                                                >
                                                    {day}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                            {selectedDate && (
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm text-muted-foreground font-normal">
                                        Available times — {selectedDate.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {(availability[dateKey(selectedDate)] ?? []).map((slot) => (
                                            <button
                                                key={slot.startAt}
                                                type="button"
                                                onClick={() => setSelectedSlot(slot)}
                                                className={cn(
                                                    "rounded-lg border px-3 py-1.5 text-xs tabular-nums cursor-pointer",
                                                    selectedSlot?.startAt === slot.startAt ? "bg-primary text-white border-primary" : "border-border hover:border-primary/40"
                                                )}
                                            >
                                                {slot.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs text-muted-foreground">Full name</label>
                                    <input
                                        className="rounded-lg border border-border px-3 py-2 text-sm font-normal"
                                        value={contact.name}
                                        onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-muted-foreground">Email</label>
                                        <input
                                            type="email"
                                            className="rounded-lg border border-border px-3 py-2 text-sm font-normal"
                                            value={contact.email}
                                            onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                                            placeholder="jane@email.com"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-muted-foreground">Phone</label>
                                        <input
                                            className="rounded-lg border border-border px-3 py-2 text-sm font-normal"
                                            value={contact.phone}
                                            onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                                            placeholder="(480) 555-0134"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs text-muted-foreground">Notes (hair color, inspo photo, etc.)</label>
                                    <textarea
                                        rows={2}
                                        className="rounded-lg border border-border px-3 py-2 text-sm font-normal"
                                        value={contact.notes}
                                        onChange={(e) => setContact((c) => ({ ...c, notes: e.target.value }))}
                                        placeholder="Include your desired hair color..."
                                    />
                                </div>
                            </div>

                            <Button
                                className="h-auto py-3 w-full"
                                disabled={!selectedDate || !selectedSlot || !contact.name || !contact.email}
                                onClick={goNext}
                            >
                                Continue to Payment
                            </Button>
                        </div>
                    )}

                    {step === "payment" && (
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[22px]">Secure Your Appointment</h3>
                            <p className="text-sm bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
                                <span className="text-primary font-semibold">${DEPOSIT} deposit</span> due now to hold this slot. Remaining balance (${total - DEPOSIT}) is paid at your appointment — cash or Zelle.
                            </p>
                            <div className="flex flex-col gap-2 rounded-xl border border-border p-4 text-sm text-muted-foreground font-normal">
                                <div className="flex items-center justify-between">
                                    <span>{service.name} — {selectedVariation?.name}</span>
                                    <span className="tabular-nums">${selectedVariation?.price}</span>
                                </div>
                                {selectedAddons.map((a) => (
                                    <div key={a.id} className="flex items-center justify-between">
                                        <span>{a.name}</span>
                                        <span className="tabular-nums">${a.priceFrom}</span>
                                    </div>
                                ))}
                                <hr className="border-border" />
                                <div className="flex items-center justify-between text-foreground font-semibold">
                                    <span>Due today</span>
                                    <span className="tabular-nums">${DEPOSIT}</span>
                                </div>
                            </div>
                            {paymentError && (
                                <p className="text-sm text-red-500">{paymentError}</p>
                            )}

                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-muted-foreground">Card details</label>
                                <PaymentForm
                                    applicationId={process.env.NEXT_PUBLIC_SQUARE_APP_ID!}
                                    locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!}
                                    cardTokenizeResponseReceived={handleCardToken}
                                >
                                    <CreditCard
                                        buttonProps={{
                                            isLoading: paymentPending,
                                            css: { width: "100%" },
                                        }}
                                    >
                                        {paymentPending ? "Securing your appointment..." : `Pay $${DEPOSIT} Deposit`}
                                    </CreditCard>
                                </PaymentForm>
                            </div>
                            <p className="text-xs text-muted-foreground font-normal">🔒 Payment handled by Square — card details never touch our server.</p>
                        </div>
                    )}

                    {step === "confirmation" && (
                        <div className="flex flex-col items-center text-center gap-3 py-10">
                            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                                <Check className="size-7 text-primary" />
                            </div>
                            <h3 className="text-[22px]">You&apos;re booked!</h3>
                            <p className="text-sm text-muted-foreground font-normal max-w-xs">
                                Your {service.name} appointment{selectedDate ? ` on ${selectedDate.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}` : ""}{selectedSlot ? ` at ${selectedSlot.label}` : ""} is confirmed. A confirmation email is on its way to {contact.email}.
                            </p>
                            {bookingId && (
                                <p className="text-xs text-muted-foreground font-normal">Confirmation #{bookingId}</p>
                            )}
                            <Button className="h-auto py-3 mt-3" onClick={() => setIsOpen(false)}>
                                Done
                            </Button>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default StyleDetails;
