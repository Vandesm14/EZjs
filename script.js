let box = document.querySelector('#box');
let box2 = document.querySelector('#box2');

let parent = ez.create('<p>Number One</p>');
let child = ez.create('p').text('Number Two');
let comp = ez.create('p', {
	class: 'card'
}, 'I am a card');

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

test('placement/appendTo', box.childArray.length, 3);

test('select/ez', ez.select(parent).parent().children().core, box.childArray);
test('select/obj', ez.select({
	id: 'box'
}).children().core, box.childArray);
test('select/selector', ez.select('#box').children().core, box.childArray);

comp.attr('test', 'good');
test('attr', box.children[0].children[1].getAttribute('test') === 'good');

comp.text('Component write');
test('attr/text/component', box.children[0].children[1].innerText, 'Component write');
ez.select(comp).text('Select write');
test('attr/text/selelect', box.children[0].children[1].innerText, 'Select write');

ez.select(comp).empty();
test('attr/empty', box.children[0].children[1].innerText, '');
ez.select(comp).text('Select write');

test('dom/index', child.index(), 0);
test('dom/eq', ez.select('#box2').children().eq(1).text(), box2.children[1].innerText);

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

test('dom/filter', ez.select('#box').children().filter(comp).main, box.childArray[2]);
test('dom/not', ez.select('#box').children().not(parent).main, box.childArray[2]);
test('dom/not', ez.select('#box').children().filter(parent).every(parent));

test('function/each', () => {
	let x = [];
	ez.select('#box').children().each(el => x.push(ez.create(el).id()));
	return x;
}, box.childArray.map(el => el.id));

test('component/clone', comp.clone().ezid() !== comp.ezid(), comp.clone().text() === comp.text());
test('component/createFromHTML', ez.create(box2).ezid(), null);
test('component/cloneFromHTML', ez.create(box2, true).ezid(), box2.getAttribute('ez-id'));
test('component/linkTo', comp.clone().linkTo(comp).ezid(), comp.ezid());

comp.link('#box2 > p').text('Linked');
test('component/link', box2.children[0].innerText === 'Linked');

done();