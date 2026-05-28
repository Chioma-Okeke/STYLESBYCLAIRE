import MaxContainer from "../shared/max-container"
import PaddingContainer from "../shared/padding-container"
import Image from "next/image"
import TestimonialBanner from "./testimonial-banner"
import { testimonials } from "@/lib/data"
import { Star } from "lucide-react"

const TestimonialSection = () => {
    return (
        <section className="bg-secondary py-10 lg:py-16">
            <PaddingContainer>
                <MaxContainer>
                    <div className="space-y-8 md:grid md:grid-cols-3 w-full md:gap-12">
                        <TestimonialBanner />
                        <div className="w-full md:col-span-1">
                            <div className="relative w-full h-full">
                                <div className="absolute bottom-0 left-0 max-lg:p-4 p-8 z-50 w-full">
                                    <div className="bg-transparent backdrop-blur-2xl rounded-lg w-full flex flex-col items-center gap-1 py-5">
                                        <h2 className="text-xl lg:text-3xl text-white">4.9</h2>
                                        <div className="flex items-center">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <Star
                                                    key={index}
                                                    className="size-3 fill-white text-white"
                                                />
                                            ))}
                                        </div>
                                        <p className="text-white max-lg:text-sm">Client Rating</p>
                                        <div className="flex items-center pl-3">
                                            {testimonials.map((testimonial) => {
                                                return (
                                                    <Image
                                                        key={testimonial.id}
                                                        src={testimonial.image}
                                                        alt={`${testimonial.name}'s profile picture`}
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full border border-white -ml-3 md:size-6"
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="relative aspect-4/5 overflow-hidden rounded-2xl w-full h-full">
                                    <Image src="/french-curls.png" alt="French Curls" fill className="object-cover"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxContainer>
            </PaddingContainer>
        </section>
    )
}

export default TestimonialSection