import{m as y,b as C,u as w,i as E,f as v,p as S}from"./vueLoadingStore-c0b7b794.js";import{T}from"./TotalPrice-9031e312.js";import{b6 as k,aj as f,l as D,au as U,m as r,av as p,j as _,s as c,T as B,t,b1 as x,k as V}from"./_plugin-vue_export-helper-01f09012.js";import{S as P}from"./ShopStep-535ea68e.js";import"./index-0526d3af.js";const q={},N={class:"flex flex-col p-4 bg-gray-03 bg-opacity-20 relative mt-3 shadow-[4px_5px_10px_gray]"},A=r("div",{class:"border-[12px] border-transparent border-b-gray-03 opacity-60 absolute -top-6 left-3"},null,-1);function F(u,e){return f(),D("div",N,[A,U(u.$slots,"default")])}const O=k(q,[["render",F]]),{VITE_BASEURL:M}={VITE_BASEURL:"https://2023-vue3-eastern-tea-aroma.onrender.com",BASE_URL:"/2023-Vue3-Eastern-Tea-Aroma/",MODE:"production",DEV:!1,PROD:!0},R={data(){return{buyerInfo:{name:"",tel:"",method:"自取",address:"",payMethods:{choose:"貨到付款",cardNumber:"",cardTime:["",""],cardCode:""}}}},computed:{...y(w,["user"]),...y(E,["discountData"]),...y(v,["courses"]),...y(S,["allProducts"])},methods:{...C(v,["getCoursesData"]),...C(S,["getAllProducts"]),checkout(){const{cart:u}=this.user.shoppingCart,{discount:e}=this.user.shoppingCart,{code:I,type:g,scale:o,end:b}=this.discountData,m=[],n={code:"",type:"",scale:""};if(this.allProducts.forEach(l=>{u.products.forEach(d=>{if(d.productId===l.id){const i={type:l.type,name:l.name,price:d.price,number:d.number,totalPrice:d.totalPrice,isDiscount:d.isDiscount,productId:d.productId};m.push(i)}})}),this.courses.forEach(l=>{l.courseDates.forEach(d=>{u.courses.forEach(i=>{if(i.courseDateId===d.id&&i.courseId===l.id){const s={name:l.title,start:d.start,end:d.end,price:i.price,number:i.number,totalPrice:i.totalPrice,isDiscount:i.isDiscount,courseDateId:i.courseDateId};m.push(s)}})})}),!m.length){this.$swal.fire({icon:"error",title:"購物車沒有商品",showCancelButton:!0,reverseButtons:!0,confirmButtonText:"來去選購"}).then(l=>{l.isConfirmed&&this.$router.push("/courses"),l.isDismissed&&this.$router.push("/")});return}e===I&&b>new Date&&(n.code=I,n.type=g,n.scale=o);const a={userId:+sessionStorage.getItem("userId"),buyerInfo:this.buyerInfo,discount:n,cart:m,trackingNumber:"",created:new Date().getTime(),finish:!1,isCancel:!1};u.products.length=0,u.courses.length=0;const{shoppingCart:h}=this.user;h.discount="",this.$http.post(`${M}/orders`,a).then(l=>(this.buyerInfo=this.$options.data().buyerInfo,this.$http.patch(`${M}/users/${sessionStorage.getItem("userId")}`,{shoppingCart:h}))).then(()=>this.$swal.fire({icon:"success",title:"訂單已成立",showConfirmButton:!1,timer:1500})).then(l=>{l.isDismissed&&this.$router.push("/shopCart/finish")})},onInvalidSubmit({errors:u}){const e=Object.keys(u)[0];document.querySelector(".form")[e].focus()}},components:{TotalPrice:T,FormBox:O,ShopStep:P},mounted(){this.getCoursesData(),this.getAllProducts()}},j={class:"wrap xl:px-24"},L=r("h1",{class:"text-3xl font-black font-self text-brand-02"},"購買人資訊",-1),z=r("label",{for:"name",class:"text-xl text-brand-02 font-self font-semibold mt-4"},"* 購買人",-1),G=r("label",{for:"tel",class:"text-xl text-brand-02 font-self font-semibold mt-4"},"* 手機號碼",-1),H=r("p",{class:"text-xl text-brand-02 font-self font-semibold mt-4"},"取貨方式",-1),J={for:"selfPickUp",class:"cursor-pointer hover:bg-brand-03 hover:bg-opacity-30"},K={for:"storeShipping",class:"cursor-pointer hover:bg-brand-03 hover:bg-opacity-30"},Q=r("label",{for:"address"},"* 地址",-1),W=r("p",{class:"text-xl text-brand-02 font-self font-semibold mt-4"},"付款方式",-1),X={for:"cashOnDelivery",class:"cursor-pointer hover:bg-brand-03 hover:bg-opacity-30"},Y={for:"creditCard",class:"cursor-pointer hover:bg-brand-03 hover:bg-opacity-30"},Z=r("label",{for:"cardNumber"},"* 卡號",-1),$={class:"flex flex-col md:flex-row"},ee={class:"flex flex-col md:block"},oe=r("p",{class:"mt-3 md:mt-0"},"* 效期",-1),te={for:"day"},re=r("span",{class:"mx-2 hidden md:inline-block"},"/",-1),se={for:"month"},ne={class:"mt-3 md:mt-0"},le=r("label",{for:"cardCode"},"* 安全碼",-1),de=r("button",{type:"submit",class:"btn-primary w-full"},"結帳",-1);function ae(u,e,I,g,o,b){const m=p("ShopStep"),n=p("VField"),a=p("VErrorMessage"),h=p("form-box"),l=p("total-price"),d=p("VForm");return f(),D("main",j,[(f(),_(B,{to:"title"},[c("確認購買")])),t(m),L,t(d,{action:"",class:"flex flex-col text-lg form",onSubmit:b.checkout,onInvalidSubmit:b.onInvalidSubmit},{default:x(({errors:i})=>[z,t(n,{type:"text",name:"姓名",id:"name",class:"px-2 py-1",placeholder:"請輸入姓名...",rules:"required",modelValue:o.buyerInfo.name,"onUpdate:modelValue":e[0]||(e[0]=s=>o.buyerInfo.name=s),modelModifiers:{trim:!0}},null,8,["modelValue"]),t(a,{name:"姓名",class:"text-red-600"}),G,t(n,{type:"tel",name:"手機號碼",id:"tel",class:"px-2 py-1",placeholder:"請輸入手機號碼...",rules:"required|numeric",modelValue:o.buyerInfo.tel,"onUpdate:modelValue":e[1]||(e[1]=s=>o.buyerInfo.tel=s),modelModifiers:{trim:!0}},null,8,["modelValue"]),t(a,{name:"手機號碼",class:"text-red-600"}),H,r("label",J,[t(n,{type:"radio",name:"取貨方式",id:"selfPickUp",value:"自取",modelValue:o.buyerInfo.method,"onUpdate:modelValue":e[2]||(e[2]=s=>o.buyerInfo.method=s),modelModifiers:{trim:!0},rules:"required"},null,8,["modelValue"]),c("自取")]),r("label",K,[t(n,{type:"radio",name:"取貨方式",id:"storeShipping",value:"店家寄件"}),c(" 店家寄件 ")]),t(a,{name:"取貨方式",class:"text-red-600"}),o.buyerInfo.method==="店家寄件"?(f(),_(h,{key:0},{default:x(()=>[Q,t(n,{name:"地址",id:"address",type:"text",class:"px-2 py-1",placeholder:"請輸入寄件地址...",rules:"required",modelValue:o.buyerInfo.address,"onUpdate:modelValue":e[3]||(e[3]=s=>o.buyerInfo.address=s),modelModifiers:{trim:!0}},null,8,["modelValue"]),t(a,{name:"地址",class:"text-red-600"})]),_:1})):V("",!0),W,r("label",X,[t(n,{type:"radio",name:"付款方式",id:"cashOnDelivery",modelValue:o.buyerInfo.payMethods.choose,"onUpdate:modelValue":e[4]||(e[4]=s=>o.buyerInfo.payMethods.choose=s),modelModifiers:{trim:!0},value:"貨到付款",rules:"required"},null,8,["modelValue"]),c("貨到付款")]),r("label",Y,[t(n,{type:"radio",name:"付款方式",id:"creditCard",value:"信用卡"}),c("信用卡")]),t(a,{name:"付款方式",class:"text-red-600"}),o.buyerInfo.payMethods.choose==="信用卡"?(f(),_(h,{key:1},{default:x(()=>[Z,t(n,{type:"number",name:"卡號",id:"cardNumber",class:"px-2 py-1",placeholder:"請輸入卡號...",rules:"required|numeric",modelValue:o.buyerInfo.payMethods.cardNumber,"onUpdate:modelValue":e[5]||(e[5]=s=>o.buyerInfo.payMethods.cardNumber=s),modelModifiers:{trim:!0},onkeypress:"return (/[\\d]/.test(String.fromCharCode(event.keyCode)))"},null,8,["modelValue"]),t(a,{name:"卡號",class:"text-red-600"}),r("div",$,[r("div",ee,[oe,r("label",te,[c("日期"),t(n,{type:"number",name:"日期",id:"day",class:"md:w-1/3 w-full px-2 py-1 ml-1",placeholder:"DD",rules:"required|numeric|length:2",modelValue:o.buyerInfo.payMethods.cardTime[0],"onUpdate:modelValue":e[6]||(e[6]=s=>o.buyerInfo.payMethods.cardTime[0]=s),modelModifiers:{trim:!0},onkeypress:"return (/[\\d]/.test(String.fromCharCode(event.keyCode)))"},null,8,["modelValue"])]),re,r("label",se,[c("月份"),t(n,{type:"number",name:"月份",id:"month",class:"md:w-1/3 w-full px-2 py-1 ml-1",placeholder:"MM",rules:"required|numeric|length:2",modelValue:o.buyerInfo.payMethods.cardTime[1],"onUpdate:modelValue":e[7]||(e[7]=s=>o.buyerInfo.payMethods.cardTime[1]=s),modelModifiers:{trim:!0},onkeypress:"return (/[\\d]/.test(String.fromCharCode(event.keyCode)))"},null,8,["modelValue"])]),r("p",null,[t(a,{name:"日期",class:"text-red-600"}),i.日期?V("",!0):(f(),_(a,{key:0,name:"月份",class:"text-red-600"}))])]),r("div",ne,[le,t(n,{name:"安全碼",id:"cardCode",type:"number",class:"w-full px-2 py-1",placeholder:"請輸入安全碼...",modelValue:o.buyerInfo.payMethods.cardCode,"onUpdate:modelValue":e[8]||(e[8]=s=>o.buyerInfo.payMethods.cardCode=s),modelModifiers:{trim:!0},onkeypress:"return (/[\\d]/.test(String.fromCharCode(event.keyCode)))",rules:"required|numeric|length:3"},null,8,["modelValue"]),t(a,{name:"安全碼",class:"text-red-600"})])])]),_:2},1024)):V("",!0),t(l,{class:"mt-10"},{default:x(()=>[de]),_:1})]),_:1},8,["onSubmit","onInvalidSubmit"])])}const fe=k(R,[["render",ae]]);export{fe as default};