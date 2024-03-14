import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import ScrollTrigger from 'gsap/ScrollTrigger';
import { ReactLenis } from '@studio-freight/react-lenis';

import { SliderData } from './SliderData/SliderData';

import './Home.css';

export default function Home() {
  const ref = useRef();
  const lenisRef = useRef();
  const [elemVisible, setElemVisible] = useState(false);
  gsap.registerPlugin(ScrollTrigger);

  const hiddenRef = useRef();

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  const scrollHandler = () => {
    window.scrollY + window.innerHeight >= hiddenRef.current.offsetTop
      ? setElemVisible(prev => true)
      : setElemVisible(prev => false);
  };

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 10000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  });

  useEffect(() => {
    const imgArray = Array.from(ref?.current.children);
    imgArray.forEach((elem, ind) => {
      elem.style.zIndex = imgArray.length - ind;
    });
    gsap.set('.slideItem', {
      clipPath: function () {
        return 'inset(0px 0px 0px 0px)';
      },
    });
    const animate = gsap.to('.slideItem:not(:last-child)', {
      clipPath: function () {
        return 'inset(0px 0px 100% 0px)';
      },
      stagger: 0.7,
      ease: 'none',
    });

    ScrollTrigger.create({
      trigger: '.homePageWraper',
      start: 'top top',
      end: 'bottom bottom',
      animation: animate,
      scrub: 1,
    });
  }, []);

  return (
    <main>
      <div className='container'>
        <ReactLenis ref={lenisRef} autoRaf={false}>
          <div className='homePageWraper'>
            <div className='sliderLeftPart'>
              {SliderData.map(elem => {
                return (
                  <div key={elem.id} className='textAboutItem'>
                    <h2 className='titleAbout merriweather-black'>
                      {elem.title}
                    </h2>
                    <div className='textAbout merriweather-black-italic '>
                      {elem.text}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className='sliderRightPart'>
              <div className='slidesWrapper' ref={ref}>
                {SliderData.map((elem, ind, arr) => {
                  return (
                    <div key={elem.id} className='slideItem'>
                      <img src={elem.bgImg} alt='sliderImage' />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='scrollTarget' ref={hiddenRef}></div>
          </div>
        </ReactLenis>
      </div>
    </main>
  );
}
