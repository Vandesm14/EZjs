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
		} else if (typeof data === 'string') {
			if (data.startsWith('<')) {
				obj = rawToObj(data);
			} else {
				obj.tag = data;
			}
		}
		obj.prop['ez-id'] = ((+new Date) * Math.round(Math.random() * 10 ** 10)).toString(36);
		this.core.push(obj);
	}

	/* Properties */
	tag(tag) {
		if (tag) {
			this.core.forEach(el => el.tag = tag);
			return this;
		} else {
			return this.core[0].tag;
		}
	}
	id(id) {
		if (id) {
			this.core.forEach(el => el.prop.id = id);
			return this;
		} else {
			return this.core[0].prop.id;
		}
	}
	ez(id) {
		if (id) {
			this.core.forEach(el => el.prop['ez-id'] = id);
			return this;
		} else {
			return this.core[0].prop['ez-id'];
		}
	}
	className(className) {
		if (className) {
			this.core.forEach(el => el.prop.className = className);
			return this;
		} else {
			return this.core[0].prop.className;
		}
	}
	text(text) {
		if (text) {
			this.core.forEach(el => el.html = text.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
			return this;
		} else {
			return this.core[0].html;
		}
	}
	html(text) {
		if (text) {
			this.core.forEach(el => el.html = text);
			return this;
		} else {
			return this.core[0].html;
		}
	}
	attr(prop, val) {
		if (val) {
			this.core.forEach(el => el.prop[prop] = val);
			return this;
		} else {
			return this.core[0].prop[prop];
		}
	}

	/* Placement */
	appendTo(selector) {
		ez.select(selector, true).forEach(el => el.insertAdjacentHTML('beforeend', this.raw()));
	}
	prependTo(selector) {
		ez.select(selector, true).forEach(el => el.insertAdjacentHTML('afterbegin', this.raw()));
	}
	addBefore(selector) {
		ez.select(selector, true).forEach(el => el.insertAdjacentHTML('beforebegin', this.raw()));
	}
	addAfter(selector) {
		ez.select(selector, true).forEach(el => el.insertAdjacentHTML('afterend', this.raw()));
	}
	raw() { // Convert EZComponent to HTML and return
		return objToRaw(this.core[0]);
	}
}

function rawToObj(raw) {
	let properties = raw.match(/\s.+?\s*=\s*".+?"/g) || [];
	let html = raw.match(/>.+?</g);
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