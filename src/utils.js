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

        if(jq.type(obj) === '[object object]'){

            for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}

        } else {
            length = obj.length;
            
            for(; i<length; i++) {
                if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                    break;
                }
            }
        }
    },
    //转化成数组对象
    toArray: function() {
		return core_slice.call( this, 0 );
    },
    get: function( num ) {
        return num == null ?
        
            this.toArray() :
            
			( num < 0 ? this[ this.length + num ] : this[ num ] );
    },
    //从一个元素出发，查找某个方向上的所有元素
    dir: function( nodes, elem, dir ){
        var matched = [];

        this.each( nodes, function( k, v ){
            while ( (v = v[dir]) && v.nodeType !== 9 ) {
                if( [].slice.call(jq(elem)).indexOf(v) !== -1 ){
                    matched = [];
                    matched.push( v );
                    break
                }
                if( v.nodeType ===1 && matched.indexOf(v) === -1 ) {
                    matched.push( v )
                }
            }

        });
        
        matched.__proto__ = jq.fn;
        return matched
    }
}