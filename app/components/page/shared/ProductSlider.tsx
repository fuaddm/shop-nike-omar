import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { Button } from 'react-aria-components';
import { type Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProductCard } from '@components/page/shared/ProductCard';

import { cn } from '@libs/cn';

export function ProductSlider() {
  const swiperReference = useRef<SwiperType | null>(null);
  const [beginAndEnd, setBeginAndEnd] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const swipePrevious = useCallback(() => {
    swiperReference.current?.slidePrev();
  }, []);

  const swipeNext = useCallback(() => {
    swiperReference.current?.slideNext();
  }, []);

  function slideChanged(swiper: SwiperType) {
    setBeginAndEnd({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    });
  }

  return (
    <div className="relative z-0">
      <Button
        onPress={swipePrevious}
        className={cn({
          'bg-surface-container-highest absolute top-1/2 left-0 z-10 -translate-x-[calc(50%-8px)] -translate-y-1/2 rounded-full transition': true,
          'opacity-40': beginAndEnd.isBeginning,
        })}
      >
        <ChevronLeft className="stroke-on-surface box-content h-4 w-4 py-3 ps-2 pe-2.5 md:h-6 md:w-6" />
      </Button>
      <Button
        onPress={swipeNext}
        className={cn({
          'bg-surface-container-highest absolute top-1/2 right-0 z-10 translate-x-[calc(50%-8px)] -translate-y-1/2 rounded-full transition': true,
          'opacity-40': beginAndEnd.isEnd,
        })}
      >
        <ChevronRight className="stroke-on-surface box-content h-4 w-4 py-3 ps-2.5 pe-2 md:h-6 md:w-6" />
      </Button>
      <Swiper
        spaceBetween={8}
        slidesPerView={2.1}
        onSlideChange={slideChanged}
        resistanceRatio={0}
        onSwiper={(swiper) => (swiperReference.current = swiper)}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
          const title = index % 2 === 1 ? 'Dynasty Cream' : 'Dynasty CreamCream';
          return (
            <SwiperSlide
              key={index}
              className="!h-auto"
            >
              <ProductCard title={title} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
