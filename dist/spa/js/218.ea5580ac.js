"use strict";(globalThis["webpackChunkgmtk_website"]=globalThis["webpackChunkgmtk_website"]||[]).push([[218],{218:(e,t,a)=>{a.r(t),a.d(t,{default:()=>f});var n=a(9835),o=a(6970);const s={class:"text-center",style:{}},i={class:"",style:{padding:"150px 0"}};function c(e,t,a,c,l,r){const m=(0,n.up)("q-icon"),d=(0,n.up)("q-btn");return(0,n.wg)(),(0,n.iD)("div",s,[(0,n._)("div",i,[(0,n.Wm)(m,{name:"eva-alert-triangle\n",color:"primary",size:"50px"}),(0,n._)("h3",null,(0,o.zw)(e.$t("label.create_mock_acc_now")),1),(0,n.Wm)(d,{label:e.$t("label.goopenacc"),to:{name:"accounts_demo_form"},class:"confrim_btn"},null,8,["label"])])])}a(9665);var l=a(3770),r=a(499),m=a(8339),d=a(4435);const u=(0,n.aZ)({name:"register_demo",components:{},data(){return{showAccInfo:!1,showform:!1,account:d.MI,mock_account:d.r2,step:1,title:this.$t("auth.sir"),firstname:"Tai Man",lastname:"Chan",filteredOptions:l.map((e=>({label:`${e.name} `,value:e.name}))),mail_address:"taimanChan@gmail.com",contact_num:"+866 12457487451",id_type:"",id_no:"",agree:!1,country:"台灣",nation:"台灣",address:"",invitation_code:"IB18722615",idtype:[{label:this.$t("auth.idcard"),value:"idcard"},{label:this.$t("auth.password"),value:"password"}],acc_type_selection:"",acc_balance_selection:"",mockmodalShown:!1,loading:!1}},setup(){const e=(0,m.tv)();return{router:e,tab:(0,r.iH)("live"),platform:"MetaTrader4",currency:"USD",acc_type:["Standard 100:1 / Prime 250:1 / Pro X 500:1"],acc_balance:["100,000","50,000","10,000","1,000"]}},computed:{countryNames(){return l.map((e=>({label:e.name,value:e.name})))},nationNames(){return l.map((e=>({label:e.name,value:e.name})))},submitButtonDisabled(){return!this.acc_type_selection||!this.acc_balance_selection},isValidStep1(){return this.id_no&&this.id_type&&this.agree},isValidStep2(){return this.country&&this.nation&&this.address}},methods:{closemodal(){this.mockmodalShown=!1,this.$router.push({name:"accounts_demo"})},filterFn(e,t){t(""!==e?()=>{const t=e.toLowerCase();this.filteredOptions=l.filter((e=>e.name.toLowerCase().indexOf(t)>-1||e.dial_code.indexOf(t)>-1)).map((e=>({label:`${e.name}  `,value:e.name})))}:()=>{this.filteredOptions=l.map((e=>({label:`${e.name} `,value:e.name})))})},nextStep(){this.step=2},prevStep(){this.step=1},submitFormMock(){this.mockmodalShown=!0},goToMoclAccounts(){this.showAccInfo=!0,this.mockmodalShown=!1,this.$emit("mockform-submitted")}}});var h=a(1639),p=a(2857),_=a(8879),b=a(9984),v=a.n(b);const w=(0,h.Z)(u,[["render",c],["__scopeId","data-v-488e621a"]]),f=w;v()(u,"components",{QIcon:p.Z,QBtn:_.Z})}}]);