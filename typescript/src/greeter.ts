
export interface Greeter {
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

