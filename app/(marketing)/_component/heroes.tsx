import Image from "next/image"


export const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[300px] md:w-[300px]">
                    <Image src={'/heroes.png'} fill alt="heroes" className="object-contain" />
                </div>
            </div>
        </div>
    )
}