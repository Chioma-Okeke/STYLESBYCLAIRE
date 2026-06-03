
export const CatalogHeroSection = () => {
    return (
        <section className="catalog-hero after:absolute after:inset-0 after:bg-linear-to-t after:from-black/50 after:to-transparent relative overflow-hidden h-[50vh]">
            <div className="relative h-100 w-full">
                <div className="absolute left-1/2 -translate-1/2 top-1/2 -translate-y-1/2 text-center z-50 w-full px-2">
                    <h1 className="text-3xl lg:text-5xl mb-2 text-white">Braid artistry redefined</h1>
                    <p className="lg:text-lg text-white/80">Each style crafted with precision, attention to detail, and a passion for beauty.</p>
                </div>
            </div>
        </section>
    )
}