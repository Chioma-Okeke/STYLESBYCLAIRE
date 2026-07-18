import Image from "next/image"
import MaxContainer from "../shared/max-container"
import PaddingContainer from "../shared/padding-container"

const AboutStylistSection = () => {
    return (
        <section className="bg-muted py-10 lg:py-16">
            <PaddingContainer>
                <MaxContainer>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="relative w-full max-w-sm sm:max-w-md mx-auto lg:mx-0 aspect-4/5">
                            <div className="absolute top-0 left-0 w-[75%] h-[85%] bg-secondary rounded-t-full rounded-bl-4xl" />
                            <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-primary rounded-b-full rounded-tr-4xl" />
                            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[68%] aspect-4/5 rounded-2xl overflow-hidden border-8 border-background shadow-xl">
                                <Image
                                    src="/Image1.png"
                                    alt="Maryclaire, Stylesbyclaire hair stylist"
                                    fill
                                    sizes="(min-width: 1024px) 400px, 80vw"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="space-y-5 max-w-xl">
                            <div>
                                <p className="font-heading italic text-3xl lg:text-4xl text-primary">meet your</p>
                                <h2 className="font-heading text-4xl lg:text-[55px] text-primary uppercase leading-tight">
                                    Hair Stylist
                                </h2>
                            </div>
                            <p className="lg:text-lg">
                                Hi, I&apos;m Maryclaire! With over a year of braiding experience, I love turning hair into art. I&apos;m constantly growing in my craft, and your support means so much on this journey.
                            </p>
                            <p className="lg:text-lg font-medium text-foreground">
                                To my clients: Can&apos;t wait to style YOU!
                            </p>
                        </div>
                    </div>
                </MaxContainer>
            </PaddingContainer>
        </section>
    )
}

export default AboutStylistSection
