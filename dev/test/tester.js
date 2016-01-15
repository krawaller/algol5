import _ from 'lodash'

const tester = (func,desc,specs)=> {
    describe(desc,()=>{
        _.each(specs,(spec,name)=>{
            describe(name,()=>{
                let vars = '', result, code;
                for(var g in spec.scope || {}){
                    vars += "let "+g+"="+JSON.stringify(spec.scope[g])+"; "
                }
                code = func.apply(null,[spec.options].concat(spec.args||[]).concat(spec.hasOwnProperty("arg") ? [spec.arg] : []));
                let expects, test
                if (spec.mutations){
                    let expects = _.map(spec.mutations,(newval,m)=> `expect(${m}).toEqual(${JSON.stringify(spec.mutations[m])}); `);
                    test = `it("should perform expected mutations",function(){
                        ${expects.join("; ")}
                    });`
                } else if (spec.hasOwnProperty("expected")) {
                    test = `it("should return expected result",function(){
                        expect(result).toEqual(${JSON.stringify({r:spec.expected})}.r);
                    });`
                } else {
                    throw "Should seek result or mutation!"
                }
                eval(vars+(spec.hasOwnProperty("expected") ? 'result=': '')+code+";"+test);
            });
        });
    });
}

export default tester