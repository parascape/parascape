import{u as f,r as n,j as e,f as v,P as j,g as y,h as w,H as N}from"./vendor-react-su5LcnRo.js";import{L as c,I as C,P as p,C as S}from"./ui-CMkmOrel.js";import{m as d,A as k}from"./vendor-ui-DtMHlmxY.js";import{E as I}from"./features-BGojgOVe.js";import"./vendor-B3XTR711.js";import"./page-contact-D1OBS-q8.js";const M=()=>{const t=f(),[r,a]=n.useState(!1),[m,h]=n.useState(!1);n.useEffect(()=>{const s=()=>{a(window.innerWidth<=768)};return s(),window.addEventListener("resize",s),()=>window.removeEventListener("resize",s)},[]);const u=()=>{window.scrollTo({top:0,behavior:"smooth"}),t("/services",{state:{animation:"slide-up",fromHero:!0}})},x={hidden:{opacity:0},visible:{opacity:1,transition:{when:"beforeChildren",staggerChildren:.2}}},o={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.5}}};return e.jsxs("div",{className:"relative min-h-screen flex items-center justify-center bg-gradient-to-b from-parascape-green/10 to-white",children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden",children:[!m&&e.jsx("div",{className:"w-full h-full flex items-center justify-center bg-gray-100",children:e.jsx(c,{variant:"spinner",size:"lg"})}),e.jsx(C,{src:r?"/assets/images/hero-mobile.jpg":"/assets/images/Hero.jpg",alt:"Humboldt landscape",className:"w-full h-full object-cover",onLoad:()=>h(!0),style:{opacity:m?1:0},aspectRatio:"16:9"})]}),e.jsxs(d.div,{className:"relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center",variants:x,initial:"hidden",animate:"visible",children:[e.jsxs(d.h1,{variants:o,className:"text-4xl md:text-6xl font-bold text-gray-900 mb-6",children:["Transform Your Business with a"," ",e.jsx("span",{className:"text-parascape-green",children:"Parascape Digital Makeover"})]}),e.jsx(d.p,{variants:o,className:"text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto",children:"Empowering Humboldt businesses through modern innovation and timeless creativity"}),e.jsx(d.button,{variants:o,onClick:u,className:"bg-parascape-green text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-parascape-green/90 transition-colors",children:"Get Started Today"})]})]})},P=[{id:"web",icon:v,title:"Website Design & Development",description:"Custom-built websites that capture your brand's essence and drive results."},{id:"brand",icon:j,title:"Branding & Identity",description:"Cohesive brand strategies that make your business stand out."},{id:"content",icon:y,title:"Content Creation",description:"Engaging content that tells your story and connects with your audience."},{id:"marketing",icon:w,title:"Digital Marketing",description:"Data-driven strategies to grow your online presence and reach."}],H=()=>{const t=f(),r=a=>{t("/services",{state:{activeService:a}})};return e.jsx("section",{id:"services",className:"py-20 bg-white",children:e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[e.jsxs("div",{className:"text-center mb-16",children:[e.jsx("h2",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-4",children:"Our Services"}),e.jsx("p",{className:"text-xl text-gray-700 max-w-2xl mx-auto",children:"Comprehensive digital solutions tailored for Humboldt County businesses"})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",children:P.map(a=>e.jsxs("div",{onClick:()=>r(a.id),className:"p-6 rounded-lg border border-gray-200 hover:border-parascape-green transition-colors group cursor-pointer",children:[e.jsx("div",{className:"w-12 h-12 bg-parascape-green/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-parascape-green/20 transition-colors",children:e.jsx(a.icon,{className:"w-6 h-6 text-parascape-green"})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-900 mb-2",children:a.title}),e.jsx("p",{className:"text-gray-700",children:a.description})]},a.id))})]})})},T=[{title:"Projects Completed",value:50,suffix:"+"},{title:"Client Satisfaction",value:98,suffix:"%"},{title:"Years Experience",value:10,suffix:"+"},{title:"Revenue Growth",prefix:"↑",value:200,suffix:"%"}];function E(){return e.jsx(p,{image:"/assets/images/Mountain-Vista.jpg",title:"Our Impact",subtitle:"Driving Digital Success Through Measurable Results",className:"py-20",children:e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",children:T.map((t,r)=>e.jsx(S,{title:t.title,value:t.value,suffix:t.suffix,prefix:t.prefix},r))})})}const l=[{id:1,quote:"Parascape transformed our online presence. Their expertise in web development and digital marketing has been invaluable to our growth.",author:"Sarah Johnson",role:"CEO",company:"Humboldt Harvest"},{id:2,quote:"Working with Parascape was a game-changer. They understood our vision and delivered beyond our expectations.",author:"Michael Chen",role:"Marketing Director",company:"Pacific Coast Ventures"},{id:3,quote:"The team's attention to detail and commitment to excellence sets them apart. They're not just service providers, they're partners in success.",author:"Emily Rodriguez",role:"Owner",company:"Coastal Creations"}];function D(){const[t,r]=n.useState(0),[a,m]=n.useState(0),h={enter:s=>({x:s>0?1e3:-1e3,opacity:0}),center:{zIndex:1,x:0,opacity:1},exit:s=>({zIndex:0,x:s<0?1e3:-1e3,opacity:0})},u=1e4,x=(s,i)=>Math.abs(s)*i,o=s=>{m(s),r(i=>(i+s+l.length)%l.length)};return n.useEffect(()=>{const s=setInterval(()=>{o(1)},5e3);return()=>clearInterval(s)},[]),e.jsx(p,{image:"/assets/images/Forest.jpg",title:"Client Success Stories",subtitle:"Hear from businesses we've helped transform",className:"py-20",children:e.jsx("div",{className:"relative w-full max-w-4xl mx-auto px-4",children:e.jsx(k,{initial:!1,custom:a,children:e.jsx(d.div,{custom:a,variants:h,initial:"enter",animate:"center",exit:"exit",transition:{x:{type:"spring",stiffness:300,damping:30},opacity:{duration:.2}},drag:"x",dragConstraints:{left:0,right:0},dragElastic:1,onDragEnd:(s,{offset:i,velocity:g})=>{const b=x(i.x,g.x);b<-u?o(1):b>u&&o(-1)},className:"absolute w-full",children:e.jsxs("div",{className:"bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-xl",children:[e.jsxs("p",{className:"text-xl md:text-2xl text-gray-700 mb-6 italic",children:['"',l[t].quote,'"']}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-semibold text-gray-900",children:l[t].author}),e.jsxs("p",{className:"text-sm text-gray-600",children:[l[t].role,", ",l[t].company]})]}),e.jsx("div",{className:"flex gap-2",children:l.map((s,i)=>e.jsx("button",{onClick:()=>{const g=i>t?1:-1;m(g),r(i)},className:`w-3 h-3 rounded-full transition-colors ${i===t?"bg-parascape-green":"bg-gray-300"}`,"aria-label":`Go to slide ${i+1}`},i))})]})]})},t)})})})}const B=[{name:"Matthew Haines",role:"Co-founder",bio:"After a brief time at Adobe, Matthew left the tech world behind to pursue his true calling in music with Famous in Russia and Template. The corporate path never felt right, but the technical knowledge proved invaluable. Now he channels that experience into building platforms that help artists thrive in a digital world that often feels stacked against them.",image:"/assets/images/team/Matthew.jpg"},{name:"Parascape Records",role:"The Vision",bio:'"Parascape became everything a Humboldt artist needed to launch their art beyond the Redwood Curtain. Parascape became what I needed when I was 18, playing every show I could, and then on top of that organizing and throwing more shows so that my musicians could play more." - Brendan Balsley',image:"/assets/images/sections/Mountain-Vista.jpg"},{name:"Brendan Balsley",role:"Co-founder",bio:"A musician at heart and entrepreneur by necessity, Brendan recognized early on that art doesn't sustain itself without industry support. Surrounded by talented musicians with dreams bigger than their resources, he founded Parascape to bridge the gap between artistic vision and commercial success. His mission is to provide fellow artists with the tools and platform they need to share their music with the world.",image:"/assets/images/team/Brendan.jpg"}];function z(){return e.jsx(p,{image:"/assets/images/sections/Shadows.jpg",title:"Our Story",subtitle:"Where Technology Meets Artistry",className:"py-20",children:e.jsx("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12",children:B.map((t,r)=>e.jsxs(d.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{duration:.6,delay:r*.2},className:"relative group",children:[e.jsx("div",{className:"aspect-square overflow-hidden rounded-lg mb-6",children:e.jsx("img",{src:t.image,alt:t.name,className:"w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"})}),e.jsxs("div",{className:"bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-xl",children:[e.jsx("h3",{className:"text-2xl font-bold text-gray-900 mb-1",children:t.name}),e.jsx("p",{className:"text-parascape-green font-semibold mb-4",children:t.role}),e.jsx("p",{className:"text-gray-600 leading-relaxed",children:t.bio})]})]},t.name))})})}const W=()=>e.jsxs(I,{children:[e.jsxs(N,{children:[e.jsx("title",{children:"Parascape - Digital Solutions for Humboldt County Businesses"}),e.jsx("meta",{name:"description",content:"Transform your business with Parascape's digital makeover services. Web design, branding, and digital marketing solutions for Humboldt County businesses."})]}),e.jsx(n.Suspense,{fallback:e.jsx(c,{variant:"skeleton",size:"lg",fullscreen:!0}),children:e.jsx(M,{})}),e.jsx(n.Suspense,{fallback:e.jsx(c,{variant:"skeleton"}),children:e.jsx(H,{})}),e.jsx(n.Suspense,{fallback:e.jsx(c,{variant:"skeleton"}),children:e.jsx(E,{})}),e.jsx(n.Suspense,{fallback:e.jsx(c,{variant:"skeleton"}),children:e.jsx(z,{})}),e.jsx(n.Suspense,{fallback:e.jsx(c,{variant:"skeleton"}),children:e.jsx(D,{})})]});export{W as default};