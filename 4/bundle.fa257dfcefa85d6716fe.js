(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,i="millisecond",n="second",s="minute",r="hour",a="day",o="week",l="month",d="quarter",u="year",c="date",f="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],i=e%100;return"["+e+(t[(i-20)%10]||t[i]||t[0])+"]"}},v=function(e,t,i){var n=String(e);return!n||n.length>=t?e:""+Array(t+1-n.length).join(i)+e},_={s:v,z:function(e){var t=-e.utcOffset(),i=Math.abs(t),n=Math.floor(i/60),s=i%60;return(t<=0?"+":"-")+v(n,2,"0")+":"+v(s,2,"0")},m:function e(t,i){if(t.date()<i.date())return-e(i,t);var n=12*(i.year()-t.year())+(i.month()-t.month()),s=t.clone().add(n,l),r=i-s<0,a=t.clone().add(n+(r?-1:1),l);return+(-(n+(i-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:u,w:o,d:a,D:c,h:r,m:s,s:n,ms:i,Q:d}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},g="en",$={};$[g]=m;var y=function(e){return e instanceof S},b=function e(t,i,n){var s;if(!t)return g;if("string"==typeof t){var r=t.toLowerCase();$[r]&&(s=r),i&&($[r]=i,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var o=t.name;$[o]=t,s=o}return!n&&s&&(g=s),s||!n&&g},M=function(e,t){if(y(e))return e.clone();var i="object"==typeof t?t:{};return i.date=e,i.args=arguments,new S(i)},D=_;D.l=b,D.i=y,D.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var S=function(){function m(e){this.$L=b(e.locale,null,!0),this.parse(e)}var v=m.prototype;return v.parse=function(e){this.$d=function(e){var t=e.date,i=e.utc;if(null===t)return new Date(NaN);if(D.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var n=t.match(h);if(n){var s=n[2]-1||0,r=(n[7]||"0").substring(0,3);return i?new Date(Date.UTC(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,r)):new Date(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},v.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},v.$utils=function(){return D},v.isValid=function(){return!(this.$d.toString()===f)},v.isSame=function(e,t){var i=M(e);return this.startOf(t)<=i&&i<=this.endOf(t)},v.isAfter=function(e,t){return M(e)<this.startOf(t)},v.isBefore=function(e,t){return this.endOf(t)<M(e)},v.$g=function(e,t,i){return D.u(e)?this[t]:this.set(i,e)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(e,t){var i=this,d=!!D.u(t)||t,f=D.p(e),h=function(e,t){var n=D.w(i.$u?Date.UTC(i.$y,t,e):new Date(i.$y,t,e),i);return d?n:n.endOf(a)},p=function(e,t){return D.w(i.toDate()[e].apply(i.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(t)),i)},m=this.$W,v=this.$M,_=this.$D,g="set"+(this.$u?"UTC":"");switch(f){case u:return d?h(1,0):h(31,11);case l:return d?h(1,v):h(0,v+1);case o:var $=this.$locale().weekStart||0,y=(m<$?m+7:m)-$;return h(d?_-y:_+(6-y),v);case a:case c:return p(g+"Hours",0);case r:return p(g+"Minutes",1);case s:return p(g+"Seconds",2);case n:return p(g+"Milliseconds",3);default:return this.clone()}},v.endOf=function(e){return this.startOf(e,!1)},v.$set=function(e,t){var o,d=D.p(e),f="set"+(this.$u?"UTC":""),h=(o={},o[a]=f+"Date",o[c]=f+"Date",o[l]=f+"Month",o[u]=f+"FullYear",o[r]=f+"Hours",o[s]=f+"Minutes",o[n]=f+"Seconds",o[i]=f+"Milliseconds",o)[d],p=d===a?this.$D+(t-this.$W):t;if(d===l||d===u){var m=this.clone().set(c,1);m.$d[h](p),m.init(),this.$d=m.set(c,Math.min(this.$D,m.daysInMonth())).$d}else h&&this.$d[h](p);return this.init(),this},v.set=function(e,t){return this.clone().$set(e,t)},v.get=function(e){return this[D.p(e)]()},v.add=function(i,d){var c,f=this;i=Number(i);var h=D.p(d),p=function(e){var t=M(f);return D.w(t.date(t.date()+Math.round(e*i)),f)};if(h===l)return this.set(l,this.$M+i);if(h===u)return this.set(u,this.$y+i);if(h===a)return p(1);if(h===o)return p(7);var m=(c={},c[s]=e,c[r]=t,c[n]=1e3,c)[h]||1,v=this.$d.getTime()+i*m;return D.w(v,this)},v.subtract=function(e,t){return this.add(-1*e,t)},v.format=function(e){var t=this,i=this.$locale();if(!this.isValid())return i.invalidDate||f;var n=e||"YYYY-MM-DDTHH:mm:ssZ",s=D.z(this),r=this.$H,a=this.$m,o=this.$M,l=i.weekdays,d=i.months,u=function(e,i,s,r){return e&&(e[i]||e(t,n))||s[i].slice(0,r)},c=function(e){return D.s(r%12||12,e,"0")},h=i.meridiem||function(e,t,i){var n=e<12?"AM":"PM";return i?n.toLowerCase():n},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:D.s(o+1,2,"0"),MMM:u(i.monthsShort,o,d,3),MMMM:u(d,o),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:u(i.weekdaysMin,this.$W,l,2),ddd:u(i.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:D.s(r,2,"0"),h:c(1),hh:c(2),a:h(r,a,!0),A:h(r,a,!1),m:String(a),mm:D.s(a,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:s};return n.replace(p,(function(e,t){return t||m[e]||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(i,c,f){var h,p=D.p(c),m=M(i),v=(m.utcOffset()-this.utcOffset())*e,_=this-m,g=D.m(this,m);return g=(h={},h[u]=g/12,h[l]=g,h[d]=g/3,h[o]=(_-v)/6048e5,h[a]=(_-v)/864e5,h[r]=_/t,h[s]=_/e,h[n]=_/1e3,h)[p]||_,f?g:D.a(g)},v.daysInMonth=function(){return this.endOf(l).$D},v.$locale=function(){return $[this.$L]},v.locale=function(e,t){if(!e)return this.$L;var i=this.clone(),n=b(e,t,!0);return n&&(i.$L=n),i},v.clone=function(){return D.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),w=S.prototype;return M.prototype=w,[["$ms",i],["$s",n],["$m",s],["$H",r],["$W",a],["$M",l],["$y",u],["$D",c]].forEach((function(e){w[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,S,M),e.$i=!0),M},M.locale=b,M.isDayjs=y,M.unix=function(e){return M(1e3*e)},M.en=$[g],M.Ls=$,M.p={},M}()},285:function(e){e.exports=function(){"use strict";var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,i=/\d\d/,n=/\d\d?/,s=/\d*[^-_:/,()\s\d]+/,r={},a=function(e){return(e=+e)+(e>68?1900:2e3)},o=function(e){return function(t){this[e]=+t}},l=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||(this.zone={})).offset=function(e){if(!e)return 0;if("Z"===e)return 0;var t=e.match(/([+-]|\d\d)/g),i=60*t[1]+(+t[2]||0);return 0===i?0:"+"===t[0]?-i:i}(e)}],d=function(e){var t=r[e];return t&&(t.indexOf?t:t.s.concat(t.f))},u=function(e,t){var i,n=r.meridiem;if(n){for(var s=1;s<=24;s+=1)if(e.indexOf(n(s,0,t))>-1){i=s>12;break}}else i=e===(t?"pm":"PM");return i},c={A:[s,function(e){this.afternoon=u(e,!1)}],a:[s,function(e){this.afternoon=u(e,!0)}],S:[/\d/,function(e){this.milliseconds=100*+e}],SS:[i,function(e){this.milliseconds=10*+e}],SSS:[/\d{3}/,function(e){this.milliseconds=+e}],s:[n,o("seconds")],ss:[n,o("seconds")],m:[n,o("minutes")],mm:[n,o("minutes")],H:[n,o("hours")],h:[n,o("hours")],HH:[n,o("hours")],hh:[n,o("hours")],D:[n,o("day")],DD:[i,o("day")],Do:[s,function(e){var t=r.ordinal,i=e.match(/\d+/);if(this.day=i[0],t)for(var n=1;n<=31;n+=1)t(n).replace(/\[|\]/g,"")===e&&(this.day=n)}],M:[n,o("month")],MM:[i,o("month")],MMM:[s,function(e){var t=d("months"),i=(d("monthsShort")||t.map((function(e){return e.slice(0,3)}))).indexOf(e)+1;if(i<1)throw new Error;this.month=i%12||i}],MMMM:[s,function(e){var t=d("months").indexOf(e)+1;if(t<1)throw new Error;this.month=t%12||t}],Y:[/[+-]?\d+/,o("year")],YY:[i,function(e){this.year=a(e)}],YYYY:[/\d{4}/,o("year")],Z:l,ZZ:l};function f(i){var n,s;n=i,s=r&&r.formats;for(var a=(i=n.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,i,n){var r=n&&n.toUpperCase();return i||s[n]||e[n]||s[r].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,i){return t||i.slice(1)}))}))).match(t),o=a.length,l=0;l<o;l+=1){var d=a[l],u=c[d],f=u&&u[0],h=u&&u[1];a[l]=h?{regex:f,parser:h}:d.replace(/^\[|\]$/g,"")}return function(e){for(var t={},i=0,n=0;i<o;i+=1){var s=a[i];if("string"==typeof s)n+=s.length;else{var r=s.regex,l=s.parser,d=e.slice(n),u=r.exec(d)[0];l.call(t,u),e=e.replace(u,"")}}return function(e){var t=e.afternoon;if(void 0!==t){var i=e.hours;t?i<12&&(e.hours+=12):12===i&&(e.hours=0),delete e.afternoon}}(t),t}}return function(e,t,i){i.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(a=e.parseTwoDigitYear);var n=t.prototype,s=n.parse;n.parse=function(e){var t=e.date,n=e.utc,a=e.args;this.$u=n;var o=a[1];if("string"==typeof o){var l=!0===a[2],d=!0===a[3],u=l||d,c=a[2];d&&(c=a[2]),r=this.$locale(),!l&&c&&(r=i.Ls[c]),this.$d=function(e,t,i){try{if(["x","X"].indexOf(t)>-1)return new Date(("X"===t?1e3:1)*e);var n=f(t)(e),s=n.year,r=n.month,a=n.day,o=n.hours,l=n.minutes,d=n.seconds,u=n.milliseconds,c=n.zone,h=new Date,p=a||(s||r?1:h.getDate()),m=s||h.getFullYear(),v=0;s&&!r||(v=r>0?r-1:h.getMonth());var _=o||0,g=l||0,$=d||0,y=u||0;return c?new Date(Date.UTC(m,v,p,_,g,$,y+60*c.offset*1e3)):i?new Date(Date.UTC(m,v,p,_,g,$,y)):new Date(m,v,p,_,g,$,y)}catch(e){return new Date("")}}(t,o,n),this.init(),c&&!0!==c&&(this.$L=this.locale(c).$L),u&&t!=this.format(o)&&(this.$d=new Date("")),r={}}else if(o instanceof Array)for(var h=o.length,p=1;p<=h;p+=1){a[1]=o[p-1];var m=i.apply(this,a);if(m.isValid()){this.$d=m.$d,this.$L=m.$L,this.init();break}p===h&&(this.$d=new Date(""))}else s.call(this,e)}}}()},646:function(e){e.exports=function(){"use strict";var e,t,i=1e3,n=6e4,s=36e5,r=864e5,a=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,o=31536e6,l=2592e6,d=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,u={years:o,months:l,days:r,hours:s,minutes:n,seconds:i,milliseconds:1,weeks:6048e5},c=function(e){return e instanceof g},f=function(e,t,i){return new g(e,i,t.$l)},h=function(e){return t.p(e)+"s"},p=function(e){return e<0},m=function(e){return p(e)?Math.ceil(e):Math.floor(e)},v=function(e){return Math.abs(e)},_=function(e,t){return e?p(e)?{negative:!0,format:""+v(e)+t}:{negative:!1,format:""+e+t}:{negative:!1,format:""}},g=function(){function p(e,t,i){var n=this;if(this.$d={},this.$l=i,void 0===e&&(this.$ms=0,this.parseFromMilliseconds()),t)return f(e*u[h(t)],this);if("number"==typeof e)return this.$ms=e,this.parseFromMilliseconds(),this;if("object"==typeof e)return Object.keys(e).forEach((function(t){n.$d[h(t)]=e[t]})),this.calMilliseconds(),this;if("string"==typeof e){var s=e.match(d);if(s){var r=s.slice(2).map((function(e){return null!=e?Number(e):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var v=p.prototype;return v.calMilliseconds=function(){var e=this;this.$ms=Object.keys(this.$d).reduce((function(t,i){return t+(e.$d[i]||0)*u[i]}),0)},v.parseFromMilliseconds=function(){var e=this.$ms;this.$d.years=m(e/o),e%=o,this.$d.months=m(e/l),e%=l,this.$d.days=m(e/r),e%=r,this.$d.hours=m(e/s),e%=s,this.$d.minutes=m(e/n),e%=n,this.$d.seconds=m(e/i),e%=i,this.$d.milliseconds=e},v.toISOString=function(){var e=_(this.$d.years,"Y"),t=_(this.$d.months,"M"),i=+this.$d.days||0;this.$d.weeks&&(i+=7*this.$d.weeks);var n=_(i,"D"),s=_(this.$d.hours,"H"),r=_(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3);var o=_(a,"S"),l=e.negative||t.negative||n.negative||s.negative||r.negative||o.negative,d=s.format||r.format||o.format?"T":"",u=(l?"-":"")+"P"+e.format+t.format+n.format+d+s.format+r.format+o.format;return"P"===u||"-P"===u?"P0D":u},v.toJSON=function(){return this.toISOString()},v.format=function(e){var i=e||"YYYY-MM-DDTHH:mm:ss",n={Y:this.$d.years,YY:t.s(this.$d.years,2,"0"),YYYY:t.s(this.$d.years,4,"0"),M:this.$d.months,MM:t.s(this.$d.months,2,"0"),D:this.$d.days,DD:t.s(this.$d.days,2,"0"),H:this.$d.hours,HH:t.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:t.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:t.s(this.$d.seconds,2,"0"),SSS:t.s(this.$d.milliseconds,3,"0")};return i.replace(a,(function(e,t){return t||String(n[e])}))},v.as=function(e){return this.$ms/u[h(e)]},v.get=function(e){var t=this.$ms,i=h(e);return"milliseconds"===i?t%=1e3:t="weeks"===i?m(t/u[i]):this.$d[i],0===t?0:t},v.add=function(e,t,i){var n;return n=t?e*u[h(t)]:c(e)?e.$ms:f(e,this).$ms,f(this.$ms+n*(i?-1:1),this)},v.subtract=function(e,t){return this.add(e,t,!0)},v.locale=function(e){var t=this.clone();return t.$l=e,t},v.clone=function(){return f(this.$ms,this)},v.humanize=function(t){return e().add(this.$ms,"ms").locale(this.$l).fromNow(!t)},v.milliseconds=function(){return this.get("milliseconds")},v.asMilliseconds=function(){return this.as("milliseconds")},v.seconds=function(){return this.get("seconds")},v.asSeconds=function(){return this.as("seconds")},v.minutes=function(){return this.get("minutes")},v.asMinutes=function(){return this.as("minutes")},v.hours=function(){return this.get("hours")},v.asHours=function(){return this.as("hours")},v.days=function(){return this.get("days")},v.asDays=function(){return this.as("days")},v.weeks=function(){return this.get("weeks")},v.asWeeks=function(){return this.as("weeks")},v.months=function(){return this.get("months")},v.asMonths=function(){return this.as("months")},v.years=function(){return this.get("years")},v.asYears=function(){return this.as("years")},p}();return function(i,n,s){e=s,t=s().$utils(),s.duration=function(e,t){var i=s.locale();return f(e,{$l:i},t)},s.isDuration=c;var r=n.prototype.add,a=n.prototype.subtract;n.prototype.add=function(e,t){return c(e)&&(e=e.asMilliseconds()),r.bind(this)(e,t)},n.prototype.subtract=function(e,t){return c(e)&&(e=e.asMilliseconds()),a.bind(this)(e,t)}}}()}},t={};function i(n){var s=t[n];if(void 0!==s)return s.exports;var r=t[n]={exports:{}};return e[n].call(r.exports,r,r.exports,i),r.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=["Taxi","Bus","Train","Ship","Drive","Flight","Check-in","Sightseeing","Restaurant"],t="HH-mm",n="DD/MM/YY HH:mm",s={id:0,type:e[5],destination:"",dateFrom:"",dateTo:"",basePrice:"",offers:[],isFavorite:!1};function r(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function a(e,t,i="beforeend"){t.insertAdjacentElement(i,e.getElement())}var o=i(484),l=i.n(o),d=i(646),u=i.n(d),c=i(285),f=i.n(c);l().extend(f()),l().extend(u());const h=e=>e[Math.floor(Math.random()*e.length)],p=(e,t)=>{const i=Math.ceil(Math.min(e,t)),n=Math.floor(Math.max(e,t)),s=Math.random()*(n-i+1)+i;return Math.floor(s)},m=(e,t)=>{const i=[];return()=>{let n=p(e,t);if(i.length===Math.floor(Math.max(e,t)+1))return"";for(;i.includes(n);)n=p(e,t);return i.push(n),n}},v=(e,t)=>l()(e).format(t);class _{constructor({content:e}){this.content=e}getTemplate(){return(({point:e,destination:i,offers:n})=>{return`<li class="trip-events__item">\n  <div class="event">\n    <time class="event__date" datetime="2019-03-18">${v(e.dateFrom,"MMM DD")}</time>\n    <div class="event__type">\n      <img class="event__type-icon" width="42" height="42" src="img/icons/${e.type.toLowerCase()}.png" alt="Event type icon">\n    </div>\n    <h3 class="event__title">${e.type} ${i.name}</h3>\n    <div class="event__schedule">\n      <p class="event__time">\n        <time class="event__start-time" datetime="${e.dateFrom}">${v(e.dateFrom,t)}</time>\n        &mdash;\n        <time class="event__end-time" datetime="${e.dateTo}">${v(e.dateTo,t)}</time>\n      </p>\n      <p class="event__duration">${r=e.dateFrom,a=e.dateTo,l().duration(l()(a).diff(l()(r))).format("DD[D] HH[H] mm[M]").replace("00D 00H ","").replace("00D ","")}</p>\n    </div>\n    <p class="event__price">\n      &euro;&nbsp;<span class="event__price-value">${e.basePrice}</span>\n    </p>\n    <h4 class="visually-hidden">Offers:</h4>\n    <ul class="event__selected-offers">\n      ${((e,t)=>e.map((({id:e,title:i,price:n})=>t.some((t=>t===e))?`<li class="event__offer">\n      <span class="event__offer-title">${i}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${n}</span>\n    </li>`:"")).join(""))(n,e.offers)}\n    </ul>\n    <button class="event__favorite-btn ${s=e.isFavorite,s?"event__favorite-btn--active":""}" type="button">\n      <span class="visually-hidden">Add to favorite</span>\n      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n      </svg>\n    </button>\n    <button class="event__rollup-btn" type="button">\n      <span class="visually-hidden">Open event</span>\n    </button>\n  </div>\n</li>`;var s,r,a})(this.content)}getElement(){return this.element||(this.element=r(this.getTemplate())),this.element}removeElement(){this.element=null}}class g{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=r(this.getTemplate())),this.element}removeElement(){this.element=null}}class ${getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n<div class="trip-sort__item  trip-sort__item--day">\n  <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n  <label class="trip-sort__btn" for="sort-day">Day</label>\n</div>\n\n<div class="trip-sort__item  trip-sort__item--event">\n  <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n  <label class="trip-sort__btn" for="sort-event">Event</label>\n</div>\n\n<div class="trip-sort__item  trip-sort__item--time">\n  <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n  <label class="trip-sort__btn" for="sort-time">Time</label>\n</div>\n\n<div class="trip-sort__item  trip-sort__item--price">\n  <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n  <label class="trip-sort__btn" for="sort-price">Price</label>\n</div>\n\n<div class="trip-sort__item  trip-sort__item--offer">\n  <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n  <label class="trip-sort__btn" for="sort-offer">Offers</label>\n</div>\n</form>'}getElement(){return this.element||(this.element=r(this.getTemplate())),this.element}removeElement(){this.element=null}}class y{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n<div class="trip-filters__filter">\n  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>\n  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n</div>\n\n<div class="trip-filters__filter">\n  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n  <label class="trip-filters__filter-label" for="filter-future">Future</label>\n</div>\n\n<div class="trip-filters__filter">\n  <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n  <label class="trip-filters__filter-label" for="filter-present">Present</label>\n</div>\n\n<div class="trip-filters__filter">\n  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">\n  <label class="trip-filters__filter-label" for="filter-past">Past</label>\n</div>\n\n<button class="visually-hidden" type="submit">Accept filter</button>\n</form>'}getElement(){return this.element||(this.element=r(this.getTemplate())),this.element}removeElement(){this.element=null}}class b{getTemplate(){return'<p class="trip-info__cost">\nTotal: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n</p>'}getElement(){return this.element||(this.element=r(this.getTemplate())),this.element}removeElement(){this.element=null}}class M{getTemplate(){return'<div class="trip-info__main">\n<h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n<p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n</div>'}getElement(){return this.element||(this.element=r(this.getTemplate())),this.element}removeElement(){this.element=null}}class D{getTemplate(){return'<section class="trip-main__trip-info  trip-info"></section>'}getElement(){return this.element||(this.element=r(this.getTemplate())),this.element}removeElement(){this.element=null}}class S{getTemplate(){return'<li class="trip-events__item">\n<form class="event event--edit" action="#" method="post"></form></li>'}getElement(){return this.element||(this.element=r(this.getTemplate())),this.element}removeElement(){this.element=null}}const w=(e,t)=>e?v(e,t):"";class Y{constructor({point:e=s,destinations:t=[]}){this.point=e,this.destinations=t}getTemplate(){return t=this.point,i=this.destinations,`<header class="event__header">\n<div class="event__type-wrapper">\n  <label class="event__type  event__type-btn" for="event-type-toggle-${t.id}">\n    <span class="visually-hidden">Choose event type</span>\n    <img class="event__type-icon" width="17" height="17" src="img/icons/${t.type.toLowerCase()}.png" alt="Event type icon">\n  </label>\n  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${t.id}" type="checkbox">\n\n  <div class="event__type-list">\n    <fieldset class="event__type-group">\n      <legend class="visually-hidden">Event type</legend>\n      ${(({type:t,id:i})=>e.map((e=>{const n=t===e?"checked":"";return`<div class="event__type-item">\n    <input id="event-type-${e.toLowerCase()}-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e.toLowerCase()}" ${n}>\n    <label class="event__type-label  event__type-label--${e.toLowerCase()}" for="event-type-${e.toLowerCase()}-${i}">${e}</label>\n  </div>`})).join(""))(t)}\n    </fieldset>\n  </div>\n</div>\n\n<div class="event__field-group  event__field-group--destination">\n  <label class="event__label  event__type-output" for="event-destination-${t.id}">\n  ${t.type}\n  </label>\n  <input class="event__input  event__input--destination" id="event-destination-${t.id}" type="text" name="event-destination" value="${i.filter((e=>e.id===t.destination))[0]?.name??""}" list="destination-list-1">\n  <datalist id="destination-list-1">\n  ${(e=>e.map((({name:e})=>`<option value="${e}"></option>`)).join(""))(i)}\n  </datalist>\n</div>\n\n<div class="event__field-group  event__field-group--time">\n  <label class="visually-hidden" for="event-start-time-${t.id}">From</label>\n  <input class="event__input  event__input--time" id="event-start-time-${t.id}" type="text" name="event-start-time" value="${w(t.dateFrom,n)}">\n  &mdash;\n  <label class="visually-hidden" for="event-end-time-${t.id}">To</label>\n  <input class="event__input  event__input--time" id="event-end-time-${t.id}" type="text" name="event-end-time" value="${w(t.dateTo,n)}">\n</div>\n\n<div class="event__field-group  event__field-group--price">\n  <label class="event__label" for="event-price-${t.id}">\n    <span class="visually-hidden">Price</span>\n    &euro;\n  </label>\n  <input class="event__input  event__input--price" id="event-price-${t.id}" type="text" name="event-price" value="${t.basePrice}">\n</div>\n\n<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n<button class="event__reset-btn" type="reset">Cancel</button>\n</header>`;var t,i}getElement(){return this.element||(this.element=r(this.getTemplate())),this.element}removeElement(){this.element=null}}class T{constructor({point:e=s,offers:t,destination:i}){this.point=e,this.offers=t,this.destination=i}getTemplate(){return e=this.point,t=this.offers,i=this.destination,t=t.find((t=>t.type===e.type.toLocaleLowerCase())).offers,`<section class="event__details">\n  ${((e,t)=>0===t.length?"":`<section class="event__section  event__section--offers">\n  <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n  <div class="event__available-offers">\n    ${((e,t)=>t.map((t=>{const i=e.some((e=>e===t.id))?"checked":"";return`<div class="event__offer-selector">\n    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${t.id}" type="checkbox" name="event-offer-luggage" ${i}>\n    <label class="event__offer-label" for="event-offer-${t.id}">\n      <span class="event__offer-title">${t.title}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${t.price}</span>\n    </label>\n  </div>`})).join(""))(e,t)}\n  </div>\n</section>`)(e.offers,t)}\n  ${(e=>{return e?`<section class="event__section  event__section--destination">\n<h3 class="event__section-title  event__section-title--destination">Destination</h3>\n<p class="event__destination-description">${e.description}</p>\n\n<div class="event__photos-container">\n  <div class="event__photos-tape">\n    ${t=e.pictures,t.map((({src:e,description:t})=>`<img class="event__photo" src="${e}" alt="${t}">`)).join("")}\n  </div>\n</div>\n</section>`:"";var t})(i)}\n  </section>`;var e,t,i}getElement(){return this.element||(this.element=r(this.getTemplate())),this.element}removeElement(){this.element=null}}const O=e=>{let t=0;return Array.from({length:p(1,5)},(()=>({src:`https://loremflickr.com/248/152?random=${p(1,150)}`,description:`${e}-${t++}`})))},x=[{id:1,name:"Paris",description:"Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.",pictures:O("Paris")},{id:2,name:"London",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.",pictures:O("London")},{id:3,name:"Madrid",description:" Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.",pictures:O("Madrid")},{id:4,name:"Berlin",description:"Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.",pictures:O("Berlin")},{id:5,name:"Rome",description:"In rutrum ac purus sit amet tempus.",pictures:O("Rome")},{id:6,name:"Some Good Hotel",description:'Distinctively streamline unique processes rather than magnetic mindshare. Intrinsicly recaptiualize client-centered "outside the box".',pictures:[]},{id:7,name:"Some Excellent Restaurant",description:"Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.",pictures:[]}],C=[{type:"taxi",offers:[{id:"3622d010-c9f7-4972-9d2a-5881a2d160f4",title:"Upgrade to a business class",price:127},{id:"d5ab0cf1-abcf-4fd3-a926-c07fc08fb227",title:"Choose the radio station",price:82},{id:"bcb29bf0-ae7f-4663-b400-7564bcc26b22",title:"Choose temperature",price:85},{id:"2370ef2b-67dd-4af6-afaf-78c544e1599d",title:"Drive quickly, I'm in a hurry",price:140},{id:"3c1b5c92-8ed5-4995-aea9-122cdd90769c",title:"Drive slowly",price:146}]},{type:"bus",offers:[{id:"4da9e314-bbcd-4d55-acb2-da9eafb56fe8",title:"Infotainment system",price:188},{id:"d49dcb7d-ebbb-4489-90d5-978ee25d31d9",title:"Order meal",price:150},{id:"27fe6f95-2958-408c-b999-473ea38e9c8e",title:"Choose seats",price:110}]},{type:"train",offers:[{id:"df3aa32c-5527-4772-b7e8-d2b84a949a9a",title:"Book a taxi at the arrival point",price:197},{id:"0f9dcd2c-9e03-4734-9557-49c6c5d85744",title:"Order a breakfast",price:54},{id:"7f1e2143-2f3d-427c-91cd-fa32f9704b06",title:"Wake up at a certain time",price:160}]},{type:"flight",offers:[{id:"548b24f8-4181-4908-bcf7-886d66a269d9",title:"Choose meal",price:136},{id:"908d86dc-99ad-4b03-bc6e-01e96d78bf09",title:"Choose seats",price:50},{id:"5a762535-85b3-4662-8843-cccaa67385ca",title:"Upgrade to comfort class",price:174},{id:"ee711d1c-d19f-46c8-93e1-ae744c5fd8b7",title:"Upgrade to business class",price:110},{id:"7506d733-6a4d-417f-8da7-baefd3574a6e",title:"Add luggage",price:33},{id:"a42071d8-2ae0-41f4-b6d5-61a6a9c5de08",title:"Business lounge",price:96}]},{type:"check-in",offers:[{id:"62c20a88-0549-446a-bdc4-e163d895c79f",title:"Choose the time of check-in",price:41},{id:"003acd5c-52b2-4cfe-a957-b1e9eed44f4d",title:"Choose the time of check-out",price:169},{id:"ec8c7f0f-bfff-4a07-aeab-63fd77a1d096",title:"Add breakfast",price:80},{id:"a37b22a0-d849-4148-935b-d2a09b842cb6",title:"Laundry",price:34},{id:"d01515f3-b3a7-4462-80dd-c3a8f40802c6",title:"Order a meal from the restaurant",price:68}]},{type:"sightseeing",offers:[]},{type:"ship",offers:[{id:"d8df372c-ecdd-4699-8894-0d6646464f4b",title:"Choose meal",price:72},{id:"90e2a2c2-3ac2-46f8-8b0e-13c8af76b248",title:"Choose seats",price:76},{id:"4fd5e128-6e35-4125-982e-93b9c4630b74",title:"Upgrade to comfort class",price:107},{id:"3938f4c8-ac0d-451c-94e7-873fa8c703ef",title:"Upgrade to business class",price:199},{id:"fe69e9c0-7784-4f2f-9aad-62a37de7b01a",title:"Add luggage",price:177},{id:"a73f01d6-7f1c-479d-9673-3afe2e2c91b9",title:"Business lounge",price:146}]},{type:"drive",offers:[{id:"19f8e282-f3ae-4131-83f6-5e35f6921b3c",title:"With automatic transmission",price:178},{id:"cf151bf6-b2a0-429d-babe-1a1d4d996d6b",title:"With air conditioning",price:73}]},{type:"restaurant",offers:[{id:"3c8a9775-673a-4666-b5f4-f14c68d187d8",title:"Choose live music",price:181},{id:"ca05fdfa-6ad4-4f87-a68f-3502ede0cb2c",title:"Choose VIP area",price:184}]}],L=e=>{const t=C.filter((t=>t.type===e.toLowerCase()))[0].offers,i=m(0,t.length-1);return t?Array.from({length:p(0,t.length)},(()=>t[i()]?.id)):[]},E=[{id:1,type:e[1],destination:h(x).id,dateFrom:new Date("09/25/24 09:00").toISOString(),dateTo:new Date("09/25/24 09:50").toISOString(),basePrice:100,offers:L(e[1]),isFavorite:!0},{id:2,type:e[2],destination:h(x).id,dateFrom:new Date("10/01/24 10:20").toISOString(),dateTo:new Date("10/01/24 22:00").toISOString(),basePrice:1150,offers:L(e[2]),isFavorite:!1},{id:3,type:e[3],destination:h(x).id,dateFrom:new Date("10/03/24 11:50").toISOString(),dateTo:new Date("10/05/24 13:00").toISOString(),basePrice:12e3,offers:L(e[3]),isFavorite:!0},{id:4,type:e[4],destination:h(x).id,dateFrom:new Date("10/05/24 14:00").toISOString(),dateTo:new Date("10/09/24 14:50").toISOString(),basePrice:140,offers:L(e[4]),isFavorite:!1},{id:5,type:e[5],destination:h(x).id,dateFrom:new Date("10/10/24 16:00").toISOString(),dateTo:new Date("11/12/24 16:00").toISOString(),basePrice:1600,offers:L(e[5]),isFavorite:!0},{id:6,type:e[7],destination:h(x).id,dateFrom:new Date("11/12/24 22:00").toISOString(),dateTo:new Date("11/15/24 22:40").toISOString(),basePrice:189,offers:L(e[6]),isFavorite:!1}],F=document.querySelector(".trip-events"),k=new class{tripPoints=(()=>{const e=m(0,E.length-1);return Array.from({length:5},(()=>E[e()]))})();destinations=x;offers=C;getTripPoints(){return this.tripPoints}getDestinations(e="all"){return"all"===e?this.destinations:this.destinations.find((t=>t.id===e))}getOffers(e="all"){return"all"===e?this.offers:this.offers.find((t=>t.type===e.toLocaleLowerCase())).offers}},H=new class{listComponent=new g;tripInfoContainer=new D;eventForm=new S;eventFormElement=this.eventForm.getElement().querySelector("form");constructor({container:e,tripsModel:t}){this.listContainer=e,this.tripsModel=t,this.tripsPoints=this.tripsModel.getTripPoints()}init(){a(this.tripInfoContainer,document.querySelector(".trip-main"),"afterbegin"),a(new M,this.tripInfoContainer.getElement()),a(new b,this.tripInfoContainer.getElement()),a(new y,document.querySelector(".trip-controls__filters")),a(new $,this.listContainer),a(this.listComponent,this.listContainer),a(this.eventForm,this.listComponent.getElement());for(let e=0;e<this.tripsPoints.length;e++){const t=this.tripsPoints[e],i={point:t,destination:this.tripsModel.getDestinations(t.destination),offers:this.tripsModel.getOffers(t.type)};0===e?(a(new Y({point:i.point,destinations:this.tripsModel.getDestinations()}),this.eventFormElement),a(new T({point:i.point,offers:this.tripsModel.getOffers(),destination:i.destination}),this.eventForm.getElement().querySelector("form"))):a(new _({content:i}),this.listComponent.getElement())}}}({container:F,tripsModel:k});H.init()})()})();
//# sourceMappingURL=bundle.fa257dfcefa85d6716fe.js.map