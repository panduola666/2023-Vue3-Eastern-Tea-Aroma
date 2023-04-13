import{m as g,b as w,u as D,i as m}from"./vueLoadingStore-c0b7b794.js";import{t as x}from"./index-0526d3af.js";import{b6 as _,aj as i,l as c,m as n,s as l,aJ as u,k as h,au as P}from"./_plugin-vue_export-helper-01f09012.js";const k={data(){return{discount:""}},computed:{...g(D,["user"]),...g(m,["discountData"]),totalPrice(){var a,o;const s=(a=this.user.shoppingCart)==null?void 0:a.cart.products.reduce((e,t)=>e+=t.totalPrice,0),r=(o=this.user.shoppingCart)==null?void 0:o.cart.courses.reduce((e,t)=>e+=t.totalPrice,0);return s+r},discountPrice(){var a;const s=(a=this.user.shoppingCart)==null?void 0:a.cart.products.reduce((o,e)=>(e.isDiscount?this.discountData.type==="money"?o+=e.totalPrice-this.discountData.scale:o+=Math.round(e.totalPrice*this.discountData.scale):o+=e.totalPrice,o),0),r=this.user.shoppingCart.cart.courses.reduce((o,e)=>(e.isDiscount?this.discountData.type==="money"?o+=e.totalPrice-this.discountData.scale:o+=Math.round(e.totalPrice*this.discountData.scale):o+=e.totalPrice,o),0);return s+r},hasDiscount(){var r,a,o,e;let s=!1;return(a=(r=this.user.shoppingCart)==null?void 0:r.cart.products)==null||a.forEach(t=>{console.log(t),s=t.isDiscount?!0:""}),(e=(o=this.user.shoppingCart)==null?void 0:o.cart.courses)==null||e.forEach(t=>t.isDiscount?s=!0:""),s}},methods:{...w(m,["getDiscountData"]),inputPrompt(){this.$swal({titleText:"請輸入折扣碼代號",input:"text",inputValue:"",showCancelButton:!0,inputValidator:s=>{this.discount=s,this.user.shoppingCart.discount=s}})},toThousand:x},mounted(){var s;this.getDiscountData(),this.discount=(s=this.user.shoppingCart)==null?void 0:s.discount}},y={class:"bg-brand-06 flex flex-col lg:flex-row lg:items-center justify-between px-4 py-10 gap-3"},C=n("p",null,"共 2 件商品",-1),v={class:"flex flex-wrap gap-x-2"},b={class:"text-gray-01 flex flex-wrap gap-x-2"},T={key:0,class:"text-red-500 font-bold flex items-center left-0 top-full whitespace-nowrap"},B=n("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})],-1),M={key:1,class:"text-red-500 font-bold flex items-center left-0 top-full whitespace-nowrap"},S=n("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})],-1),V={class:"flex flex-wrap gap-x-2 items-center"},j={key:0},E={key:1},N={key:2},z={class:"text-base text-gray-01"},A={class:"text-xl"},J={key:0,class:"text-gray-01"};function q(s,r,a,o,e,t){var p,f;return i(),c("div",y,[n("div",null,[C,n("div",v,[n("p",b,[l(" 折扣碼 "),(p=s.user.shoppingCart)!=null&&p.discount?(i(),c("span",{key:0,class:"underline underline-offset-2 cursor-pointer hover:text-brand-02 hover:font-bold",onClick:r[0]||(r[0]=(...d)=>t.inputPrompt&&t.inputPrompt(...d))},u((f=s.user.shoppingCart)==null?void 0:f.discount),1)):(i(),c("span",{key:1,class:"underline underline-offset-2 cursor-pointer hover:text-brand-02 hover:font-bold",onClick:r[1]||(r[1]=(...d)=>t.inputPrompt&&t.inputPrompt(...d))},u(e.discount?e.discount:"輸入折扣碼"),1))]),e.discount&&e.discount!==s.discountData.code?(i(),c("p",T,[B,l(" 折扣碼不存在 ")])):h("",!0),e.discount===s.discountData.code&&s.discountData.end<=new Date?(i(),c("p",M,[S,l(" 折扣碼已過期 ")])):h("",!0)])]),n("div",null,[n("p",V,[l(" 總計 "),e.discount!==s.discountData.code||s.discountData.end<=new Date?(i(),c("span",j," $ "+u(t.toThousand(t.totalPrice)),1)):t.hasDiscount?(i(),c("span",N,[n("del",z,"$ "+u(t.toThousand(t.totalPrice)),1),n("span",A,"$ "+u(t.toThousand(t.discountPrice)),1)])):(i(),c("span",E," $ "+u(t.toThousand(t.totalPrice)),1))]),e.discount===s.discountData.code&&s.discountData.end>new Date?(i(),c("p",J," 已節省 "+u(t.toThousand(t.totalPrice-t.discountPrice))+" 元 ",1)):h("",!0)]),n("div",null,[P(s.$slots,"default",{},()=>[l("按鈕 ")])])])}const I=_(k,[["render",q]]);export{I as T};