export default {
    //判断数据类型
    type: function(obj) {
		if ( obj == null ) {
			return String( obj );
		}
        return typeof obj !== 'object'?
            typeof obj:
            Object.prototype.toString.call(obj)
    },
    //each遍历
    each: function(obj, callback){
        var length,
            i = 0;

        if(jq.type(obj) === '[object Array]'){
            length = obj.length;

            for(; i<length; i++) {
                if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
            }
        } else if(jq.type(obj) === '[object Object]') {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
        } else {
            return obj
        }
    },
}