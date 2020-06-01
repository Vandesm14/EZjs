***ez.js*** allows for quick and easy [**creation**](#create), [**selection**](#select), and **modification**of elements. to install ***ej.js***, you can either use it **locally** or via a **cdn**:

```html
<script src="ez.min.js"></script>
/* or use a cdn */
<script src="https://cdn.jsdelivr.net/gh/Vandesm14/EZjs@latest/dist/ez.min.js"></script>
```



the global **constant** `ez` is used by ***ez.js*** as its entry point. most of the functions in `ez` are **chainable**, the only exception are to the functions which return specific data.



### create

when an element is **created** using `ez` via any of the methods below, an `EZComponent` class is **returned**. this will be what you use to **modify** the element in the future. to **create** an element we call

```js
ez.create(/* ... */);
```



`ez.create()` can use a multitude of data types to **create** an element, these include:

- **tag**: *string* (optional), **attributes**: *object* (optional) - a **tag** which defines the type of element with the added **attributes**
- **html**: *string* - a string of **html code** which will be converted into an element
- **attributes**: *object* - an object containing the **attributes** to create an element
- **element**: *HTMLElement | EZComponent* - an existing **element** to create the element from



`ez.create()` also takes in a **clone**: *boolean* parameter at the end which determines whether to **copy** (default) or **clone** the element. when an element is **copied** it keeps its **references**, which are lost if the element is **cloned**. you can also call `element.clone()` to **clone** an element. if an element is **copied** and added to the **dom**, when you attempt to `ez.select()` the element it causes issues, this can be avoided by **cloning** the element instead.



an example of **creating** elements using the methods shown above (in order):

```js
ez.create("p") // > p
ez.create("p", {id: "test"}) // > p#test
ez.create("<p id='test'>Hello World!</p>") // > p#test "Hello, World!"
ez.create({tag: "p", id: "test"}) // > p#test
ez.create(ez.create("p", {id: "test"}).text("Hello, World!")) // > p#test "Hello, World!"
```



### select

`ez.select()` can use a multitude of data types to **select** an element, these include:

- **querySelector**: *string* - a **string** which follows the selector api rules.
- **tag**: *string* (optional), **attributes**: *object* (optional) - a **tag** which defines the type of element with the added **attributes**
- **html**: *string* - a string of **html code** which will be converted into an element
- **attributes**: *object* - an object containing the **attributes** to create an element
- **element**: *HTMLElement | EZComponent* - an existing **element** to create the element from



### template

**templates** are a form of `EZComponent` which allow for the **creation** of **unlinked** elements. elements created using a **template** are initialised with the **template's** **attributes**, but if the **template** or elements are later changed, they don't affect each other.



to **create** a **template** you use `ez.template()` which takes in:

- **base**: *HTMLElement | EZComponent* - the **base** element to create the template from
- **func**: *function* (optional) - a **func** to use as the new make function



the `ez.template()` function **returns** an element which can then be used to **create** **copies** with. to **create** a **copy** of the **template** use:

```js
let test = ez.create("p", {id: "test"}).text("Hello, World!") // > p#test "Hello, World!"
let temp = ez.template(test) // > p#test "Hello, World!"

temp.clone().text("Whoop") // > p#test "Whoop"
ez.make(temp) // > p#test "Hello, World!"
```



### component

before an element can be **modified** like an `EZComponent` it must either be **created** or **selected** using `ez.create()` or `ez.select()` respectively:

```js
ez.create("p") // > p
/* or */
ez.select("p") // > p
```

**components** contain definitions which allow for it to be **modified** properly, which is why it is necessary for this step to be taken before treating them like an `EZComponent`.



#### comp.tag()

this takes in no parameters and **returns** the element's **tag**



#### comp.id() | comp.ezid() | comp.ezuid()

these take in:

- **id**: *string* (optional)

if the **id** is passed, the function changes the element's **id**/**ez-id**/**ez-uid** respectively, otherwise it **returns** the value



*note: it's not recommended to change the **components** **ez-id** or **ez-uid** as it can break certain functionalities and/or references*



#### comp.className()

this takes in:

- **className**: *element.className* (optional)

if the **className** is passed, the element's **className** is set to the passed **className**, otherwise it **returns** the element's **className**



#### comp.html() | comp.text() | comp.raw()

these take in:

- **text**: *string* (optional)

if the **text** is passed, the element's **innerHTML** (`comp.html()` and `comp.text()`) or **outerHTML** (`comp.raw()`) is set to the passed **text**, otherwise it **returns** the element's **innerHTML** or **outerHTML**
