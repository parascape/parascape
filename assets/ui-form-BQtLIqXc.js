import{r as m,j as n,S as F,k as x,F as u,l as p}from"./vendor-react-BbpXkAOK.js";import{c as i}from"./ui-button-DahdLBA6.js";import{L as I}from"./ui-label-QUCiRVEA.js";const h=u,l=m.createContext({}),R=({...e})=>n.jsx(l.Provider,{value:{name:e.name},children:n.jsx(p,{...e})}),d=()=>{const e=m.useContext(l),t=m.useContext(f),{getFieldState:r,formState:o}=x(),s=r(e.name,o);if(!e)throw new Error("useFormField should be used within <FormField>");const{id:a}=t;return{id:a,name:e.name,formItemId:`${a}-form-item`,formDescriptionId:`${a}-form-item-description`,formMessageId:`${a}-form-item-message`,...s}},f=m.createContext({}),C=m.forwardRef(({className:e,...t},r)=>{const o=m.useId();return n.jsx(f.Provider,{value:{id:o},children:n.jsx("div",{ref:r,className:i("space-y-2",e),...t})})});C.displayName="FormItem";const g=m.forwardRef(({className:e,...t},r)=>{const{error:o,formItemId:s}=d();return n.jsx(I,{ref:r,className:i(o&&"text-destructive",e),htmlFor:s,...t})});g.displayName="FormLabel";const j=m.forwardRef(({...e},t)=>{const{error:r,formItemId:o,formDescriptionId:s,formMessageId:a}=d();return n.jsx(F,{ref:t,id:o,"aria-describedby":r?`${s} ${a}`:`${s}`,"aria-invalid":!!r,...e})});j.displayName="FormControl";const v=m.forwardRef(({className:e,...t},r)=>{const{formDescriptionId:o}=d();return n.jsx("p",{ref:r,id:o,className:i("text-sm text-muted-foreground",e),...t})});v.displayName="FormDescription";const N=m.forwardRef(({className:e,children:t,...r},o)=>{const{error:s,formMessageId:a}=d(),c=s?String(s==null?void 0:s.message):t;return c?n.jsx("p",{ref:o,id:a,className:i("text-sm font-medium text-destructive",e),...r,children:c}):null});N.displayName="FormMessage";export{h as F,R as a,C as b,g as c,j as d,N as e};
