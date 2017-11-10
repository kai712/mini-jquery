/*
*callback主要是运用队列的思想实现，灵活控制需要出队的函数下表firingIndex。
*  可传参数：once  =>  表示只执行主动调用的fire（）方法一次，如86行所示
*           memory  =>  表示记录上一次触发回调时的参数，之后每次add时自动调用fire（）方法，通过控制firingIndex来实现合理调用
*           unique  =>  确保一个回调函数只能被添加一次
*           stopOnFalse  =>  当某个回调函数返回false时中断执行
*
*/

export default function() {
    var list = [],
        //队列数组
        queue = [],
        options = Array.prototype.slice.call(arguments ),
        firingIndex = 0,
        firing ,
        fireArgs,
        ctn = false,
        isFirst = true,
        isMemory = options.indexOf( 'memory' ) !== -1;

    var self = {
        //回调入队
        add: function(){

            if ( list ) {

                (function add(args) {
                    
                    jq.each( args, function( k, v ){
                        if ( jq.type( v ) === '[object Array]' ) {
                            add( v );                   
                        }
                        if( typeof v === 'function' ) {                           
                            if ( options.indexOf( 'unique' ) !== -1 ) {
                                if ( list.indexOf( v ) === -1 ) {
                                    list.push( v );
                                } else {
                                    return false ;
                                }
                            } else {
                                list.push( v );
                            }                      
                        }
                    })
                })(arguments) 
            }

            if ( !firing && isMemory && !isFirst ) {
                firingIndex = list.length - 1;
                ctn = false;
                this.fireWith();
            }

            return this

        },
        fireWith: function( args ) {
            fireArgs = ( isMemory && !isFirst && !ctn ? 
                            fireArgs :
                                args ) || [];

            if( !firing ) {
                firing = true;
                isFirst = false;

                for ( ; firingIndex < list.length; firingIndex ++ ) {
                    
                    if ( list[ firingIndex ]( ...fireArgs ) === false &&
                            options.indexOf( 'stopOnFalse' ) !== -1 ) {
                                break ;
                    }
                }

                firing = false ;
                firingIndex = 0;
                ctn = true;
            }

            return this
        },
        //调用回调
        fire: function(){
            var args = Array.prototype.slice.call(arguments );

            if( options.indexOf( 'once' ) === -1 || isFirst ) {
                this.fireWith( args )
            }
        },
        //删除指定回调
        remove: function(){

            jq.each( list, function( k, v ){
                if( typeof v === 'function' ) {
                    list.splice( k, 1 );
                }
            });

            return this;
        },
        //清空回调队列
        empty: function(){

            if ( list ) {
                list = [];
            }

            return this;
        },
        //判断有没有在回调队列中
        has: function( fn ){

            return list.indexOf( fn ) > -1 ?
                true :
                    false;
        }
    }

    return self
}