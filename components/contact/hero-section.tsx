import Image from "next/image"

const ContactHero = () => {
    return (
        <section className="relative overflow-hidden h-[60vh] lg:h-[80vh]">
            <div className="relative aspect-4/5 overflow-hidden w-full h-full after:absolute after:inset-0 after:bg-linear-to-t after:from-black/70 after:to-transparent after:z-10">
                <Image src="/french-curls.png" alt="French Curls" fill className="object-cover object-top" />
            </div>
            <div className="custom-shape-divider-bottom absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform rotate-180 z-50">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </div>
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl w-full text-center lg:text-5xl font-bold text-white/90 z-50">
                Contact Us
            </h1>
        </section>
    )
}

export default ContactHero
