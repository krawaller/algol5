import _ from 'lodash'
import lib from '../../src/codegen/'

const mutationTester = (suite)=> {
    _.each(suite,(specs,effect)=>{
        describe("The "+effect+" effect",()=>{
            _.each(specs,(spec,name)=>{
                describe(name,()=>{
                    let vars = '', result, code;
                    for(var g in spec.scope || {}){
                        vars += "let "+g+"="+JSON.stringify(spec.scope[g])+"; "
                    }
                    code = lib.E[effect].apply(null,[spec.options].concat(spec.args));
                    let expects = _.map(spec.mutations,(newval,m)=> `expect(${m}).toEqual(${JSON.stringify(spec.mutations[m])}); `);
                    let test = `it("should perform expected mutations",function(){
                        ${expects.join("; ")}
                    });`
                    eval(vars+code+";"+test);
                });
            });
        });
    });
}

export default mutationTester