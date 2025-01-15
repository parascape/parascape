const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Index-DC6XLYsg.js","assets/vendor-CWLD25SE.js","assets/SEO-CzqlkOBC.js","assets/Contact-B5bNxUye.js","assets/Navbar-BfAdE82M.js","assets/ui-CMKqk-a9.js","assets/features-Bz8FrcnW.js","assets/SuccessStories-CuGP7FMi.js","assets/About-C1yd1sQI.js","assets/Services-C-vTAiqf.js","assets/Privacy-BezqNf41.js","assets/Terms-Ds4fTCwU.js"])))=>i.map(i=>d[i]);
import{j as e,o as E,r as n,Q as P,B as b,u as L,H as g,p as S,q as A,s as O,v as l,w as R,x as T}from"./vendor-CWLD25SE.js";import{T as w,a as C,b as I,L as d}from"./ui-CMKqk-a9.js";import{N as V,F as k,E as z,A as D,C as N}from"./features-Bz8FrcnW.js";(function(){const x=document.createElement("link").relList;if(x&&x.supports&&x.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))f(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&f(s)}).observe(document,{childList:!0,subtree:!0});function p(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function f(t){if(t.ep)return;t.ep=!0;const r=p(t);fetch(t.href,r)}})();const q="modulepreload",B=function(o){return"/parascape/"+o},h={},m=function(x,p,f){let t=Promise.resolve();if(p&&p.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),i=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));t=Promise.allSettled(p.map(a=>{if(a=B(a),a in h)return;h[a]=!0;const j=a.endsWith(".css"),y=j?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${y}`))return;const c=document.createElement("link");if(c.rel=j?"stylesheet":q,j||(c.as="script"),c.crossOrigin="",c.href=a,i&&c.setAttribute("nonce",i),document.head.appendChild(c),j)return new Promise((_,v)=>{c.addEventListener("load",_),c.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${a}`)))})}))}function r(s){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=s,window.dispatchEvent(i),!i.defaultPrevented)throw s}return t.then(s=>{for(const i of s||[])i.status==="rejected"&&r(i.reason);return x().catch(r)})},$={initial:{opacity:0,y:10},animate:{opacity:1,y:0,transition:{duration:.3,ease:"easeOut"}},exit:{opacity:0,y:-10,transition:{duration:.25,ease:"easeIn"}}};function u({children:o}){return e.jsx(E.div,{initial:"initial",animate:"animate",exit:"exit",variants:$,children:o})}const F=({children:o})=>e.jsxs("div",{className:"min-h-screen flex flex-col",children:[e.jsx(V,{}),e.jsx("main",{className:"flex-grow",children:o}),e.jsx(k,{})]}),Q=n.lazy(()=>m(()=>import("./Index-DC6XLYsg.js"),__vite__mapDeps([0,1,2]))),U=n.lazy(()=>m(()=>import("./Contact-B5bNxUye.js"),__vite__mapDeps([3,1,4,5,6]))),H=n.lazy(()=>m(()=>import("./SuccessStories-CuGP7FMi.js"),__vite__mapDeps([7,1,4,5]))),K=n.lazy(()=>m(()=>import("./About-C1yd1sQI.js"),__vite__mapDeps([8,1,5,4,6]))),W=n.lazy(()=>m(()=>import("./Services-C-vTAiqf.js"),__vite__mapDeps([9,1,4,5]))),G=n.lazy(()=>m(()=>import("./Privacy-BezqNf41.js"),__vite__mapDeps([10,1,2]))),J=n.lazy(()=>m(()=>import("./Terms-Ds4fTCwU.js"),__vite__mapDeps([11,1,2]))),M=new P;function X(){const o=L();return e.jsx(g,{children:e.jsx(z,{children:e.jsx(S,{client:M,children:e.jsx(w,{children:e.jsxs(D,{children:[e.jsx(C,{}),e.jsx(I,{}),e.jsx(F,{children:e.jsx(A,{mode:"wait",children:e.jsxs(O,{location:o,children:[e.jsx(l,{path:"/",element:e.jsx(n.Suspense,{fallback:e.jsx(d,{}),children:e.jsx(u,{children:e.jsx(Q,{})})})}),e.jsx(l,{path:"/contact",element:e.jsx(n.Suspense,{fallback:e.jsx(d,{}),children:e.jsx(u,{children:e.jsx(U,{})})})}),e.jsx(l,{path:"/success-stories",element:e.jsx(n.Suspense,{fallback:e.jsx(d,{}),children:e.jsx(u,{children:e.jsx(H,{})})})}),e.jsx(l,{path:"/about",element:e.jsx(n.Suspense,{fallback:e.jsx(d,{}),children:e.jsx(u,{children:e.jsx(K,{})})})}),e.jsx(l,{path:"/services",element:e.jsx(n.Suspense,{fallback:e.jsx(d,{}),children:e.jsx(u,{children:e.jsx(W,{})})})}),e.jsx(l,{path:"/privacy",element:e.jsx(n.Suspense,{fallback:e.jsx(d,{}),children:e.jsx(u,{children:e.jsx(G,{})})})}),e.jsx(l,{path:"/terms",element:e.jsx(n.Suspense,{fallback:e.jsx(d,{}),children:e.jsx(u,{children:e.jsx(J,{})})})})]},o.pathname)})}),e.jsx(N,{})]})})})})})}const Y=()=>e.jsx(b,{basename:"/parascape",children:e.jsx(X,{})});R.createRoot(document.getElementById("root")).render(e.jsx(T.StrictMode,{children:e.jsx(Y,{})}));
