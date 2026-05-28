import Link from "next/link"
import MaxContainer from "../shared/max-container"
import PaddingContainer from "../shared/padding-container"
import Image from "next/image"

const ServicesSection = () => {
    const overlayStyles = "after:absolute after:inset-0 after:bg-linear-to-t after:from-black/50 after:to-transparent after:rounded-2xl after:content-['']";
    return (
        <section className="py-10 lg:py-16">
            <PaddingContainer>
                <MaxContainer className="space-y-10">
                    <div className="flex flex-col lg:flex-row justify-between max-lg:gap-3 lg:items-end">
                        <div className="max-w-xl space-y-2">
                            <h1 className="font-heading text-4xl lg:text-[55px] text-primary leading-tight">Braided Styles Tailored for Every Occasion</h1>
                            <p className="lg:text-lg">Thoughtfully crafted braid styles designed to elevate your look, protect your natural hair, and fit effortlessly into your lifestyle.</p>
                        </div>
                        <Link href="/catalog" className="bg-primary w-fit text-white shadow-sm px-5 py-3 rounded-sm hover:bg-primary-dark hover:shadow-lg transition-colors duration-300 ease-in-out">
                            See all styles
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        <div className="lg:col-span-1">
                            <div className={`w-full h-full aspect-4/5 relative overflow-hidden rounded-xl ${overlayStyles}`}>
                                <Image
                                    src="/Image1.png"
                                    alt="Stylesbyclaire Braided Hairstyle Example"
                                    sizes="100vw"
                                    fill
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 lg:col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                                <div className={`w-full aspect-4/5 lg:aspect-5/5 relative overflow-hidden rounded-xl ${overlayStyles}`}>
                                    <Image
                                        src="/Cornrows.png"
                                        alt="Stylesbyclaire Braided Hairstyle Example"
                                        sizes="100vw"
                                        fill
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className={`w-full aspect-4/5 lg:aspect-5/5 relative overflow-hidden rounded-xl ${overlayStyles}`}>
                                    <Image
                                        src="/kinky-twist.png"
                                        alt="Stylesbyclaire Braided Hairstyle Example"
                                        sizes="100vw"
                                        fill
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                                <div className={`w-full aspect-4/5 lg:aspect-5/5 relative overflow-hidden rounded-xl ${overlayStyles}`}>
                                    <Image
                                        src="/french-curls.png"
                                        alt="Stylesbyclaire Braided Hairstyle Example"
                                        sizes="100vw"
                                        fill
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className={`w-full aspect-4/5 lg:aspect-5/5 relative overflow-hidden rounded-xl ${overlayStyles}`}>
                                    <Image
                                        src="/box-braids.png"
                                        alt="Stylesbyclaire Braided Hairstyle Example"
                                        sizes="100vw"
                                        fill
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxContainer>
            </PaddingContainer>
        </section>
    )
}

export default ServicesSection