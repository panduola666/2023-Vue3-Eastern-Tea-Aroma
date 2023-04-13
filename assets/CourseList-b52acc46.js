import{m,b as g,f as u}from"./vueLoadingStore-c0b7b794.js";import{b6 as _,av as b,aj as a,l as r,m as t,F as p,at as x,t as v,b1 as y,k as d,aJ as C}from"./_plugin-vue_export-helper-01f09012.js";const w={data(){return{finalCourses:[]}},computed:{...m(u,["courses"])},methods:{...g(u,["getCoursesData"])},watch:{courses:{handler(){this.courses.forEach(l=>{l.courseDates.forEach(s=>{const i={id:s.id,created:s.created,coverUrl:l.coverUrl,title:l.title},n=this.finalCourses.findIndex(e=>e.title===i.title);n!==-1&&this.finalCourses.splice(n,1),this.finalCourses.push(i),this.finalCourses.sort((e,c)=>c.created-e.created)})})},deep:!0}},mounted(){this.getCoursesData()}},k={class:"flex justify-between mb-2"},E=t("h2",{class:"text-brand-02 text-[32px] leading-[38px] font-black font-self self-center"}," 茶藝課堂 ",-1),D={class:"flex"},V=t("img",{src:"https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/type=L,%20status=Default.png?raw=true",alt:"上一頁"},null,-1),A=t("img",{src:"https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/type=L,%20status=Hover.png?raw=true",alt:"上一頁",class:"absolute top-0 group-hover:opacity-100 opacity-0 px-3 py-2 transition-all duration-500"},null,-1),L=[V,A],N=t("img",{src:"https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/type=R,%20status=Default.png?raw=true",alt:"下一頁"},null,-1),T=t("img",{src:"https://github.com/panduola666/2023-Vue3-Eastern-Tea-Aroma/blob/main/public/type=R,%20status=Hover.png?raw=true",alt:"下一頁",class:"absolute top-0 group-hover:opacity-100 opacity-0 px-3 py-2 transition-all duration-500"},null,-1),j=[N,T],B={class:"grid lg:grid-cols-4 lg:gap-6 gap-4"},S={key:0,class:"group overflow-hidden lg:h-[230px] h-64 flex-shrink-0 relative"},U={key:0,class:"absolute bg-white bg-opacity-60 text-brand-02 py-2 px-3 top-3 left-3 z-10"},z=["src","alt"],F={class:"absolute bg-[#003416] bg-opacity-60 text-white text-2xl leading-7 font-self py-4 px-2 truncate bottom-0 w-full z-10"};function H(l,s,i,n,e,c){const h=b("router-link");return a(),r("div",null,[t("section",k,[E,t("div",D,[t("div",{class:"relative group cursor-pointer",onClick:s[0]||(s[0]=()=>e.finalCourses.unshift(...e.finalCourses.splice(-4,4)))},L),t("div",{class:"relative group cursor-pointer",onClick:s[1]||(s[1]=()=>e.finalCourses.push(...e.finalCourses.splice(0,4)))},j)])]),t("ul",B,[(a(!0),r(p,null,x(e.finalCourses,(o,f)=>(a(),r(p,{key:o.id},[f<4?(a(),r("li",S,[v(h,{to:`/course/${o.id}`},{default:y(()=>[o.created+7*24*60*60*1e3>new Date?(a(),r("span",U,"NEW")):d("",!0),t("img",{src:o.coverUrl,alt:o.title,class:"h-full w-full object-cover group-hover:scale-125 transition-all duration-[1.5s]"},null,8,z),t("h1",F,C(o.title),1)]),_:2},1032,["to"])])):d("",!0)],64))),128))])])}const J=_(w,[["render",H]]);export{J as C};