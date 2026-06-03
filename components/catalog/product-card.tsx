import Image from "next/image";
import { Service } from "@/interface";
import StyleDetails from "./style-details";

const ProductCard = ({ service }: { service: Service }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-muted">
                <Image priority src={service.images?.[0] || service.image} alt="product image" fill className="object-cover" />
            </div>
            <div>
                <h3 className="font-semibold text-center">{service?.name}</h3>
                {/* <p>Starting at:</p>
                <p className="font-semibold">$50</p> */}
            </div>
            <StyleDetails service={service} />
        </div>
    )
}

export default ProductCard;