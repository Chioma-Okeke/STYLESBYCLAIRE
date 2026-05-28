import { InstagramIcon, TiktokIcon } from "@/icons"
import { navItems } from "@/lib/data"
import Link from "next/link"
import MaxContainer from "./max-container"
import PaddingContainer from "./padding-container"

const Footer = () => {
    return (
        <footer className="border-t border-border py-10">
            <MaxContainer>
                <PaddingContainer>
                    <div className="flex flex-col items-center gap-6 lg:gap-9">
                        <div className="gap-3 flex flex-col items-center">
                            <h1>STYLESBYCLAIRE</h1>
                            <nav className="flex items-center gap-4 lg:gap-7">
                                {navItems.map((item) => {
                                    return (
                                        <Link key={item.name} href={item.link} className="max-md:text-sm hover:text-primary transition-colors duration-300">
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </nav>
                            <div className="flex items-center gap-4">
                                <InstagramIcon className="size-4" />
                                <TiktokIcon className="size-4" />
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} STYLESBYCLAIRE. All rights reserved.
                        </p>
                    </div>
                </PaddingContainer>
            </MaxContainer>
        </footer>
    )
}

export default Footer