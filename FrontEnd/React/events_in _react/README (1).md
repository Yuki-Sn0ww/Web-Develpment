# Handling Events in React

## 1. In Vanilla JS

```js
document.querySelector("button").addEventListener("click", handleClick)
```

## 2. In React

```jsx
const handleClick = () => {
  alert("Hey I am clicked")
}

<button onClick={handleClick}>Click me</button>
```

Other events:

```jsx
onMouseOver={handleMouseOver}
onKeyDown={handleKeyDown}
onSubmit={handleSubmit}
```

## 3. The Input Event

```jsx
const [name, setName] = useState("Harry")

<input type="text" value={name} />
```

Input cannot be edited until you update the state.

### Solution

```jsx
const handleChange = (e) => {
  setName(e.target.value)
}

<input type="text" value={name} onChange={handleChange} />
```

- `e` → the event object given by the browser
- `e.target` → the input element which is changed
- `e.target.value` → whatever is currently typed

## 4. If There Are Multiple Inputs, Code Becomes Repeated

So do it like this:

```jsx
<input type="text" name="email" value={form.email} onChange={handleChange} />
<input type="text" name="phone" value={form.phone} onChange={handleChange} />
```

Make a single state as an object for both:

```js
const [form, setForm] = useState({ email: "", phone: "" })
```

Single handle function:

```js
const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value })
}
```
