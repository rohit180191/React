(this["webpackJsonpburger-builder"]=this["webpackJsonpburger-builder"]||[]).push([[7],{102:function(e,n,r){"use strict";r.r(n);var t=r(10),a=r(11),i=r(13),o=r(12),u=r(0),c=r.n(u),s=r(94),p=r.n(s),d=function(e){var n=[];for(var r in e.ingredients)n.push({name:r,amount:e.ingredients[r]});var t=n.map((function(e){return"".concat(e.name.toUpperCase()," (").concat(e.amount,")")}));return c.a.createElement("div",{className:p.a.Order},c.a.createElement("p",null,"Ingredients ",t.join(" ")),c.a.createElement("p",null,"Price ",c.a.createElement("strong",null,"USD ",e.price.toFixed(2))))},l=r(16),m=r(82),f=r(4),b=function(e){Object(i.a)(r,e);var n=Object(o.a)(r);function r(){return Object(t.a)(this,r),n.apply(this,arguments)}return Object(a.a)(r,[{key:"componentDidMount",value:function(){this.props.onLoad(this.props.token)}},{key:"render",value:function(){var e=this.props.orders.orders.map((function(e){return c.a.createElement(d,{key:e.id,ingredients:e.ingredients,price:+e.price})}));return this.props.orders.loading&&(e=c.a.createElement(m.a,null)),c.a.createElement("div",null,e)}}]),r}(u.Component);n.default=Object(l.b)((function(e){return{orders:e.orders,token:e.auth.token}}),(function(e){return{onLoad:function(n){return e(f.p(n))}}}))(b)},82:function(e,n,r){"use strict";var t=r(0),a=r.n(t),i=r(83),o=r.n(i);n.a=function(){return a.a.createElement("div",{className:o.a.Spinner},"Loading...")}},83:function(e,n,r){e.exports={Spinner:"Spinner_Spinner__EEHbp",load3:"Spinner_load3__pkDYN"}},94:function(e,n,r){e.exports={Order:"Order_Order__1Wcu8"}}}]);
//# sourceMappingURL=7.b8c9b538.chunk.js.map