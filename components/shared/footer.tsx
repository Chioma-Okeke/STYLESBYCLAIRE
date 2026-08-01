import { InstagramIcon, TiktokIcon } from "@/icons"
import { navItems } from "@/lib/data"
import Link from "next/link"
import MaxContainer from "./max-container"
import PaddingContainer from "./padding-container"

const Footer = () => {
    return (
        <footer className="border-t border-border py-10 bg-primary text-white">
            <MaxContainer>
                <PaddingContainer>
                    <div className="flex flex-col items-center gap-6 lg:gap-9 lg:text-lg">
                        <div className="gap-3 flex flex-col items-center">
                            <h1 className="text-white">STYLESBYCLAIRE</h1>
                            <nav className="flex items-center gap-4 lg:gap-7">
                                {navItems.map((item) => {
                                    return (
                                        <Link key={item.name} href={item.link} className="max-md:text-sm border-b border-transparent hover:border-white transition-colors duration-300">
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </nav>
                            <div className="flex items-center gap-4">
                                <Link target="_blank" href="https://www.instagram.com/stylesbyclairee">
                                    <InstagramIcon className="size-6 text-white" />
                                </Link>
                                <Link target="_blank" href="https://www.tiktok.com/@stylesbyclairee?_r=1&_t=ZT-98WpJ1NaMww">
                                    <TiktokIcon className="size-4 fill-white" />
                                </Link>
                            </div>
                        </div>
                        <p className="text-sm text-muted">
                            &copy; {new Date().getFullYear()} STYLESBYCLAIRE. All rights reserved.
                        </p>
                    </div>
                </PaddingContainer>
            </MaxContainer>
        </footer>
    )
}

export default Footer