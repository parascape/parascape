import{r as d,j as t}from"./vendor-react-BbpXkAOK.js";import{O as f}from"./ui-optimized-image-Bba6UJXd.js";import{useScroll as y,useTransform as r,motion as e}from"./vendor-framer-motion-CPet7u-O.js";function j({image:o,title:s,subtitle:i,children:n,className:c=""}){const a=d.useRef(null),{scrollYProgress:l}=y({target:a,offset:["start start","end start"]}),x=r(l,[0,1],["0%","30%"]),m=r(l,[0,.5,1],[1,.8,.6]);return t.jsxs("div",{ref:a,className:`relative min-h-[80vh] overflow-hidden ${c}`,children:[t.jsxs(e.div,{style:{y:x,opacity:m},className:"absolute inset-0 -z-10",children:[t.jsx(f,{src:o,alt:s,className:"w-full h-full object-cover"}),t.jsx("div",{className:"absolute inset-0 bg-black/40"})]}),t.jsxs("div",{className:"relative h-full flex flex-col items-center justify-center text-white p-8",children:[t.jsx(e.h2,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{duration:.6},className:"text-4xl md:text-5xl font-bold mb-4 text-center",children:s}),i&&t.jsx(e.p,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{duration:.6,delay:.2},className:"text-xl md:text-2xl mb-8 text-center",children:i}),t.jsx(e.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{duration:.6,delay:.4},className:"w-full max-w-4xl",children:n})]})]})}export{j as P};
