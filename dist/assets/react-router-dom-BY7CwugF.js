import{r as c}from"./react-DsfxBZ5j.js";import{c as y,a as d}from"./history-BizG8eLV.js";import{R as k,u as b,a as v,b as R,c as C}from"./react-router-Didrqg99.js";/**
 * React Router DOM v6.0.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function p(){return p=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t},p.apply(this,arguments)}function L(t,n){if(t==null)return{};var a={},r=Object.keys(t),o,e;for(e=0;e<r.length;e++)o=r[e],!(n.indexOf(o)>=0)&&(a[o]=t[o]);return a}const w=["onClick","reloadDocument","replace","state","target","to"];function j(t){let{basename:n,children:a,window:r}=t,o=c.useRef();o.current==null&&(o.current=y({window:r}));let e=o.current,[i,l]=c.useState({action:e.action,location:e.location});return c.useLayoutEffect(()=>e.listen(l),[e]),c.createElement(k,{basename:n,children:a,location:i.location,navigationType:i.action,navigator:e})}function O(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}const B=c.forwardRef(function(n,a){let{onClick:r,reloadDocument:o,replace:e=!1,state:i,target:l,to:s}=n,u=L(n,w),h=b(s),m=P(s,{replace:e,state:i,target:l});function g(f){r&&r(f),!f.defaultPrevented&&!o&&m(f)}return c.createElement("a",p({},u,{href:h,onClick:g,ref:a,target:l}))});function P(t,n){let{target:a,replace:r,state:o}=n===void 0?{}:n,e=v(),i=R(),l=C(t);return c.useCallback(s=>{if(s.button===0&&(!a||a==="_self")&&!O(s)){s.preventDefault();let u=!!r||d(i)===d(l);e(t,{replace:u,state:o})}},[i,e,l,r,o,a,t])}export{j as B,B as L};
