import { navItems } from "@/lib/data"
import { Button } from "../ui/button";

const NavBar = () => {
    return (
        <div className="flex items-center justify-between w-[90%] max-w-4xl mx-auto">
            <h1>STYLESBYCLAIRE</h1>
            <div className="space-x-2">
                <nav>
                    <ol className="flex items-center gap-2">
                        {
                            navItems.map((item) => {
                                return (
                                    <li key={item.name}><a href={item.link}>{item.name.toUpperCase()}</a></li>
                                )
                            })
                        }
                    </ol>
                </nav>
                <Button>Book Consultation</Button>
            </div>
        </div>
    )
}

export default NavBar;