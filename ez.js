class EZComponent { // EZComponent class
	constructor(data) { // Constructor
		this.core = [];
		this.__selected__ = false;
		this.__create__(data);
	}

	__create__(data) {
		this.core.push(data);
	}

	/* Attribute */
	tag() {
		return this.first.tagName.toLowerCase();
	}
	id(id) {
		if (id) {
			this.core.first.id = id;
			return this;
		} else {
			return this.first.id;
		}
	}
	ezid(id) {
		if (id) {
			forEach(this, el => el.setAttribute('ez-id', id));
			return this;
		} else {
			return this.first.getAttribute('ez-id');
		}
	}
	ezuid() {
		return ez.select(this).first.getAttribute('ez-uid');
	}
	className(className) {
		if (className) {
			forEach(this, el => el.setAttribute('class', className));
			return this;
		} else {
			return this.first.getAttribute('className');
		}
	}
	html(text) {
		if (text) {
			forEach(this, el => el.innerHTML = text);
			return this;
		} else {
			return this.first.innerHTML;
		}
	}
	text(text) {
		if (text) {
			forEach(this, el => el.innerText = text);
			return this;
		} else {
			return this.first.innerText;
		}
	}
	raw() {
		return this.first.outerHTML;
	}
	simple() {
		let tag = this.first.tagName.toLowerCase();
		let text = this.first.innerHTML;
		if (this.first.outerHTML.indexOf('/') !== -1) {
			return `<${tag}>${text}</${tag}>`;
		} else {
			return `<${tag}/>`;
		}
	}
	attr(prop, val) {
		if (val) {
			forEach(this, el => el.setAttribute(prop, val));
			return this;
		} else {
			return this.first.getAttribute(prop);
		}
	}
	hasAttr(prop) {
		return !!this.first.getAttribute(prop);
	}

	/* Class */
	addClass(className) {
		forEach(this, el => el.classList.add(className));
		return this;
	}
	removeClass(className) {
		forEach(this, el => el.classList.remove(className));
		return this;
	}
	toggleClass(className) {
		forEach(this, el => el.classList.toggle(className));
		return this;
	}
	hasClass(className) {
		return this.first.classList.contains(className);
	}

	/* DOM */
	index() {
		if (this.__selected__) {
			return this.first.parentElement.childArray.indexOf(this.first);
		} else {
			return ez.select(this).first.parentElement.childArray.indexOf(ez.select(this).first);
		}
	}
	parent() {
		if (this.__selected__) {
			return ez.copy(this.first.parentElement);
		} else {
			return ez.copy(ez.select(this).first.parentElement);
		}
	}
	children(selector) {
		selector = select(selector);
		if (selector) {
			if (this.__selected__) {
				return ez.copy(selectAll(selector, this.first), true);
			} else {
				return ez.copy(selectAll(selector, ez.select(this).first), true);
			}
		} else {
			if (this.__selected__) {
				return ez.copy(this.first.childArray, true);
			} else {
				return ez.copy(ez.select(this).first.childArray, true);
			}
		}
	}
	find(selector) {
		selector = select(selector);
		if (this.__selected__) {
			return ez.copy(this.first.childArray.filter(el => el.matches(selector)), true);
		} else {
			return ez.copy(ez.select(this).first.childArray.filter(el => el.matches(selector)), true);
		}
	}
	closest(selector) {
		selector = select(selector);
		if (this.__selected__) {
			return ez.copy(this.first.closest(selector), true);
		} else {
			return ez.copy(ez.select(this).first.closest(selector), true);
		}
	}
	filter(selector) {
		selector = select(selector);
		if (this.__selected__) {
			return ez.copy(this.core.filter(el => el.matches(selector)), true);
		} else {
			return ez.copy(ez.select(this).core.filter(el => el.matches(selector)), true);
		}
	}
	not(selector) {
		selector = select(selector);
		if (this.__selected__) {
			return ez.copy(this.core.filter(el => !el.matches(selector)), true);
		} else {
			return ez.copy(ez.select(this).core.filter(el => !el.matches(selector)), true);
		}
	}
	every(selector) {
		selector = select(selector);
		if (this.__selected__) {
			return this.core.every(el => el.matches(selector));
		} else {
			return ez.select(this).core.every(el => el.matches(selector));
		}
	}

	/* Function */
	each(func) {
		if (this.__selected__) {
			this.core.forEach(func);
		} else {
			ez.select(this).core.forEach(func);
		}
		return this;
	}

	/* Placement */
	prependTo(selector) {
		ez.select(selector).core.forEach(el => el.prependChild(unique(this.first)));
		return this;
	}
	appendTo(selector) {
		ez.select(selector).core.forEach(el => el.appendChild(unique(this.first)));
		return this;
	}
	addBefore(selector) {
		ez.select(selector).core.forEach(el => el.parentElement.insertBefore(unique(this.first), el));
		return this;
	}
	addAfter(selector) {
		ez.select(selector).core.forEach(el => el.parentElement.insertAfter(unique(this.first), el));
		return this;
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

function selectAll(selector, element) {
	let list = [];
	let className = 'ez-select-' + gen();
	// TODO: Use bind to make this shorter
	if (element) {
		element.querySelectorAll(selector).forEach(el => el.classList.add(className));
		element.querySelectorAll(selector).forEach(el => {
			list.push(element.querySelector(`.${className}`));
			el.classList.remove(className);
		});
	} else {
		document.querySelectorAll(selector).forEach(el => el.classList.add(className));
		document.querySelectorAll(selector).forEach(el => {
			list.push(document.querySelector(`.${className}`));
			el.classList.remove(className);
		});
	}
	return list;
}

function forEach(component, func) {
	component.core.forEach(func);
	if (component.__selected__) return;
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

function create(data, prop, text) {
	let obj = {
		tag: '',
		prop: {}
	};

	function fromObject(data, prop, text) {
		if (prop) {
			let tag = data;
			data = copy(prop);
			data.tag = tag;
			data.text = text;
		} else {
			data = copy(data);
		}
		if (!data.tag) throw new Error('Tag is not present in EZ Component declaration');
		let tag = data.tag;
		let html = data.html || data.text && data.text.replace(/</g, '&lt;').replace(/>/g, '&gt;') || '';
		delete data.tag;
		if (data.hasOwnProperty('html')) delete data.html;
		if (data.hasOwnProperty('text')) delete data.text;
		obj = {
			tag,
			html,
			prop: data
		};
		return objToElement(obj);
	}

	if (data instanceof EZComponent) {
		data = data.core[0];
	} else if (data instanceof HTMLElement) {
		if (!prop) { // If prop is true: do not clone element
			data = data.cloneNode();
		}
	} else if (typeof data === 'object') {
		data = fromObject(data);
	} else if (typeof data === 'string') {
		if (data.startsWith('<')) {
			data = rawToElement(data);
		} else {
			if (typeof prop === 'object') {
				data = fromObject(data, prop, text || '');
			} else {
				data = document.createElement(data);
			}
		}
	}
	try {
		if (!data.getAttribute('ez-id') && !(data instanceof HTMLElement && prop && typeof prop !== 'object')) data.setAttribute('ez-id', gen());
	} catch (error) {
		throw new Error(`Element "${data.tagName || 'unkown'}" cannot be made into an EZComponent`);
	}
	return data;
}

function select(data) {
	if (data instanceof EZComponent) {
		return `[ez-id="${data.attr('ez-id')}"]`;
	} else if (typeof data === 'object') {
		return objToSelector(data);
	} else {
		return data;
	}
}

const ez = {
	create: function (data, prop, text) { // Generates new EZComponent
		if (typeof prop === 'object') {
			return new EZComponent(create(data, prop, text));
		} else if (prop) {
			let comp = new EZComponent(create(data));
			comp.__selected__ = true;
			return comp;
		} else if (Array.isArray(data)) {
			obj = new EZComponent(create(data, true)); // dummy element
			if (prop === true) obj.__selected__ = true;
			obj.core = [];
			for (let i in data) {
				obj.core.push(create(data));
			}
		} else {
			return new EZComponent(create(data));
		}
	},
	copy: function (data, selected) {
		if (Array.isArray(data)) {
			obj = new EZComponent(create('p', true)); // dummy element
			if (selected === true) obj.__selected__ = true;
			obj.core = [];
			for (let i in data) {
				if (data[i] instanceof HTMLElement) obj.core.push(data[i]);
			}
		} else {
			obj = new EZComponent(create(data, true)); // dummy element
			obj.__selected__ = true;
		}
		return obj;
	},
	select: function (selector, raw) {
		let obj;
		let selection = selectAll(select(selector));
		if (raw) {
			return selection;
		} else {
			obj = new EZComponent(create('p')); // dummy element
			obj.__selected__ = true;
			obj.core = selection; // insert actual selection
			return obj;
		}
	}
};

Object.defineProperty(HTMLElement.prototype, 'childArray', {
	get: function () {
		return Array.from(this.children);
	}
});

Object.defineProperty(EZComponent.prototype, 'first', {
	get: function () {
		return this.core[0];
	},
	set: function (data) {}
});