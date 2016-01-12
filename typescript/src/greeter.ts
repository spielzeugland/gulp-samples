///<reference path="../typings/tsd.d.ts" />

interface Greeter {
  (person:Person): string;
}

export enum Title {
	Mr, Mrs
}

export class Person {
	constructor(public firstname: string, public lastname: string, public title: Title) {
	}
}

export function leisure (person: Person) {
	return "Hi " + person.firstname + "!";
}

export function formal (person: Person) {
	return "Welcome " + Title[person.title] + " " + person.lastname;
}

function greetInHtml(person: Person, greeter: Greeter) {
	var greetings = greeter(person);
	var text = document.createTextNode(greetings);
	document.body.appendChild(text);  
}

export function sample() {
	var bob = {firstname: "Bob", lastname: "Builder", title: Title.Mr};
	var wendy = {firstname: "Wendy", lastname: "Lastname", title: Title.Mrs};
	greetInHtml(wendy, leisure);
	greetInHtml(bob, formal);
}
