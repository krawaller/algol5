import test from '../gentester'
import lib from '../'

let F = lib

describe("The flow ai commands",()=>{
    test(F,'parseScoring',{
        'for regular scoring': {
            arg: [
                [0,1,2],
                [3,4,5]
            ],
            expected: {a1:3,a2:0,b1:4,b2:1,c1:5,c2:2}
        }
    }),
    test(F,'addScoringForPlayer',{
        'for plr 2 with a mirror': {
            options: {player:2},
            args: [
                'mupps',
                [['a','b'],'mirror']
            ],
            context: {
                parseScoring: (O,def)=> '"'+def.join()+'"'
            },
            mutations: {
                mymupps: 'b,a',
                oppmupps: 'a,b'
            }
        }
    })
    test(F,'addAllScoringsForPlayer',{
        'for plr 2': {
            options: {
                player: 2,
                rules: {AI: {scorings: {foo:'FOO',bar:'BAR'} } }
            },
            context: {
                addScoringForPlayer: (O,name,def)=> 'added +="'+name+def+', "; '
            },
            scope: {
                added: ''
            },
            mutations: {
                added: 'fooFOO, barBAR, '
            }
        }
    })
});
