import Link from "next/link"
import MaxContainer from "../shared/max-container"
import PaddingContainer from "../shared/padding-container"

const serviceColumns = [
    ["Knotless Braids", "Island Twists", "Fulani Braids", "Marley Twists", "Natural Styles"],
    ["French Curl Braids", "Mini Twists", "Fulani Quickweave", "Soft Locs", "Pre-part Services"],
]

const ServicesSection = () => {
    return (
        <section className="py-10 lg:py-16">
            <PaddingContainer>
                <MaxContainer className="space-y-10">
                    <div className="flex flex-col md:flex-row justify-between max-lg:gap-3 lg:items-end">
                        <div className="max-w-xl space-y-2">
                            <h1 className="font-heading text-4xl lg:text-[55px] text-primary leading-tight">Our Services</h1>
                        </div>
                        <Link href="/catalog" className="bg-primary w-fit text-white shadow-sm px-5 py-3 rounded-sm hover:bg-primary-dark hover:shadow-lg transition-colors duration-300 ease-in-out">
                            See all styles
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 md:gap-x-16">
                        {serviceColumns.map((column, columnIndex) => (
                            <div key={columnIndex} className="divide-y divide-border/60">
                                {column.map((service) => (
                                    <p
                                        key={service}
                                        className="font-heading md:text-xl lg:text-3xl text-primary text-center py-2 md:py-4 lg:py-6"
                                    >
                                        {service}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </MaxContainer>
            </PaddingContainer>
        </section>
    )
}

export default ServicesSection