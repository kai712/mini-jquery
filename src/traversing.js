/*
*
*   DOM遍历Traversing
*   关于DOM遍历这里，jquery提供的是通过内置each方法，并定义统一回调（模板函数），来处理返回DOM对象的过滤、排序、去重等操作并构造出新对象，另外定义了三个工具方法
*   nextElementSibling以及previousElementSibling兼容性IE9+
*/

export default {
    parents: function( elem ){
        return jq.dir( this, elem, "parentNode" );
    }
}


