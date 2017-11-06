export default {
    //判断数据类型
    type: function(obj) {
		if ( obj == null ) {
			return String( obj );
		}
        return typeof obj !== 'object'?
            typeof obj:
            Object.prototype.toString.call(obj)
    }
}