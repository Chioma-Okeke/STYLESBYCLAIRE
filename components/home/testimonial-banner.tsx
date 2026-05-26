'use client'

import { testimonials } from "@/lib/data"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperClass } from "swiper"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRef } from "react";
import { Button } from "../ui/button"
import Rating from "../shared/ratings"

const TestimonialBanner = () => {
    const swiperRef = useRef<SwiperClass | null>(null)

    const handleLeftClick = () => {
        swiperRef.current?.slidePrev?.();
    }

    const handleRightClick = () => {
        swiperRef.current?.slideNext?.();
    }

    return (
        <div className="flex flex-col gap-10 lg:gap-20 justify-between md:col-span-2 h-full relative">
            <div className="flex items-end justify-between">
                <h1 className="text-4xl lg:text-[70px] max-w-37.5 md:max-w-lg">What our Customers say</h1>
                <div className="flex items-center gap-3">
                    <Button onClick={handleLeftClick} className="bg-transparent hover:scale-110 w-fit p-0">
                        <ArrowLeft className="text-primary bg-white rounded-full size-10 p-2.5" />
                    </Button>
                    <Button onClick={handleRightClick} className="bg-transparent hover:scale-110 w-fit p-0">
                        <ArrowRight className="text-primary bg-white rounded-full size-10 p-2.5" />
                    </Button>
                </div>
            </div>
            <div className="flex-1">
                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    slidesPerView="auto"
                    modules={[Autoplay]}
                    spaceBetween={25}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="h-full"
                >
                    {testimonials.map((testimonial) => {
                        return (
                            <SwiperSlide key={testimonial.id} className="md:w-100! h-auto!">
                                <div className="bg-white rounded-xl p-7 flex flex-col max-lg:gap-8 justify-between h-full">
                                    <div className="space-y-2">
                                        <Rating ratings={testimonial.rating} />
                                        <p className="max-md:text-sm font-medium">{testimonial.review}</p>
                                    </div>
                                    <div className="flex items-center max-md:gap-2 gap-4">
                                        <Image src={testimonial.image} alt={`${testimonial.name}'s profile picture`} width={50} height={50} className="rounded-full max-md:size-10" />
                                        <div className="max-md:text-sm">
                                            <h3 className="font-bold">{testimonial.name}</h3>
                                            <p>{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default TestimonialBanner