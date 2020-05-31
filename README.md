# EZ.js

[TOC]

# Installation
```html
<script src="ez.js"></script>
```



# Quick Start

## Creating Components

With EZ.js, you can create components 6 different ways:

- Chained methods
- Object
- Raw HTML (string)
- React-like syntax
- HTML Element
- EZComponent

### Chained Methods

EZ.js supports either `.html()` or `.text()` to add content to an element. `.text()` is exactly like `.html()` except that it escapes HTML entities.

```js
ez.create('p').id('test').html('Hello World')
```

### Object

Just like with chained methods, EZ.js has two options for adding content to an element: `text` or `html`.

```js
ez.create({tag: 'p', id: 'test', html: 'Hello World'})
```

### Raw HTML

```js
ez.create('<p id="test">Hello World</p>')
```

### React-like syntax

```js
ez.create('p', {id: 'test'}, 'Hello World')
```
### HTML Element

For more information on creating a component from an HTML element, read [Copying/Cloning](#Copying/Cloning)

```js
ez.create(element) // <- Recommended
/* is the same as */
ez.select(element)
```

*Note: Using `ez.select()` to create a component from an element (keeping reference) is not recommended as it is prone to breaking the component. Use `ez.create()` instead*

### EZComponent

For more information on creating a component from an EZComponent, read [Copying/Cloning](#Copying/Cloning)

```js
ez.create(component)
```

## Copying/Cloning

EZ.js supports copying/cloning both HTML elements and EZComponents. To copy an element or component (keep references), use `ez.create(x)` as normal. To clone an element or component (remove references), use `ez.create(x, true)`. 



## Selecting Elements

EZ.js comes with a custom selection system which allows you to select elements and use them as if they were components. EZ.js supports selecting elements 4 different ways:

- Selector
- EZComponent
- Object
- HTML Element

### Selector

```js
ez.select('p#test')
```

### EZComponent

When using an EZComponent as a selector, the library will select via the component’s `ez-id` attribute.

```js
ez.select(component)
```

### Object

```js
ez.select(tag: 'p', id: 'test')
```

### HTML Element

```js
ez.select(element)
```



# Components

It does not matter if a component is selected or created **when setting values**, the library will automatically update the live elements regardless. Here is an example:

```js
let comp = ez.create('p')

comp.appendTo('body')

comp.text('Hello World')
/* is the same as */
ez.select(comp).text('Hello World')
```



### Selected Flag

If a component has been created via the `ez.select()` function, that component will have the `__selected__` flag set to `true`. This flag is mainly used internally and does not need to be set manually.

*Note: It is not recommended to change `__selected__` flag as it can most likely cause problems with the component and its methods. The [selected()](#selected([val])) method is another way of getting/setting the selected flag.*

### Selected-Only Methods

Some methods do not directly interfere with the component itself, only the live elements in the DOM. These methods have been marked with the [#SO](#Selected-Only Methods) for easy identification.

*Note: Selected-only methods do not need to be created via the `ez.select()` function, as stated [here](#Components), they will automatically select components directly if a component does not have the `__selected__` flag set to `true`. For more information on the functionality behind this, read [Selection](#Selection)*

### Non-Chainable Methods

Some methods return data other than a component which prevents other methods from [being executed after them]. These methods have been marked with the [#NC](#Non-Chainable Methods) for easy identification.



## EZComponent Methods

### Attribute

#### `tag()`

Gets the tagName of a component

#### `id([id])`

Gets the id of a component

Sets the id of a component if `id` is specified

#### `ezid([id])`

Gets the ez-id of a component

Sets the ez-id of a component if `id` is specified

#### `ezuid()`

[#SO](#Selected-Only Methods)

Gets the ez-uid of a component

#### `className([className])`

Gets the className of a component

Sets the className of a component if `className` is specified

#### `html([text])`

Gets the innerHTML of a component

Sets the innerHTML of a component if `text` is specified

#### `text([text])`

Gets the innerText of a component

Sets the innerText of a component if `text` is specified

#### `raw()`

[#NC](#Non-Chainable Methods)

Gets the outerHTML of a component

#### `simple()`

[#NC](#Non-Chainable Methods)

Gets the outerHTML of a component, omitting the attributes

#### `attr(prop[, val])`

Gets the `prop` attribute of a component

Sets the `prop` attribute of a component if `val` is specified

#### `hasAttr(prop)`

Checks if a component has the `prop` attribute

#### `empty()`

Sets the innerHTML of a component to `“”`



### Class

#### `addclass(className)`

Adds `className` to the class list of a component

#### `removeClass(className)`

Removes `className` from the class list of a component

#### `toggleClass(className)`

Toggles the `className` class of a component

#### `hasClass(className)`

[#NC](#Non-Chainable Methods)

Checks is a component has the `className` class



### DOM

#### `index()`

[#SO](#Selected-Only Methods) [#NC](#Non-Chainable Methods)

Gets the index of a component relative to its parent

#### `eq(index)`

[#SO](#Selected-Only Methods)

Gets a specific component from a selection list by `index`

#### `parent()`

[#SO](#Selected-Only Methods)

Gets the parent of a component

#### `children([selector])`

[#SO](#Selected-Only Methods)

Gets the children of a component filtered by `selector` if specified

#### `prev()`

[#SO](#Selected-Only Methods)

Gets the previous sibling of a component

#### `next()`

[#SO](#Selected-Only Methods)

Gets the next sibling of a component

#### `first()`

[#SO](#Selected-Only Methods)

Gets the first instance of a component

#### `last()`

[#SO](#Selected-Only Methods)

Gets the last instance of a component

#### `firstChild()`

[#SO](#Selected-Only Methods)

Gets the first child of a component

#### `find(selector)`

[#SO](#Selected-Only Methods)

Gets the last child of a component

#### `closest(selector)`

[#SO](#Selected-Only Methods)

Gets the closest parent of a component by `selector`

#### `filter(selector)`

[#SO](#Selected-Only Methods)

Filters a component list by `selector`

#### `not(selector)`

[#SO](#Selected-Only Methods)

Filters a component list by the inverse of `selector`

#### `every(selector)`

[#SO](#Selected-Only Methods)

Checks if every component in a component list matches `selector`



### Function

#### `each(func)`

[#SO](#Selected-Only Methods)

Runs a forEach function on a component list

#### `on(type, func[, options])`

Adds an event listener to a component and returns a function

```js
let remove = component.on('click', function(){console.log('click!')})
remove(); // removes event listener
```





### Placement

#### `prependTo(selector[, destroy])`

Prepends an component to `selector` and removes the original component if `destroy` is specified

*Note: Methods with the `destroy` parameter will only destroy the component if it has been selected*

#### `appendTo(selector[, destroy])`

Appends a component to `selector` and removes the original component if `destroy` is specified

#### `addBefore(selector[, destroy])`

Adds a component before `selector` and removes the original component if `destroy` is specified

#### `addAfter(selector[, destroy])`

Adds a component after `selector` and removes the original component if `destroy` is specified

#### `insert(selector[, index][, destroy])`

Inserts a component as a child of `selector` at the `index`  and removes the original component if `destroy` is specified

#### `moveUp()`

[#SO](#Selected-Only Methods)

Swaps a component with its previous sibling

#### `moveDown()`

[#SO](#Selected-Only Methods)

Swaps a component with its next sibling

#### `remove()`

[#SO](#Selected-Only Methods)

Removes a component from the DOM



### Component

#### `link(target)`

Links `target` to a component

*Note: `target` can be any form of [accepted selectors](#Selecting Elements)*

#### `linkTo(target)`

Links a component to `target`

*Note: `target` can only be an EZComponent*

#### `clone([selected])`

Creates a (de-referenced) clone of a component

#### `selected([val])`

Gets the selected flag of a component

Sets the selected flag of a component to `val`

*Note: `val` can only be a boolean. Learn more about the [selected flag](#Selected Flag)*