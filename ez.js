const ez = {
	create: function (html) { // Generates new element
		return new Element(html);
	},
	select: function (selector) {
		if (selector instanceof Element) {
			// select via Element class
		} else {
			return querySelectorAll(selector);
		}
	}
}

class Element { // Element class
	constructor(data) { // Constructor
	if (typeof data === 'object') {
		// construct via object
	} else if (typeof data === 'string') {
		if (data.startsWith('<')) {
			// construct via raw HTML
		} else {
			// construct via chained methods
		}
	}
		this.core = data;
	}

	/* Data functions */
	tag(tag) {
		if (tag) {
			this.core.tag = tag;
		} else {

		}
	}
	id(id) {
		this.core.id = id;
	}
	className(id) {
		this.core.className = className;
	}
	html(text) {
		this.core.text = text;
	}

	/* Actionable functions */
	placeAbove(selector) {
		document.querySelector(selector).parentNode.text += this.
	}
	placeBelow(selector) {
		document.querySelector(selector).parentNode.text += this.
	}
	convert() { // Convert Element to HTML and return

	}
}


// IN CASE YOU WANT TO USE THIS FOR ANYTHING:
function html(id, content) {
	document.getElementById(id).innerHTML = content;
}

function getId(id) {
	return (document.getElementById(id));
}

function text(id, content) {
	document.getElementById(id).innerText = content;
}


function goTo(location) {
	window.location.href = location;
}
