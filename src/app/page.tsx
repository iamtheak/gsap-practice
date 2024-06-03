"use client"
import { Suspense, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Car from "@/components/car/car";
import Content from "@/components/test/test";
import ReactiveDiv from "@/components/reactiveDiv/reacticeDiv";
import LoadingScreen from '@/components/loadingScreen/loading';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const carsContainer = useRef<HTMLDivElement>(null);
  const verticalScrollContainer = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useGSAP(() => {
    setIsClient(true);

    let tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: carsContainer.current,
        scrub: true,
        pin: true,
        end: () => "+=" + (carsContainer.current as HTMLDivElement).offsetWidth,
        toggleActions: "play pause none reset"
      }
    });

    tl.to(carsContainer.current, { xPercent: -66 });

    let cars = document.querySelectorAll('.car');
    cars.forEach((car, index) => {
      let header = car.querySelector('.header');
      if (header) {
        console.log(header.innerHTML);
        tl.to(header, {
          clipPath: "inset(0)",
          scrollTrigger: {
            trigger: header,
            scrub: true,
            start: "left center",
            end: "right center",
            containerAnimation: tl,
            toggleActions: "play none none pause"
          },
          transition: "all 1.5s ease-in"
        });
      }
    });
  }, [carsContainer.current]);

  useGSAP(() => {
    gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: ".verticalScrollWrapper",
        scrub: true,
        start: "top top",
        end: "bottom bottom",
        pin: ".vHeader",
        markers: true
      }
    });
  }, []);

  if (!isClient) {
    return null;
  }

  const porscheObj = useLoader(GLTFLoader, "/static/glb/porsche_gt3_rs.glb");
  const ferrari55 = useLoader(GLTFLoader, '/static/glb/scuderia_ferrari_f1_sf23_2023.glb');
  const pagani = useLoader(GLTFLoader, '/static/glb/pagani_huayra_roadster_2020.glb');

  
  const loadingScreen = <LoadingScreen />;
  return (
    <Suspense fallback={loadingScreen}>
    <main>
      <div style={{ minHeight: "100vh", fontSize: "10rem" }}>
        Incredible Machines Need No Recognition, They Are History
      </div>
      <div className='carsWrapper'>
        <div className='carsContainer' ref={carsContainer}>
          <section className='car'>
            <ReactiveDiv text="Porsche GT3 RS"></ReactiveDiv>
            <Car obj={porscheObj} id="porsche" className="carCanvas" />
            <Content>
              <p>The Porsche GT3 RS is a dream of every man and also Bijee's favorite car.</p>
            </Content>
          </section>
          <section className='car'>
            <ReactiveDiv text="Scuderia Ferrari 55"></ReactiveDiv>
            <Car obj={ferrari55} id="ferrari" className="carCanvas" />
            <Content>
              <p>One of the best Ferrari F1 cars ever made. The number is of Carlos Sainz who is Bijee's favorite driver.</p>
            </Content>
          </section>
          <section className='car'>
            <ReactiveDiv text="Pagani Huarya Roadster BC"></ReactiveDiv>
            <Car obj={pagani} id="pagani" scale={2.5} className="carCanvas" />
            <Content>
              <p>Pagani Roadster BC named after the first customer of Pagani, Mr. Benny Caiola. It is my dream car.</p>
            </Content>
          </section>
        </div>
      </div>
      <div className="verticalScrollWrapper">
        <div className="vHeader">
          <h1>Vertical Scroll</h1>
        </div>
        <div className="verticalScrollContainer" style={{ marginTop: "50px" }} ref={verticalScrollContainer}>
          <div className="scrollPage" style={{ minHeight: "100vh", backgroundColor: "grey" }}>
            <h2>Page 1</h2>
          </div>
          <div className="scrollPage" style={{ minHeight: "100vh", backgroundColor: "grey" }}>
            <h2>Page 2</h2>
          </div>
          <div className="scrollPage" style={{ minHeight: "100vh", backgroundColor: "grey" }}>
            <h2>Page 3</h2>
          </div>
          <div className="scrollPage" style={{ minHeight: "100vh", backgroundColor: "grey" }}>
            <h2>Page 4</h2>
          </div>
        </div>
      </div>
      <div style={{ height: "100vh" }}>
        Random Page
      </div>
    </main>
    </Suspense>
    
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
