/// <reference path="../typings/tsd.d.ts" />

import gretter = require('greeter');

function greetInHtml(person: gretter.Person, greeter: gretter.Greeter) {
	var greetings = greeter(person);
	var text = document.createTextNode(greetings);
	document.body.appendChild(text);  
}

export function sample() {
	var bob = {firstname: "Bob", lastname: "Builder", title: gretter.Title.Mr};
	var wendy = {firstname: "Wendy", lastname: "Lastname", title: gretter.Title.Mrs};
	greetInHtml(wendy, gretter.leisure);
	greetInHtml(bob, gretter.formal);
}