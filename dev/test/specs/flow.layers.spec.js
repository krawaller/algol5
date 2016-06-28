import test from '../gentester'
import lib from '../../../src/codegen/'

let F = lib

describe("The seed commands",()=> {

    test(F,'boardLayers',{
        "for normal call": {
            arg: {height:2,width:2},
            expected: {
                board: {
                    a1:{pos:'a1',x:1,y:1,colour:'dark'},
                    a2:{pos:'a2',x:1,y:2,colour:'light'},
                    b1:{pos:'b1',x:2,y:1,colour:'light'},
                    b2:{pos:'b2',x:2,y:2,colour:'dark'}
                },
                light: {
                    a2:{pos:'a2',x:1,y:2,colour:'light'},
                    b1:{pos:'b1',x:2,y:1,colour:'light'}
                },
                dark: {
                    a1:{pos:'a1',x:1,y:1,colour:'dark'},
                    b2:{pos:'b2',x:2,y:2,colour:'dark'}
                }
            }
        }
    })

    test(F,'blankArtifactLayers',{
        "for normal game": {
            options: {
                rules: {
                    generators: {
                        foo: {
                            draw: {
                                boo: { tolayer: "alt1" },
                                hoo: { tolayer: ["playercase","alt2","alt3"] }
                            }
                        },
                        woo: {
                            draw: {
                                roo: { tolayer: ["ifelse","somecond","alt4","alt3"] }
                            }
                        }
                    }
                }
            },
            expected: {"alt1":{},"alt2":{},"alt3":{},"alt4":{}}
        },
        "when includes with owner": {
            options: {
                rules: {
                    generators: {
                        foo: {
                            draw: {
                                boo: { tolayer: "alt1", include: { owner: 'someone'} },
                                hoo: { tolayer: ["playercase","alt2","alt3"] }
                            }
                        }
                    }
                }
            },
            expected: {"alt1":{},"myalt1":{},"oppalt1":{},"neutralalt1":{},"alt2":{},"alt3":{}}
        },
        "when includes with owner inside of playercase": {
            options: {
                rules: {
                    generators: {
                        foo: {
                            draw: {
                                boo: { tolayer: "alt1" },
                                hoo: { tolayer: ["playercase","alt2","alt3"], include: { owner: 'someone'} }
                            }
                        }
                    }
                }
            },
            expected: {"alt1":{},"alt2":{},"myalt2":{},"oppalt2":{},"neutralalt2":{},"alt3":{},"myalt3":{},"oppalt3":{},"neutralalt3":{}}
        }
    })
    test(F,'calculateUnitLayers',{
        'for regular calc': {
            scope: {
                UNITDATA: {
                    unit1: {group: 'soldiers', owner: 0, pos: 'p1', id: 'unit1'},
                    unit2: {group: 'soldiers', owner: 1, pos: 'p2', id: 'unit2'},
                    unit3: {group: 'knights', owner: 2, pos: 'p3', id: 'unit3'}
                },
                ownernames: ['NEU','MY','OPP'],
                UNITLAYERS: 'whatever'
            },
            context: {
                blankArtifactLayers: () => JSON.stringify({soldiers: {},knights:{},all:{},MYsoldiers:{},NEUsoldiers:{},knights:{},OPPknights:{},MYunits:{},OPPunits:{},NEUunits:{}})
            },
            mutations: {
                UNITLAYERS: {
                    all: {
                        p1: {group: 'soldiers', owner: 0, pos: 'p1', id: 'unit1'},
                        p2: {group: 'soldiers', owner: 1, pos: 'p2', id: 'unit2'},
                        p3: {group: 'knights', owner: 2, pos: 'p3', id: 'unit3'}
                    },
                    soldiers: {
                        p1: {group: 'soldiers', owner: 0, pos: 'p1', id: 'unit1'},
                        p2: {group: 'soldiers', owner: 1, pos: 'p2', id: 'unit2'}
                    },
                    MYsoldiers: {
                        p2: {group: 'soldiers', owner: 1, pos: 'p2', id: 'unit2'}
                    },
                    NEUsoldiers: {
                        p1: {group: 'soldiers', owner: 0, pos: 'p1', id: 'unit1'}
                    },
                    knights: {
                        p3: {group: 'knights', owner: 2, pos: 'p3', id: 'unit3'}
                    },
                    OPPknights: {
                        p3: {group: 'knights', owner: 2, pos: 'p3', id: 'unit3'}
                    },
                    MYunits: {
                        p2: {group: 'soldiers', owner: 1, pos: 'p2', id: 'unit2'}
                    },
                    OPPunits: {
                        p3: {group: 'knights', owner: 2, pos: 'p3', id: 'unit3'}
                    },
                    NEUunits: {
                        p1: {group: 'soldiers', owner: 0, pos: 'p1', id: 'unit1'}
                    }
                }
            }
        }
    })
});
