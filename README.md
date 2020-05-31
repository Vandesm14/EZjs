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

For more information on creating a component from an HTML element, read [Copying and Cloning](#copying-and-cloning)

```js
ez.create(element) // <- Recommended
/* is the same as */
ez.select(element)
```

*Note: Using `ez.select()` to create a component from an element (keeping reference) is not recommended as it is prone to breaking the component. Use `ez.create()` instead*

### EZComponent

For more information on creating a component from an EZComponent, read [Copying and Cloning](#copying-and-cloning)

```js
ez.create(component)
```

## Copying and Cloning

EZ.js supports copying and cloning both HTML elements and EZComponents. To copy an element or component (keep references), use `ez.create(x)` as normal. To clone an element or component (remove references), use `ez.create(x, true)`.  Here are a few similarities between copying and cloning elements and components:

### EZComponent

```js
let component = ez.create('p')

/* Cloning */
component.clone()          // new component
ez.create(component, true) // new component

/* Copying */
ez.create(component)       // same component

let another = ez.create('p')
another.linkTo(component)  // same (another and component function the same)
component.link(another)    // same (another and component function the same)
```

### HTML Element

```js
let element = ez.select('p')

/* Cloning */
element.clone()          // new component, live element unaffected
ez.create(element, true) // new component, live element is now a component

/* Copying*/
ez,create(element)       // same component, recommended
ez.select(element)       // same component, can cause issues
```



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

*Note: If you want to create a component from an EZComponent, refer to the [Copying and Cloning](#copying-and-cloning) section*

### Object

```js
ez.select(tag: 'p', id: 'test')
```

*Tip: To select irregular attributes like `ez-id`, use quotes in the key: `{‘ez-id’: ‘mhu3jhkl5nwc1s’}` (it does not matter if you use single or double quotes)*

### HTML Element

```js
ez.select(element)
```

*Note: If you want to create a component from an HTML element, refer to the [Copying and Cloning](#copying-and-cloning) section*



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

*Note: It is not recommended to change `__selected__` flag as it can most likely cause problems with the component and its methods. The [selected()](#selectedval) method is another way of getting/setting the selected flag.*

### Selected-Only Methods

Some methods do not directly interfere with the component itself, only the live elements in the DOM. These methods have been marked with the [#SO](#selected-only-methods) for easy identification.

*Note: Selected-only methods are not reliant on a component created via the `ez.select()` function, as stated [here](#components), they will automatically select components directly if a component does not have the `__selected__` flag set to `true` (created via the `ez.create()` function). For more information on the functionality behind this, read [What are Components?](#what-are-components)*

### Non-Chainable Methods

Some methods return data other than a component which prevents other methods from [being executed after them]. These methods have been marked with the [#NC](#nonchainable-methods) for easy identification.



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

[#SO](#selectedonly-methods)

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

[#NC](#nonchainable-methods)

Gets the outerHTML of a component

#### `simple()`

[#NC](#nonchainable-methods)

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

[#NC](#nonchainable-methods)

Checks is a component has the `className` class



### DOM

#### `index()`

[#SO](#selectedonly-methods) [#NC](#nonchainable-methods)

Gets the index of a component relative to its parent

#### `eq(index)`

[#SO](#selectedonly-methods)

Gets a specific component from a selection list by `index`

#### `parent()`

[#SO](#selectedonly-methods)

Gets the parent of a component

#### `children([selector])`

[#SO](#selectedonly-methods)

Gets the children of a component filtered by `selector` if specified

#### `prev()`

[#SO](#selectedonly-methods)

Gets the previous sibling of a component

#### `next()`

[#SO](#selectedonly-methods)

Gets the next sibling of a component

#### `first()`

[#SO](#selectedonly-methods)

Gets the first instance of a component

#### `last()`

[#SO](#selectedonly-methods)

Gets the last instance of a component

#### `firstChild()`

[#SO](#selectedonly-methods)

Gets the first child of a component

#### `find(selector)`

[#SO](#selectedonly-methods)

Gets the last child of a component

#### `closest(selector)`

[#SO](#selectedonly-methods)

Gets the closest parent of a component by `selector`

#### `filter(selector)`

[#SO](#selectedonly-methods)

Filters a component list by `selector`

#### `not(selector)`

[#SO](#selectedonly-methods)

Filters a component list by the inverse of `selector`

#### `every(selector)`

[#SO](#selectedonly-methods)

Checks if every component in a component list matches `selector`



### Function

#### `each(func)`

[#SO](#selectedonly-methods)

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

[#SO](#selectedonly-methods)

Swaps a component with its previous sibling

#### `moveDown()`

[#SO](#selectedonly-methods)

Swaps a component with its next sibling

#### `remove()`

[#SO](#selectedonly-methods)

Removes a component from the DOM



### Component

#### `link(target)`

Links `target` to a component

*Note: `target` can be any form of [accepted selectors](#selecting-elements)*

#### `linkTo(target)`

Links a component to `target`

*Note: `target` can only be an EZComponent*

#### `clone([selected])`

Creates a (de-referenced) clone of a component

#### `selected([val])`

Gets the selected flag of a component

Sets the selected flag of a component to `val`

*Note: `val` can only be a boolean. Learn more about the [selected flag](#selected-flag)*



# Detailed Explanation (FAQ)

## What are Components?

Components, or “Template Components”, are a JQuery-like class (EZComponent) which allows the manipulation of “template elements”. These elements are not attached to the DOM. Instead, they are inside of the `core` property of a component. This allows the developer to easily create templates, place many of them around the DOM, and update a specific component without interfering with the template. EZ.js calls any form of EZComponent a “component”, regardless if it‘s attached to the DOM or not (template vs element). This is because they all share the same class and hence, the same functionality.

The `core` property is always an array. If a component is a template, the `core` will contain only one non-attached element. If a component is a component list, the `core` will contain the live elements each as an item of the array. This makes it easy for a method to loop through the `core` and interact with the element(s) regardless if they are live or not.

Fortunately, it is easy to interact with the `core` externally as it is a public property of the EZComponent class. To get the `core` in its entirety, just use the `.core` property. To get the template element from the `core`, you can either use `.core[0]` or `.main` to get a fully usable HTML element.

*Note: If a component is a template rather than a component list, changing the `.main` HTML element will not affect live elements on the DOM. It is only recommended to use the `core` or `.main` properties when working with a `__selected__` component as the elements will be live. Otherwise, use the `core` or `.main` properties as read-only access to the element of a template component.*



Components are special as they carry the same functions for templates as they do for selected elements. This is because of the `__selected__` property (called “flag”) which tells the component if it has been created from a selection or not. If a [selection-only method](#selectedonly-methods) has been called, the method will check if the flag is true:

- If the flag is true, the method will regard the component as a [component list](#what-are-component-lists), which is when the `core` property contains live elements rather than a non-attached element.
- If the flag is false, the method will regard the component as a template, which is when the `core` property contains template elements rather than live elements.

From this, the method will either use the `core` property directly to interact with the live elements if the component is a component list, or it will interact the elements by taking the first element of the `core` (the template) and running an `ez.select()` function to get the live elements.

git

## What are Component Lists?

Component Lists, or “Selected Components”, are a form of EZComponent which contain more than one element it its `core`. As explained in the topic above, the `core` is an array which can either have one template element, or one or more live elements. This type of component is created after using the `ez.select()` function or a [DOM method](#dom) is called. Everything else about Component Lists can be found in the topic above.



## What are Templates?

Templates (not to be confused with [Template Components](#what-are-components)) are components which are pre-made and can only be created by the [ez.make()]() function.