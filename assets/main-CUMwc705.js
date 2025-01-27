const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Index-BAE5ylO4.js","assets/vendor-TEfRycZm.js","assets/ui-D5w1LhQk.js","assets/features-X9ToXnD4.js","assets/Services-BkBu9pt9.js","assets/About-D52YYYl2.js","assets/SuccessStories-CnYBohQ7.js","assets/Contact-DxyH7zi6.js","assets/Privacy-B0JSFd0X.js","assets/Terms-DdrHcQT3.js"])))=>i.map(i=>d[i]);
import{j as e,o as x,a as b,r as c,H as L,B as C,p as N,q as m,N as S,s as A,w as k,v as R,G as D,x as I,Q as O,y as F,R as z}from"./vendor-TEfRycZm.js";import{L as j,c as y,S as B,R as H}from"./ui-D5w1LhQk.js";import{L as V,T as U,N as $,E as q,A as M,C as W}from"./features-X9ToXnD4.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=r(o);fetch(o.href,a)}})();const Y="modulepreload",G=function(s){return"/"+s},T={},g=function(t,r,n){let o=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),l=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));o=Promise.allSettled(r.map(d=>{if(d=G(d),d in T)return;T[d]=!0;const f=d.endsWith(".css"),E=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${E}`))return;const u=document.createElement("link");if(u.rel=f?"stylesheet":Y,f||(u.as="script"),u.crossOrigin="",u.href=d,l&&u.setAttribute("nonce",l),document.head.appendChild(u),f)return new Promise((P,_)=>{u.addEventListener("load",P),u.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${d}`)))})}))}function a(i){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=i,window.dispatchEvent(l),!l.defaultPrevented)throw i}return o.then(i=>{for(const l of i||[])l.status==="rejected"&&a(l.reason);return t().catch(a)})},K=()=>e.jsx("footer",{className:"bg-white border-t",children:e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"Parascape"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Digital solutions for Humboldt County businesses"}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsx("a",{href:"#",className:"text-gray-400 hover:text-parascape-green",children:e.jsx(V,{className:"h-5 w-5"})}),e.jsx("a",{href:"#",className:"text-gray-400 hover:text-parascape-green",children:e.jsx(U,{className:"h-5 w-5"})})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Services"}),e.jsxs("ul",{className:"space-y-2 text-sm text-gray-600",children:[e.jsx("li",{children:e.jsx(x,{to:"/services#web",children:"Web Development"})}),e.jsx("li",{children:e.jsx(x,{to:"/services#brand",children:"Branding"})}),e.jsx("li",{children:e.jsx(x,{to:"/services#content",children:"Content Creation"})})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Company"}),e.jsxs("ul",{className:"space-y-2 text-sm text-gray-600",children:[e.jsx("li",{children:e.jsx(x,{to:"/about",children:"About Us"})}),e.jsx("li",{children:e.jsx(x,{to:"/success-stories",children:"Success Stories"})}),e.jsx("li",{children:e.jsx(x,{to:"/contact",children:"Contact"})})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Contact"}),e.jsxs("ul",{className:"space-y-2 text-sm text-gray-600",children:[e.jsx("li",{children:"Humboldt County, CA"}),e.jsx("li",{children:"contact@parascape.com"}),e.jsx("li",{children:"(555) 123-4567"})]})]})]}),e.jsx("div",{className:"mt-8 pt-8 border-t text-center text-sm text-gray-600",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," Parascape. All rights reserved."]})})]})});function Q({children:s,className:t,fullWidth:r=!1,withPadding:n=!0}){const o=b(),[a,i]=c.useState(!1);return c.useEffect(()=>{i(!0);const l=setTimeout(()=>i(!1),300);return()=>clearTimeout(l)},[o.pathname]),e.jsxs("div",{className:"min-h-screen flex flex-col bg-gray-50",children:[e.jsx(c.Suspense,{fallback:e.jsx(j,{variant:"spinner",size:"sm"}),children:e.jsx($,{})}),e.jsxs("main",{className:y("flex-grow relative",n&&"pt-16",t),children:[a&&e.jsx("div",{className:"absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center",children:e.jsx(j,{variant:"spinner",size:"lg"})}),e.jsx("div",{className:y("mx-auto w-full",!r&&"max-w-7xl px-4 sm:px-6 lg:px-8"),children:e.jsx(c.Suspense,{fallback:e.jsx("div",{className:"py-12",children:e.jsx(j,{variant:"skeleton"})}),children:s})})]}),e.jsx(c.Suspense,{fallback:e.jsx(j,{variant:"spinner",size:"sm"}),children:e.jsx(K,{})})]})}const J=c.lazy(()=>g(()=>import("./Index-BAE5ylO4.js"),__vite__mapDeps([0,1,2,3]))),X=c.lazy(()=>g(()=>import("./Services-BkBu9pt9.js"),__vite__mapDeps([4,1,3,2]))),Z=c.lazy(()=>g(()=>import("./About-D52YYYl2.js"),__vite__mapDeps([5,1,2,3]))),ee=c.lazy(()=>g(()=>import("./SuccessStories-CnYBohQ7.js"),__vite__mapDeps([6,1,2,3]))),te=c.lazy(()=>g(()=>import("./Contact-DxyH7zi6.js"),__vite__mapDeps([7,1,2,3]))),ne=c.lazy(()=>g(()=>import("./Privacy-B0JSFd0X.js"),__vite__mapDeps([8,1,2,3]))),se=c.lazy(()=>g(()=>import("./Terms-DdrHcQT3.js"),__vite__mapDeps([9,1,2,3])));function re(){const{pathname:s}=b();return c.useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"})},[s]),null}function oe(){return e.jsx(L,{children:e.jsx(q,{children:e.jsxs(C,{children:[e.jsx(re,{}),e.jsxs(M,{children:[e.jsx(Q,{children:e.jsx(B,{loadingText:"Loading page...",children:e.jsx(H,{children:e.jsxs(N,{children:[e.jsx(m,{path:"/",element:e.jsx(J,{})}),e.jsx(m,{path:"/services",element:e.jsx(X,{})}),e.jsx(m,{path:"/about",element:e.jsx(Z,{})}),e.jsx(m,{path:"/success-stories",element:e.jsx(ee,{})}),e.jsx(m,{path:"/contact/:type?",element:e.jsx(te,{})}),e.jsx(m,{path:"/privacy",element:e.jsx(ne,{})}),e.jsx(m,{path:"/terms",element:e.jsx(se,{})}),e.jsx(m,{path:"*",element:e.jsx(S,{to:"/",replace:!0})})]})})})}),e.jsx(A,{position:"top-right"}),e.jsx(W,{})]})]})})})}function p(s){const t=window.plausible;t&&t("WebVitals",{props:{metric:s.name,value:Math.round(s.value),rating:s.rating,navigationType:s.navigationType}})}function ae(){var t;const s=(t=window.performance)==null?void 0:t.getEntriesByType("navigation")[0];return s?s.type:"unknown"}function h(s,t){switch(s){case"CLS":return t<=.1?"good":t<=.25?"needs-improvement":"poor";case"FID":return t<=100?"good":t<=300?"needs-improvement":"poor";case"LCP":return t<=2500?"good":t<=4e3?"needs-improvement":"poor";case"FCP":return t<=1800?"good":t<=3e3?"needs-improvement":"poor";case"TTFB":return t<=800?"good":t<=1800?"needs-improvement":"poor";default:return"poor"}}function ie(){const s=ae();k(n=>{p({name:"CLS",value:n.value,rating:h("CLS",n.value),navigationType:s})}),R(n=>{p({name:"FID",value:n.value,rating:h("FID",n.value),navigationType:s})}),D(n=>{p({name:"LCP",value:n.value,rating:h("LCP",n.value),navigationType:s})}),I(n=>{p({name:"FCP",value:n.value,rating:h("FCP",n.value),navigationType:s})}),O(n=>{p({name:"TTFB",value:n.value,rating:h("TTFB",n.value),navigationType:s})});let t;window.addEventListener("popstate",()=>{t=performance.now()}),window.addEventListener("load",()=>{if(t){const n=performance.now()-t;p({name:"RouteChange",value:n,rating:h("RouteChange",n),navigationType:"route-change"})}}),new PerformanceObserver(n=>{n.getEntries().forEach(o=>{if(o.entryType==="resource"){const a=o;p({name:"ResourceTiming",value:a.duration,rating:h("ResourceTiming",a.duration),navigationType:a.initiatorType})}})}).observe({entryTypes:["resource"]})}function v(s){const t=window.plausible;t&&t("Error",{props:{errorType:s.type,message:s.message,url:s.url,routePath:s.routePath}})}function ce(){window.onerror=(t,r,n,o,a)=>(v({message:t.toString(),stack:a==null?void 0:a.stack,type:"uncaught",url:r||window.location.href,timestamp:Date.now(),userAgent:navigator.userAgent,routePath:window.location.pathname}),!1),window.onunhandledrejection=t=>{var r,n;v({message:((r=t.reason)==null?void 0:r.message)||"Unhandled Promise Rejection",stack:(n=t.reason)==null?void 0:n.stack,type:"unhandled-promise",url:window.location.href,timestamp:Date.now(),userAgent:navigator.userAgent,routePath:window.location.pathname})};const s=window.fetch;window.fetch=async(...t)=>{try{const r=await s(...t);return r.ok||v({message:`HTTP ${r.status}: ${r.statusText}`,type:"network",url:t[0].toString(),timestamp:Date.now(),userAgent:navigator.userAgent,routePath:window.location.pathname}),r}catch(r){throw v({message:r instanceof Error?r.message:"Unknown error occurred",stack:r instanceof Error?r.stack:void 0,type:"network",url:t[0].toString(),timestamp:Date.now(),userAgent:navigator.userAgent,routePath:window.location.pathname}),r}}}function w(s){const t=window.plausible;t&&t("Interaction",{props:{eventType:s.type,target:s.target,routePath:s.routePath,...s.metadata}})}function le(){document.addEventListener("click",r=>{const n=r.target;if(!n)return;const o={...n.dataset};delete o.trackingTarget,w({type:"click",target:n.dataset.trackingTarget||n.tagName.toLowerCase(),timestamp:Date.now(),routePath:window.location.pathname,metadata:Object.keys(o).length>0?o:void 0})}),document.addEventListener("submit",r=>{const n=r.target;n&&w({type:"form_submit",target:n.dataset.trackingTarget||n.id||"unknown_form",timestamp:Date.now(),routePath:window.location.pathname,metadata:{formAction:n.action}})});let s=0,t;window.addEventListener("scroll",()=>{clearTimeout(t),t=setTimeout(()=>{const r=document.documentElement.scrollHeight-window.innerHeight,n=Math.round(window.scrollY/r*100);n>s&&(s=n,n%25===0&&w({type:"scroll_depth",target:"page",timestamp:Date.now(),routePath:window.location.pathname,metadata:{depth:n}}))},100)})}ie();ce();le();F.createRoot(document.getElementById("root")).render(e.jsx(z.StrictMode,{children:e.jsx(oe,{})}));
