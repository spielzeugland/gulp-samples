/// <reference path="../typings/index.d.ts" />
/// <reference path="../out/definitions/greeter.d.ts" />


// TODO How to get rid of this compiler issue?
//      >>> test\greeter-test.ts(4,26): error TS2307: Cannot find module 'greeter'.
import greeter = require('greeter');

describe('greeter module (ts):', function () {

	it('greeter.Person has firstname property', function () {
		var mr = new greeter.Person("Bob", "Builder", greeter.Title.Mr);
		expect(mr.firstname).toBe("Bob");
	});

	it('greeter.Person has lastname property', function () {
		var mr = new greeter.Person("Bob", "Builder", greeter.Title.Mr);
		expect(mr.lastname).toBe("Builder");
	});

	it('greeter.Person has title property', function () {
		var mr = new greeter.Person("Bob", "Builder", greeter.Title.Mr);
		expect(mr.title).toBe(greeter.Title.Mr);
	});

	it('greeter.leisure should exist', function () {
		expect(greeter.leisure).not.toBe(undefined);
	});

	it('greeter.formal should exist', function () {
		expect(greeter.formal).not.toBe(undefined);
	});

	it('greeter.leisure should reply with firstname', function () {
		var mr = new greeter.Person("Bob", "Builder", greeter.Title.Mr);
		expect(greeter.leisure(mr)).toBe("Hi Bob!");
	});

	it('greeter.formal should reply with lastname', function () {
		var mr = new greeter.Person("Bob", "Builder", greeter.Title.Mr);
		expect(greeter.formal(mr)).toBe("Welcome Mr Builder");
	});

});
