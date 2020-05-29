let body = document.querySelector('body');

let el1 = ez.create('<p>Number One</p>'); // raw
let el2 = ez.create('p').text('Number Two'); // tag
let el3 = ez.create('p', {class: 'card'}, 'I am a card'); // react

test('create/raw', el1.simple(), '<p>Number One</p>');
test('create/tag', el2.simple(), '<p>Number Two</p>');
test('create/react', el3.simple(), '<p>I am a card</p>');
test('create/html', ez.create(body).tag(), 'body');
test('create/ez', ez.create(el1).simple(), '<p>Number One</p>');

el1.appendTo('body');
el1.appendTo('body');
el2.appendTo('body');
el2.appendTo('body');
el3.appendTo('body');

test('append', body.childArray.length, 7);

test('select/ez', ez.select(el2).parent().children().core, body.childArray);
test('select/obj', ez.select({tag: 'body'}).children().core, body.childArray);
test('select/sel', ez.select('body').children().core, body.childArray);

test('index/get', ez.select(el2).index(), 4);

test('parent/set', ()=>{ez.select(el2).parent().addClass('test'); return body.classList.contains('test')}, true);
test('children/set', ()=>{ez.select('body').children().addClass('test'); return body.children[0].classList.contains('test')}, true);