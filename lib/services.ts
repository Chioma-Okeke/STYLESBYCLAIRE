import "server-only";
import { Service, ServiceVariation } from "@/interface";
import {
    FALLBACK_IMAGE,
    servicePresentation,
} from "@/lib/service-presentation";
import { square } from "@/lib/square";
import { CatalogObject } from "square";

export async function getCatalog(): Promise<{
    services: Service[];
    addons: Service[];
}> {
    // fetching all services offered and the categories list
    const [itemsResult, categoriesResult] = await Promise.all([
        square.catalog.searchItems({
            productTypes: ["APPOINTMENTS_SERVICE"],
        }),
        square.catalog.list({ types: "CATEGORY" }),
    ]);

    console.log(itemsResult, "itemsResult");
    console.log(categoriesResult, "categoriesResult");

    const items: CatalogObject[] = itemsResult.items ?? [];
    const categoryObjects: CatalogObject[] = categoriesResult.data ?? [];

    // sorting categories into an easy lookup
    const categoryName = new Map<string, string>();
    for (const obj of categoryObjects) {
        if (obj.type === "CATEGORY" && obj.id && obj.categoryData?.name) {
            categoryName.set(obj.id, obj.categoryData.name);
        }
    }

    // building the catalog map
    const catalog = items
        .filter(
            (obj): obj is CatalogObject & { type: "ITEM" } =>
                obj.type === "ITEM",
        )
        .map((item) => {
            const data = item.itemData;
            const pres = servicePresentation[item.id];

            if (!pres) {
                console.warn(
                    `[services] No presentation entry: ${data?.name} (${item.id})`,
                );
            }

            const variations: ServiceVariation[] = (data?.variations ?? [])
                .filter(
                    (v): v is CatalogObject & { type: "ITEM_VARIATION" } =>
                        v.type === "ITEM_VARIATION" &&
                        v.itemVariationData?.availableForBooking === true,
                )
                .map((v) => {
                    const data = v.itemVariationData!;
                    return {
                        id: v.id!,
                        version: Number(v.version ?? BigInt(0)),
                        name: data.name ?? "",
                        price:
                            Number(data.priceMoney?.amount ?? BigInt(0)) / 100,
                        durationMinutes:
                            Number(data.serviceDuration ?? BigInt(0)) / 60000,
                        teamMemberIds: data.teamMemberIds ?? [],
                        _ordinal: data.ordinal ?? 0,
                    };
                })
                .sort((a, b) => a._ordinal - b._ordinal)
                .map(({ _ordinal, ...v }) => v);

            return {
                id: item.id!,
                name: data?.name ?? "Unnamed service",
                description:
                    data?.descriptionPlaintext ?? data?.description ?? null,
                kind: pres?.kind ?? "service",
                category:
                    categoryName.get(data?.reportingCategory?.id ?? "") ??
                    categoryName.get(data?.categories?.[0]?.id ?? "") ??
                    null,
                priceFrom: variations.length
                    ? Math.min(...variations.map((v) => v.price))
                    : 0,
                variations,
                image: pres?.image ?? pres?.images?.[0] ?? FALLBACK_IMAGE,
                images: pres?.images ?? (pres?.image ? [pres.image] : []),
                featured: pres?.featured ?? false,
                deposit: pres?.deposit ?? null,
            };
        })
        .filter((s) => s.variations.length > 0);

    return {
        services: catalog.filter((s) => s.kind !== "addon"),
        addons: catalog.filter((s) => s.kind === "addon"),
    };
}

export async function getServices(): Promise<Service[]> {
    const { services } = await getCatalog();
    return services;
}

export async function getAddons(): Promise<Service[]> {
    const { addons } = await getCatalog();
    return addons;
}
