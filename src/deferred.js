export default function( func ) {
    //定义三种状态
    var tuples = [
        [ "resolve", "done", jq.Callbacks("once memory"), "resolved" ],
        [ "reject", "fail", jq.Callbacks("once memory"), "rejected" ],
        [ "notify", "progress", jq.Callbacks("memory") ]
    ],
    //初始状态为pending
    state = "pending",
    promise = {
        state: function() {
            return state;
        },
        always: function() {
            deferred.done( arguments ).fail( arguments );
            return this;
        },
        promise: function( obj ) {
            return obj != null ? jq.extend( obj, promise ) : promise;
        }
    },
    //初始化deferred对象
    deferred = {};

    // Add list-specific methods
    jq.each( tuples, function( i, tuple ) {
        var list = tuple[ 2 ],
            stateString = tuple[ 3 ];

        // promise[ done | fail | progress ] = list.add
        promise[ tuple[1] ] = list.add;

        if ( stateString ) {
            list.add(function() {
                // state = [ resolved | rejected ]
                state = stateString;
            });
        }

        // deferred[ resolve | reject | notify ]
        deferred[ tuple[0] ] = function() {
            deferred[ tuple[0] + "With" ]( ...arguments );
            return this;
        };
    
        deferred[ tuple[0] + "With" ] = list.fire
    });

    promise.promise( deferred );

    if ( func ) {
        func.call( deferred, deferred );
    }

    return deferred;
}