import Jasmine from 'jasmine'

var jasmine = new Jasmine()
jasmine.loadConfigFile('./dev/test/jasmine.json')
jasmine.execute()