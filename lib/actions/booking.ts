'use server'

import { square, LOCATION_ID } from "@/lib/square"
import { randomUUID } from "crypto"

export type TimeSlot = { startAt: string; label: string }

export async function searchAvailability(
    serviceVariationId: string,
    teamMemberIds: string[],
    rangeStart: string,
    rangeEnd: string,
): Promise<Record<string, TimeSlot[]>> {
    try {
        const response = await square.bookings.searchAvailability({
            query: {
                filter: {
                    startAtRange: { startAt: rangeStart, endAt: rangeEnd },
                    locationId: LOCATION_ID,
                    segmentFilters: [
                        {
                            serviceVariationId,
                            ...(teamMemberIds.length
                                ? { teamMemberIdFilter: { any: teamMemberIds } }
                                : {}),
                        },
                    ],
                },
            },
        })

        const grouped: Record<string, TimeSlot[]> = {}
        for (const availability of response.availabilities ?? []) {
            if (!availability.startAt) continue
            const dateKey = availability.startAt.slice(0, 10)
            const label = new Date(availability.startAt).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
            })
            const list = grouped[dateKey] ?? (grouped[dateKey] = [])
            list.push({ startAt: availability.startAt, label })
        }
        return grouped
    } catch (err) {
        console.error("[searchAvailability]", err)
        return {}
    }
}

export type BookingAddon = { id: string; version: number; teamMemberId: string }

export type BookingPayload = {
    variationId: string
    variationVersion: number
    teamMemberId: string
    startAt: string
    addons: BookingAddon[]
    customer: { name: string; email: string; phone: string; notes: string }
    sourceId: string
    depositAmount: number
}

export type BookingResult =
    | { success: true; bookingId: string }
    | { success: false; error: string }

async function findOrCreateCustomer(customer: BookingPayload["customer"]): Promise<string> {
    const existing = await square.customers.search({
        query: { filter: { emailAddress: { exact: customer.email } } },
    })
    const existingId = existing.customers?.[0]?.id
    if (existingId) return existingId

    const [givenName, ...rest] = customer.name.trim().split(/\s+/)
    const created = await square.customers.create({
        givenName,
        familyName: rest.join(" ") || undefined,
        emailAddress: customer.email,
        phoneNumber: customer.phone || undefined,
    })

    const createdId = created.customer?.id
    if (!createdId) throw new Error("Could not create customer")
    return createdId
}

export async function createBooking(payload: BookingPayload): Promise<BookingResult> {
    try {
        const customerId = await findOrCreateCustomer(payload.customer)

        const appointmentSegments = [
            {
                teamMemberId: payload.teamMemberId,
                serviceVariationId: payload.variationId,
                serviceVariationVersion: BigInt(payload.variationVersion),
            },
            ...payload.addons.map((addon) => ({
                teamMemberId: addon.teamMemberId,
                serviceVariationId: addon.id,
                serviceVariationVersion: BigInt(addon.version),
            })),
        ]

        const bookingResponse = await square.bookings.create({
            booking: {
                locationId: LOCATION_ID,
                startAt: payload.startAt,
                customerId,
                appointmentSegments,
                customerNote: payload.customer.notes || undefined,
            },
        })

        const bookingId = bookingResponse.booking?.id
        if (!bookingId) throw new Error("Booking was not created")

        await square.payments.create({
            sourceId: payload.sourceId,
            idempotencyKey: randomUUID(),
            amountMoney: {
                amount: BigInt(payload.depositAmount * 100),
                currency: "USD",
            },
            locationId: LOCATION_ID,
            customerId,
            note: `Deposit for booking ${bookingId}`,
        })

        return { success: true, bookingId }
    } catch (err) {
        console.error("[createBooking]", err)
        return {
            success: false,
            error: "Something went wrong securing your appointment. Please try again or contact us directly.",
        }
    }
}
