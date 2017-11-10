/*
*   53-delete
*
*/
import { 
    core_rnotwhite,
    rreturn } from './reg'

export default {
    //设置或者读取HTML属性
    //备注：attr读取的是HTML属性
    attr: function(name, val) {
        var nType,
            args = Array.prototype.slice.call(this,0),
            length = args.length,
            newVal;

        if(length ===0 || !name) {
            return this
        }

        jq.each(args, function(k, v){
            nType = v.nodeType;
            //排除文本、注释、属性节点
            if ( !v || nType === 3 || nType === 8 || nType === 2 ) {
                return false;
            }
            //操作属性
            if(val === null) {
                v.removeAttribute(name);
                return false;
            }else if ( val ) {
                v.setAttribute(name, val);
                return false;
            }else {
                newVal = v.getAttribute(name);
                return false;
            }
  
        });
        return newVal
    },
    //设置或者读取DOM属性
    //备注：prop读取的是DOM属性，常见的如id，class，src等非自定义属性
    prop: function(name, val) {
        var nType,
            args = Array.prototype.slice.call(this,0),
            length = args.length,
            newVal;

        if ( !name || length === 0 ) {
            return
        }

        jq.each(args, function(k, v){
            nType = v.nodeType;
            //排除文本、注释、属性节点
            if ( !v || nType === 3 || nType === 8 || nType === 2 ) {
                return false;
            }
            //操作属性
            if(val === null) {
                delete v[name]; 

            }else if ( val ) {
                v[name] = val;
                return false;
            }else {
                newVal = v[name];
                return false;
            }
  
        });
        return newVal
    },
    //添加类样式
    //备注：高版本jquery直接调用getAttribute和setAttribute方法来设置class，低版本包括2.0.3的jquery，还是采用的遍历数组然后拼接字符串
    addClass: function( value ) {
        var nodes = Array.prototype.slice.call(this,0),
            values,
            classNames,
            len,
            i =0;
        //此处已省略处理参数为function的情况
        // ...

        if( typeof value === 'string' ) {
            
            values = value.match(core_rnotwhite) || [];
            len = values.length;

            jq.each( nodes, function(k, v) {

                classNames = v.className.match(core_rnotwhite) || [];
                i =0;

                for( ; i < len; i++ ) {

                    if( classNames.indexOf(values[i]) === -1 ) classNames.push(values[i])
                }

                v.className = classNames.join(' ')
                
            })
        }
        return this
    },
    //移除类样式
    //备注：关于操作class这几个方法，基本都是围绕操作数组来进行的。对数组进行增删查等操作。
    removeClass: function( value ) {
        var nodes = Array.prototype.slice.call(this,0),
            values,
            classNames,
            len,
            i =0;

        //此处已省略处理参数为function的情况
        // ...

        if( typeof value === 'string' ) {
            
            values = value.match(core_rnotwhite) || [];
            len = values.length;
     
            jq.each( nodes, function(k, v) {

                classNames = v.className.match(core_rnotwhite) || [];
                i =0;
                
                if(classNames.length === 0) {
                    v.removeAttribute('className')
                };

                for( ; i < len; i++ ) {
                    
                    if( classNames.indexOf(values[i]) !== -1 ) classNames.splice(i, 1)
                }

                v.className = classNames.join(' ')
            })
        }
        return this
    },
    //切换类样式
    //备注：jquery实现了大概五种情况{
    //    1.  toggleClass( className )      =>    判断有无，有则删，无则添
    //    1.  toggleClass( className, switch )      =>    switch为true，则添，反之则删
    //    1.  toggleClass()      =>    判断有无，对所有class，有则删，无则添
    //    1.  toggleClass( switch )      =>     switch为true，对所有class，则添，反之则删
    //    1.  toggleClass( function )      =>    对返回值操作
    //}
    toggleClass: function( value ) {
        var nodes = Array.prototype.slice.call(this,0),
            inOf,
            classNames;

        if( typeof value === 'string' ) {
    
            jq.each( nodes, function(k, v) {
                classNames = v.className.match(core_rnotwhite) || [];
                inOf = classNames.indexOf( value );

                if( inOf !== -1 ) {
                    classNames.splice(inOf, 1)
                } else {
                    classNames.push( value )
                }
                v.className = classNames.join(' ')
            })
        }
        return this
    },
    //是否含有指定的类样式
    //备注：通过数组indexOf方法检测是否存在
    hasClass: function( value ) {
        var nodes = Array.prototype.slice.call(this,0),
            classNames,
            arg = false;
        if( typeof value === 'string' ) {
            jq.each( nodes, function(k, v) {
                classNames = v.className.match(core_rnotwhite) || [];
                if( classNames.indexOf( value ) !== -1 ) {
                    arg = true;
                    return false
                }
            })
        }
        return arg
    },
    //读取或者设置当前值
    val: function(arg) {
        var nodes = Array.prototype.slice.call(this,0),
            elem = this[0],
            val;

        //arg存在即设置val，反之返回val
        if( arg && (typeof arg === 'string' || typeof arg === 'number') ) {

            jq.each( nodes, function( k, v ) {
                if( v.nodeType !== 1 ) {
                    return false
                }
                v.value = arg
            })
        } else {
            return typeof elem.value === "string" ?
            //如果是字符串型，去掉回车符等
            elem.value.replace(rreturn, "") :
            //如果是数值型，直接返回
            elem.value == null ? "" : elem.value;
        }
    }
}
