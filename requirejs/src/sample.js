define(["require", "greeter"], function (require, greeter) {

	return new function() {

		this.greetInHtml = function (person, greeter) {
			var greetings = greeter(person);
			var text = document.createTextNode(greetings);
			document.body.appendChild(text);  
		};

		this.sample = function () {
			var bob = {firstname: "Bob", lastname: "Builder", title: gretter.Title.Mr};
			var wendy = {firstname: "Wendy", lastname: "Lastname", title: gretter.Title.Mrs};
			greetInHtml(wendy, gretter.leisure);
			greetInHtml(bob, gretter.formal);
		};

	};
	
});