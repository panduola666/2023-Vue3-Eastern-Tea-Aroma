import{m as p,b,u as g,f as m}from"./vueLoadingStore-c0b7b794.js";import{t as k}from"./index-0526d3af.js";import{b6 as v,av as D,aj as r,l as a,j as w,s as f,T as C,m as e,F as h,at as _,a3 as x,aJ as i,t as j,b1 as S,k as N}from"./_plugin-vue_export-helper-01f09012.js";const T={data(){return{sort:{title:"講師",order:"升序"},sortData:[]}},computed:{...p(g,["user"]),...p(m,["courses"]),hasSaved(){let o=!1;return this.sortData.forEach(d=>{d.courseDates.forEach(n=>{n.savedUsersId.includes(this.user.id)&&(o=!0)})}),o}},methods:{...b(m,["getCoursesData","patchSaved"]),toThousand:k,score(o){const n=o.reduce((l,t)=>l+=t.score,0)/o.length;return isNaN(n)?0:(Math.round(n*10)/10).toFixed(1)}},watch:{sort:{handler({title:o,order:d}){o==="評分"&&(d==="升序"?this.sortData.sort((l,t)=>this.score(l.scores)-this.score(t.scores)):this.sortData.sort((l,t)=>this.score(t.scores)-this.score(l.scores)));const n={價格:"price",講師:"userId"};d==="升序"?this.sortData=this.sortData.sort((l,t)=>l[n[o]]-t[n[o]]):this.sortData=this.sortData.sort((l,t)=>t[n[o]]-l[n[o]])},deep:!0},courses:{handler(){this.sortData=[...this.courses]},deep:!0}},mounted(){this.getCoursesData()}},V={class:"wrap"},B=e("h2",{class:"text-3xl font-black font-self text-brand-02"},"收藏項目",-1),H={class:"flex justify-between gap-3 flex-col md:flex-row my-3"},Y={class:"flex gap-3"},E=["onClick"],F={class:"flex gap-3 justify-end"},I=["onClick"],M={key:0,class:"text-center text-3xl py-28"},U={key:1,class:"grid lg:grid-cols-2 gap-3"},z={key:0,class:"bg-white text-brand-05 font-self font-semibold grid lg:grid-cols-2 gap-3 shadow-md min-h-max"},A={class:"h-64 overflow-hidden"},J=["src","alt"],L={class:"flex flex-col justify-between flex-grow p-3"},q={class:"flex-grow mb-3 flex flex-col justify-around"},G={class:"text-xl flex flex-wrap items-center justify-between"},K={class:"text-base text-gray-02"},O={key:0},P={key:1},Q={class:"text-end font-sans"},R={class:"font-normal font-sans flex gap-3 justify-end text-sm"},W=["onClick"];function X(o,d,n,l,t,u){const y=D("router-link");return r(),a("main",V,[(r(),w(C,{to:"title"},[f("收藏項目")])),B,e("div",H,[e("div",Y,[(r(),a(h,null,_(["講師","評分","價格"],(s,c)=>e("button",{type:"button",class:x({"btn-primary":t.sort.title===s,"btn-outline":t.sort.title!==s}),onClick:()=>t.sort.title=s,key:s+c},i(s),11,E)),64))]),e("div",F,[(r(),a(h,null,_(["升序","降序"],(s,c)=>e("button",{type:"button",class:x({"btn-primary":t.sort.order===s,"btn-outline":t.sort.order!==s}),onClick:()=>t.sort.order=s,key:s+c},i(s),11,I)),64))])]),u.hasSaved?(r(),a("ol",U,[(r(!0),a(h,null,_(t.sortData,s=>(r(),a(h,{key:s.id},[(r(!0),a(h,null,_(s.courseDates,c=>(r(),a(h,{key:"第"+c.id+"課"},[c.savedUsersId.includes(o.user.id)?(r(),a("li",z,[e("div",A,[e("img",{src:s.coverUrl,alt:s.title,class:"w-full h-full object-cover"},null,8,J)]),e("div",L,[e("section",q,[e("h1",G,[f(i(s.title)+" ",1),e("span",K,i(o.$date(c.start).format("YYYY-MM-DD HH:mm"))+" ~ "+i(o.$date(c.end).format("HH:mm")),1)]),e("h2",null,"講師："+i(s.user.name),1),e("p",null,[f(" 評分： "),u.score(s.scores)?(r(),a("span",P,i(u.score(s.scores))+" / 5.0",1)):(r(),a("span",O,"尚未評分"))]),e("p",Q," $ "+i(u.toThousand(s.price)),1)]),e("div",R,[e("button",{type:"button",class:"btn-outline py-2 px-3",onClick:()=>o.patchSaved(c)}," 取消收藏 ",8,W),j(y,{to:`/course/${c.id}`,class:"btn-primary py-2 px-3"},{default:S(()=>[f("課程詳情")]),_:2},1032,["to"])])])])):N("",!0)],64))),128))],64))),128))])):(r(),a("p",M,"當前沒有收藏項目"))])}const ts=v(T,[["render",X]]);export{ts as default};