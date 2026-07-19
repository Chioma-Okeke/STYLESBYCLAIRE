import { FacebookIcon, InstagramIcon } from "@/icons";
import MaxContainer from "../shared/max-container";
import PaddingContainer from "../shared/padding-container";

const businessHours = [
    { day: "Mon", hours: "5:00PM - 10:00PM" },
    { day: "Tue", hours: "5:00PM - 10:00PM" },
    { day: "Wed", hours: "5:00PM - 10:00PM" },
    { day: "Thu", hours: "Closed" },
    { day: "Fri", hours: "5:00PM - 10:00PM" },
    { day: "Sat", hours: "12:00PM - 6:00PM" },
    { day: "Sun", hours: "Varies" },
];

const InfoSection = () => {
    return (
        <section className="py-10 lg:py-16">
            <MaxContainer>
                <PaddingContainer>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="w-full max-w-sm mx-auto lg:mx-0 rounded-t-full rounded-b-3xl bg-foreground text-background px-8 pt-14 pb-8 shadow-xl">
                            <p className="font-heading italic text-3xl text-center">business</p>
                            <h3 className="font-heading text-4xl lg:text-5xl uppercase text-center mb-6">Hours</h3>
                            <div className="divide-y divide-dashed divide-background/25">
                                {businessHours.map((item) => (
                                    <div key={item.day} className="flex items-center justify-between py-3 uppercase text-sm lg:text-base tracking-wide">
                                        <span>{item.day}</span>
                                        <span>{item.hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8 lg:text-lg font-medium">
                            <div>
                                <p className="font-heading italic text-3xl text-primary">contact</p>
                                <hr className="border-dotted border-t-2 border-primary/40 my-2" />
                                <a href="mailto:maryclaireokoro@gmail.com">maryclaireokoro@gmail.com</a>
                                <div>
                                    <a href="tel:(123) 456 7890">(123) 456 7890</a>
                                    <p>Personal styling inquiries via WhatsApp or Call.</p>
                                </div>
                            </div>

                            <div>
                                <p className="font-heading italic text-3xl text-primary">location</p>
                                <hr className="border-dotted border-t-2 border-primary/40 my-2" />
                                <p>Tempe, Arizona</p>
                                <p>United States</p>
                            </div>

                            <div>
                                <p className="font-heading italic text-3xl text-primary">social media</p>
                                <hr className="border-dotted border-t-2 border-primary/40 my-2" />
                                <div className="flex items-center gap-3">
                                    <InstagramIcon className="size-4" />
                                    <span>stylesbyclairee</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FacebookIcon className="size-4" />
                                    <span>stylesbyclairee</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </PaddingContainer>
            </MaxContainer>
        </section>
    )
}

export default InfoSection;