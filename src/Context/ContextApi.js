import React, { useState, createContext } from 'react';

export const CountContext = createContext();

const CountContextProvider = (props) => {
    const [count, setCount] = useState(1);
    const [initialFlip, setInitialFlip] = useState(false);
    const [totalQtn, setTotalQtn] = useState(0);
    const checkCount = () =>{
       
    }
    return (
        <CountContext.Provider value={{ count, setCount, setInitialFlip, initialFlip }}>
            {props.children}
        </CountContext.Provider>
    );
}

export default CountContextProvider;