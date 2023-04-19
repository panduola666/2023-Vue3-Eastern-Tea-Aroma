import{D as P}from"./DialogModal-29e49acd.js";import{b as m,i as w,p as $,f as V,m as g}from"./vueLoadingStore-27fc4ac1.js";import{l as k,k as S,v as M}from"./runtime-dom.esm-bundler-21d14b8b.js";import{b6 as E,av as x,aj as l,l as r,t as C,b1 as _,m as t,au as U,b3 as D,aJ as n,a3 as h,k as B,s as T,j as A,T as H,F as p,at as y}from"./_plugin-vue_export-helper-01f09012.js";import{t as Y}from"./index-48e7fe8b.js";const{VITE_BASEURL:v}={VITE_BASEURL:"https://2023-vue3-eastern-tea-aroma.onrender.com",BASE_URL:"/2023-Vue3-Eastern-Tea-Aroma/",MODE:"production",DEV:!1,PROD:!0},z={props:{discountData:{type:Object,required:!0},allProducts:{type:Object,required:!0},courses:{type:Object,required:!0}},data(){return{editorData:{},isFinish:!1}},computed:{endDate(){const s=new Date(this.date).toLocaleDateString().split("/");return new Date(...s)}},methods:{...m(w,["getDiscountData"]),...m($,["getAllProducts"]),...m(V,["getCoursesData"]),async finishFn(){const{code:s,type:a,scale:d,end:u}=this.editorData;if(!s){this.$swal.fire({icon:"error",title:"折扣碼 未填寫",showConfirmButton:!1,timer:1500});return}if(!a){this.$swal.fire({icon:"error",title:"請選擇 折扣方式",showConfirmButton:!1,timer:1500});return}if(!d||d<=0){this.$swal.fire({icon:"error",title:"折扣額度 未填寫",showConfirmButton:!1,timer:1500});return}if(u<new Date){this.$swal.fire({icon:"error",title:"截止日期 不可小於今日",showConfirmButton:!1,timer:1500});return}if(u<new Date){this.$swal.fire({icon:"error",title:"截止日期不可小於今日",showConfirmButton:!1,timer:1500,allowOutsideClick:!1});return}a==="percentage"&&(this.editorData.scale=`0.${d}`);const i=new Date(u).getFullYear(),c=new Date(u).getMonth(),f=new Date(u).getDate();this.editorData.end=new Date(i,c,f,23,59,59).getTime(),this.allProducts.forEach(e=>{if(a==="money"&&e.price-d<=0){if(e.isDiscount=!1,e.isDiscount)return;this.$http.patch(`${v}/products/${e.id}`,{isDiscount:!1})}}),this.courses.forEach(e=>{a==="money"&&e.price-d<=0&&e.courseDates.forEach(o=>{o.isDiscount=!1,!e.isDiscount&&this.$http.patch(`${v}/courseDates/${o.id}`,{isDiscount:!1})})}),await this.$http.patch(`${v}/discount`,this.editorData).then(()=>{this.$swal.fire({icon:"success",title:"折扣碼修改成功",showConfirmButton:!1,timer:1500}),this.editorData={...this.discountData},this.getDiscountData()}),this.isFinish=!0},cancelFn(){this.editorData={...this.discountData}}},watch:{discountData(){this.editorData={...this.discountData},this.editorData.type==="percentage"&&(this.editorData.scale*100%10===0?this.editorData.scale=this.editorData.scale*10:this.editorData.scale=this.editorData.scale*100)}},components:{DialogModal:P}},F=t("h3",{class:"text-xl font-self"},"修改折扣碼",-1),O={class:"flex flex-col gap-4"},I={class:"flex flex-col"},L=t("label",{for:"code"},"* 折扣碼",-1),R={class:"flex flex-col"},j=t("label",{for:"type",class:""},"* 折扣方式",-1),N=t("option",{value:"",selected:"",disabled:""},"請選擇折扣方式",-1),q=t("option",{value:"percentage"},"百分比",-1),J=t("option",{value:"money"},"實際金額",-1),G=[N,q,J],K={class:"grid grid-cols-2 gap-6"},Q={class:"flex flex-col"},W=t("p",null,"* 截止日期",-1),X={class:"flex items-center border border-gray-01 shadow-lg h-full"},Z=["onClick"],tt=t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",class:"w-4 h-4 fill-brand-01 group-focus:fill-white"},[t("path",{d:"M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"})],-1),et=[tt],st=["value"],ot={key:0},at=t("label",{for:"moneyScale"},"* 折扣額度",-1),it={key:1,class:"flex flex-col"},nt=t("label",{for:"percentageScale"},"* 折扣額度",-1),lt=t("option",{value:"",selected:"",disabled:""},"請選擇折扣比例",-1),rt=t("option",{value:"95"},"95 折",-1),ct=t("option",{value:"9"},"9 折",-1),dt=t("option",{value:"85"},"85 折",-1),ut=t("option",{value:"8"},"8 折",-1),ht=t("option",{value:"75"},"75 折",-1),pt=[lt,rt,ct,dt,ut,ht],Dt={class:"bg-brand-03 bg-opacity-30 py-5 px-3 m-10"},mt={class:"w-full text-center"},ft=t("caption",{class:"text-xl"}," 優惠資訊 ",-1),_t=t("tr",{class:"border-b border-b-gray-01"},[t("th",{class:"p-2"},"折扣碼"),t("th",null,"折扣方式"),t("th",null,"截止日期"),t("th",null,"折扣額度")],-1),bt={class:"text-2xl"},gt={class:"p-2"},yt={key:0,class:"text-red-500 mt-5 text-xl font-bold text-end"};function vt(s,a,d,u,i,c){const f=x("v-date-picker"),e=x("DialogModal");return l(),r("div",null,[C(e,{"finish-fn":c.finishFn,"cancel-fn":c.cancelFn,"is-finish":i.isFinish},{"modal-btn":_(()=>[t("div",{onClick:a[0]||(a[0]=()=>i.isFinish=!1)},[U(s.$slots,"btn-content",{},()=>[T("按鈕")])])]),"modal-header":_(()=>[F]),"modal-body":_(()=>[t("div",O,[t("div",I,[L,D(t("input",{type:"text",name:"code",id:"code",placeholder:"請輸入折扣碼...",class:"border border-gray-01 p-2 shadow-lg","onUpdate:modelValue":a[1]||(a[1]=o=>i.editorData.code=o)},null,512),[[k,i.editorData.code,void 0,{trim:!0}]])]),t("div",R,[j,D(t("select",{name:"type",id:"type",class:"border border-gray-01 p-2 shadow-lg","onUpdate:modelValue":a[2]||(a[2]=o=>i.editorData.type=o),onChange:a[3]||(a[3]=()=>i.editorData.scale="")},G,544),[[S,i.editorData.type]])]),t("div",K,[t("div",Q,[W,C(f,{class:"inline-block flex-grow",modelValue:i.editorData.end,"onUpdate:modelValue":a[4]||(a[4]=o=>i.editorData.end=o),color:"teal"},{default:_(({inputValue:o,togglePopover:b})=>[t("div",X,[t("button",{type:"button",class:"p-2 bg-brand-01 bg-opacity-10 border-r border-gray-01 hover:bg-opacity-30 focus:bg-brand-02 focus:outline-none group h-full",onClick:()=>b()},et,8,Z),t("input",{value:o,class:"bg-white text-gray-700 border w-full py-1 px-2 appearance-none focus:outline-none h-full",readonly:""},null,8,st)])]),_:1},8,["modelValue"])]),i.editorData.type==="money"?(l(),r("div",ot,[at,D(t("input",{type:"number",name:"moneyScale",id:"moneyScale",placeholder:"請輸入金額...",class:"border border-gray-01 p-2 shadow-lg w-full","onUpdate:modelValue":a[5]||(a[5]=o=>i.editorData.scale=o),onkeyup:"value=value.replace(/^(0+)|[^\\d]+/g,'')"},null,512),[[k,i.editorData.scale,void 0,{number:!0}]])])):(l(),r("div",it,[nt,D(t("select",{name:"percentageScale",id:"percentageScale",class:"border border-gray-01 p-2","onUpdate:modelValue":a[6]||(a[6]=o=>i.editorData.scale=o)},pt,512),[[S,i.editorData.scale]])]))]),t("div",Dt,[t("table",mt,[ft,_t,t("tr",bt,[t("td",gt,n(i.editorData.code),1),t("td",null,n(i.editorData.type==="money"?"實際金額":"百分比"),1),t("td",{class:h({"text-red-500":i.editorData.end<new Date().getTime()})},n(s.$date(i.editorData.end).format("YYYY-MM-DD")),3),t("td",null,n(i.editorData.type==="money"?`${i.editorData.scale} 元`:`${i.editorData.scale} 折`),1)])]),i.editorData.end<new Date().getTime()?(l(),r("p",yt," * 截止日期不可小於今日 ")):B("",!0)])])]),_:3},8,["finish-fn","cancel-fn","is-finish"])])}const wt=E(z,[["render",vt]]),{VITE_BASEURL:$t}={VITE_BASEURL:"https://2023-vue3-eastern-tea-aroma.onrender.com",BASE_URL:"/2023-Vue3-Eastern-Tea-Aroma/",MODE:"production",DEV:!1,PROD:!0},Vt={computed:{...g($,["allProducts"]),...g(V,["courses"]),...g(w,["discountData"]),percentageScale(){return this.discountData.scale*100%10===0?this.discountData.scale*10:this.discountData.scale*100},myCourses(){const s=[];return this.courses.forEach(a=>{a.userId===+sessionStorage.getItem("userId")&&s.push(a)}),s}},methods:{...m($,["getAllProducts"]),...m(V,["getCoursesData"]),...m(w,["getDiscountData"]),toThousand:Y,patchDiscountState(s,a,d){const{id:u}=a;if((this.discountData.type==="money"?d-this.discountData.scale:Math.round(d*this.discountData.scale))<=0){this.$swal.fire({icon:"error",title:"該商品不可折扣",text:"優惠後的價格不可低於 0",showConfirmButton:!1,timer:1500,allowOutsideClick:!1}),a.isDiscount=!1;return}this.$http.patch(`${$t}/${s}/${u}`,{isDiscount:a.isDiscount}).then(()=>{this.$swal.fire({icon:"success",title:"修改成功",showConfirmButton:!1,timer:1500,allowOutsideClick:!1})})}},mounted(){this.getAllProducts(),this.getCoursesData(),this.getDiscountData()},components:{PostDiscountModal:wt}},xt={class:"admin-wrap min-h-[50vh]"},Ct=t("h1",{class:"text-3xl font-black font-self text-brand-02"},"折扣專區",-1),kt={class:"flex justify-end"},St=t("button",{type:"button",class:"btn-primary"},"修改折扣碼",-1),Mt={class:"bg-brand-03 bg-opacity-30 text-xl p-3 my-5"},Et={class:"grid lg:grid-cols-2"},Bt={class:"lg:self-center lg:text-center mb-3 lg:mb-0"},Tt={class:"mb-3"},Pt={class:"col-start-2"},Ut={class:"w-full my-5 divide-y divide-gray-01 border border-gray-01"},At=t("thead",null,[t("tr",{class:"bg-brand-01 bg-opacity-50 text-xl"},[t("th",{class:"p-2"},"系列"),t("th",null,"名稱"),t("th",null,"原價"),t("th",null,"優惠價"),t("th",null,"是否套用折扣")])],-1),Ht={class:"bg-white bg-opacity-30 text-center divide-y divide-gray-01"},Yt={key:0},zt=t("td",{colspan:"5",class:"p-2"},"當前沒有任何商品",-1),Ft=[zt],Ot={class:"p-3"},It=["name","id","onUpdate:modelValue","onChange"],Lt=["for"],Rt={key:0,class:"hover:bg-gray-03 hover:bg-opacity-30"},jt={class:"p-3"},Nt=["name","id","onUpdate:modelValue","onChange"],qt=["for"];function Jt(s,a,d,u,i,c){const f=x("PostDiscountModal");return l(),r("div",xt,[(l(),A(H,{to:"title"},[T("折扣專區")])),Ct,t("div",kt,[C(f,{"discount-data":s.discountData,allProducts:s.allProducts,courses:s.courses},{"btn-content":_(()=>[St]),_:1},8,["discount-data","allProducts","courses"])]),t("section",Mt,[t("h2",{class:h(["text-center text-2xl font-bold mb-3",{"text-red-500":s.discountData.end<new Date}])},n(s.discountData.end>new Date?"當前已有折扣優惠":"該折扣碼已失效"),3),t("section",Et,[t("h3",Bt," 優惠碼："+n(s.discountData.code),1),t("div",null,[t("p",Tt," 截止日期："+n(s.$date(s.discountData.end).format("YYYY-MM-DD HH:mm:ss")),1),t("p",Pt," 折扣額度："+n(s.discountData.type==="money"?`${s.discountData.scale} 元`:`${c.percentageScale} 折`),1)])])]),t("table",Ut,[At,t("tbody",Ht,[!s.allProducts.length&&!s.courses.length?(l(),r("tr",Yt,Ft)):(l(),r(p,{key:1},[(l(!0),r(p,null,y(s.allProducts,e=>(l(),r("tr",{key:e.id,class:"hover:bg-gray-03 hover:bg-opacity-30"},[t("td",Ot,n(e.type),1),t("td",null,n(e.name),1),t("td",{class:h({"bg-brand-03 bg-opacity-30":!e.isDiscount})},n(c.toThousand(e.price)),3),t("td",{class:h({"text-red-500 font-bold":(s.discountData.type==="money"?e.price-s.discountData.scale:Math.round(e.price*s.discountData.scale))<=0,"bg-brand-03 bg-opacity-30":e.isDiscount})},n(s.discountData.type==="money"?e.price-s.discountData.scale:Math.round(e.price*s.discountData.scale)),3),t("td",null,[D(t("input",{type:"checkbox",name:e.id,id:"products"+e.id,class:"scale-150 cursor-pointer mr-2","onUpdate:modelValue":o=>e.isDiscount=o,onChange:()=>c.patchDiscountState("products",e,e.price)},null,40,It),[[M,e.isDiscount,void 0,{trim:!0}]]),t("label",{for:"products"+e.id,class:h(["cursor-pointer",{"text-red-500":!e.isDiscount,"text-brand-01":e.isDiscount}])},n(e.isDiscount?"已折扣":"未折扣"),11,Lt)])]))),128)),(l(!0),r(p,null,y(c.myCourses,e=>(l(),r(p,{key:e.id+e.title},[(l(!0),r(p,null,y(e.courseDates,o=>(l(),r(p,{key:o.id+o.courseId},[o.end>new Date?(l(),r("tr",Rt,[t("td",jt,n(e.title),1),t("td",null,n(s.$date(o.start).format("YYYY-MM-DD HH:mm"))+" ~ "+n(s.$date(o.end).format("HH:mm"))+" ("+n(["日","一","二","三","四","五","六"][s.$date(o.start).day()])+") ",1),t("td",{class:h({"bg-brand-03 bg-opacity-30":!o.isDiscount})},n(c.toThousand(e.price)),3),t("td",{class:h({"text-red-500 font-bold":(s.discountData.type==="money"?e.price-s.discountData.scale:Math.round(e.price*s.discountData.scale))<=0,"bg-brand-03 bg-opacity-30":o.isDiscount})},n(s.discountData.type==="money"?e.price-s.discountData.scale:Math.round(e.price*s.discountData.scale)),3),t("td",null,[D(t("input",{type:"checkbox",name:o.id,id:"courseDates"+o.id,class:"scale-150 cursor-pointer mr-2","onUpdate:modelValue":b=>o.isDiscount=b,onChange:()=>c.patchDiscountState("courseDates",o,e.price)},null,40,Nt),[[M,o.isDiscount,void 0,{trim:!0}]]),t("label",{for:"courseDates"+o.id,class:h(["cursor-pointer",{"text-red-500":!o.isDiscount,"text-brand-01":o.isDiscount}])},n(o.isDiscount?"已折扣":"未折扣"),11,qt)])])):B("",!0)],64))),128))],64))),128))],64))])])])}const Zt=E(Vt,[["render",Jt]]);export{Zt as default};