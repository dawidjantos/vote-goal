"use client"

import * as React from "react"
import AutoScroll from "embla-carousel-auto-scroll";
import {useWindowSize} from "@uidotdev/usehooks";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import {partnerInterface, sponsorInterface} from "@/lib/sponsors";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";
import Link from "next/link";

const ColabSlider = ({title, data, orientation, className}: {
  title: string,
  data: Array<sponsorInterface> | Array<partnerInterface>,
  orientation: "vertical" | "horizontal",
  className?: string
}) => {
  const plugin = React.useRef(
    AutoScroll({speed: 0.5, stopOnInteraction: false}),
  )
  const [orientationState, setOrientationState] = useState(orientation)
  const size = useWindowSize();

  useEffect(() => {
    if (orientation === 'vertical') {
      if (size.width !== null && size.width <= 1024) {
        setOrientationState("horizontal");
      } else {
        setOrientationState("vertical")
      }
    }
  }, [size, orientation]);

  return (<div className={cn("w-full flex-col justify-center items-center", className)}>
      <h2 className='font-bold text-center text-2xl text-blue-950 sm:text-3xl lg:text-4xl'>{title}</h2>
      <Carousel
        plugins={[plugin.current]}
        className={cn("mt-10 mb-10", className)}
        orientation={orientationState}
        opts={{
          loop: true
        }}
      >
        <CarouselContent className='max-h-[800px]'>
          {data.map((item, index) => (
            <CarouselItem key={index}
                          className="flex items-center justify-center basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <Link href={item.link} target='_blank'>
                <Image src={item.img} alt={`${item.title}_img`} width={item.width} height={item.height}/>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>

  )
}

export default ColabSlider;