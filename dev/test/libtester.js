var _ = require('lodash')
var sinon = require('sinon')




function tester(description,lib,methodtests){
	describe(description,function(){
		_.each(methodtests,function(tests,signature){
			describe("the "+signature+" method",function(){
				var methodname = signature.split("(")[0],
					arglist = signature.split("(")[1].replace(/\)$/,"").split(",");
				_.each(tests,function(test,testdesc){
					var givenargs = _.reduce(_.keys(test),function(mem,arg){
						mem["@"+arg] = test[arg];
						return mem;
					},{});
					describe(testdesc,function(){
						var result, method;
						beforeEach(function(){
							method = lib[methodname];
							_.each(test.context||{},function(stubdef,stubname){
								sinon.stub(lib,stubname,stubdef.method || (function(){
									var callcount = 0;
									return function(){
										var ret = stubdef.returnseries ? stubdef.returnseries[callcount]
											: stubdef.returnsarg !== undefined ? arguments[stubdef.returnsarg]
											: test[stubdef.returns]||stubdef.returns;
										callcount++;
										return ret;
									};
								})());
							});
							result = method.apply(lib,arglist.map(function(param){
								return test[param];
							}));
						});
						it(test.description || "it returns the expected value",function(){
							expect(result && result.toJS ? result.toJS() : result).toEqual(test.expected);
						});
						_.each(test.context||{},function(stubdef,stubname){
							if (stubdef.expectedargs){
								describe("the usage of "+stubname,function(){
									var len = stubdef.expectedargs.length;
									it("called "+stubname+" "+len+" time"+(len>1?'s':''),function(){
										expect(lib[stubname].callCount).toEqual(len);
									});
									_.each(stubdef.expectedargs,function(args,n){
										describe("call #"+n,function(){
											it("passed "+args.length+" argument"+(args.length>1?'s':''),function(){
												expect((lib[stubname].getCall(n)||{args:[]}).args.length).toEqual(args.length);
											});
											_.each(args,function(arg,a){
												it("used correct value for parameter #"+a,function(){
													var usedargs = (lib[stubname].getCall(n)||{args:[]}).args;
													expect((usedargs)[a]).toEqual(givenargs[arg]||arg);
												});
											});
										});
									});
								});
							}
						});
						afterEach(function(){
							_.each(test.context||{},function(stubdef,stubname){
								lib[stubname].restore();
							});
						});
					});
				});
			});
		});
	});
}

export default tester