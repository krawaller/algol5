import Jasmine from 'jasmine';

var jasmine = new Jasmine();

jasmine.loadConfigFile(__dirname + '/jasmine.json');

jasmine.execute();