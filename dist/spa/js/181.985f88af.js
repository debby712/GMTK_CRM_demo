"use strict";(globalThis["webpackChunkgmtk_website"]=globalThis["webpackChunkgmtk_website"]||[]).push([[181],{6181:(e,t,a)=>{a.r(t),a.d(t,{default:()=>f});var n=a(9835),o=a(6970);const s={class:"text-center",style:{}},i={style:{padding:"150px 0"}};function c(e,t,a,c,r,l){const m=(0,n.up)("q-icon"),u=(0,n.up)("q-btn");return(0,n.wg)(),(0,n.iD)("div",s,[(0,n._)("div",i,[(0,n.Wm)(m,{name:"eva-alert-triangle\n",color:"primary",size:"50px"}),(0,n._)("h3",null,(0,o.zw)(e.$t("label.create_live_acc_now")),1),(0,n.Wm)(u,{label:e.$t("label.goopenacc"),to:{name:"accounts_real_form"},class:"confrim_btn"},null,8,["label"])])])}a(9665);var r=a(3770),l=a(499),m=a(8339),u=a(4435);const d=(0,n.aZ)({name:"register_live",components:{},data(){return{showAccInfo:!1,showform:!1,account:u.MI,mock_account:u.r2,step:1,title:this.$t("auth.sir"),firstname:"Tai Man",lastname:"Chan",filteredOptions:r.map((e=>({label:`${e.name} `,value:e.name}))),mail_address:"taimanChan@gmail.com",contact_num:"+866 12457487451",id_type:"",id_no:"",agree:!1,country:"Taiwan",nation:"Taiwan",address:"",invitation_code:"IB18722615",idtype:[{label:this.$t("auth.idcard"),value:"idcard"},{label:this.$t("auth.password"),value:"password"}],acc_type_selection:"",acc_balance_selection:"",modalShown:!1,mockmodalShown:!1,loading:!1}},setup(){const e=(0,m.tv)();return{router:e,tab:(0,l.iH)("live"),platform:"MetaTrader4",currency:"USD",acc_type:["Standard 100:1","Prime 250:1","Pro X 500:1"],acc_balance:["100,000","50,000","10,000","1,000"]}},computed:{countryNames(){return r.map((e=>({label:e.name,value:e.name})))},nationNames(){return r.map((e=>({label:e.name,value:e.name})))},submitButtonDisabled(){return!this.acc_type_selection||!this.acc_balance_selection},isValidStep1(){return this.id_no&&this.id_type&&this.agree},isValidStep2(){return this.country&&this.nation&&this.address}},methods:{closemodal(){this.modalShown=!1,this.$router.push({name:"accounts_live"})},filterFn(e,t){t(""!==e?()=>{const t=e.toLowerCase();this.filteredOptions=r.filter((e=>e.name.toLowerCase().indexOf(t)>-1||e.dial_code.indexOf(t)>-1)).map((e=>({label:`${e.name}  `,value:e.name})))}:()=>{this.filteredOptions=r.map((e=>({label:`${e.name} `,value:e.name})))})},nextStep(){this.step=2},prevStep(){this.step=1},submitForm(){this.modalShown=!0},goToRealAccounts(){this.showAccInfo=!0,this.modalShown=!1,this.$emit("form-submitted"),this.$router.push({name:"accounts_real"})},submitFormMock(){this.mockmodalShown=!0,setTimeout((()=>{this.$router.push({name:"accounts",query:{tab:"demo"}})}),5e3)},goToMockAccounts(){this.$router.push({name:"accounts",query:{tab:"demo"}})}}});var h=a(1639),p=a(2857),_=a(8879),b=a(9984),w=a.n(b);const v=(0,h.Z)(d,[["render",c],["__scopeId","data-v-3804adfa"]]),f=v;w()(d,"components",{QIcon:p.Z,QBtn:_.Z})}}]);