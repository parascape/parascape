import{I as x,J as t,K as p,j as e,N as j,O as d}from"./vendor-CWLD25SE.js";import{N as f}from"./Navbar-BfAdE82M.js";import{F as b,c as o,d as n,e as i,f as l,I as m,g as c,h as g,B as y}from"./ui-DdF2BkId.js";import{a as N}from"./features-CtOxULvW.js";const v=x({name:t().min(2,"Name must be at least 2 characters"),email:t().email("Please enter a valid email address"),business:t().min(1,"Business name is required"),phone:t().optional(),about:t().min(10,"Message must be at least 10 characters"),honeypot:t().optional()});function w(){const a=p({resolver:j(v),defaultValues:{name:"",email:"",business:"",phone:"",about:"",honeypot:""}});async function h(s){try{const r=await fetch("https://hjhpcawffvgcczhxcjsr.supabase.co/functions/v1/handle-form-submission",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer undefined"},body:JSON.stringify(s)});if(!r.ok){const u=await r.json();throw new Error(u.message||"Failed to submit form")}N.track({name:"form_submission",properties:{form:"contact",business:s.business}}),d.success("Thank you for your message! We'll be in touch soon."),a.reset()}catch(r){d.error(r instanceof Error?r.message:"Something went wrong. Please try again."),console.error(r)}}return e.jsxs("div",{className:"w-full max-w-xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow-lg animate-fade-up",children:[e.jsxs("div",{className:"space-y-2 text-center",children:[e.jsx("h2",{className:"text-3xl font-bold tracking-tight text-parascape-green",children:"Get in Touch"}),e.jsx("p",{className:"text-gray-500",children:"Ready to transform your business? Let's start a conversation."}),e.jsx("p",{className:"text-sm text-gray-400",children:"* Required fields"})]}),e.jsx(b,{...a,children:e.jsxs("form",{onSubmit:a.handleSubmit(h),className:"space-y-6",children:[e.jsx(o,{control:a.control,name:"name",render:({field:s})=>e.jsxs(n,{children:[e.jsx(i,{children:"Name *"}),e.jsx(l,{children:e.jsx(m,{placeholder:"John Doe",...s,"aria-required":"true",autoComplete:"name"})}),e.jsx(c,{})]})}),e.jsx(o,{control:a.control,name:"email",render:({field:s})=>e.jsxs(n,{children:[e.jsx(i,{children:"Email *"}),e.jsx(l,{children:e.jsx(m,{type:"email",placeholder:"john@example.com",...s,"aria-required":"true",autoComplete:"email"})}),e.jsx(c,{})]})}),e.jsx(o,{control:a.control,name:"business",render:({field:s})=>e.jsxs(n,{children:[e.jsx(i,{children:"Business Name *"}),e.jsx(l,{children:e.jsx(m,{placeholder:"Your Business LLC",...s,"aria-required":"true",autoComplete:"organization"})}),e.jsx(c,{})]})}),e.jsx(o,{control:a.control,name:"phone",render:({field:s})=>e.jsxs(n,{children:[e.jsx(i,{children:"Phone"}),e.jsx(l,{children:e.jsx(m,{type:"tel",placeholder:"(555) 123-4567",...s,autoComplete:"tel"})}),e.jsx(c,{}),e.jsx("p",{className:"text-xs text-gray-500",children:"Optional, but recommended for faster communication"})]})}),e.jsx(o,{control:a.control,name:"about",render:({field:s})=>e.jsxs(n,{children:[e.jsx(i,{children:"Message *"}),e.jsx(l,{children:e.jsx(g,{placeholder:"Tell us about your business goals and how we can help...",className:"min-h-[120px]",...s,"aria-required":"true"})}),e.jsx(c,{})]})}),e.jsx("input",{type:"text",tabIndex:-1,...a.register("honeypot"),style:{position:"absolute",left:"-9999px"},"aria-hidden":"true"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("p",{className:"text-xs text-gray-500 text-center",children:["By submitting this form, you agree to our"," ",e.jsx("a",{href:"/privacy",className:"text-parascape-green hover:underline",children:"Privacy Policy"})]}),e.jsx(y,{type:"submit",className:"w-full bg-parascape-green hover:bg-parascape-green/90 transition-all duration-200 transform hover:scale-[1.02]",children:"Start Your Digital Transformation"})]})]})})]})}const B=()=>e.jsxs("div",{className:"min-h-screen bg-gray-50",children:[e.jsx(f,{}),e.jsx("div",{className:"pt-24 pb-12",children:e.jsx(w,{})})]});export{B as default};
