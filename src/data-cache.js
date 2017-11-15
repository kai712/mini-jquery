/*
    @   jquery的data缓存的主要思想是，定义一个cache仓库用来存储所有需要缓存的数据为val，并在其对应节点属性上存储对应的引用地址key，关联起来，从而避免了
    @   javascript对象与DOM元素互相引用导致的内存泄漏问题，唯一key是一个整型值，初始值为0，每次分配时自动加1，唯一key被分配到
    @   expando属性上去。
*/

export default {
    //数据缓存堆
    cache: [],
    data_uid: 0,
    //设置或读取data
    data: function( key, val ) {

        if ( !key && typeof key !== 'string' ) {

            return this
        }
        //获取缓存数据
        if( !val ) {

            return this.cache[ this.attr( key ) ]
        }
        //设置data
        ++ this.data_uid ;
        //设置缓存data
        this.attr( key, this.data_uid ) ;
        this.cache[ this.data_uid ] = val ;

        return this
    },
    //删除data
    removeData: function ( key ) {
        if ( key && typeof key === 'string' ) {

            this.cache[ this.attr( key ) ] = null ;
            this.attr( key, this.data_uid, null ) ;
        }

        return this
    }
}