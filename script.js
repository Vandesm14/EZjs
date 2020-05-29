let box = document.querySelector('#box');

let el1 = ez.create('<p>Number One</p>'); // raw
let el2 = ez.create('p').text('Number Two'); // tag
let el3 = ez.create('p', {class: 'card'}, 'I am a card'); // react

// verbose(1);

test('create/raw', el1.simple(), '<p>Number One</p>');
test('create/tag', el2.simple(), '<p>Number Two</p>');
test('create/react', el3.simple(), '<p>I am a card</p>');
test('create/html', ez.create(box).tag(), 'div');
test('create/ez', ez.create(el1).simple(), '<p>Number One</p>');

el1.appendTo('#box');
el1.appendTo('#box');
el2.appendTo('#box');
el2.appendTo('#box');
el3.appendTo('#box');

test('append', box.childArray.length, 5);

test('select/ez', ez.select(el2).parent().children().core, box.childArray);
test('select/obj', ez.select({tag: '#box'}).children().core, box.childArray);
test('select/selector', ez.select('#box').children().core, box.childArray);

test('index/get', ez.select(el2).index(), 2);

el3.text('Component write');
test('text/component', ez.select(el3).text(), 'Component write');
ez.select(el3).text('Select write');
test('text/selelect', document.querySelector(`[ez-uid="${el3.ezuid()}"]`).innerText, 'Select write');

ez.select(el2).parent().addClass('test');
test('parent/set', box.classList.contains('test'));
ez.select('#box').children().addClass('test');
test('children/set', box.children[0].classList.contains('test'));
test('each', ()=>{let x = []; ez.select('#box').children().each(el => x.push(ez.copy(el).id())); return x}, document.querySelector('#box').childArray.map(el => el.id));

done();