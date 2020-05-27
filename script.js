/* Test Creating Elements */
// ez.create({tag: 'p', id: 'test', html: 'Hello World', 'ez-id': 1235}).appendTo('body');
// ez.create({tag: 'p', id: 'test', text: 'Hello World', 'ez-id': 1235}).appendTo('body');
// ez.create('<p id="test" ez-id="1235">Hello World</p>').appendTo('body');

/* Test Internal Selectors */
// let el = ez.create('<p id="test">Hello World</p>');
// let el2 = ez.create('<p id="test2">Number Two</p>');
// el.appendTo('body');
// el2.appendTo(el);
// el2.appendTo(el2);
// el2.attr('hey', 'hey');

/* Test Live Components */
// let el1 = ez.create('<p>Number One</p>');
// let el2 = ez.create('<p>Number Two</p>');
// el1.appendTo('body');
// el1.appendTo('body');
// el2.appendTo('body');
// el2.appendTo('body');
// el1.text('Number 1');
// el2.text('Number 2');

/* Test Utility Methods */
let el1 = ez.create('<p>Number One</p>');
let el2 = ez.create('p').text('Number Two');
el1.appendTo('body');
el1.appendTo('body');
el2.appendTo('body');
el2.appendTo('body');
// console.log(ez.select(el2, true)[0].parentElement.children);
console.log(ez.select(el2).index());