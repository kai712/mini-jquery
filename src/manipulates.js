/*
*
*   DOM操作 Manipution
*   对于DOM操作，这里的有两个核心函数domManip和buildFragment，把元素碎片化处理，并返回处理后的DOM节点
*   
*/

export default {
    append: function() {
        var args = arguments;
        this.each(function( k, v ) {
            domManip( v, args, function( elems ) {
                v.appendChild( elems )
            })
        });

        return this
    },

    prepend: function(){
        var args = arguments;
        this.each(function( k, v ) {
            domManip( v, args, function( elems ) {
                v.insertBefore( elems, v.firstChild )
            })
        });

        return this
    },

    before: function(){
        var args = arguments;
        this.each(function( k, v ) {
            domManip( v, args, function( elems ) {
                v.parentNode.insertBefore( elems, v )
            })
        });

        return this
    },

    after: function(){
        var args = arguments;
        this.each(function( k, v ) {
            domManip( v, args, function( elems ) {
                v.parentNode.insertBefore( elems, v.nextSibling );
            })
        });

        return this
    },

    html: function( val ){
        var elem = this[0];

        if( val === undefined && elem.nodeType === 1 ) {
            return elem.innerHTML
        }

        this.each(function( k, v ) {
            if( v.nodeType === 1 ) {
                v.innerHTML = val
            }
        });

        return this
    },

    text: function( val ){
        var elem = this[0];
        
        if( val === undefined && elem.nodeType === 1 ) {
            return elem.textContent
        }

        this.each(function( k, v ) {
            if( v.nodeType === 1 ) {
                v.textContent = val
            }
        });

        return this
    }
}

function domManip( elem, args, callback ) {
    var fragment;
    //这里是个黑科技，数组降维技巧
    args = [].concat.apply( [], args );
    fragment = buildFragment( args, elem.ownerDocument );

    callback.call( elem, fragment );
}

function buildFragment( elems, context ) {
    var tmp,
        i = 0,
        len = elems.length || 0,
        $div = document.createElement('div'),
        fragment = document.createDocumentFragment();

    tmp = tmp || fragment.appendChild($div);

    for( ; i<len; i++ ) {
        tmp.innerHTML += elems[i]
    }

    return tmp;
}