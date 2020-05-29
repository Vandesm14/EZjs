let box = document.querySelector('#box');

let parent = ez.create('<p>Number One</p>'); // raw
let child = ez.create('p').text('Number Two'); // tag
let comp = ez.create('p', {class: 'card'}, 'I am a card'); // react

// verbose(1);

test('create/raw', parent.simple(), '<p>Number One</p>');
test('create/tag', child.simple(), '<p>Number Two</p>');
test('create/react', comp.simple(), '<p>I am a card</p>');
test('create/html', ez.create(box).tag(), 'div');
test('create/ez', ez.create(parent).simple(), '<p>Number One</p>');

parent.appendTo('#box');
parent.appendTo('#box');

child.appendTo(parent);
comp.appendTo(parent);

comp.appendTo('#box');

test('append', box.childArray.length, 3);

test('select/ez', ez.select(parent).parent().children().core, box.childArray);
test('select/obj', ez.select({tag: '#box'}).children().core, box.childArray);
test('select/selector', ez.select('#box').children().core, box.childArray);

test('index/get', child.index(), 0);

comp.text('Component write');
test('text/component', document.querySelector(`[ez-uid="${comp.ezuid()}"]`).innerText, 'Component write');
ez.select(comp).text('Select write');
test('text/selelect', document.querySelector(`[ez-uid="${comp.ezuid()}"]`).innerText, 'Select write');

parent.parent().addClass('test');
test('dom/parent', box.classList.contains('test'));
parent.parent().removeClass('test');

ez.select('#box').children().addClass('test');
test('dom/children', box.children[0].classList.contains('test'));
ez.select('#box').children().removeClass('test');

ez.select('#box').children('p').addClass('test');
test('dom/children/selector', box.children[0].classList.contains('test'), box.children[0].children[0].classList.contains('test'));
ez.select('#box').children('p').removeClass('test');

ez.select('#box').find('p').addClass('test');
test('dom/find', box.children[0].classList.contains('test'), !box.children[0].children[0].classList.contains('test'));
ez.select('#box').find('p').removeClass('test');

comp.closest(parent).addClass('test');
test('dom/closest', box.children[0].classList.contains('test'));
comp.closest(parent).removeClass('test');

test('dom/filter', ez.select('#box').children().filter(comp).first, box.childArray[2]);
test('dom/not', ez.select('#box').children().not(parent).first, box.childArray[2]);
test('dom/not', ez.select('#box').children().filter(parent).every(parent));

test('each', ()=>{let x = []; ez.select('#box').children().each(el => x.push(ez.copy(el).id())); return x}, document.querySelector('#box').childArray.map(el => el.id));

done();