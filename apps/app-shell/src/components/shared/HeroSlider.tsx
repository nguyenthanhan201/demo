import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { clsx } from '@/lib/helpers';
import useTrans from '@/lib/hooks/useTrans';
import { HeroSliderData } from '@/utils/fake-data/hero-slider';

import Button from './Button';
import Img from './Img/Img';

type HeroSliderProps = {
  data: HeroSliderData[];
  timeOut?: number;
  auto?: boolean;
  control?: boolean;
};

const HeroSlider = ({ data, timeOut, auto, control }: HeroSliderProps) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1;
    setActiveSlide(index);
  }, [activeSlide, data]);

  const preSlide = () => {
    const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1;
    setActiveSlide(index);
  };

  useEffect(() => {
    if (!auto) return;
    const slideAuto = setInterval(() => {
      nextSlide();
    }, timeOut);
    return () => {
      clearInterval(slideAuto);
    };
  }, [nextSlide, timeOut, auto]);

  return (
    <div className='hero-slider'>
      <div />
      {data.map((item, index: number) => (
        <HeroSliderItem active={index === activeSlide} index={index} item={item} key={index} />
      ))}
      {control ? (
        <div className='hero-slider_control'>
          <KeyboardArrowLeftOutlinedIcon className='hero-slider_control_item' onClick={preSlide} />
          <div className='hero-slider_control_item'>
            <div className='index'>
              {activeSlide + 1}/{data.length}
            </div>
          </div>
          <KeyboardArrowRightOutlinedIcon
            className='hero-slider_control_item'
            onClick={nextSlide}
          />
        </div>
      ) : null}
    </div>
  );
};
// http://localhost:3000/images/slider/slide-1.webp?w=1920&q=70
const HeroSliderItem = ({ item, active }: any) => {
  const tran = useTrans();
  return (
    <div className={clsx('hero-slider_item', { active })}>
      <div className='hero-slider_item_info'>
        <div className={`hero-slider_item_info_title color-${item.color}`}>
          {/* <span>{t(`HeroSlider.${index}.title`, '')}</span> */}
          {item.title}
        </div>
        <div className='hero-slider_item_info_description'>
          {/* <span>{t(`HeroSlider.${index}.description`, '')}</span> */}
          {item.description}
        </div>
        <div className='hero-slider_item_info_btn'>
          <Link href={item.path as any}>
            <Button
              animate={true}
              backgroundColor={item.color}
              icon={<ShoppingCartOutlinedIcon fontSize='inherit' />}
            >
              {tran.header.home}
            </Button>
          </Link>
        </div>
      </div>
      <div className='hero-slider_item_image'>
        <div className={`shape bg-${item.color}`} />
        {/* <img src={item.img} /> */}
        <Img
          alt='oki'
          className='!max-h-[900px]'
          layout='fill'
          loading={item.path === '/catalog/ao-thun-dinosaur-01' ? 'eager' : undefined}
          // sizes="(max-width: 768px) 100vw,
          //     (max-width: 1200px) 50vw,
          //     33vw"
          src={item.img}
        />
      </div>
    </div>
  );
};

export default HeroSlider;
