import Image from "next/image";
import { Button } from "../ui/button";
import { Service } from "@/interface";

const ProductCard = ({ style }: { style: Service }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="relative aspect-4/5 overflow-hidden">
                <Image src="/french-curls.png" alt="product image" fill className="object-cover" />
            </div>
            <div>
                <h3 className="font-semibold text-center">{style.name}</h3>
                {/* <p>Starting at:</p>
                <p className="font-semibold">$50</p> */}
            </div>
            <Button variant="outline">View Details</Button>
        </div>
    )
}

export default ProductCard;