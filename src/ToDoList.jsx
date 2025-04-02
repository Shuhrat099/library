import React from 'react';

const initialList = [
    { id: 'a', name: 'Learn React' },
];

const ToDoList = () => {
    const [list, setList] = React.useState(initialList);
    const [inputText, setInputText] = React.useState('');

    const handleInputChange = ( event ) => {
        setInputText(event.target.value);
    }

    const handleAdd = () => {
        if (inputText.trim()) {
            setList([...list, {id: Date.now(), name: inputText}]);
            setInputText("");
        }
    }

    const handleClick = id => {
        setList(list.filter(item => item.id !== id));
    };

    return (
        <div className="flex flex-col gap-4 items-start p-10">
            <div className="flex gap-3">
                <input type="text" placeholder="Matn kiriting" className="ps-2 outline-none border" value={inputText} onChange={handleInputChange}/>
                <button className="bg-blue-500 px-2 rounded-sm text-white active:scale-90 transition-all duration-300" onClick={handleAdd} >Add</button>
            </div>
            <ul className="flex flex-col gap-4">
                {list.map(item => (
                    <li key={item.id} className="flex gap-4">
                        <label>{item.name}</label>
                        <button type="button" onClick={() => handleClick(item.id)} className="border px-2 rounded-sm">
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;