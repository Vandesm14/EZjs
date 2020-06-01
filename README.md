# EZ.js

[TOC]

# Installation

```html
<script src="ez.js"></script>
/* Or use a CDN */
<script src="https://cdn.jsdelivr.net/gh/Vandesm14/EZjs@0.0.1/ez.min.js"></script>
```



# Quick Start

## Terminology

**EZComponents:** The JS class used for Components, Component Lists, and Templates

**Components:** An EZComponent, created with `ez.create()` or `ez.make()`, which contains one non-attached HTML element in its `core`

**Component Lists:** An EZComponent, created with `ez.select()`, which contains one or more attached HTML elements in its `core` (selected components)

**Templates:** An EZComponent, created with `ez.comp()`, which acts like a normal Component, except that its content is created by executing the `clone()` method



## Creating EZComponents

The components in EZ.js give the developer control over many elements of the same template with only a single EZComponent.

#### `ez.create(data[, clone])`

Returns an EZComponent created from `data` and cloned if `clone` is specified



EZ.js supports 6 different input types for creating EZComponent:

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

For more information on creating a EZComponent from an HTML element, s [Copying and Cloning](#copying-and-cloning)

```js
ez.create(element) // <- Recommended
/* or */
ez.select(element)
```

*Note: Using `ez.select()` to create a EZComponent from an element (keeping reference) is not recommended as it is prone to breaking the component. Use `ez.create()` instead*

### EZComponent

For more information on creating a component from an EZComponent, see [Copying and Cloning](#copying-and-cloning)

```js
ez.create(component)
```



## Selecting Elements

EZ.js comes with a custom JQuery-like selection system which allows you to select elements and use them as if they were components.

#### `ez.select(selector)`

Returns an EZComponent with the selected elements specified by `selector`



EZ.js supports selecting elements with 4 different selector types:

### Selector

```js
ez.select('p#test')
```

### EZComponent

When using an EZComponent as a selector, the library will select via the component’s `ez-id` attribute.

```js
ez.select(component)
```

*Note: If you want to create a component from an EZComponent, see [Copying and Cloning](#copying-and-cloning)*

### Object

```js
ez.select(tag: 'p', id: 'test')
```

*Tip: To select irregular attributes like `ez-id`, use quotes in the key: `{‘ez-id’: ‘mhu3jhkl5nwc1s’}` (it does not matter if you use single or double quotes)*

### HTML Element

```js
ez.select(element)
```

*Note: If you want to create an EZComponent from an HTML element, see [Copying and Cloning](#copying-and-cloning)*



## Copying and Cloning

EZ.js supports copying and cloning both HTML elements and EZComponents. To copy an element or EZComponent (keep references), use `ez.create(x)` as normal. To clone an element or EZComponent (remove references), use `ez.create(x, true)`.  Here are a few similarities between copying and cloning elements and EZComponents:

### EZComponent

```js
let component = ez.create('p')

/* Cloning */
component.clone()          // new component
ez.create(component, true) // new component

/* Copying */
ez.create(component)       // same component

let component2 = ez.create('p')
component2.linkTo(component)
/* or */
component.link(component2)
// both component and component2 function the same, but have different template elements

component.link(component2)
// both component and component2 function the same, and have the same template elements
```

### HTML Element

```js
let element = ez.select('p').main // returns an html element

/* Cloning */
element.clone()          // new component, live element unaffected
ez.create(element, true) // new component, live element is now a component

/* Copying*/
ez,create(element)       // same component, recommended
ez.select(element)       // same component, can cause issues
```



## Creating Templates

Templates are EZComponent which need to be generated in order to be used as normal components. This allows developers to create, use, and share components similar to the way React components work (in respect to their modularity and portability).

EZ.js supports a few different methods of creating templates:

```js
ez.template(base, func)
/* or */
ez.create(base).setMake(func) // <- .setMake is chainable
```



## Rendering Templates

To make a component from a template, EZ.js supports a few different methods of doing so:

```js
template.clone(args)
/* or */
ez.make(template, args)
```

*Note: When creating a component from a template, the resulting component will have the same `ez-id` as the template*

# Components

It does not matter if an EZComponent is selected or created **when setting values**, the library will automatically update the live elements regardless. Here is an example:

```js
let comp = ez.create('p')

comp.appendTo('body')

comp.text('Hello World')
/* is the same as */
ez.select(comp).text('Hello World')
```



## Selected Flag

If a component has been created via the `ez.select()` function, that component will have the `__selected__` flag set to `true`. This flag is mainly used internally and does not need to be set manually.

*Note: It is not recommended to change `__selected__` flag as it can most likely cause problems with the component and its methods. The [selected()](#selectedval) method is another way of getting/setting the selected flag.*

## Selected-Only Methods

Some methods do not directly interfere with the component itself (the template element), only the live elements in the DOM. These methods have been marked with the [#SO](#selected-only-methods) for easy identification.

*Note: Selected-only methods are not reliant on a component created via the `ez.select()` function, as stated [here](#components), they will automatically select components directly if a component does not have the `__selected__` flag set to `true` (created via the `ez.create()` function). For more information on the functionality behind this, read [What are Components?](#what-are-components)*

## Non-Chainable Methods

Some methods return data other than a component which prevents other methods from [being executed after them]. These methods have been marked with the [#NC](#non-chainable-methods) for easy identification.



# Templates

Placeholder



# EZComponent Methods

## Attribute

### `tag()`

Gets the tagName of a component

### `id([id])`

Gets the id of a component

Sets the id of a component to `id` if specified

### `ezid([id])`

Gets the ez-id of a component

Sets the ez-id of a component to `id` if specified

*Note: Setting the ez-id of a live element will break its relation with the component. Setting the ez-id of a component is the recommended method of changing the ez-id.*

### `ezuid([id])`

[#SO](#selected-only-methods)

Gets the ez-uid of a component

Selects a component by its ez-uid if `id` is specified

### `className([className])`

Gets the className of a component

Sets the className of a component to `className` if specified

### `html([text])`

Gets the innerHTML of a component

Sets the innerHTML of a component to `text` if specified

### `text([text])`

Gets the innerText of a component

Sets the innerText of a component to `text` if specified

### `raw([text])`

[#NC](#non-chainable-methods)

Gets the outerHTML of a component

Sets the outerHTML of a component to `raw` if specified

### `simple()`

[#NC](#non-chainable-methods)

Gets the outerHTML of a component, omitting the attributes

### `attr(prop[, val])`

Gets the `prop` attribute of a component

Sets the `prop` attribute of a component to `val` if specified

### `hasAttr(prop)`

Checks if a component has the `prop` attribute

### `removeAttr(prop)`

Removes the `prop` attribute of a component

### `data(prop[, val])`

Gets the “data-`prop`” attribute of a component

Sets the “data-`prop`” attribute of a component

### `empty()`

Sets the innerHTML of a component to `“”`



## Class

### `addclass(className)`

Adds `className` to the class list of a component

### `removeClass(className)`

Removes `className` from the class list of a component

### `toggleClass(className)`

Toggles the `className` class of a component

### `hasClass(className)`

[#NC](#non-chainable-methods)

Checks if a component has the `className` class



## DOM

### `index()`

[#SO](#selected-only-methods) [#NC](#non-chainable-methods)

Gets the index of a component relative to its parent

### `eq(index)`

[#SO](#selected-only-methods)

Gets a specific component from a [component list](#what-are-component-lists) by `index`

### `parent()`

[#SO](#selected-only-methods)

Gets the parent of a component

### `children([selector])`

[#SO](#selected-only-methods)

Gets the children of a component filtered by `selector` if specified

### `prev()`

[#SO](#selected-only-methods)

Gets the previous sibling of a component

### `next()`

[#SO](#selected-only-methods)

Gets the next sibling of a component

### `first()`

[#SO](#selected-only-methods)

Gets the first instance of a component

### `last()`

[#SO](#selected-only-methods)

Gets the last instance of a component

### `firstChild()`

[#SO](#selected-only-methods)

Gets the first child of a component

### `find(selector)`

[#SO](#selected-only-methods)

Gets the last child of a component

### `closest(selector)`

[#SO](#selected-only-methods)

Gets the closest parent of a component by `selector`

### `filter(selector)`

[#SO](#selected-only-methods)

Filters a [component list](#what-are-component-lists) by `selector`

### `not(selector)`

[#SO](#selected-only-methods)

Filters a [component list](#what-are-component-lists) by the inverse of `selector`

### `every(selector)`

[#SO](#selected-only-methods)

Checks if every component in a [component list](#what-are-component-lists) matches `selector`



## Function

### `each(func)`

[#SO](#selected-only-methods)

Runs a forEach function on a [component list](#what-are-component-lists)

### `on(type, func[, options])`

Adds an event listener to a component and returns a function

```js
let remove = component.on('click', function(){console.log('click!')})
remove(); // removes event listener
```





## Placement

### `prependTo(selector[, destroy])`

Prepends an component to `selector` and removes the original component if `destroy` is specified

*Note: Methods with the `destroy` parameter will only destroy the component if it has been selected*

### `appendTo(selector[, destroy])`

Appends a component to `selector` and removes the original component if `destroy` is specified

*Note: Methods with the `destroy` parameter will only destroy the component if it has been selected*

### `addBefore(selector[, destroy])`

Adds a component before `selector` and removes the original component if `destroy` is specified

*Note: Methods with the `destroy` parameter will only destroy the component if it has been selected*

### `addAfter(selector[, destroy])`

Adds a component after `selector` and removes the original component if `destroy` is specified

*Note: Methods with the `destroy` parameter will only destroy the component if it has been selected*

### `insert(selector[, index][, destroy])`

Inserts a component as a child of `selector` at the `index`  and removes the original component if `destroy` is specified

*Note: Methods with the `destroy` parameter will only destroy the component if it has been selected*

### `moveUp()`

[#SO](#selected-only-methods)

Swaps a component with its previous sibling

### `moveDown()`

[#SO](#selected-only-methods)

Swaps a component with its next sibling

### `remove()`

[#SO](#selected-only-methods)

Removes a component from the DOM



## Component

### `link(target[, reset])`

Links `target` to a component and overwrites the HTML Elements to the component if `reset` is specified

*Note: `target` can be any form of [accepted selectors](#selecting-elements)*

*Note: The component can only be a non-selected EZComponent*

### `linkTo(target)`

Links a component to `target`

*Note: Both the component and`target` can only be a non-selected EZComponent*

### `clone(...args)`

Creates a (de-referenced) clone of a component

Creates a (de-referenced) clone of a component generated from the make function if `args` is specified

### `update(...args)`

Regenerates a component from the make function with `args` as the input

### `setMake(func)`

Sets the make function of a component to `func`

### `selected([val])`

Gets the selected flag of a component

Sets the selected flag of a component to `val` if specified

*Note: `val` can only be a boolean. Learn more about the [selected flag](#selected-flag)*

### `select()`

Selects a component and returns the selection if the component is not `__selected__`



# FAQ

## What are Components?

Components, or “Template Components”, are a JQuery-like class (EZComponent) which allows the manipulation of “template elements”. These elements are not attached to the DOM. Instead, they are inside of the `core` property of a component. Template components are mainly created with the [ez.create()](#creating-components) function. This allows the developer to easily create templates, place many of them around the DOM, and update a specific component without interfering with the template. EZ.js calls any form of EZComponent a “component”, regardless if it‘s attached to the DOM or not (template vs element). This is because they all share the same class and hence, the same functionality.

The `core` property is always an array. If a component is a template, the `core` will contain only one non-attached element. If a component is a component list, the `core` will contain the live elements each as an item of the array. This makes it easy for a method to loop through the `core` and interact with the element(s) regardless if they are live or not.

Fortunately, it is easy to interact with the `core` externally as it is a public property of the EZComponent class. To get the `core` in its entirety, just use the `.core` property. To get the template element from the `core`, you can either use `.core[0]` or `.main` to get a fully usable HTML element.

*Note: If a component is a template component rather than a component list, changing the `.main` HTML element will not affect live elements on the DOM. It is only recommended to use the `core` or `.main` properties when working with a `__selected__` component as the elements will be live. Otherwise, use the `core` or `.main` properties as read-only access to the element of a template component.*



Components are special as they carry the same functions for templates as they do for selected elements. This is because of the `__selected__` property (called a “flag”) which tells the component if it has been created from a selection or not. If a [selected-only method](#selected-only-methods) has been called, the method will check if the flag is true or false:

- If the flag is true, the method will regard the component as a [component list](#what-are-component-lists), which is when the `core` property contains live elements rather than a non-attached element.
- If the flag is false, the method will regard the component as a template, which is when the `core` property contains one template element rather than live elements.

From this, the method will either use the `core` property directly to interact with the live elements if the component is a component list, or it will interact with the elements by taking the first element of the `core` (the template) and running an `ez.select()` function to get the live elements.



## What are Component Lists?

Component Lists, or “Selected Components”, are a form of EZComponent which can contain more than one element it its `core`. As explained in the topic above, the `core` is an array which can either have one template element, or one or more live elements. This type of component is created by using the [ez.select()](#selecting-elements) function or when a [DOM method](#dom) is called. Everything else about Component Lists can be found in the topic above.



## What are Templates?

Templates (not to be confused with [Template Components](#what-are-components)) are components which are pre-made and can only be created by the [ez.make()](#making-components) function.