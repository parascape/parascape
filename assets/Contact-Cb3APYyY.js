import{I as u,J as n,K as p,j as e,N as j,O as h}from"./vendor-CWLD25SE.js";import{N as b}from"./Navbar-BfAdE82M.js";import{F as f,c as o,d as t,e as i,f as l,I as m,g as c,h as g,B as y}from"./ui-DdF2BkId.js";import{a as N}from"./features-CtOxULvW.js";const w=u({name:n().min(2,"Name must be at least 2 characters"),email:n().email("Please enter a valid email address"),business:n().min(1,"Business name is required"),phone:n().optional(),about:n().min(10,"Message must be at least 10 characters"),honeypot:n().optional()});function F(){const a=p({resolver:j(w),defaultValues:{name:"",email:"",business:"",phone:"",about:"",honeypot:""}});async function d(s){try{const r=await fetch("https://hjhpcawffvgcczhxcjsr.supabase.co/functions/v1/handle-form-submission",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer undefined"},body:JSON.stringify(s)});if(!r.ok){const x=await r.json();throw new Error(x.message||"Failed to submit form")}N.track({name:"form_submission",properties:{form:"contact",business:s.business}}),h.success("Thank you for your message! We'll be in touch soon."),a.reset()}catch(r){h.error(r instanceof Error?r.message:"Something went wrong. Please try again."),console.error(r)}}return e.jsxs("div",{className:"w-full max-w-xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow-lg animate-fade-up",children:[e.jsxs("div",{className:"space-y-2 text-center",children:[e.jsx("h2",{className:"text-3xl font-bold tracking-tight text-parascape-green",children:"Get in Touch"}),e.jsx("p",{className:"text-gray-500",children:"Ready to transform your business? Let's start a conversation."})]}),e.jsx(f,{...a,children:e.jsxs("form",{onSubmit:a.handleSubmit(d),className:"space-y-6",children:[e.jsx(o,{control:a.control,name:"name",render:({field:s})=>e.jsxs(t,{children:[e.jsx(i,{children:"Name"}),e.jsx(l,{children:e.jsx(m,{placeholder:"John Doe",...s})}),e.jsx(c,{})]})}),e.jsx(o,{control:a.control,name:"email",render:({field:s})=>e.jsxs(t,{children:[e.jsx(i,{children:"Email"}),e.jsx(l,{children:e.jsx(m,{type:"email",placeholder:"john@example.com",...s})}),e.jsx(c,{})]})}),e.jsx(o,{control:a.control,name:"business",render:({field:s})=>e.jsxs(t,{children:[e.jsx(i,{children:"Business Name"}),e.jsx(l,{children:e.jsx(m,{placeholder:"Your Business LLC",...s})}),e.jsx(c,{})]})}),e.jsx(o,{control:a.control,name:"phone",render:({field:s})=>e.jsxs(t,{children:[e.jsx(i,{children:"Phone (Optional)"}),e.jsx(l,{children:e.jsx(m,{type:"tel",placeholder:"(555) 123-4567",...s})}),e.jsx(c,{})]})}),e.jsx(o,{control:a.control,name:"about",render:({field:s})=>e.jsxs(t,{children:[e.jsx(i,{children:"Message"}),e.jsx(l,{children:e.jsx(g,{placeholder:"Tell us about your business and what you're looking for...",className:"min-h-[120px]",...s})}),e.jsx(c,{})]})}),e.jsx("input",{type:"text",tabIndex:-1,...a.register("honeypot"),style:{position:"absolute",left:"-9999px"},"aria-hidden":"true"}),e.jsx(y,{type:"submit",className:"w-full bg-parascape-green hover:bg-parascape-green/90",children:"Send Message"})]})})]})}const k=()=>e.jsxs("div",{className:"min-h-screen bg-gray-50",children:[e.jsx(b,{}),e.jsx("div",{className:"pt-24 pb-12",children:e.jsx(F,{})})]});export{k as default};
