"use strict";(globalThis["webpackChunkgmtk_website"]=globalThis["webpackChunkgmtk_website"]||[]).push([[482],{3482:(e,t,l)=>{l.r(t),l.d(t,{default:()=>j});var a=l(9835),s=l(6970);function o(e,t,l,o,n,i){const r=(0,a.up)("q-card-section"),u=(0,a.up)("q-separator"),d=(0,a.up)("Reg_Info_Props"),c=(0,a.up)("q-card"),m=(0,a.up)("q-page");return(0,a.wg)(),(0,a.j4)(m,{class:"flex flex-center"},{default:(0,a.w5)((()=>[(0,a.Wm)(c,{class:(0,s.C_)(["full-width auth-card no-shadow",{" my-shadow ":e.$q.screen.width>600," q-my-lg ":e.$q.screen.width>600}]),style:{"max-width":"760px"}},{default:(0,a.w5)((()=>[(0,a.Wm)(r,{class:"auth-card-header bg-primary text-white jusitfy-content-center"},{default:(0,a.w5)((()=>[(0,a._)("div",{class:(0,s.C_)(["card-title",{" text-center ":e.$q.screen.width>600}])},(0,s.zw)(e.$t("nav.register")),3)])),_:1}),(0,a.Wm)(u,{class:"gt-md"}),(0,a.Wm)(r,{class:(0,s.C_)({"q-ma-xl":e.$q.screen.width>600})},{default:(0,a.w5)((()=>[(0,a.Wm)(d)])),_:1},8,["class"])])),_:1},8,["class"])])),_:1})}const n={class:"row"},i={class:"select-label"},r={class:"row"},u={class:"col select-label"},d={class:"col select-label"},c={class:"col select-label"},m={class:"row input-field-title-margin"},h={class:"row"},p={class:"col select-label"},_={class:"row input-field-title-margin"},g={class:"justify-center row"};function w(e,t,l,o,w,b){const v=(0,a.up)("q-select"),f=(0,a.up)("q-input"),y=(0,a.up)("q-item-section"),$=(0,a.up)("q-item"),q=(0,a.up)("q-btn"),S=(0,a.up)("q-form");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a.Wm)(S,{onSubmit:e.onSubmit,class:"q-gutter-y-md"},{default:(0,a.w5)((()=>[(0,a._)("div",n,[(0,a._)("div",i,(0,s.zw)(e.$t("auth.title")),1),(0,a.Wm)(v,{outlined:"","dropdown-icon":"expand_more",modelValue:e.title.value,"onUpdate:modelValue":t[0]||(t[0]=t=>e.title.value=t),options:e.title.options,class:"full-width input-field-title-margin","display-value":e.title.value?.label??e.$t("auth.plz_choose"),rules:[t=>t&&t.label?.length>0||e.$t("error.require")]},null,8,["modelValue","options","display-value","rules"])]),(0,a._)("div",r,[(0,a._)("div",u,(0,s.zw)(e.$t("auth.firstname")),1),(0,a._)("div",d,(0,s.zw)(e.$t("auth.lastname")),1),(0,a._)("div",c,(0,s.zw)(e.$t("auth.bday")),1)]),(0,a._)("div",m,[(0,a.Wm)(f,{class:"col q-mr-sm",outlined:"",modelValue:e.firstname,"onUpdate:modelValue":t[1]||(t[1]=t=>e.firstname=t),placeholder:e.$t("auth.enter")+e.$t("auth.firstname"),rules:[t=>t&&t.length>0||e.$t("error.require")]},null,8,["modelValue","placeholder","rules"]),(0,a.Wm)(f,{class:"col q-mr-sm",outlined:"",modelValue:e.lastname,"onUpdate:modelValue":t[2]||(t[2]=t=>e.lastname=t),placeholder:e.$t("auth.enter")+e.$t("auth.lastname"),rules:[t=>t&&t.length>0||e.$t("error.require")]},null,8,["modelValue","placeholder","rules"]),(0,a.Wm)(f,{class:"col","lazy-rules":"",outlined:"",mask:"##/##/####",modelValue:e.bday,"onUpdate:modelValue":t[3]||(t[3]=t=>e.bday=t),placeholder:"dd/mm/yyyy",rules:[t=>t&&t.length>9||e.$t("error.require")]},null,8,["modelValue","rules"])]),(0,a._)("div",h,[(0,a._)("div",p,(0,s.zw)(e.$t("auth.contact_num")),1)]),(0,a._)("div",_,[(0,a.Wm)(v,{class:"col-lg-4 col-md-4 col-sm-6 col-xs-6 q-mr-sm",outlined:"",modelValue:e.area_code.value,"onUpdate:modelValue":t[4]||(t[4]=t=>e.area_code.value=t),"use-input":"","hide-selected":"","fill-input":"",behavior:"menu","input-debounce":"0",onFilter:e.onFilter,options:this.area_code.options,placeholder:e.$t("auth.plz_choose"),"dropdown-icon":"expand_more","display-value":e.area_code.value?.label??"","virtual-scroll":"",onOnScroll:e.onSelectScroll},{"no-option":(0,a.w5)((()=>[(0,a.Wm)($,null,{default:(0,a.w5)((()=>[(0,a.Wm)(y,{class:"text-grey"},{default:(0,a.w5)((()=>[(0,a.Uk)((0,s.zw)(e.$t("error.no_result")),1)])),_:1})])),_:1})])),_:1},8,["modelValue","onFilter","options","placeholder","display-value","onOnScroll"]),(0,a.Wm)(f,{class:"col",outlined:"",type:"number",modelValue:e.phone,"onUpdate:modelValue":t[5]||(t[5]=t=>e.phone=t),style:{"-webkit-appearance":"none"},pattern:"\\d*",rules:[t=>t&&t.length>0||e.$t("error.phone_number")]},null,8,["modelValue","rules"])]),(0,a._)("div",g,[(0,a.Wm)(q,{loading:e.sending,class:"content_btn q-mt-md",label:e.$t("auth.confirm"),type:"submit",disabled:!e.isFormValid,color:"primary"},null,8,["loading","label","disabled"])])])),_:1},8,["onSubmit"])])}l(9665);var b=l(504);const v=b.map((e=>({label:`${e.name} (${e.dial_code})`,value:e.dial_code}))),f=(0,a.aZ)({name:"Reg_info_Props",components:{},data(){return{title:{value:null,options:[{label:this.$t("auth.sir"),value:0},{value:1,label:this.$t("auth.ms")},{value:2,label:this.$t("auth.miss")}]},firstname:"",lastname:"",bday:"",area_code:{value:null,options:null},phone:null,sending:!1}},methods:{onFilter(e,t){t(e?.length>0?()=>{this.area_code.options=v.filter((t=>t.label?.toLowerCase()?.includes(e?.toLowerCase())))}:()=>{this.area_code.options=v})},onSubmit(){this.sending=!0,AxiosProvider.post("/Req_ClientDataSubmit.aspx",{Mode:1,ClientName:this.firstname+this.lastname,Title:this.title.value.value,FirstName:this.firstname,LastName:this.lastname,Birthday:this.bday,Country:this.area_code?.value.label.split("(")[0],PhoneCountry:this.area_code?.value.value?.match(/\d+/g).join(""),PhoneNumber:/^0(.*)$/.test(this.phone)?this.phone?.slice(1):this.phone,Password:useStorage().getStorageSync("password")}).then((()=>{const e=useStorage().getStorageSync("login_session"),t=`https://crm.gmtk.asia/#/accounts/register_live_account?nothing=${e}`;window.location.href=t})).catch((e=>{const t=e.response.data?.code;this.$q.notify({type:"negative",message:this.$t(`error.${t??0}`),timeout:1500,position:"bottom"}),["13","14"].includes(t)?this.form?.reset():["90","91"].includes(t)&&this.$router.push("/auth/login")})).finally((()=>{this.sending=!1}))}},computed:{isFormValid(){const[e,t,l]=this.bday?.split("/");return this.title.value&&this.firstname&&this.lastname&&this.area_code.value&&this.phone&&this.bday&&10===this.bday.length&&e<=31&&t<=12&&l>=1900}},mounted(){AxiosProvider.post("/Req_ClientDataSubmit.aspx",{Mode:1}).then((({data:e})=>{const{User_Status:t}=e.data||{};if(t>0){const e=useStorage().getStorageSync("login_session");window.location.href=`https://www.gmtk.asia/crm/#/accounts/register_live_account?nothing=${e}`}})).catch((e=>{const t=e.response.data?.code;this.$q.notify({message:this.$t(`error.${t}`),type:"",timeout:3e3,position:"top-right"}),["90","91"].includes(t)&&this.$router.push("/auth/login")}))}});var y=l(1639),$=l(8326),q=l(2596),S=l(6611),V=l(490),x=l(1233),W=l(8879),C=l(9984),Z=l.n(C);const k=(0,y.Z)(f,[["render",w],["__scopeId","data-v-66bf6804"]]),z=k;Z()(f,"components",{QForm:$.Z,QSelect:q.Z,QInput:S.Z,QItem:V.Z,QItemSection:x.Z,QBtn:W.Z});const P=(0,a.aZ)({components:{Reg_Info_Props:z},name:"RegisterInfoPage"});var Q=l(9885),F=l(4458),U=l(3190),I=l(926);const R=(0,y.Z)(P,[["render",o]]),j=R;Z()(P,"components",{QPage:Q.Z,QCard:F.Z,QCardSection:U.Z,QSeparator:I.Z})}}]);