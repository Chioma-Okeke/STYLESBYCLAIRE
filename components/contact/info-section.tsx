import { InstagramIcon, TiktokIcon } from "@/icons";
import MaxContainer from "../shared/max-container";
import PaddingContainer from "../shared/padding-container";

const InfoSection = () => {
    return (
        <section className="pb-10 lg:pb-16">
            <MaxContainer>
                <PaddingContainer>
                    <div className=" lg:text-lg font-medium">
                        <h3 className="font-heading text-3xl mb-3">Speak with us</h3>
                        <a href="tel:(123) 456 7890">(123) 456 7890</a>
                        <p>Personal styling inquiries via WhatsApp or Call.</p>
                    </div>
                    <hr className="my-10 border-primary" />
                    <div className="lg:text-lg font-medium">
                        <h3 className="font-heading text-3xl mb-3">Follow us</h3>
                        <div className="flex items-center gap-3">
                            <InstagramIcon className="size-4 " />
                            <span>@stylesbyclaire</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <TiktokIcon className="size-4 " />
                            <span>@stylesbyclaire</span>
                        </div>
                    </div>
                </PaddingContainer>
            </MaxContainer>
        </section>
    )
}

export default InfoSection;