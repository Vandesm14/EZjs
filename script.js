/* Test Creating Elements */
// console.log(ez.create('p').id('test').attr('ez-id', '1235').text('Hello World').raw());
// console.log(ez.create({tag: 'p', id: 'test', html: 'Hello World', 'ez-id': 1235}).raw());
// console.log(ez.create({tag: 'p', id: 'test', text: 'Hello World', 'ez-id': 1235}).raw());
// console.log(ez.create('<p id="test" ez-id="1235">Hello World</p>').raw());

/* Test Internal Selectors */
let el = ez.create('<p id="test">Hello World</p>');
let el2 = ez.create('<p id="test2">Number Two</p>');
el.appendTo('body');
el.appendTo('body');
el2.appendTo({tag: 'body'});
el2.appendTo(el);