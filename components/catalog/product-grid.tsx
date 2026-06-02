import { services } from "@/lib/data"
import ProductCard from "./product-card"
import MaxContainer from "../shared/max-container"
import PaddingContainer from "../shared/padding-container"

const ProductGrid = () => {
    return (
        <section className="py-10 lg:py-16">
            <MaxContainer>
                <PaddingContainer>
                    <div className="mb-10 space-y-3 text-center">
                        <h2 className="font-semibold text-3xl lg:text-5xl">Styles</h2>
                        <p className="lg:text-lg">Discover our range of beautiful hairstyles.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-8 items-center max-lg:gap-y-6">
                        {
                            services.map((service) => {
                                return (
                                    <ProductCard key={service.id} style={service} />
                                )
                            })
                        }
                    </div>
                </PaddingContainer>
            </MaxContainer>
        </section>
    )
}

export default ProductGrid