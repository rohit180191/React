(this["webpackJsonpburger-builder"]=this["webpackJsonpburger-builder"]||[]).push([[4],{82:function(e,t,n){"use strict";var a=n(0),i=n.n(a),r=n(83),l=n.n(r);t.a=function(){return i.a.createElement("div",{className:l.a.Spinner},"Loading...")}},83:function(e,t,n){e.exports={Spinner:"Spinner_Spinner__EEHbp",load3:"Spinner_load3__pkDYN"}},84:function(e,t,n){"use strict";var a=n(0),i=n.n(a),r=n(85),l=n.n(r);t.a=function(e){return i.a.createElement("button",{onClick:e.clicked,disabled:e.disabled,className:[l.a.Button,l.a[e.btnType]].join(" ")},e.children)}},85:function(e,t,n){e.exports={Button:"Button_Button__1Ixrv",Success:"Button_Success__1eTrg",Danger:"Button_Danger__9aUmQ"}},88:function(e,t,n){"use strict";var a=n(0),i=n.n(a),r=n(89),l=n.n(r);t.a=function(e){var t=null,n=null,a=[l.a.InputElement];switch(e.invalid&&e.shouldValidate&&e.touched&&(a.push(l.a.Invalid),n=i.a.createElement("p",{style:{margin:"0",color:"red",textAlign:"left"}},"Please enter valid value!")),e.elementType){case"input":t=i.a.createElement("input",Object.assign({},e.elementConfig,{className:a.join(" "),value:e.value,onChange:e.changed}));break;case"textarea":t=i.a.createElement("textarea",Object.assign({},e.elementConfig,{className:a.join(" "),value:e.value,onChange:e.changed}));break;case"select":t=i.a.createElement("select",{className:a.join(" "),value:e.value,onChange:e.changed},e.elementConfig.options.map((function(e){return i.a.createElement("option",{key:e.value,value:e.value},e.displayValue)})))}return i.a.createElement("div",{className:l.a.Input},i.a.createElement("label",{className:l.a.Label},e.label),t,n)}},89:function(e,t,n){e.exports={Input:"Input_Input__2r9JM",Label:"Input_Label__37pAB",InputElement:"Input_InputElement__1Jed1",Invalid:"Input_Invalid__2pAmY"}},95:function(e,t,n){e.exports={Auth:"Auth_Auth__3UN41"}},97:function(e,t,n){"use strict";n.r(t);var a=n(1),i=n(10),r=n(11),l=n(13),u=n(12),o=n(0),s=n.n(o),c=n(88),d=n(84),p=n(82),h=n(95),m=n.n(h),v=n(4),g=n(16),f=n(3),b=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(i.a)(this,n);for(var r=arguments.length,l=new Array(r),u=0;u<r;u++)l[u]=arguments[u];return(e=t.call.apply(t,[this].concat(l))).state={controls:{email:{elementType:"input",elementConfig:{type:"email",placeholder:"Mail Address"},value:"",validation:{required:!0,isEmail:!0},valid:!1,touched:!1},password:{elementType:"input",elementConfig:{type:"password",placeholder:"Password"},value:"",validation:{required:!0,minLength:6},valid:!1,touched:!1}},formIsValid:!1,isSignUp:!0},e.inputElementChangeHandler=function(t,n){var i=t.target.value,r=Object(a.a)({},e.state.controls),l=Object(a.a)({},r[n]);l.value=i,l.valid=e.checkValidity(l.value,l.validation),l.touched=!0,r[n]=l;var u=!0;for(var o in r)u=r[o].valid&&u;e.setState({controls:r,formIsValid:u})},e.AuthHandler=function(t){t.preventDefault();var n=e.state.controls.email.value,a=e.state.controls.password.value,i=e.state.isSignUp;e.props.onAuth(n,a,i)},e.switchAuthMode=function(){e.setState((function(e){return{isSignUp:!e.isSignUp}}))},e}return Object(r.a)(n,[{key:"checkValidity",value:function(e,t){var n=!0;if(!t)return!0;if(t.required&&(n=""!==e.trim()&&n),t.minLength&&(n=e.length>=t.minLength&&n),t.isEmail){n=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)&&n}return n}},{key:"componentDidMount",value:function(){this.props.isBurgerBuilding||this.props.setRedirectPath()}},{key:"render",value:function(){var e=this,t=[];for(var n in this.state.controls)t.push({id:n,config:this.state.controls[n]});var a=t.map((function(t){return s.a.createElement(c.a,{key:t.id,elementType:t.config.elementType,elementConfig:t.config.elementConfig,value:t.config.value,changed:function(n){return e.inputElementChangeHandler(n,t.id)},invalid:!t.config.valid,shouldValidate:t.config.validation,touched:t.config.touched})}));this.props.loading&&(a=s.a.createElement(p.a,null));var i=null;this.props.error&&(i=s.a.createElement("p",null,this.props.error.message));var r=null;return this.props.isAuthenticated&&(r=s.a.createElement(f.a,{to:this.props.authRedirectPath})),s.a.createElement("div",{className:m.a.Auth},i,r,s.a.createElement("form",{onSubmit:this.AuthHandler},a,s.a.createElement(d.a,{btnType:"Success",disabled:!this.state.formIsValid},"Submit")),s.a.createElement(d.a,{btnType:"Danger",clicked:this.switchAuthMode},"Switch to ",this.state.isSignUp?"Sign in":"Sign Up"))}}]),n}(o.Component);t.default=Object(g.b)((function(e){return{loading:e.auth.loading,error:e.auth.error,isAuthenticated:null!==e.auth.token,isBurgerBuilding:e.burgerBuilder.isBuilding,authRedirectPath:e.auth.authRedirectPath}}),(function(e){return{onAuth:function(t,n,a){return e(v.m(t,n,a))},setRedirectPath:function(){return e(v.s("/"))}}}))(b)}}]);
//# sourceMappingURL=4.829645c4.chunk.js.map