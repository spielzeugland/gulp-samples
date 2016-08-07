define(["require"], function (require) {

	return new function() {

		// TODO better enum in JS
		this.Title = {
			"Mr" : "Mr",
			"Mrs" : "Mrs"
		}

		this.Person = function(firstname, lastname, title) {
			this.firstname = firstname;
			this.lastname = lastname;
			this.title = title;
		}

		this.leisure = function leisure (person) {
			return "Hi " + person.firstname + "!";
		}

		this.formal = function formal (person) {
			return "Welcome " + person.title + " " + person.lastname;
		}
	
	};

});
