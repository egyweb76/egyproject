!function(t){"use strict";function o(o,_){var M=t.extend({},t.fn.countdowntimer.defaults,_);t.extend(!0,M,t.fn.countdowntimer.regionalOptions,_),o.data("opts",{opts:M}),o.addClass("style");var S=M.size,v=M.borderColor,H=M.fontColor,p=M.backgroundColor;if(void 0!==_.regexpMatchFormat&&void 0!==_.regexpReplaceWith&&void 0===_.timeSeparator&&void 0===_.labelsFormat&&(window["regexpMatchFormat_"+o.attr("id")]=_.regexpMatchFormat,window["regexpReplaceWith_"+o.attr("id")]=_.regexpReplaceWith),void 0!==_.displayFormat){var h=[];h[0]=M.displayFormat.match("Y")?"!":"#",h[1]=M.displayFormat.match("O")?"!":"#",h[2]=M.displayFormat.match("D")?"!":"#",h[3]=M.displayFormat.match("H")?"!":"#",h[4]=M.displayFormat.match("M")?"!":"#",h[5]=M.displayFormat.match("S")?"!":"#",M.displayFormat=h.join("")}else M.displayFormat="###!!!";if(void 0!==_.borderColor||void 0!==_.fontColor||void 0!==_.backgroundColor){var f={background:p,color:H,"border-color":v};o.css(f)}else o.addClass("colorDefinition");if(!1===M.labelsFormat)if(void 0!==_.size)switch(S){case"xl":o.addClass("size_xl");break;case"lg":o.addClass("size_lg");break;case"md":o.addClass("size_md");break;case"sm":o.addClass("size_sm");break;case"xs":o.addClass("size_xs")}else"sm"===S&&o.addClass("size_sm");if(!0===M.isRTL&&o.addClass("lang-rtl"),void 0!==_.startDate||void 0!==_.dateAndTime||void 0!==_.currentTime||void 0===_.hours&&void 0===_.minutes&&void 0===_.seconds)if(void 0!==_.startDate&&void 0!==_.dateAndTime&&void 0===_.currentTime){window["startDate"+o.attr("id")]=new Date(M.startDate),window["endDate"+o.attr("id")]=null!==M.timeZone?e(new Date(M.dateAndTime),M.timeZone):new Date(M.dateAndTime);void 0!==_.beforeExpiryTime&&(window["beforeExpiry_withStart"+o.attr("id")]=M.beforeExpiryTime),c(o,M,"withStart"),window["timer_startDate"+o.attr("id")]=setInterval(function(){c(o,M,"withStart")},1e3*M.tickInterval)}else if(void 0===_.startDate&&void 0!==_.dateAndTime&&void 0===_.currentTime){var y=M.startDate.getHours(),x=M.startDate.getMinutes(),I=M.startDate.getSeconds(),g=M.startDate.getMonth()+1,b=M.startDate.getDate(),k=M.startDate.getFullYear(),D=new Date(k+"/"+g+"/"+b+" "+y+":"+x+":"+I);window["startTime"+o.attr("id")]=D,window["dateTime"+o.attr("id")]=null!==M.timeZone?e(new Date(M.dateAndTime),M.timeZone):new Date(M.dateAndTime);void 0!==_.beforeExpiryTime&&(window["beforeExpiry_withnoStart"+o.attr("id")]=M.beforeExpiryTime),c(o,M,"withnoStart"),window["timer_givenDate"+o.attr("id")]=setInterval(function(){c(o,M,"withnoStart")},1e3*M.tickInterval)}else void 0!==_.currentTime&&!0===M.currentTime?(l(o,M),window["timer_currentDate"+o.attr("id")]=setInterval(function(){l(o,M)},1e3*M.tickInterval)):(window["countSeconds"+o.attr("id")]=M.seconds,m(o,M),window["timer_secondsTimer"+o.attr("id")]=setInterval(function(){m(o,M)},1e3));else void 0!==_.hours&&void 0===_.minutes&&void 0===_.seconds?n(o,"H",M,i,_):void 0===_.hours&&void 0!==_.minutes&&void 0===_.seconds?n(o,"M",M,d,_):void 0===_.hours&&void 0===_.minutes&&void 0!==_.seconds?n(o,"S",M,s,_):void 0!==_.hours&&void 0!==_.minutes&&void 0===_.seconds?n(o,"HM",M,w,_):void 0===_.hours&&void 0!==_.minutes&&void 0!==_.seconds?n(o,"MS",M,r,_):void 0!==_.hours&&void 0===_.minutes&&void 0!==_.seconds?n(o,"HS",M,a,_):void 0!==_.hours&&void 0!==_.minutes&&void 0!==_.seconds&&n(o,"HMS",M,u,_)}function n(t,o,n,e,i){t.data("typefunc",{type:o,func:e}),window["hours_"+o+t.attr("id")]=n.hours,window["minutes_"+o+t.attr("id")]=n.minutes,window["seconds_"+o+t.attr("id")]=n.seconds,void 0!==i.beforeExpiryTime&&(window["beforeExpiry_"+o+t.attr("id")]=n.beforeExpiryTime),void 0!==i.pauseButton&&H(t,o,n,e),void 0!==i.stopButton&&p(t,o,n,e),e(t,n),window["timer_"+o+t.attr("id")]=setInterval(function(){e(t,n)},1e3*n.tickInterval)}function e(t,o){return new Date(t.getTime()+6e4*t.getTimezoneOffset()+6e4*(Math.abs(o)<30?60*o:o))}function i(t,o){var n=t.attr("id"),e="";window["minutes_H"+n]===o.minutes&&window["seconds_H"+n]===o.seconds&&window["hours_H"+n]===o.hours?(v(t,e=S(t,o,0,0,0,window["hours_H"+n],0,0),o),void 0!==window["beforeExpiry_H"+n]&&M(t,o,e,"H"),window["seconds_H"+n]=60-o.tickInterval,window["minutes_H"+n]=59,0!==window["hours_H"+n]?window["hours_H"+n]--:h(t,"H",o),!0===t.data("countdowntimer").destroy&&h(t,"H",o)):(v(t,e=S(t,o,0,0,0,window["hours_H"+n],window["minutes_H"+n],window["seconds_H"+n]),o),void 0!==window["beforeExpiry_H"+n]&&M(t,o,e,"H"),window["seconds_H"+n]-=o.tickInterval,0!==window["minutes_H"+n]&&window["seconds_H"+n]<0&&(window["minutes_H"+n]--,window["seconds_H"+n]=60-o.tickInterval),0===window["minutes_H"+n]&&window["seconds_H"+n]<0&&0!==window["hours_H"+n]&&(window["hours_H"+n]--,window["minutes_H"+n]=59,window["seconds_H"+n]=60-o.tickInterval),(0===window["minutes_H"+n]&&window["seconds_H"+n]<0&&0===window["hours_H"+n]||!0===t.data("countdowntimer").destroy)&&h(t,"H",o)),n=null}function d(t,o){var n=t.attr("id"),e="";window["minutes_M"+n]===o.minutes&&window["seconds_M"+n]===o.seconds?(v(t,e=S(t,o,0,0,0,0,window["minutes_M"+n],0),o),void 0!==window["beforeExpiry_M"+n]&&M(t,o,e,"M"),window["seconds_M"+n]=60-o.tickInterval,0!==window["minutes_M"+n]?window["minutes_M"+n]--:h(t,"M",o),!0===t.data("countdowntimer").destroy&&h(t,"M",o)):(v(t,e=S(t,o,0,0,0,0,window["minutes_M"+n],window["seconds_M"+n]),o),void 0!==window["beforeExpiry_M"+n]&&M(t,o,e,"M"),window["seconds_M"+n]-=o.tickInterval,0!==window["minutes_M"+n]&&window["seconds_M"+n]<0&&(window["minutes_M"+n]--,window["seconds_M"+n]=60-o.tickInterval),(0===window["minutes_M"+n]&&window["seconds_M"+n]<0||!0===t.data("countdowntimer").destroy)&&h(t,"M",o)),n=null}function s(t,o){var n=t.attr("id"),e="";v(t,e=S(t,o,0,0,0,0,0,window["seconds_S"+n]),o),void 0!==window["beforeExpiry_S"+n]&&M(t,o,e,"S"),window["seconds_S"+n]-=o.tickInterval,(window["seconds_S"+n]<0||!0===t.data("countdowntimer").destroy)&&h(t,"S",o),n=null}function w(t,o){var n=t.attr("id"),e="";window["minutes_HM"+n]===o.minutes&&window["hours_HM"+n]===o.hours?(v(t,e=S(t,o,0,0,0,window["hours_HM"+n],window["minutes_HM"+n],0),o),void 0!==window["beforeExpiry_HM"+n]&&M(t,o,e,"HM"),0!==window["hours_HM"+n]&&0===window["minutes_HM"+n]?(window["hours_HM"+n]--,window["minutes_HM"+n]=59,window["seconds_HM"+n]=60-o.tickInterval):(0===window["hours_HM"+n]&&window["minutes_HM"+n],window["seconds_HM"+n]=60-o.tickInterval,window["minutes_HM"+n]--),0===window["hours_HM"+n]&&0===window["minutes_HM"+n]&&60==window["seconds_HM"+n]&&h(t,"HM",o),!0===t.data("countdowntimer").destroy&&h(t,"HM",o)):(v(t,e=S(t,o,0,0,0,window["hours_HM"+n],window["minutes_HM"+n],window["seconds_HM"+n]),o),void 0!==window["beforeExpiry_HM"+n]&&M(t,o,e,"HM"),window["seconds_HM"+n]-=o.tickInterval,0!==window["minutes_HM"+n]&&window["seconds_HM"+n]<0&&(window["minutes_HM"+n]--,window["seconds_HM"+n]=60-o.tickInterval),0===window["minutes_HM"+n]&&window["seconds_HM"+n]<0&&0!==window["hours_HM"+n]&&(window["hours_HM"+n]--,window["minutes_HM"+n]=59,window["seconds_HM"+n]=60-o.tickInterval),(0===window["minutes_HM"+n]&&window["seconds_HM"+n]<0&&0===window["hours_HM"+n]||!0===t.data("countdowntimer").destroy)&&h(t,"HM",o)),n=null}function r(t,o){var n=t.attr("id"),e="";window["minutes_MS"+n]===o.minutes&&window["seconds_MS"+n]===o.seconds?(v(t,e=S(t,o,0,0,0,0,window["minutes_MS"+n],window["seconds_MS"+n]),o),void 0!==window["beforeExpiry_MS"+n]&&M(t,o,e,"MS"),0!==window["minutes_MS"+n]&&0===window["seconds_MS"+n]?(window["minutes_MS"+n]--,window["seconds_MS"+n]=60-o.tickInterval):0===window["minutes_MS"+n]&&0===window["seconds_MS"+n]?h(t,"MS",o):window["seconds_MS"+n]-=o.tickInterval,!0===t.data("countdowntimer").destroy&&h(t,"MS",o)):(v(t,e=S(t,o,0,0,0,0,window["minutes_MS"+n],window["seconds_MS"+n]),o),void 0!==window["beforeExpiry_MS"+n]&&M(t,o,e,"MS"),window["seconds_MS"+n]-=o.tickInterval,0!==window["minutes_MS"+n]&&window["seconds_MS"+n]<0&&(window["minutes_MS"+n]--,window["seconds_MS"+n]=60-o.tickInterval),(0===window["minutes_MS"+n]&&window["seconds_MS"+n]<0||!0===t.data("countdowntimer").destroy)&&h(t,"MS",o)),n=null}function a(t,o){var n=t.attr("id"),e="";window["seconds_HS"+n]===o.seconds&&window["hours_HS"+n]===o.hours?(v(t,e=S(t,o,0,0,0,window["hours_HS"+n],0,window["seconds_HS"+n]),o),void 0!==window["beforeExpiry_HS"+n]&&M(t,o,e,"HS"),0===window["hours_HS"+n]&&0===window["seconds_HS"+n]?h(t,"HS",o):0!==window["hours_HS"+n]&&0===window["seconds_HS"+n]?(window["hours_HS"+n]--,window["minutes_HS"+n]=59,window["seconds_HS"+n]=60-o.tickInterval):window["seconds_HS"+n]-=o.tickInterval,!0===t.data("countdowntimer").destroy&&h(t,"HS",o)):(v(t,e=S(t,o,0,0,0,window["hours_HS"+n],window["minutes_HS"+n],window["seconds_HS"+n]),o),void 0!==window["beforeExpiry_HS"+n]&&M(t,o,e,"HS"),window["seconds_HS"+n]-=o.tickInterval,0!==window["minutes_HS"+n]&&window["seconds_HS"+n]<0&&(window["minutes_HS"+n]--,window["seconds_HS"+n]=60-o.tickInterval),0===window["minutes_HS"+n]&&window["seconds_HS"+n]<0&&0!==window["hours_HS"+n]&&(window["hours_HS"+n]--,window["minutes_HS"+n]=59,window["seconds_HS"+n]=60-o.tickInterval),(0===window["minutes_HS"+n]&&window["seconds_HS"+n]<0&&0===window["hours_HS"+n]||!0===t.data("countdowntimer").destroy)&&h(t,"HS",o)),n=null}function u(t,o){var n=t.attr("id"),e="";window["minutes_HMS"+n]===o.minutes&&window["seconds_HMS"+n]===o.seconds&&window["hours_HMS"+n]===o.hours?(v(t,e=S(t,o,0,0,0,window["hours_HMS"+n],window["minutes_HMS"+n],window["seconds_HMS"+n]),o),void 0!==window["beforeExpiry_HMS"+n]&&M(t,o,e,"HMS"),0===window["hours_HMS"+n]&&0===window["minutes_HMS"+n]&&0===window["seconds_HMS"+n]?h(t,"HMS",o):0!==window["hours_HMS"+n]&&0===window["minutes_HMS"+n]&&0===window["seconds_HMS"+n]?(window["hours_HMS"+n]--,window["minutes_HMS"+n]=59,window["seconds_HMS"+n]=60-o.tickInterval):0===window["hours_HMS"+n]&&0!==window["minutes_HMS"+n]&&0===window["seconds_HMS"+n]?(window["minutes_HMS"+n]--,window["seconds_HMS"+n]=60-o.tickInterval):0!==window["hours_HMS"+n]&&0!==window["minutes_HMS"+n]&&0===window["seconds_HMS"+n]?(window["minutes_HMS"+n]--,window["seconds_HMS"+n]=60-o.tickInterval):window["seconds_HMS"+n]-=o.tickInterval,!0===t.data("countdowntimer").destroy&&h(t,"HMS",o)):(v(t,e=S(t,o,0,0,0,window["hours_HMS"+n],window["minutes_HMS"+n],window["seconds_HMS"+n]),o),void 0!==window["beforeExpiry_HMS"+n]&&M(t,o,e,"HMS"),window["seconds_HMS"+n]-=o.tickInterval,0!==window["minutes_HMS"+n]&&window["seconds_HMS"+n]<0&&(window["minutes_HMS"+n]--,window["seconds_HMS"+n]=60-o.tickInterval),0===window["minutes_HMS"+n]&&window["seconds_HMS"+n]<0&&0!==window["hours_HMS"+n]&&(window["hours_HMS"+n]--,window["minutes_HMS"+n]=59,window["seconds_HMS"+n]=60-o.tickInterval),(0===window["minutes_HMS"+n]&&window["seconds_HMS"+n]<0&&0===window["hours_HMS"+n]||!0===t.data("countdowntimer").destroy)&&h(t,"HMS",o)),n=null}function c(t,o,n){var e=t.attr("id"),i="withnoStart"===n?window["dateTime"+e]:window["endDate"+e],d="withnoStart"===n?window["startTime"+e]:window["startDate"+e],s=(i-d)/1e3,w="";if(i-d>0){if("withStart"===n&&d>new Date)v(t,w=S(t,o,0,0,0,0,0,0),o);else{v(t,w=S(t,o,0,0,0,0,0,s),o),void 0!==window["beforeExpiry_"+n+e]&&M(t,o,w,n);"withnoStart"==n?window["startTime"+e].setSeconds(window["startTime"+e].getSeconds()+o.tickInterval):window["startDate"+e].setSeconds(window["startDate"+e].getSeconds()+o.tickInterval)}!0===t.data("countdowntimer").destroy&&h(t,n,o)}else v(t,w=S(t,o,0,0,0,0,0,0),o),h(t,n,o);e=null}function l(t,o){var n=null!==o.timeZone?e(new Date,o.timeZone):new Date;v(t,S(t,o,0,0,0,n.getHours(),n.getMinutes(),n.getSeconds()),o)}function m(t,o){var n=t.attr("id");window["countSeconds"+n].toString().length<2&&(window["countSeconds"+n]="0"+window["countSeconds"+n]),t.html(window["countSeconds"+n]+" sec"),window["countSeconds"+n]--,-1==window["countSeconds"+n]&&(delete window["countSeconds"+n],clearInterval(window["timer_secondsTimer"+n])),n=null}function _(o,n){null!==n.timeUp&&!0===t.isFunction(n.timeUp)&&n.timeUp.apply(o,[]),null!==n.expiryUrl&&(window.location=n.expiryUrl)}function M(o,n,e,i){var d=o.attr("id"),s=window["beforeExpiry_"+i+d];if(s=s.split(":"),"0"===(e=e.split(n.timeSeparator))[0]&&"0"===e[1]){for(var w=0;w<e.length-2;w++)e[w]=e[w+2]<10?"0"+e[w+2]:e[w+2];e.splice(4,2),s[0]===e[0]&&s[1]===e[1]&&s[2]===e[2]&&s[3]===e[3]&&null!==n.beforeExpiryTimeFunction&&!0===t.isFunction(n.beforeExpiryTimeFunction)&&n.beforeExpiryTimeFunction.apply(o,[])}}function S(t,o,n,e,i,d,s,w){void 0===n&&(n=0),void 0===e&&(e=0),void 0===i&&(i=0),void 0===d&&(d=0),void 0===s&&(s=0),void 0===w&&(w=0);var r=Math.round(31536e3*n*100)/100+Math.round(2628e3*e*100)/100+Math.round(86400*i*100)/100+Math.round(3600*d*100)/100+Math.round(60*s*100)/100+Math.round(100*w)/100,a=o.displayFormat.split(""),u="!"===a[0]?Math.floor(r/31536e3):0,c="!"===a[1]?Math.round(Math.floor(r/2628e3-31536e3*u/2628e3)):0,l="!"===a[2]?Math.round(Math.floor(r/86400-2628e3*c/86400-31536e3*u/86400)):0,m="!"===a[3]?Math.round(Math.floor(r/3600-2628e3*c/3600-31536e3*u/3600-86400*l/3600)):0,_="!"===a[4]?Math.round(Math.floor(r/60-3600*m/60-86400*l/60-2628e3*c/60-31536e3*u/60)):0,M="!"===a[5]?Math.round(Math.floor(r-60*_-3600*m-86400*l-2628e3*c-31536e3*u)):0;return u+o.timeSeparator+c+o.timeSeparator+l+o.timeSeparator+m+o.timeSeparator+_+o.timeSeparator+M}function v(o,n,e){var i=e.displayFormat.split("");n=n.split(e.timeSeparator),n=(n=t.grep([n[0],n[1],n[2],n[3],n[4],n[5]],function(t,o){return t>=0&&"!"===i[o]}).join(e.timeSeparator)).split(e.timeSeparator);for(var d=0;d<n.length;d++)n[d].toString().length<2&&!0===e.padZeroes&&(n[d]="0"+n[d]);n=n.join(e.timeSeparator).toString();for(var s=0;s<10;s++){var w=s.toString(),r=new RegExp(w,"g");n=n.replace(r,e.digits[s])}if(!0===e.labelsFormat&&void 0===window["regexpMatchFormat_"+o.attr("id")]&&void 0===window["regexpReplaceWith_"+o.attr("id")]){o.addClass("labelformat");for(var a="<span class='timerDisplay label"+(n=n.split(e.timeSeparator)).length+"'>",u=[],c=0;c<6;c++)"!"===i[c]&&u.push(e.labels[c]);for(var l=n.length;l>0;l--){var m=n.length-l;a+="<span class='displaySection'><span class='numberDisplay'>"+n[m]+"</span><span class='periodDisplay'>"+u[m]+"</span></span>"}n=a+="</span>"}else if(!1===e.labelsFormat&&void 0!==window["regexpMatchFormat_"+o.attr("id")]&&void 0!==window["regexpReplaceWith_"+o.attr("id")]){var _=new RegExp(window["regexpMatchFormat_"+o.attr("id")]);n=n.replace(_,window["regexpReplaceWith_"+o.attr("id")])}o.html(n)}function H(o,n,e,i){"pause"===o.data("countdowntimer").pause?clearInterval(window["timer_"+n+o.attr("id")]):"resume"===o.data("countdowntimer").pause&&(window["timer_"+n+o.attr("id")]=setInterval(function(){i(o,e)},1e3*e.tickInterval)),t("#"+e.pauseButton).click(function(){"resume"!=t(this).val()?(t("#"+e.pauseButton).val("resume").text("Resume"),clearInterval(window["timer_"+n+o.attr("id")])):"resume"==t(this).val()&&(t("#"+e.pauseButton).val("pause").text("Pause"),window["timer_"+n+o.attr("id")]=setInterval(function(){i(o,e)},1e3*e.tickInterval))})}function p(o,n,e,i){"stop"===o.data("countdowntimer").stop?(clearInterval(window["timer_"+n+o.attr("id")]),window["hours_"+n+o.attr("id")]=e.hours,window["minutes_"+n+o.attr("id")]=e.minutes,window["seconds_"+n+o.attr("id")]=e.seconds,i(o,e)):"start"===o.data("countdowntimer").stop&&(window["timer_"+n+o.attr("id")]=setInterval(function(){i(o,e)},1e3*e.tickInterval)),t("#"+e.stopButton).click(function(){"start"!=t(this).val()?(t("#"+e.stopButton).val("start").text("Start"),clearInterval(window["timer_"+n+o.attr("id")]),window["hours_"+n+o.attr("id")]=e.hours,window["minutes_"+n+o.attr("id")]=e.minutes,window["seconds_"+n+o.attr("id")]=e.seconds,i(o,e)):"start"==t(this).val()&&(t("#"+e.stopButton).val("stop").text("Stop"),window["timer_"+n+o.attr("id")]=setInterval(function(){i(o,e)},1e3*e.tickInterval))})}function h(t,o,n){var e=t.attr("id");"withnoStart"===o?(delete window["dateTime"+e],delete window["startTime"+e],clearInterval(window["timer_givenDate"+e])):"withStart"===o?(delete window["startDate"+e],delete window["endDate"+e],clearInterval(window["timer_startDate"+e])):(delete window["hours_"+o+e],delete window["minutes_"+o+e],delete window["seconds_"+o+e],clearInterval(window["timer_"+o+e])),!0===t.data("countdowntimer").destroy?t.empty().removeClass():_(t,n)}var f={init:function(n){return this.each(function(){o(t(this),n)})},destroy:function(){this.data("countdowntimer",t.extend(!0,{},t.fn.countdowntimer.defaults,{destroy:!0}))},pause:function(o){this.data("countdowntimer",t.extend(!0,{},t.fn.countdowntimer.defaults,{pause:o})),H(t(this),t(this).data("typefunc").type,t(this).data("opts").opts,t(this).data("typefunc").func)},stop:function(o){this.data("countdowntimer",t.extend(!0,{},t.fn.countdowntimer.defaults,{stop:o})),p(t(this),t(this).data("typefunc").type,t(this).data("opts").opts,t(this).data("typefunc").func)}};t.fn.countdowntimer=function(o){return f[o]?f[o].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof o&&o?void t.error("Method "+o+" does not exist on jQuery.countdownTimer"):(this.data("countdowntimer",t.extend(!0,{},t.fn.countdowntimer.defaults,o)),f.init.apply(this,arguments))},t.fn.countdowntimer.defaults={hours:0,minutes:0,seconds:60,startDate:new Date,dateAndTime:new Date("1970/01/01 00:00:00"),currentTime:!1,size:"sm",borderColor:"#F0068E",fontColor:"#FFFFFF",backgroundColor:"#000000",timeSeparator:":",tickInterval:1,timeUp:null,expiryUrl:null,regexpMatchFormat:null,regexpReplaceWith:null,pauseButton:null,stopButton:null,beforeExpiryTime:null,beforeExpiryTimeFunction:null,padZeroes:!0,displayFormat:"HMS",labelsFormat:!1,timeZone:null},t.fn.countdowntimer.regionalOptions={digits:["0","1","2","3","4","5","6","7","8","9"],labels:["Years","Months","Days","Hours","Minutes","Seconds"],isRTL:!1}}(jQuery);

jQuery(document).ready(function ($) {
    // دالة للتحقق مما إذا كان التوقيت الصيفي مفعلًا
    function isDaylightSavingTime() {
        const now = new Date();
        const aprilLastFriday = new Date(now.getFullYear(), 4, 30); // شهر يناير (التوقيت الشتوي)
        const octoberLastThursday = new Date(now.getFullYear(), 10, 31); // شهر يوليو (التوقيت الصيفي)

        // مقارنة فرق التوقيت بين الشتاء والصيف
        return Math.max(aprilLastFriday.getTimezoneOffset(), octoberLastThursday.getTimezoneOffset()) !== now.getTimezoneOffset();
    }

    $("a.ElGadwl .date").each(function () {
        var t = $(this),
            a = t.data("start"),
            e = t.data("gameends"),
            r = moment(a, "YYYY/MM/DD h:mm A"),
            n = moment(e, "YYYY/MM/DD h:mm A"),
            s = moment.utc().format("YYYY/MM/DD h:mm A");

        // التحقق مما إذا كان التوقيت الصيفي مفعلًا
        var hoursToSubtract = isDaylightSavingTime() ? 3 : 2; // 3 ساعات للتوقيت الصيفي و 2 للشتوي

        var m = r.subtract(hoursToSubtract, "hours").diff(s, "minutes"),
            o = n.subtract(hoursToSubtract, "hours").diff(s, "minutes");

        switch (true) {
            case m > 30:
                var i = moment.utc(a).subtract(hoursToSubtract, "hours").toDate();
                t.parent().find(".fc_time").addClass("fc_time_show").text(moment(i).format("LT").replace("PM", "م").replace("AM", "ص")),
                i = moment(i).format("YYYY/MM/DD h:mm A"),
                t.parent().parent().parent().parent().find(".hoverG div").html("لم تبدأ المباراة بعد"),
                t.parent().parent().parent().parent().find(".Fareeq-c span.bouton").html(" لم تبدأ "),
                t.parent().parent().parent().parent().addClass("notstarted"),
                t.parent().parent().parent().parent().find(".timer-status").remove(),
                t.countdowntimer({ dateAndTime: i });
                break;

            case m > 0:
                i = moment.utc(a).subtract(hoursToSubtract, "hours").toDate(),
                t.parent().find(".fc_time").addClass("fc_time_show").text(moment(i).format("LT").replace("PM", "م").replace("AM", "ص")),
                i = moment(i).format("YYYY/MM/DD h:mm A"),
                t.parent().parent().parent().parent().find(".Fareeq-c span.bouton").html(" تبدأ قريبا "),
                t.parent().parent().parent().parent().addClass("started"),
                t.parents(".egy_sports_item").addClass("soon"),
                t.parent().parent().parent().parent().find(".hoverG div").html("تبدأ المباراة قريبا"),
                t.parent().parent().parent().parent().find(".timer-status").remove(),
                i = moment.utc(a).subtract(hoursToSubtract, "hours").toDate(),
                i = moment(i).format("YYYY/MM/DD h:mm A"),
                t.countdowntimer({ dateAndTime: i });
                break;

            case o > 0:
                i = moment.utc(a).subtract(hoursToSubtract, "hours").toDate(),
                t.parent().find(".result_match").addClass("result_show"),
                i = moment(i).format("YYYY/MM/DD h:mm A"),
                t.parent().parent().parent().parent().find(".Fareeq-c span.bouton").html("جارية الان"),
                t.parent().parent().parent().parent().addClass("runing"),
                t.parents(".egy_sports_item").addClass("live"),
                t.parent().parent().parent().parent().find(".timer-status").show(),
                t.parent().parent().parent().parent().find(".hoverG div").html("شاهد المبارة الان");
         
                
               // Add timer and progress bar functionality
                var timerElement = t.parent().parent().parent().parent().find(".timer");
                var statusElement = t.parent().parent().parent().parent().find(".status");
                var progressBarElement = t.parent().parent().parent().parent().find(".progress-bar");

                var startTime = moment.utc(a).subtract(hoursToSubtract, "hours").toDate();
                var delayEndTime = moment(startTime).add(3, "minutes").toDate();
                var firstHalfEndTime = moment(delayEndTime).add(45, "minutes").toDate();
                var halfTimeEndTime = moment(firstHalfEndTime).add(15, "minutes").toDate();
                var secondHalfEndTime = moment(halfTimeEndTime).add(45, "minutes").toDate();
                var firstHalfEndWithExtraTime = moment(firstHalfEndTime).add(3, "minutes").toDate();


                var timerInterval = setInterval(function () {
                    var currentTime = moment.utc().toDate();
                    var isMatchLive = false;
                    var timeElapsed, minutes, seconds, progress;

                    if (currentTime < delayEndTime) {
                        timerElement.html("<span class='waiting-kick-off'>بانتظار البداية</span>");
                        statusElement.text("");
                        progressBarElement.css("width", "0%");
                        isMatchLive = false;
                    } else if (currentTime < firstHalfEndTime) {
                        timeElapsed = moment(currentTime).diff(delayEndTime);
                        minutes = Math.floor(timeElapsed / 60000);
                        seconds = Math.floor((timeElapsed % 60000) / 1000);
                        timerElement.html("`" + minutes + ":" + seconds.toString().padStart(2, "0"));
                        statusElement.text("ش1");
                        progress = (currentTime - delayEndTime) / (firstHalfEndTime - delayEndTime) * 100;
                        isMatchLive = true;
                    } else if (currentTime < moment(firstHalfEndTime).add(3, "minutes").toDate()) {
                        timerElement.html("`45");
                        statusElement.text("+");
                        progress = 50; // تثبيت التقدم عند 50% أثناء الوقت الضائع
                        isMatchLive = false;
                    } else if (currentTime < halfTimeEndTime) {
                        timerElement.html("`45");
                        statusElement.text("استراحة");
                        progressBarElement.css("width", "50%");
                        isMatchLive = false;
                    } else if (currentTime < secondHalfEndTime) {
                        timeElapsed = moment(currentTime).diff(halfTimeEndTime);
                        minutes = Math.floor(timeElapsed / 60000) + 45;
                        seconds = Math.floor((timeElapsed % 60000) / 1000);
                        timerElement.html("`" + minutes + ":" + seconds.toString().padStart(2, "0"));
                        statusElement.text("ش2");
                        progress = (currentTime - halfTimeEndTime) / (secondHalfEndTime - halfTimeEndTime) * 100;
                        isMatchLive = true;
                    } else {
                        clearInterval(timerInterval);
                        timerElement.html("`90");
                        statusElement.html("<span class='full-time'>+</span>");
                        progressBarElement.css("width", "100%");
                        isMatchLive = false;
                    }

                    // Update progress bar only if the match is live
                    if (isMatchLive) {
                        progressBarElement.css("width", progress + "%");
                        progressBarElement.parent().addClass("match-live");
                    } else {
                        progressBarElement.parent().removeClass("match-live");
                    }
                }, 1000);

                break;

            default:
                t.parent().find(".result_match").addClass("result_show");
                t.parent().parent().parent().parent().find(".Fareeq-c span.bouton").html("انتهت"),
                t.parent().parent().parent().parent().find(".hoverG div").html("انتهت المباراة"),
                t.parents(".egy_sports_item").addClass("finshed"),
                t.parent().parent().parent().parent().find(".timer-status").remove(),
                t.parent().parent().parent().parent().addClass("endded");
        }
    });
});
