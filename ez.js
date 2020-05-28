let DOM;

class EZComponent { // EZComponent class
	constructor(data) { // Constructor
		this.core = [];
		this.__create__(data);
		this.__selected__ = false;
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
		data.setAttribute('ez-id', gen());
		this.core.push(data);
	}

	/* Properties */
	tag(tag) {
		// FIXME: Auto-Regenerate element with new tag if live
		if (tag) {
			console.warn('Setting tag is not yet supported')
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
	addClass(className) {
		this.core[0].classList.add('className');
		return this;
	}
	removeClass(className) {
		this.core[0].classList.remove('className');
		return this;
	}
	toggleClass(className) {
		this.core[0].classList.toggle(className)
		return this;
	}
	hasClass(className) {
		return this.core[0].classList.contains(className);
	}

	text(text) {
		if (text) {
			forEach(this, el => el.innerText = text);
			return this;
		} else {
			return this.core[0].innerText;
		}
	}
	html(text) {
		if (text) {
			forEach(this, el => el.innerHTML = text);
			return this;
		} else {
			return this.core[0].innerHTML;
		}
	}

	attr(prop, val) {
		if (val) {
			forEach(this, el => el.setAttribute(prop, val));
			return this;
		} else {
			return this.core[0].getAttribute(prop);
		}
	}
	hasAttr(prop) {
		return !!this.core[0].getAttribute(prop);
	}

	/* --------- Selection Only Methods --------- */
	index(index) {
		if (index) {
			return this.core[index];
		} else {
			if (!this.__selected__) throw new Error('Cannot get "index" of a component');
			return this.core[0].parentElement.childArray.indexOf(this.core[0]);
		}
	}

	/* Placement */
	appendTo(selector) {
		ez.select(selector).core.forEach(el => el.appendChild(unique(this.core[0])));
	}
	prependTo(selector) {
		ez.select(selector).core.forEach(el => el.prependChild(unique(this.core[0])));
	}
	addBefore(selector) {
		ez.select(selector).core.forEach(el => el.parentElement.insertBefore(unique(this.core[0]), el));
	}
	addAfter(selector) {
		ez.select(selector).core.forEach(el => el.parentElement.insertAfter(unique(this.core[0]), el));
	}

	/* Utility */
	raw() { // Convert EZComponent to HTML and return
		return this.core[0].outerHTML;
	}
}

function rawToElement(raw) {
	let div = new DOMParser().parseFromString(raw, "text/html").body;
	return div.firstChild;
}

function objToElement(obj) {
	obj = copy(obj);
	let elem = document.createElement(obj.tag);
	elem.innerHTML = obj.html;
	for (let prop in obj.prop) {
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

function selectAll(selector) {
	let list = [];
	document.querySelectorAll(selector).forEach(el => el.setAttribute('ez-select', gen()));
	document.querySelectorAll(selector).forEach(el => list.push(document.querySelector(`[ez-select="${el.getAttribute('ez-select')}"]`)));
	document.querySelectorAll(`[ez-select]`).forEach(el => el.removeAttribute('ez-select'));
	return list;
}

function forEach(component, func) {
	component.core.forEach(func);
	ez.select(component).core.forEach(func);
}

function copy(obj) {
	return JSON.parse(JSON.stringify(obj));
}

function unique(element) {
	element = rawToElement(element.outerHTML);
	element.setAttribute('ez-uid', gen());
	return element;
}

function gen() {
	return ((+new Date()) * Math.round(Math.random() * 10 ** 10)).toString(36);
}

const ez = {
	create: function (data) { // Generates new EZComponent
		return new EZComponent(data);
	},
	select: function (selector, raw) {
		let selection;
		let obj;
		if (selector instanceof EZComponent) {
			selection = selectAll(`[ez-id="${selector.attr('ez-id')}"]`);
		} else if (typeof selector === 'object') {
			selection = selectAll(objToSelector(selector));
		} else {
			selection = selectAll(selector);
		}
		if (raw) {
			return selection;
		} else {
			obj = new EZComponent('p'); // dummy element
			obj.__selected__ = true;
			obj.core = selection; // insert actual selection
			return obj;
		}
	}
};

Object.defineProperty(HTMLElement.prototype, "childArray", {
	get: function () {
		return Array.from(this.children);
	}
});