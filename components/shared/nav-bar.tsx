"use client";

import { useState } from "react";
import { navItems } from "@/lib/data";
import { Button } from "../ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="w-full">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl flex items-center justify-between rounded-2xl backdrop-blur-2xl bg-white/10 border border-border/30 p-4">
                <Link href="/">
                    <h1 className="text-white font-semibold tracking-widest">
                        STYLESBYCLAIRE
                    </h1>
                </Link>

                {/* Desktop */}
                <div className="flex items-center gap-4 max-md:hidden text-white">
                    <nav>
                        <ol className="flex items-center gap-4">
                            {navItems.map((item) => (
                                <li
                                    key={item.name}
                                    className="transition-all duration-300 hover:opacity-80"
                                >
                                    <Link href={item.link}>{item.name}</Link>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <Button>Book Consultation</Button>
                </div>

                {/* Mobile Trigger */}
                <Button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden text-white bg-transparent p-0 h-auto"
                >
                    <Menu size={28} />
                </Button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-90"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            className="fixed inset-0 z-100 bg-[#f8f5f1] flex flex-col justify-between"
                            initial={{ y: "-100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <div className="space-y-5">
                                <div className="flex items-center justify-between p-6 border-b">
                                    <Link
                                        href="/"
                                        onClick={() => setIsOpen(false)}>
                                        <h1 className="font-semibold tracking-widest text-lg">
                                            STYLESBYCLAIRE
                                        </h1>
                                    </Link>

                                    <Button className="bg-transparent p-0 h-auto text-primary" onClick={() => setIsOpen(false)}>
                                        <X size={28} />
                                    </Button>
                                </div>

                                <nav className="flex-1 flex flex-col px-8">
                                    <ol className="space-y-8">
                                        {navItems.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.link}
                                                    onClick={() => setIsOpen(false)}
                                                    className="text-lg font-medium"
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ol>
                                </nav>
                            </div>

                            <div className="p-8">
                                <Button className="w-full h-auto py-4 rounded-full">
                                    Book Consultation
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default NavBar;