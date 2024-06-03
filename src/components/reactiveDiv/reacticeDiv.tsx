"use client";
import {  useRef } from "react";
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const ReactiveDiv = ({text}:{text?:string}) => {
    return (
    <div>
        <div className="reactive-div">
            <div  className="reactive-div__inner">
                <p className="header" style={{fontSize:"5rem",color:"white",clipPath: "inset(0 100% 0 0)", transition:"all 1.5s ease-in"}}>
                    {text ? text : "Reactive Div"}
                </p>
            </div>
        </div>
    </div>
    )
}


export default ReactiveDiv;