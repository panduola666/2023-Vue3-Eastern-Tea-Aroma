import{D as E}from"./DialogModal-29e49acd.js";import{C as A}from"./ckeditor-a0246d3b.js";import{m as D,b as g,j as P,p as U,o as G,i as I}from"./vueLoadingStore-c0b7b794.js";import{l as h,k as $}from"./runtime-dom.esm-bundler-21d14b8b.js";import{b6 as V,av as y,aj as r,l,t as b,b1 as u,m as e,au as j,aJ as f,s as a,a3 as S,k as N,b3 as c,j as _,F as v,at as k}from"./_plugin-vue_export-helper-01f09012.js";import{C as F}from"./CoursesCard-dcc04854.js";import{D as M}from"./DiscountToggle-d66b22f7.js";import{t as L}from"./index-0526d3af.js";import"./use-resolve-button-type-da2c6d21.js";const{VITE_BASEURL:B}={VITE_BASEURL:"https://2023-vue3-eastern-tea-aroma.onrender.com",BASE_URL:"/2023-Vue3-Eastern-Tea-Aroma/",MODE:"production",DEV:!1,PROD:!0},x={props:{isNew:{type:Boolean,default:!1},productData:{type:Object},productGroups:{type:Object,required:!0},productTypes:{type:Object,required:!0}},data:()=>({imageStyle:"雲端圖片",currentData:{coverUrl:"",type:"",group:"",name:"",price:100,totalNumber:10,content:"",isDiscount:!1},editor:A,editorConfig:{placeholder:"請輸入商品介紹...",toolbar:["bold","italic","blockQuote","|","undo","redo"]},isImgurLogin:sessionStorage.getItem("first_token")!=="null",isNewTypeOpen:!1,isNewGroupOpen:!1,newTypeInput:"",newGroupInput:"",isFinish:!1}),computed:{...D(P,["imgUrl"])},methods:{...g(P,["postFinal"]),...g(U,["getAllProducts","pushNewType","pushNewGroup"]),finishFn(){const{type:t,group:o,name:d,price:m,totalNumber:p,content:n}=this.currentData;if(this.imageStyle==="本地圖片"&&(this.currentData.coverUrl=this.imgUrl),this.imageStyle==="本地圖片"&&!this.imgUrl){this.$swal.fire({icon:"error",title:"還未上傳本地圖片",showConfirmButton:!1,timer:1500});return}if(this.currentData.coverUrl===""){this.$swal.fire({icon:"error",title:"請選擇商品封面",showConfirmButton:!1,timer:1500});return}if(!d){this.$swal.fire({icon:"error",title:"商品標題 未填寫",showConfirmButton:!1,timer:1500});return}if(!o){this.$swal.fire({icon:"error",title:"請選擇 商品系列",showConfirmButton:!1,timer:1500});return}if(!t){this.$swal.fire({icon:"error",title:"請選擇 商品分類",showConfirmButton:!1,timer:1500});return}if(!n){this.$swal.fire({icon:"error",title:"商品介紹 未填寫",showConfirmButton:!1,timer:1500});return}if(m<1||p<1){this.$swal.fire({icon:"error",title:"價格及數量不可小於 1",showConfirmButton:!1,timer:1500});return}this.isNew?this.$http.post(`${B}/products`,this.currentData).then(()=>{this.$swal.fire({icon:"success",title:"商品新增成功",showConfirmButton:!1,timer:1500}),this.getAllProducts(),this.currentData=this.$options.data().currentData}):this.$http.patch(`${B}/products/${this.currentData.id}`,this.currentData).then(()=>{this.$swal.fire({icon:"success",title:"商品編輯成功",showConfirmButton:!1,timer:1500}),this.getAllProducts()}),this.isFinish=!0},cancelFn(){this.isNew?this.currentData=this.$options.data().currentData:this.currentData={...this.productData}},addNewType(){this.currentData.type=this.newTypeInput,this.isNewTypeOpen=!1,this.productTypes[this.newTypeInput]||this.pushNewType(this.newTypeInput),this.newTypeInput=""},addNewGroup(){this.currentData.group=this.newGroupInput,this.isNewGroupOpen=!1,this.productGroups[this.newGroupInput]||this.pushNewGroup(this.newGroupInput),this.newGroupInput=""}},watch:{productData(){this.currentData={...this.productData}}},components:{DialogModal:E}},R={class:"text-xl font-black font-self text-brand-02"},q={class:"flex flex-col-reverse lg:flex-row gap-3"},z={class:"flex flex-col flex-shrink-0 gap-3 lg:w-96 lg:h-full h-[75vh] overflow-x-hidden px-3"},J={class:"font-semibold"},Q={class:"float-right text-gray-02 font-normal"},H=["src","alt"],K=["src","alt"],W={key:2,for:"imgUrl"},X={key:3,class:"flex flex-col gap-3"},Y={key:0,for:"updateImg",class:"btn-primary cursor-pointer relative"},Z={class:"flex-grow lg:border-l-2 flex flex-col gap-3 lg:px-3"},tt={for:"name",class:"grid"},et=e("label",{for:"type"},"* 商品系列 ",-1),ot={key:0,class:"bg-brand-06 bg-opacity-40 my-2 p-3"},st={for:"newType"},rt={class:"text-end block"},lt=e("option",{value:"",selected:"",disabled:""},"請選擇商品系列",-1),nt=["value"],it=e("label",{for:"group"},"* 商品分類 ",-1),at={key:0,class:"bg-brand-06 bg-opacity-40 my-2 p-3"},ut={for:"newGroup"},dt={class:"text-end block"},pt=e("option",{value:"",selected:"",disabled:""},"請選擇商品分類",-1),ct=["value"],ft={class:"grid lg:grid-cols-2 lg:gap-7 gap-3"},mt={for:"price",class:"grid"},ht={for:"totalNumber",class:"grid"},yt=e("p",{class:"mb-3"},"* 商品介紹",-1);function gt(t,o,d,m,p,n){const w=y("router-link"),C=y("ckeditor"),T=y("DialogModal");return r(),l("div",null,[b(T,{"finish-fn":n.finishFn,"cancel-fn":n.cancelFn,"is-finish":t.isFinish},{"modal-btn":u(()=>[e("div",{onClick:o[0]||(o[0]=()=>t.isFinish=!1)},[j(t.$slots,"btn-content",{},()=>[a("按鈕")])])]),"modal-header":u(()=>[e("h2",R,f(d.isNew?"新增商品":"編輯商品"),1)]),"modal-body":u(()=>[e("div",q,[e("div",z,[e("p",J,[a(" * 封面 "),e("span",Q,[e("button",{type:"button",class:S(["mr-2 hover:underline hover:text-gray-01",{"underline text-gray-01":t.imageStyle==="本地圖片"}]),onClick:o[1]||(o[1]=()=>{t.imageStyle="本地圖片"})}," 本地圖片 ",2),e("button",{type:"button",class:S(["hover:underline hover:text-gray-01",{"underline text-gray-01":t.imageStyle==="雲端圖片"}]),onClick:o[2]||(o[2]=()=>t.imageStyle="雲端圖片")}," 雲端圖片 ",2)])]),t.imageStyle==="本地圖片"&&t.imgUrl?(r(),l("img",{key:0,src:t.imgUrl,alt:t.currentData.name,class:"w-full object-cover"},null,8,H)):t.imageStyle==="雲端圖片"?(r(),l("img",{key:1,src:t.currentData.coverUrl,alt:t.currentData.name,class:"w-full object-cover"},null,8,K)):N("",!0),t.imageStyle==="雲端圖片"?(r(),l("label",W,[a("網址"),c(e("input",{type:"text",name:"imgUrl",id:"imgUrl","onUpdate:modelValue":o[3]||(o[3]=s=>t.currentData.coverUrl=s),class:"border border-gray-01 p-2 w-full",placeholder:"請輸入圖片網址...","aria-label":"雲端圖片輸入框"},null,512),[[h,t.currentData.coverUrl]])])):(r(),l("div",X,[t.isImgurLogin?(r(),l("label",Y,[a("上傳圖片 "),e("input",{type:"file",name:"updateImg",accept:".png",id:"updateImg",class:"absolute opacity-0",onChange:o[4]||(o[4]=s=>t.postFinal(s))},null,32)])):(r(),_(w,{key:1,to:"/admin",class:"btn-primary"},{default:u(()=>[a("取得驗證")]),_:1}))]))]),e("div",Z,[e("label",tt,[a("* 標題 "),c(e("input",{type:"text",name:"name",id:"name",class:"border border-gray-01 p-2 w-full","onUpdate:modelValue":o[5]||(o[5]=s=>t.currentData.name=s),placeholder:"請輸入商品名稱..."},null,512),[[h,t.currentData.name]])]),e("div",null,[e("p",null,[et,t.isNewTypeOpen?(r(),l("button",{key:1,type:"button",class:"text-brand-01 font-bold text-[35px] leading-8 float-right opacity-60 hover:opacity-100",onClick:o[7]||(o[7]=()=>t.isNewTypeOpen=!1)}," - ")):(r(),l("button",{key:0,type:"button",class:"text-brand-01 font-bold text-3xl float-right opacity-60 hover:opacity-100",onClick:o[6]||(o[6]=()=>t.isNewTypeOpen=!0)}," + "))]),t.isNewTypeOpen?(r(),l("div",ot,[e("label",st,[a("新增系列 "),c(e("input",{name:"newType",id:"newType",type:"text",class:"border border-gray-01 p-2 w-full mt-3","onUpdate:modelValue":o[8]||(o[8]=s=>t.newTypeInput=s)},null,512),[[h,t.newTypeInput]])]),e("div",rt,[e("button",{type:"button",class:"btn-outline py-1 mt-3 mr-3",onClick:o[9]||(o[9]=()=>t.isNewTypeOpen=!1)}," 取消 "),e("button",{type:"button",class:"btn-outline py-1 mt-3",onClick:o[10]||(o[10]=()=>n.addNewType())}," 新增 ")])])):N("",!0),c(e("select",{name:"type",id:"type",class:"border border-gray-01 p-2 w-full","onUpdate:modelValue":o[11]||(o[11]=s=>t.currentData.type=s)},[lt,(r(!0),l(v,null,k(d.productTypes,(s,i)=>(r(),l("option",{value:i,key:i+s},f(i),9,nt))),128))],512),[[$,t.currentData.type]])]),e("div",null,[e("p",null,[it,t.isNewGroupOpen?(r(),l("button",{key:1,type:"button",class:"text-brand-01 font-bold text-[35px] leading-8 float-right opacity-60 hover:opacity-100",onClick:o[13]||(o[13]=()=>t.isNewGroupOpen=!1)}," - ")):(r(),l("button",{key:0,type:"button",class:"text-brand-01 font-bold text-3xl float-right opacity-60 hover:opacity-100",onClick:o[12]||(o[12]=()=>t.isNewGroupOpen=!0)}," + "))]),t.isNewGroupOpen?(r(),l("div",at,[e("label",ut,[a("新增分類 "),c(e("input",{name:"newGroup",id:"newGroup",type:"text",class:"border border-gray-01 p-2 w-full mt-3","onUpdate:modelValue":o[14]||(o[14]=s=>t.newGroupInput=s)},null,512),[[h,t.newGroupInput]])]),e("div",dt,[e("button",{type:"button",class:"btn-outline py-1 mt-3 mr-3",onClick:o[15]||(o[15]=()=>t.isNewGroupOpen=!1)}," 取消 "),e("button",{type:"button",class:"btn-outline py-1 mt-3",onClick:o[16]||(o[16]=(...s)=>n.addNewGroup&&n.addNewGroup(...s))}," 新增 ")])])):N("",!0),c(e("select",{name:"group",id:"group",class:"border border-gray-01 p-2 w-full","onUpdate:modelValue":o[17]||(o[17]=s=>t.currentData.group=s)},[pt,(r(!0),l(v,null,k(d.productGroups,(s,i)=>(r(),l("option",{value:i,key:i+s},f(i),9,ct))),128))],512),[[$,t.currentData.group]])]),e("div",ft,[e("label",mt,[a("* 價格"),c(e("input",{type:"number",name:"price",id:"price",class:"border border-gray-01 p-2 w-full",placeholder:"請輸入價格...",min:"1",onkeyup:"value=value.replace(/^(0+)|[^\\d]+/g,'')","onUpdate:modelValue":o[18]||(o[18]=s=>t.currentData.price=s)},null,512),[[h,t.currentData.price,void 0,{number:!0}]])]),e("label",ht,[a("* 數量"),c(e("input",{type:"number",name:"totalNumber",id:"totalNumber",class:"border border-gray-01 p-2 w-full",placeholder:"請輸銷售數量...","onUpdate:modelValue":o[19]||(o[19]=s=>t.currentData.totalNumber=s),min:"1",onkeyup:"value=value.replace(/^(0+)|[^\\d]+/g,'')"},null,512),[[h,t.currentData.totalNumber,void 0,{number:!0}]])])]),e("div",null,[yt,b(C,{editor:t.editor,modelValue:t.currentData.content,"onUpdate:modelValue":o[20]||(o[20]=s=>t.currentData.content=s),config:t.editorConfig},null,8,["editor","modelValue","config"])])])])]),"modal-footer":u(()=>[]),_:3},8,["finish-fn","cancel-fn","is-finish"])])}const bt=V(x,[["render",gt]]),{VITE_BASEURL:O}={VITE_BASEURL:"https://2023-vue3-eastern-tea-aroma.onrender.com",BASE_URL:"/2023-Vue3-Eastern-Tea-Aroma/",MODE:"production",DEV:!1,PROD:!0},wt={data(){return{currentProduct:{},filterProductChoose:""}},computed:{...D(U,["allProducts","productGroups","productTypes"]),...D(G,["orders"]),...D(I,["discountData"]),isAllDiscount(){let t=0;return this.allProducts.forEach(o=>{o.isDiscount&&t++}),t===this.allProducts.length}},methods:{...g(U,["getAllProducts"]),...g(G,["getOrdersData"]),...g(I,["getDiscountData"]),toThousand:L,sellNumber(t){let o=0;return this.orders.forEach(d=>{d.cart.forEach(m=>{m.productId===t.id&&(o+=m.number)})}),o},allDiscount(){this.allProducts.forEach(t=>{if(!t.isDiscount){if((this.discountData.type==="money"?t.price-this.discountData.scale:Math.round(t.price*this.discountData.scale))<=0){this.$swal.fire({icon:"error",title:"內含不可折扣商品,無法套用",showConfirmButton:!1,timer:1500,allowOutsideClick:!1});return}this.$http.patch(`${O}/products/${t.id}`,{isDiscount:!0}).then(()=>t.isDiscount=!0)}})},async deleteProduct(t){const{isConfirmed:o}=await this.$swal.fire({title:"是否刪除該商品",showCancelButton:!0,reverseButtons:!0});if(o){await this.$http.delete(`${O}/products/${t}`);const{isDismissed:d}=await this.$swal.fire({icon:"success",title:"刪除成功",showConfirmButton:!1,allowOutsideClick:!1,timer:1500});d&&this.getAllProducts()}}},mounted(){this.getAllProducts(),this.getOrdersData(),this.getDiscountData()},components:{CoursesCard:F,PostProductsModal:bt,DiscountToggle:M}},Dt={class:"flex lg:flex-row flex-col gap-5 justify-between lg:items-center"},vt={class:"w-full flex lg:flex-row flex-col lg:items-center items-start lg:gap-3"},kt=e("label",{for:"productType",class:"flex-shrink-0"},"商品分類",-1),Ct=e("option",{value:"",selected:""},"全部",-1),Tt=["value"],Nt={class:"flex-shrink-0 flex justify-end gap-3"},Ut=["disabled"],$t=e("button",{type:"button",class:"btn-primary lg:px-10"},"新增商品",-1),Pt={class:"grid gap-3 mt-3"},Gt=["src","alt"],It={class:"w-full flex flex-col lg:flex-row lg:justify-between gap-3"},St={class:"lg:w-4/5 overflow-hidden truncate"},Bt={class:"flex justify-between items-center text-lg"},Ot={class:"text-sm text-gray-02"},Vt=["onClick"],_t=["onClick"];function Et(t,o,d,m,p,n){const w=y("PostProductsModal"),C=y("DiscountToggle"),T=y("CoursesCard");return r(),l("div",null,[e("div",Dt,[e("div",vt,[kt,c(e("select",{name:"productType",id:"productType",class:"py-2 shadow flex-grow w-full","aria-label":"請選擇商品分類","onUpdate:modelValue":o[0]||(o[0]=s=>p.filterProductChoose=s)},[Ct,(r(!0),l(v,null,k(t.productGroups,(s,i)=>(r(),l("option",{value:i,key:i+s},f(i),9,Tt))),128))],512),[[$,p.filterProductChoose]])]),e("div",Nt,[e("button",{type:"button",class:"btn-outline py-2",onClick:o[1]||(o[1]=(...s)=>n.allDiscount&&n.allDiscount(...s)),disabled:n.isAllDiscount}," 全部套用 ",8,Ut),b(w,{"is-new":!0,"product-groups":t.productGroups,"product-types":t.productTypes},{"btn-content":u(()=>[$t]),_:1},8,["product-groups","product-types"])])]),e("ul",Pt,[(r(!0),l(v,null,k(p.filterProductChoose?t.allProducts.filter(s=>s.group===p.filterProductChoose):t.allProducts,s=>(r(),_(T,{key:s.id},{image:u(()=>[e("img",{src:s.coverUrl,alt:s.name,class:"w-full h-full object-cover"},null,8,Gt)]),"card-header":u(()=>[e("section",It,[e("h2",St,f(s.name),1),b(C,{id:s.id,price:t.discountData.type==="money"?s.price-t.discountData.scale:Math.round(s.price*t.discountData.scale),"is-discount":s.isDiscount,"onUpdate:is-discount":i=>s.isDiscount=i,which:"products",class:"text-sm self-end lg:self-center mb-1 lg:mb-0"},null,8,["id","price","is-discount","onUpdate:is-discount"])])]),"card-body":u(()=>[e("p",null,"分類："+f(s.group),1),e("p",null,"系列："+f(s.type),1),e("p",Bt,[a(" 單價：$ "+f(n.toThousand(s.price))+" ",1),e("span",Ot,"剩餘："+f(s.totalNumber-n.sellNumber(s)),1)])]),"card-footer":u(()=>[e("button",{type:"button",class:"btn-outline py-2",onClick:()=>n.deleteProduct(s.id)}," 刪除 ",8,Vt),b(w,{"product-data":p.currentProduct,"product-groups":t.productGroups,"product-types":t.productTypes},{"btn-content":u(()=>[e("button",{type:"button",class:"btn-outline py-2",onClick:()=>p.currentProduct=s}," 編輯 ",8,_t)]),_:2},1032,["product-data","product-groups","product-types"])]),_:2},1024))),128))])])}const Jt=V(wt,[["render",Et]]);export{Jt as default};