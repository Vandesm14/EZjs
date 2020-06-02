const ez = (function () {
	const virtual = [];

	class Template {
		constructor() {
			let proto = Object.getPrototypeOf(this);
			let constructor = proto.constructor;
			let item = virtual.find(el => el.name === constructor.name) || (function () {
				virtual.push({
					name: constructor.name
				});
				return virtual[virtual.length - 1];
			})();
			item.ezid = item.ezid || gen();
			let element = ez.create('p').ezid(item.ezid); // dummy element
			for (let prop of Object.getOwnPropertyNames(proto)) {
				if (prop !== 'constructor') element[prop] = proto[prop];
			}
			return element;
		}
		render() {
			throw new Error('Render function is not set');
		}
	}

	class EZComponent { // EZComponent class
		constructor(data) { // Constructor
			this.core = [];
			this.state = {};
			this.__selected__ = false;
			this.__create__(data);
		}

		__create__(data) {
			this.core.push(data);
		}

		get render() {
			return this.main.render || function () {
				throw new Error('Render function is not set');
			};
		}

		set render(func) {
			this.main.render = func;
		}

		/* Attribute */
		tag() {
			return this.main.tagName.toLowerCase();
		}
		id(id) {
			if (id) {
				this.main.id = id;
				return this;
			} else {
				return this.main.id;
			}
		}
		ezid(id) {
			if (id) {
				forEach(this, el => el.setAttribute('ez-id', id));
				return this;
			} else {
				return this.main.getAttribute('ez-id');
			}
		}
		ezuid(id) { // TODO: If selected, set ezuid, else select by ezuid
			if (this.__selected__) {
				if (id) {
					this.main.setAttribute('ezuid', id);
					return this;
				} else {
					return this.main.getAttribute('ez-uid');
				}

			} else {
				if (id) {
					return ez.select(`[ez-uid="${id}"]`);
				} else {
					return ez.select(this).main.getAttribute('ez-uid');
				}
			}
		}
		className(className) {
			if (className) {
				forEach(this, el => el.setAttribute('class', className));
				return this;
			} else {
				return this.main.getAttribute('class');
			}
		}
		html(text) {
			if (text) {
				forEach(this, el => el.innerHTML = text);
				return this;
			} else {
				return this.main.innerHTML;
			}
		}
		text(text) {
			if (text) {
				forEach(this, el => el.innerText = text);
				return this;
			} else {
				return this.main.innerText;
			}
		}
		raw(text, unlink) {
			if (text) {
				forEach(this, (el, i, comp) => {
					let uid = el.getAttribute('ez-uid');
					let element = ez.create(text).ezid(this.main.getAttribute('ez-id')).main;
					if (document.body.contains(el)) element.setAttribute('ez-uid', uid);
					if (unlink && document.body.contains(el)) {
						element = ez.create(text).main;
						element.removeAttribute('ez-id');
					}
					element.render = el.render;
					if (document.body.contains(el)) {
						el.replaceWith(element);
					} else {
						comp[i] = element;
					}
				});
				return this;
			} else {
				return this.main.outerHTML;
			}
		}
		simple() {
			let tag = this.main.tagName.toLowerCase();
			let text = this.main.innerHTML;
			if (this.main.outerHTML.indexOf('/') !== -1) {
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
				return this.main.getAttribute(prop);
			}
		}
		hasAttr(prop) {
			return !!this.main.getAttribute(prop);
		}
		removeAttr(prop) {
			forEach(this, el => el.removeAttribute(prop));
			return this;
		}
		data(prop, val) {
			if (val) {
				forEach(this, el => el.dataset[prop] = val);
				return this;
			} else {
				return this.main.dataset[prop];
			}
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
			return this.main.classList.contains(className);
		}

		/* DOM */
		index() {
			if (this.__selected__) {
				return this.main.parentElement.childArray.indexOf(this.main);
			} else {
				return ez.select(this).main.parentElement.childArray.indexOf(ez.select(this).main);
			}
		}
		eq(index) {
			if (this.__selected__) {
				return ez.create(this.core[index]).selected(true);
			} else {
				return ez.create(ez.select(this).core[index]).selected(true);
			}
		}
		parent() {
			if (this.__selected__) {
				return ez.create(this.main.parentElement).selected(true);
			} else {
				return ez.create(ez.select(this).main.parentElement);
			}
		}
		children(selector) {
			selector = select(selector);
			if (selector) {
				if (this.__selected__) {
					return ez.create(selectAll(selector, this.main)).selected(true);
				} else {
					return ez.create(selectAll(selector, ez.select(this).main)).selected(true);
				}
			} else {
				if (this.__selected__) {
					return ez.create(this.main.childArray).selected(true);
				} else {
					return ez.create(ez.select(this).main.childArray).selected(true);
				}
			}
		}
		prev() {
			if (this.__selected__) {
				return ez.create(this.main.prev).selected(true);
			} else {
				return ez.create(ez.select(this).main.prev).selected(true);
			}
		}
		next() {
			if (this.__selected__) {
				return ez.create(this.main.next).selected(true);
			} else {
				return ez.create(ez.select(this).main.next).selected(true);
			}
		}
		first() {
			if (this.__selected__) {
				return ez.create(this.main).selected(true);
			} else {
				return ez.create(ez.select(this).main).selected(true);
			}
		}
		last() {
			if (this.__selected__) {
				return ez.create(this.core[this.core.length - 1]).selected(true);
			} else {
				return ez.create(ez.select(this).core[ez.select(this).core.length - 1]).selected(true);
			}
		}
		firstChild() {
			if (this.__selected__) {
				return ez.create(this.main.children[0]).selected(true);
			} else {
				return ez.create(ez.select(this).main.children[0]).selected(true);
			}
		}
		lastChild() {
			if (this.__selected__) {
				return ez.create(this.main.children[this.main.children.length - 1]).selected(true);
			} else {
				return ez.create(ez.select(this).main.children[ez.select(this).main.children.length - 1]).selected(true);
			}
		}
		find(selector) {
			selector = select(selector);
			if (this.__selected__) {
				return ez.create(this.main.childArray.filter(el => el.matches(selector))).selected(true);
			} else {
				return ez.create(ez.select(this).main.childArray.filter(el => el.matches(selector))).selected(true);
			}
		}
		closest(selector) {
			selector = select(selector);
			if (this.__selected__) {
				return ez.create(this.main.closest(selector)).selected(true);
			} else {
				return ez.create(ez.select(this).main.closest(selector)).selected(true);
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
		on() {
			forEach(this, el => {
				el.addEventListener(...arguments);
			});
			return () => forEach(this, el => el.removeEventListener(...arguments));
		}

		/* Placement */
		prependTo(selector, destroy) {
			if (destroy && this.__selected__) {
				ez.select(selector).main.prependChild(this.main);
			} else {
				ez.select(selector).core.forEach(el => el.prependChild(unique(this.main)));
			}
			return this;
		}
		appendTo(selector, destroy) {
			if (destroy && this.__selected__) {
				ez.select(selector).main.appendChild(this.main);
			} else {
				ez.select(selector).core.forEach(el => el.appendChild(unique(this.main)));
			}
			return this;
		}
		addBefore(selector, destroy) {
			if (destroy && this.__selected__) {
				ez.select(selector).main.parentElement.insertBefore(this.main, ez.select(selector).main);
			} else {
				ez.select(selector).core.forEach(el => el.parentElement.insertBefore(unique(this.main), el));
			}
			return this;
		}
		addAfter(selector, destroy) {
			if (destroy && this.__selected__) {
				ez.select(selector).main.parentElement.insertBefore(this.main, ez.select(selector).main.nextSibling);
			} else {
				ez.select(selector).core.forEach(el => el.parentElement.insertBefore(unique(this.main), el.nextSibling));
			}
			return this;
		}
		insert(selector, index, destroy) {
			if (!index) index = 0;
			if (destroy && this.__selected__) {
				ez.select(selector).core.forEach(el => {
					if (index === -1 || index > el.childArray.length) {
						el.appendChild(this.main, el);
					} else {
						el.insertBefore(this.main, el.childArray[index]);
					}
				});
			} else {
				ez.select(selector).core.forEach(el => {
					if (index === -1 || index > el.childArray.length) {
						el.appendChild(unique(this.main), el);
					} else {
						el.insertBefore(unique(this.main), el.childArray[index]);
					}
				});
			}
			return this;
		}
		moveUp() {
			if (this.__selected__) {
				if (this.main.prev && this.main.prev.parentElement) {
					this.main.prev.parentElement.insertBefore(this.main, this.main.prev);
				}
			} else {
				if (ez.select(this).main.prev && ez.select(this).main.prev.parentElement) {
					ez.select(this).main.prev.parentElement.insertBefore(ez.select(this).main, ez.select(this).main.prev);
				}
			}
			return this;
		}
		moveDown() {
			if (this.__selected__) {
				if (this.main.next && this.main.next.parentElement) {
					this.main.next.parentElement.insertBefore(this.main, this.main.next.nextSibling);
				}
			} else {
				if (ez.select(this).main.next && ez.select(this).main.next.parentElement) {
					ez.select(this).main.next.parentElement.insertBefore(ez.select(this).main, ez.select(this).main.next.nextSibling);
				}
			}
			return this;
		}
		remove() {
			if (this.__selected__) {
				this.core.forEach(el => el.remove());
			} else {
				ez.select(this).core.forEach(el => el.remove());
			}
			return this;
		}

		/* Component */
		link(target, reset) {
			if (this.__selected__) throw new Error('Cannot link a target if selected');
			if (target instanceof EZComponent) {
				target.main = this.main;
				forEach(target, el => el.setAttribute('ez-id', this.main.getAttribute('ez-id')));
			} else if (Object.getPrototypeOf(target) instanceof Template) {

			} else {
				target = ez.select(target);
				if (reset) target.core.forEach(el => el.replaceWith(this.main.cloneNode()));
				forEach(target, el => el.setAttribute('ez-id', this.main.getAttribute('ez-id')));
				target.core.forEach(el => el.setAttribute('ez-uid', gen()));
			}
			return this;
		}
		unlink(target) {

		}
		linkTo(target) {
			if (!target || !(target instanceof EZComponent)) throw new Error('Component is not an EZComponent');
			if (target.__selected__) throw new Error('Cannot link to a selected component');
			if (this.__selected__) throw new Error('Cannot link to a component if selected');
			this.main = target.main;
			forEach(this, el => el.setAttribute('ez-id', target.main.getAttribute('ez-id')));
			return target;
		}
		clone() {
			return ez.create(this, true);
		}
		update(obj) {
			if (this.__selected__) {
				this.core.forEach(el => {
					let uid = el.getAttribute('ez-uid');
					let element = ez.create(el.render(obj || {}, this.state)).ezid(this.main.getAttribute('ez-id')).main;
					element.setAttribute('ez-uid', uid);
					element.render = el.render;
					el.replaceWith(element);
				});
			} else {
				forEach(this, (el, i, comp) => {
					let uid = el.getAttribute('ez-uid');
					let element = ez.create(this.render(obj || {}, this.state)).ezid(this.main.getAttribute('ez-id')).main;
					if (document.body.contains(el)) element.setAttribute('ez-uid', uid);
					element.render = this.render;
					if (document.body.contains(el)) {
						el.replaceWith(element);
					} else {
						comp[i] = element;
					}
				});
			}
			return this;
		}
		make() {
			return ez.create(this.render(...arguments)).ezid(this.main.getAttribute('ez-id')).setRender(this.render);
		}
		setRender(func) {
			forEach(this, el => el.render = func);
			return this;
		}
		selected(val) {
			if (val === true || val === false) {
				this.__selected__ = !!val;
				return this;
			} else {
				return this.__selected__;
			}
		}
		select() {
			if (this.__selected__) {
				return this;
			} else {
				return ez.select(this);
			}
		}
	}

	function rawToElement(raw) {
		let div = new DOMParser().parseFromString(raw, "text/html").body;
		return div.firstChild;
	}

	function objToSelector(obj) {
		let selector = '';
		if (obj.tag) {
			selector = obj.tag;
			delete obj.tag;
		}
		for (let prop of Object.keys(obj)) {
			selector += `[${prop}="${obj[prop]}"]`;
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
		if (!component.__selected__) ez.select(component).core.forEach(function (el, i, component) {
			func(el, i, component)
		});
		component.core.forEach(function (el, i, component) {
			func(el, i, component)
		});
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
		return ((+new Date()) * Math.round(Math.random() * Math.pow(10, 10))).toString(36);
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
			data = data.main;
			if (clone) { // If clone is true: do not clone component
				data = data.cloneNode(true);
			}
			element = true;
		} else if (data instanceof HTMLElement && document.body.contains(data)) {
			if (clone) { // If clone is true: do not clone element
				data.setAttribute('ez-id', id);
				data.setAttribute('ez-uid', gen());
				data = data.cloneNode(true);
				data.removeAttribute('ez-uid');
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
	Object.defineProperty(HTMLElement.prototype, 'prev', {
		get: function () {
			return this.previousElementSibling;
		}
	});

	Object.defineProperty(HTMLElement.prototype, 'next', {
		get: function () {
			return this.nextElementSibling;
		}
	});

	Object.defineProperty(HTMLElement.prototype, 'childArray', {
		get: function () {
			return Array.from(this.children);
		}
	});

	Object.defineProperty(Array.prototype, 'last', {
		get: function () {
			return this[this.length - 1];
		},
		set: function (data) {
			this[this.length - 1] = data;
		}
	});

	Object.defineProperty(EZComponent.prototype, 'main', {
		get: function () {
			return this.core[0];
		},
		set: function (data) {
			this.core[0] = data;
		}
	});

	let obj = {
		Template,
		create: function (data, prop, text) { // Generates new EZComponent
			let obj;
			if (typeof data === 'string' && typeof prop === 'object' && typeof text === 'string') { // react syntax
				data = reactToElement(data, prop, text || '');
				obj = new EZComponent(create(data));
			} else if (prop === true) { // clone element
				obj = new EZComponent(create(data, true));
			} else if (Array.isArray(data)) {
				obj = new EZComponent(create('p')); // dummy element
				if (prop === true) obj.__selected__ = true;
				obj.core = [];
				for (let i in data) {
					obj.core.push(ez.create(data[i]).main);
				}
			} else if (data instanceof HTMLElement) {
				obj = new EZComponent(create(data, !!prop));
				obj.__selected__ = true;
			} else {
				obj = new EZComponent(create(data));
			}
			return obj;
		},
		select: function (selector) {
			let obj;
			let selection;
			if (selector instanceof HTMLElement) {
				selection = [selector];
			} else {
				selection = selectAll(select(selector));
			}
			obj = new EZComponent(create('p')); // dummy element
			obj.__selected__ = true;
			obj.core = selection; // insert actual selection
			return obj;
		},
		make: function (comp) { // generates a component based on its render function
			if (comp instanceof EZComponent) {
				return comp.make(Array.from(arguments).slice(1)).setRender(comp.render);
			} else if (comp.prototype instanceof Template) {
				return new comp();
			}
		},
		comp: function (base, func) { // generates a component with a render function
			if (typeof func !== 'function') throw new Error('Func must be a function');
			let component = ez.create(base);
			component.setRender(func);
			return component;
		},
		gen: function () {
			return ((+new Date()) * Math.round(Math.random() * Math.pow(10, 10))).toString(36);
		}
	};

	return obj;
})();