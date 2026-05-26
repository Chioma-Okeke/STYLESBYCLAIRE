import { Star } from "lucide-react"

const Rating = ({ ratings }: { ratings: number }) => {
    return (
        <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={index}
                    className={`size-3 text-primary ${index + 1 <= ratings ? "fill-primary" : "fill-none"}`}
                />
            ))}
        </div>
    )
}

export default Rating