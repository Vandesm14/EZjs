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
		this.core = {
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
			this.core = {
				tag,
				html,
				prop: data
			};
		} else if (typeof data === 'string') {
			if (data.startsWith('<')) {
				this.core = rawToObj(data);
			} else {
				this.core.tag = data;
			}
		}
	}

	/* Properties */
	tag(tag) {
		if (tag) {
			this.core.tag = tag;
			return this;
		} else {
			return this.core.tag;
		}
	}
	id(id) {
		if (id) {
			this.core.prop.id = id;
			return this;
		} else {
			return this.core.prop.id;
		}
	}
	className(className) {
		if (className) {
			this.core.prop.className = className;
			return this;
		} else {
			return this.core.prop.className;
		}
	}
	text(text) {
		if (text) {
			this.core.html = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
			return this;
		} else {
			return this.core.html;
		}
	}
	html(text) {
		if (text) {
			this.core.html = text;
			return this;
		} else {
			return this.core.html;
		}
	}
	attr(prop, val) {
		if (val) {
			this.core.prop[prop] = val;
			return this;
		} else {
			return this.core.prop[prop];
		}
	}

	/* Placement */
	addTo(selector) {
		document.querySelector(selector).insertAdjacentHTML('beforeend', this.raw());
	}
	addToStart(selector) {
		document.querySelector(selector).insertAdjacentHTML('afterbegin', this.raw());
	}
	addBefore(selector) {
		document.querySelector(selector).insertAdjacentHTML('beforebegin', this.raw());
	}
	addAfter(selector) {
		document.querySelector(selector).insertAdjacentHTML('afterend', this.raw());
	}
	raw() { // Convert EZComponent to HTML and return
		return objToRaw(this.core);
	}
}

function rawToObj(raw) {
	let properties = raw.match(/\s.+?\s*=\s*".+?"/g) || [];
	let html = raw.match(/>.+</g);
	let tag = raw.match(/<\w+/g);
	if (!tag) throw new Error('Tag is not present in raw html');
	html = html && html[0];
	tag = tag && tag[0];
	let obj = {
		tag: tag.slice(1),
		html: html && html.slice(1).slice(0, -1),
		prop: {}
	};
	properties.map(el => {
		return {
			prop: el.match(/.+=/g)[0].trim().slice(0, -1),
			val: el.match(/".+"/g)[0].trim().slice(1).slice(0, -1)
		};
	}).map(el => obj.prop[el.prop] = el.val);
	return obj;
}

function objToRaw(obj) {
	obj = copy(obj);
	let tag = obj.tag;
	let html = obj.html;
	let properties = obj.prop;
	let raw = `<${tag}`;
	for (let prop in properties) {
		if (prop[properties] === true) {
			raw += ` ${prop}`;
		} else {
			raw += ` ${prop}="${properties[prop]}"`;
		}
	}
	if (valid.selfClosing.includes(tag)) {
		raw += ` />`;
	} else {
		raw += `>${html || ''}</${tag}>`;
	}
	return raw;
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
// 				return querySelectorAll(selector);
// 			}
// 		}
// 	};
// })();

const ez = {
	create: function (data) { // Generates new EZComponent
		let ret = new EZComponent(data);
		return ret;
	},
	createText: function (data) { // Generates new EZComponent as text
		let ret = new EZComponent({text: data});
		return ret;
	},
	select: function (selector) {
		if (selector instanceof EZComponent) {
			// select via EZComponent class (ez-id)
		} else if (typeof selector === 'object') {
			// select via object
		} else {
			return querySelectorAll(selector);
		}
	}
};