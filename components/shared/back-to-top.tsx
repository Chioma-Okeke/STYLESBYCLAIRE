'use client'

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                setShowScrollTopButton(true);
            } else {
                setShowScrollTopButton(false);
            }
        })
    })

    return (
        <>
            {showScrollTopButton && (
                <Button
                    className="h-auto size-12 fixed bottom-4 right-5 bg-primary p-2 rounded-full shadow-lg transition ease-out hover:scale-110 duration-300 z-50"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    <ChevronUp
                        className="size-6"
                        color="white"
                    />
                </Button>
            )}
        </>
    )
}