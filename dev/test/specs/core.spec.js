import lib from '../../../src/codegen/'

describe("The core module",function(){
    describe("The value type",function(){
        describe("The value cmnd",function(){
            var def = ['value','foo'],
                code = lib.C.value({},def),
                expected = "foo",
                result;
            eval("result = "+code);
            it("should produce expected result",function(){
                expect(result).toEqual(expected);
            });
        });
    });
});