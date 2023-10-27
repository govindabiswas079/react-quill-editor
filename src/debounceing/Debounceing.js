import React, { useState, useCallback, useRef, useEffect } from 'react';
import { debounce } from "lodash"
import axios from 'axios';
import useDebounce from './useDebounce'

const BASE_URL = `https://api.nationalize.io/?name=`;

// const debounce = (func, wait) => {
//     let timeout;
// 
//     return (...args) => {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => func(...args), wait);
//     }
// }

const Debounceing = () => {
    // const { debounce } = useDebounce();
    const [data, setData] = useState();

    const fetchNameResults = async inputVal => {
        try {
            if (inputVal !== '') {
                const { data } = await axios.get(`${BASE_URL}${inputVal}`);
                setData(data)
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleSearch = useCallback(debounce(inputVal => fetchNameResults(inputVal), 500), []);

    useEffect(() => {
        console.table(data);
    }, [data]);

    return (
        <input onChange={(event) => handleSearch(event.target?.value)} />
    )
}

export default Debounceing