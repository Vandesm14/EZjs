// const ez = (function () {
const valid = {
	selfClosing: ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'],
	tags: {
		'': [],
	}
};

let DOM;

class EZComponent { // EZComponent class
	constructor(data) { // Constructor
		this.core = [];
		this.__create__(data);
	}

	__create__(data) {
		let obj = {
			tag: '',
			prop: {}
		};
		if (typeof data === 'object') {
			data = copy(data);
			if (!data.tag) throw new Error('Tag is not present in EZ Component declaration');
			let tag = data.tag;
			let html = data.html || data.text.replace(/</g, '&lt;').replace(/>/g, '&gt;') || '';
			delete data.tag;
			if (data.hasOwnProperty('html')) delete data.html;
			if (data.hasOwnProperty('text')) delete data.text;
			obj = {
				tag,
				html,
				prop: data
			};
			data = objToElement(obj);
		} else if (typeof data === 'string') {
			if (data.startsWith('<')) {
				data = rawToElement(data);
			} else {
				data = document.createElement(data);
			}
		}
		data.setAttribute('ez-id', ((+new Date) * Math.round(Math.random() * 10 ** 10)).toString(36));
		this.core.push(data);
	}

	/* Properties */
	tag(tag) {
		// FIXME: Auto-Regenerate element with new tag if live
		if (tag) {
			// this.core.forEach(el => el.tag = tag);
			return this;
		} else {
			return this.core[0].tag;
		}
	}
	id(id) {
		if (id) {
			this.core.forEach(el => el.setAttribute('id', id));
			return this;
		} else {
			return this.core[0].getAttribute('id');
		}
	}
	ez(id) {
		if (id) {
			this.core.forEach(el => el.setAttribute('ez-id', id));
			return this;
		} else {
			return this.core[0].getAttribute('ez-id');
		}
	}
	className(className) {
		if (className) {
			this.core.forEach(el => el.setAttribute('class', className));
			return this;
		} else {
			return this.core[0].getAttribute('className');
		}
	}
	text(text) {
		if (text) {
			this.core.forEach(el => el.innerText = text);
			return this;
		} else {
			return this.core[0].innerText;
		}
	}
	html(text) {
		if (text) {
			this.core.forEach(el => el.innerHTML = text);
			return this;
		} else {
			return this.core[0].innerHTML;
		}
	}
	attr(prop, val) {
		if (val) {
			this.core.forEach(el => el.setAttribute(prop, val));
			return this;
		} else {
			return this.core[0].getAttribute(prop);
		}
	}

	/* Placement */
	appendTo(selector) {
		ez.select(selector, true).forEach(el => el.appendChild(this.core[0]));
	}
	prependTo(selector) {
		ez.select(selector, true).forEach(el => el.prependChild(this.core[0]));
	}
	addBefore(selector) {
		ez.select(selector, true).forEach(el => el.parentElement.insertBefore(this.core[0], el));
	}
	addAfter(selector) {
		ez.select(selector, true).forEach(el => el.parentElement.insertAfter(this.core[0], el));
	}
	raw() { // Convert EZComponent to HTML and return
		return this.core[0].outerHTML;
	}
}

function rawToElement(raw) {
	let div = document.createElement('div');
	div.innerHTML = raw.trim();
	return div.firstChild;
}

function objToElement(obj) {
	obj = copy(obj);
	let elem = document.createElement(obj.tag);
	elem.innerHTML = obj.html;
	for(let prop in obj.prop) {
		elem.setAttribute(prop, obj.prop[prop]);
	}
	return elem;
}

function objToSelector(obj) {
	let selector = '';
	if (obj.tag) selector += obj.tag;
	if (obj.prop) {
		if (obj.prop.id) {
			selector += `#${obj.prop.id}`;
			delete obj.prop.id;
		}
		if (obj.prop.className) {
			selector += `.${obj.prop.className}`;
			delete obj.prop.className;
		}
		for (let prop in obj.prop) {
			selector += `${prop}="${obj.prop[prop]}"`;
		}
	}
	return selector;
}

function copy(obj) {
	return JSON.parse(JSON.stringify(obj));
}

// 	return {
// 		create: function (data) { // Generates new EZComponent
// 			return new EZComponent(data);
// 		},
// 		select: function (selector) {
// 			if (selector instanceof EZComponent) {
// 				// select via EZComponent class
// 			} else {
// 				return document.querySelectorAll(selector);
// 			}
// 		}
// 	};
// })();

const ez = {
	create: function (data) { // Generates new EZComponent
		return new EZComponent(data);
	},
	select: function (selector, raw) {
		let selection;
		let obj;
		if (selector instanceof EZComponent) {
			selection = document.querySelectorAll(`[ez-id="${selector.attr('ez-id')}"]`);
		} else if (typeof selector === 'object') {
			selection = document.querySelectorAll(objToSelector(selector));
		} else {
			selection = document.querySelectorAll(selector);
		}
		selection = Array.from(selection || []);
		if (raw) {
			return selection;
		} else {
			obj = new EZComponent(selection.shift().outerHTML);
			selection.map(el => obj.__create__(el.outerHTML));
			return obj;
		}
	}
};