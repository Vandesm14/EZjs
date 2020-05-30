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
	empty() {
		forEach(this, el => el.innerText = '');
		return this;
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
			return ez.create(this.first.parentElement).selected(true);
		} else {
			return ez.create(ez.select(this).first.parentElement);
		}
	}
	children(selector) {
		selector = select(selector);
		if (selector) {
			if (this.__selected__) {
				return ez.create(selectAll(selector, this.first)).selected(true);
			} else {
				return ez.create(selectAll(selector, ez.select(this).first)).selected(true);
			}
		} else {
			if (this.__selected__) {
				return ez.create(this.first.childArray).selected(true);
			} else {
				return ez.create(ez.select(this).first.childArray).selected(true);
			}
		}
	}
	find(selector) {
		selector = select(selector);
		if (this.__selected__) {
			return ez.create(this.first.childArray.filter(el => el.matches(selector))).selected(true);
		} else {
			return ez.create(ez.select(this).first.childArray.filter(el => el.matches(selector))).selected(true);
		}
	}
	closest(selector) {
		selector = select(selector);
		if (this.__selected__) {
			return ez.create(this.first.closest(selector)).selected(true);
		} else {
			return ez.create(ez.select(this).first.closest(selector)).selected(true);
		}
	}
	filter(selector) {
		selector = select(selector);
		if (this.__selected__) {
			return ez.create(this.core.filter(el => el.matches(selector))).selected(true);
		} else {
			return ez.create(ez.select(this).core.filter(el => el.matches(selector))).selected(true);
		}
	}
	not(selector) {
		selector = select(selector);
		if (this.__selected__) {
			return ez.create(this.core.filter(el => !el.matches(selector))).selected(true);
		} else {
			return ez.create(ez.select(this).core.filter(el => !el.matches(selector))).selected(true);
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
	insert(selector, index) {
		ez.select(selector).core.forEach(el => {
			if (index === -1 || index > el.childArray.length) {
				el.appendChild(unique(this.first), el);
			} else {
				el.insertBefore(unique(this.first), el.childArray[index]);
			}
		});
		return this;
	}
	remove() {
		ez.select(selector).core.forEach(el => el.remove());
		return this;
	}

	/* Component */
	link(target) {
		if (target instanceof HTMLElement) {
			target = new EZComponent(create(target));
		} else if (target instanceof EZComponent) {
			// Do nothing
		} else {
			target = ez.select(target);
		}
		forEach(target, el => el.setAttribute('ez-id', this.first.getAttribute('ez-id')));
		return this;
	}
	linkTo(target) {
		if (!target || !(target instanceof EZComponent)) throw new Error('Component is not an EZComponent');
		forEach(this, el => el.setAttribute('ez-id', target.first.getAttribute('ez-id')));
		return target;
	}
	clone(selected) {
		let obj = new EZComponent(create('p', true)); // dummy element
		let id = gen();
		forEach(obj, el => el.cloneNode(true));
		if (selected) obj.__selected__ = true;
		return obj;
	}
	selected(val) {
		if (val) {
			this.__selected__ = !!val;
			return this;
		} else {
			return this.__selected__;
		}
	}
}

function rawToElement(raw) {
	let div = new DOMParser().parseFromString(raw, "text/html").body;
	return div.firstChild;
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

function selectAll(selector, element = document) {
	let list = [];
	let className = 'ez-select-' + gen();
	element.querySelectorAll(selector).forEach(el => el.classList.add(className));
	element.querySelectorAll(selector).forEach(el => {
		list.push(element.querySelector(`.${className}`));
		el.classList.remove(className);
	});
	return list;
}

function forEach(component, func) {
	if (!component.__selected__) ez.select(component).core.forEach(func);
	component.core.forEach(func);
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
	return ((+new Date()) * Math.round(Math.random() * Math.pow(10,10))).toString(36);
}

function reactToElement(data, prop, text) {
	if (prop) {
		let tag = data;
		data = copy(prop);
		data.tag = tag;
		data.text = text;
	} else {
		data = copy(data);
	}
	if (!data.tag) console.trace(data);
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

function objToElement(obj) {
	obj = copy(obj);
	let elem = document.createElement(obj.tag);
	elem.innerHTML = obj.html;
	for (let prop in obj.prop) {
		elem.setAttribute(prop, obj.prop[prop]);
	}
	return elem;
}

function create(data, clone) {
	let element = false;
	let id = gen();
	if (data instanceof EZComponent) {
		data = data.first;
		if (clone) { // If clone is true: do not clone component
			data = data.cloneNode(true);
		}
		element = true;
	} else if (data instanceof HTMLElement && document.body.contains(data)) {
		if (clone) { // If clone is true: do not clone element
			data.setAttribute('ez-id', id);
			data = data.cloneNode(true);
		}
		element = true;
	} else if (data instanceof HTMLElement) {
		// Do nothing
	} else if (typeof data === 'object') {
		data = objToElement(data);
	} else if (typeof data === 'string') {
		if (data.startsWith('<')) {
			data = rawToElement(data);
		} else {
			data = document.createElement(data);
		}
	}
	try {
		if (clone) {
			data.setAttribute('ez-id', id);
		} else {
			if (!data.getAttribute('ez-id') && !element) data.setAttribute('ez-id', id);
		}
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
		let obj;
		if (typeof data === 'string' && typeof prop === 'object' && typeof text === 'string') {
			data = reactToElement(data, prop, text || '');
			obj = new EZComponent(create(data));
		} else if (prop === true) {
			obj = new EZComponent(create(data, true));
		} else if (Array.isArray(data)) {
			obj = new EZComponent(create('p')); // dummy element
			if (prop === true) obj.__selected__ = true;
			obj.core = [];
			for (let i in data) {
				obj.core.push(create(data[i]));
			}
		} else {
			obj = new EZComponent(create(data));
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