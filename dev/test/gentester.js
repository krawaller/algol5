import _ from 'lodash'

import {js_beautify} from 'js-beautify'

const tester = (func,desc,specs)=> {
    describe(desc,()=>{
        _.each(specs,(spec,name)=>{
            describe(name,()=>{
                let vars = '', result, code, test = '';
                for(var g in spec.scope || {}){
                    vars += "let "+g+"="+JSON.stringify(spec.scope[g])+"; "
                }
                if (spec.norefs) {
                    spec.norefs.forEach(norefvar=>{
                        vars += 'let NOREF'+norefvar+' = '+norefvar+'; '
                        test += `
                            it("should not mutate ${norefvar}",function(){
                                expect(${norefvar}!==NOREF${norefvar}).toBe(true);
                            })
                        `
                    })
                }
                code = func.apply(null,[spec.options].concat(spec.args||[]).concat(spec.hasOwnProperty("arg") ? [spec.arg] : []));
                if (spec.mutations){
                    test += _.map(spec.mutations,(newval,m)=>
                        `it("should mutate ${m} as expected",function(){
                            expect(${m}).toEqual(${JSON.stringify(spec.mutations[m])});
                        }); `
                    ).join(" ");
                }
                if (spec.hasOwnProperty("expected")) {
                    test += `it("should return expected result",function(){
                        expect(result).toEqual(${JSON.stringify({r:spec.expected})}.r);
                    });`
                }
                if (!spec.mutations && !spec.hasOwnProperty("expected")) {
                    throw "Should seek result or mutation!"
                }
                var tobeexec = vars+(spec.hasOwnProperty("expected") ? 'result=': '')+code+";"+test
                if (spec.debug){
                    console.log("Code: ",tobeexec)
                }
                try {
                    eval(tobeexec);
                    if (false){ //spec.norefs){
                        console.log("WHAAA! Code:\n",js_beautify(tobeexec,{indent_size:2}))    
                    }
                } catch(e) {
                    console.log("ERROR ERROR! Code:\n",js_beautify(tobeexec,{indent_size:2}))
                    throw e;
                }
            });
        });
    });
}

export default tester