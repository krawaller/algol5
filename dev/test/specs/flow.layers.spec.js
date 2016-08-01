import test from '../gentester'
import lib from '../../../src/codegen/'

let F = lib

describe("The seed commands",()=> {

    test(F,"terrainLayers", {
        "it deduces correctly": {
            options: {
                rules: {
                    board: {
                        height: 1,
                        width: 4,
                        terrain: {
                            holes: ["a1"],
                            bunkers: {
                                1: ["b1"],
                                0: ["d1"]
                            }
                        }
                    },
                    whatev: {foo: ['blah','nobunkers']}
                }
            },
            arg: 2,
            expected: {
                holes: {a1:{pos:'a1'}},
                bunkers: {
                    b1: {pos:'b1',owner:1},
                    d1: {pos:'d1',owner:0}
                },
                oppbunkers: { b1: {pos:'b1',owner:1} },
                neutralbunkers: { d1: {pos:'d1',owner:0} },
                nobunkers: {a1:{pos:'a1'},c1:{pos:'c1'}}
            }
        }
    })

    test(F,'deduceInitialUnitData', {
        "it deduces unitData correctly": {
            options: {
                rules: {
                    setup: {
                        muppets: {
                            1: ["c1"],
                            2: [["rect","a1","b2"]]
                        }
                    }
                }
            },
            expected: {
                unit1: {id:"unit1",owner:1,pos:"c1",group:"muppets"},
                unit2: {id:"unit2",owner:2,pos:"a1",group:"muppets"},
                unit3: {id:"unit3",owner:2,pos:"b1",group:"muppets"},
                unit4: {id:"unit4",owner:2,pos:"a2",group:"muppets"},
                unit5: {id:"unit5",owner:2,pos:"b2",group:"muppets"}
            }
        }
    })

    test(F,'blankUnitLayers', {
        'for normal call': {
            options: {
                rules: {
                    setup: {
                        kings: 'FOO',
                        queens: 'BAR'
                    },
                    commands: {
                        fart: {
                            applyEffects: [
                                ['spawn','somepos',['playercase','jacks','aces']]
                            ]
                        }
                    }
                }
            },
            expected: {
                'aces':{},'jacks':{},'kings':{},'queens':{},
                'myaces':{},'myjacks':{},'mykings':{},'myqueens':{},
                'neutralaces':{},'neutraljacks':{},'neutralkings':{},'neutralqueens':{},
                'oppaces':{},'oppjacks':{},'oppkings':{},'oppqueens':{},
                'myunits':{},'oppunits':{},'units':{},'neutralunits':{}
            }
        }
    })

    test(F,'boardConnections', {
        "for normal call": {
            options: {rules:{board:{height:2,width:2}}},
            expected: {
                a1:{1:'a2',2:'b2',3:'b1'},
                a2:{3:'b2',4:'b1',5:'a1'},
                b1:{7:'a1',8:'a2',1:'b2'},
                b2:{5:'b1',6:'a1',7:'a2'}
            }
        }
    });

    test(F,'boardLayers',{
        "for normal call": {
            options: {rules:{board:{height:2,width:2}}},
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
                blankUnitLayers: () => JSON.stringify({soldiers: {},knights:{},all:{},MYsoldiers:{},NEUsoldiers:{},knights:{},OPPknights:{},MYunits:{},OPPunits:{},NEUunits:{}})
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
