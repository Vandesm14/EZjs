# EZ.js

[TOC]

## Installation
```html
<script src="ez.js"></script>
```

## Creating Elements

In with EZ.js, you can create elements in one of three ways: with Chained Methods, with an Object, or with raw HTML (string).

**Target Element**

```html
<p id="test">Hello World</p>
```



### Chained Methods

EZ.js supports either `.html()` or `.text()` to add content to an element. `.text()` is exactly like `.html()` except that it escapes HTML entities.

```js
ez.create('p').id('test').html('Hello World')
```

### Object

```js
ez.create({tag: 'p', id: 'test', html: 'Hello World'})
```

### Raw HTML

```js
ez.create('<p id="test">Hello World</p>')
```

