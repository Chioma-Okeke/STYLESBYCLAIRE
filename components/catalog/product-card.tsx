import Image from "next/image";
import { Service } from "@/interface";
import StyleDetails from "./style-details";

const ProductCard = ({ service, addons }: { service: Service; addons: Service[] }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-muted">
                <Image priority src={service.images?.[0] || service.image} alt="product image" fill className="object-cover" />
            </div>
            <div className="text-center">
                <h3 className="font-semibold">{service?.name}</h3>
                {!!service.priceFrom && (
                    <p className="text-sm text-muted-foreground">From ${service.priceFrom}</p>
                )}
            </div>
            <StyleDetails service={service} addons={addons} />
        </div>
    )
}

export default ProductCard;