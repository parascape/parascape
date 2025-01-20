import{b as g,r as l,j as e,n as d,I as v,J as f,K as y,N as j,x as w}from"./vendor-FxCG3Xtn.js";import{S as N}from"./SEO-DYcBn-G4.js";import{O as C,P as h,C as S}from"./ui-uTXa7yRa.js";const k=()=>{const t=g(),[r,s]=l.useState(!1);l.useEffect(()=>{const o=()=>{s(window.innerWidth<=768)};return o(),window.addEventListener("resize",o),()=>window.removeEventListener("resize",o)},[]);const c=()=>{window.scrollTo({top:0,behavior:"smooth"}),t("/services",{state:{animation:"slide-up",fromHero:!0}})};return e.jsxs("div",{className:"relative min-h-screen flex items-center justify-center bg-gradient-to-b from-parascape-green/10 to-white",children:[e.jsx("div",{className:"absolute inset-0 overflow-hidden",children:e.jsx(C,{src:r?"/assets/images/hero/hero-mobile.jpg":"/assets/images/hero/Hero.jpg",alt:"Humboldt landscape",className:"w-full h-full object-cover opacity-20",priority:!0})}),e.jsxs("div",{className:"relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center",children:[e.jsxs(d.h1,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-4xl md:text-6xl font-bold text-gray-900 mb-6",children:["Transform Your Business with a"," ",e.jsx("span",{className:"text-parascape-green",children:"Parascape Digital Makeover"})]}),e.jsx(d.p,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto",children:"Empowering Humboldt businesses through modern innovation and timeless creativity"}),e.jsx(d.button,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},onClick:c,className:"bg-parascape-green text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-parascape-green/90 transition-colors",children:"Get Started Today"})]})]})},E=[{id:"web",icon:v,title:"Website Design & Development",description:"Custom-built websites that capture your brand's essence and drive results."},{id:"brand",icon:f,title:"Branding & Identity",description:"Cohesive brand strategies that make your business stand out."},{id:"content",icon:y,title:"Content Creation",description:"Engaging content that tells your story and connects with your audience."},{id:"marketing",icon:j,title:"Digital Marketing",description:"Data-driven strategies to grow your online presence and reach."}],P=()=>{const t=g(),r=s=>{t("/services",{state:{activeService:s}})};return e.jsx("section",{id:"services",className:"py-20 bg-white",children:e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[e.jsxs("div",{className:"text-center mb-16",children:[e.jsx("h2",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-4",children:"Our Services"}),e.jsx("p",{className:"text-xl text-gray-700 max-w-2xl mx-auto",children:"Comprehensive digital solutions tailored for Humboldt County businesses"})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",children:E.map(s=>e.jsxs("div",{onClick:()=>r(s.id),className:"p-6 rounded-lg border border-gray-200 hover:border-parascape-green transition-colors group cursor-pointer",children:[e.jsx("div",{className:"w-12 h-12 bg-parascape-green/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-parascape-green/20 transition-colors",children:e.jsx(s.icon,{className:"w-6 h-6 text-parascape-green"})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-900 mb-2",children:s.title}),e.jsx("p",{className:"text-gray-700",children:s.description})]},s.id))})]})})},D=[{title:"Projects Completed",value:50,suffix:"+"},{title:"Client Satisfaction",value:98,suffix:"%"},{title:"Years Experience",value:10,suffix:"+"},{title:"Revenue Growth",prefix:"↑",value:200,suffix:"%"}];function H(){return e.jsx(h,{image:"/assets/images/sections/stats-bg.jpg",title:"Our Impact",subtitle:"Driving Digital Success Through Measurable Results",className:"py-20",children:e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",children:D.map((t,r)=>e.jsx(S,{title:t.title,value:t.value,suffix:t.suffix,prefix:t.prefix},r))})})}const n=[{id:1,quote:"Parascape transformed our online presence. Their expertise in web development and digital marketing has been invaluable to our growth.",author:"Sarah Johnson",role:"CEO",company:"Humboldt Harvest"},{id:2,quote:"Working with Parascape was a game-changer. They understood our vision and delivered beyond our expectations.",author:"Michael Chen",role:"Marketing Director",company:"Pacific Coast Ventures"},{id:3,quote:"The team's attention to detail and commitment to excellence sets them apart. They're not just service providers, they're partners in success.",author:"Emily Rodriguez",role:"Owner",company:"Coastal Creations"}];function T(){const[t,r]=l.useState(0),[s,c]=l.useState(0),o={enter:a=>({x:a>0?1e3:-1e3,opacity:0}),center:{zIndex:1,x:0,opacity:1},exit:a=>({zIndex:0,x:a<0?1e3:-1e3,opacity:0})},x=1e4,b=(a,i)=>Math.abs(a)*i,m=a=>{c(a),r(i=>(i+a+n.length)%n.length)};return l.useEffect(()=>{const a=setInterval(()=>{m(1)},5e3);return()=>clearInterval(a)},[]),e.jsx(h,{image:"/assets/images/sections/testimonials-bg.jpg",title:"Client Success Stories",subtitle:"Hear from businesses we've helped transform",className:"py-20",children:e.jsx("div",{className:"relative w-full max-w-4xl mx-auto px-4",children:e.jsx(w,{initial:!1,custom:s,children:e.jsx(d.div,{custom:s,variants:o,initial:"enter",animate:"center",exit:"exit",transition:{x:{type:"spring",stiffness:300,damping:30},opacity:{duration:.2}},drag:"x",dragConstraints:{left:0,right:0},dragElastic:1,onDragEnd:(a,{offset:i,velocity:u})=>{const p=b(i.x,u.x);p<-x?m(1):p>x&&m(-1)},className:"absolute w-full",children:e.jsxs("div",{className:"bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-xl",children:[e.jsxs("p",{className:"text-xl md:text-2xl text-gray-700 mb-6 italic",children:['"',n[t].quote,'"']}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-semibold text-gray-900",children:n[t].author}),e.jsxs("p",{className:"text-sm text-gray-600",children:[n[t].role,", ",n[t].company]})]}),e.jsx("div",{className:"flex gap-2",children:n.map((a,i)=>e.jsx("button",{onClick:()=>{const u=i>t?1:-1;c(u),r(i)},className:`w-3 h-3 rounded-full transition-colors ${i===t?"bg-parascape-green":"bg-gray-300"}`,"aria-label":`Go to slide ${i+1}`},i))})]})]})},t)})})})}const z=()=>e.jsxs(e.Fragment,{children:[e.jsx(N,{title:"Parascape - Digital Solutions for Humboldt County Businesses",description:"Transform your business with Parascape's digital makeover services. Web design, branding, and digital marketing solutions for Humboldt County businesses.",url:"/"}),e.jsx(k,{}),e.jsx(P,{}),e.jsx(H,{}),e.jsx(T,{})]});export{z as default};
