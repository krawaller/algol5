import _ from 'lodash'
import lib from '../../src/codegen/'

const expressionTester = (suite)=> {
    _.each(suite,(specs,type)=>{
        describe("The "+type+" type",()=>{
            _.each(specs,(spec,name)=>{
                describe(name,()=>{
                    let vars = '', result, code;
                    for(var g in spec.scope || {}){
                        vars += "let "+g+"="+JSON.stringify(spec.scope[g])+"; "
                    }
                    code = lib.C[type](spec.options,spec.def);
                    eval(vars+"result = "+code);
                    it("should produce expected result",()=>{
                        expect(result).toEqual(spec.expected);
                    });
                });
            });
        });
    });
}

export default expressionTester