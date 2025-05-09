import { useState } from "react"

const InputTodo = () => {
    const [count, setCount] = useState(1)

    const handleClick = () => {
        alert("xin chao")
    }

    const handleCount = () => {
        setCount(count + 1);
    }

    return (
        <div>
            <div style={{ display: "flex" }}>
                <label >Count = {count}</label>
                <button onClick={() => handleCount()}>Increase</button>
            </div>
            <h3>Add new todo</h3>
            <div style={{ display: "flex" }}>
                <input type="text"
                    onChange={(event) => {
                        console.log(event.target.value)
                    }}
                />
                <button onClick={() => handleClick()}>Save</button>
            </div>
        </div>
    )
}

export default InputTodo