import Utils from './utils'
import Callbacks from './callbacks'
import Deferred from './deferred'
import When from './when'
import Attributes from './attributes'


(function(window, undefined){

    var jq = function(selector){
        return new jq.fn.init(selector)
    }
    jq.fn = jq.prototype = {
        constructor: jq,
        init: function(selector){
            var elem,
                length;
            if(!selector) {
                return this
            }
           
            if(typeof selector === 'string') {
                elem = document.querySelectorAll(selector.trim());
                length = elem.length;
                elem.__proto__ = jq.fn;
                elem.length = length;
            } else if (typeof selector === 'function'){
                return jq(document).ready(selector);
            }

            return elem
        }
    }

    jq.fn.init.prototype = jq.fn;

    jq.extend = jq.fn.extend = function(){

        var options,
            length = arguments.length,
            deep = false,
            i = 1,
            target = arguments[0] || {};

        if( typeof target === "boolean" ) {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }

        if (typeof (target) !== "object")
            target = {};

        if (length === i) target = this,--i;

        for (; i < length; i++) {

            if ((options = arguments[i]) != null) {
                for (name in options) {
                    if(deep && typeof (options[name])==="object") {
                        jq.extend(deep, target[name], options[name])
                    } else {
                        target[name] = options[name]
                    }
                }
            }

        }
        return target;
    },
    jq.fn.extend({
        each: function(callback) {
            return jq.each(this, callback)
        }
    })
    //扩展工具
    jq.extend(Utils);
    //扩展callbacks、deferred、when
    jq.extend({
        Callbacks: Callbacks,
        deferred: Deferred,
        when: When
    });
    jq.fn.extend(Attributes)

    window.jq = window.$ = jq;

})(window)