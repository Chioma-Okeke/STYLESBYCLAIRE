import Image from "next/image";
import { Service } from "@/interface";
import StyleDetails from "./style-details";

const ProductCard = ({ service, addons }: { service: Service; addons: Service[] }) => {
    return (
        <>
            <StyleDetails service={service} addons={addons} />
        </>
    )
}

export default ProductCard;