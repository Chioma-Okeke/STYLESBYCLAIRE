import Image from "next/image"

const Contact = () => {
    return (
        <div>
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
                <Image src="/french-curls.png" alt="French Curls" fill className="object-cover" />
            </div>
        </div>
    )
}


export default Contact