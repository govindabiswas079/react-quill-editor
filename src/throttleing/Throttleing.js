import React, { useState, useCallback, useRef, useEffect } from 'react';
import { throttle } from "lodash"
import axios from 'axios';
import useThrottle from './useThrottle'

const BASE_URL = `https://api.nationalize.io/?name=`;

// const throttle = (func, wait = 200) => {
//     let run = false
//     return function (...args) {
//         if (!run) {
//             func(...args)
//             run = true
//             setTimeout(() => run = false, wait)
//         }
//     }
// }

const Throttleing = () => {
    // const { throttle } = useThrottle();
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

    const handleSearch = useCallback(throttle(inputVal => fetchNameResults(inputVal), 500), []);

    useEffect(() => {
        console.table(data);
    }, [data]);

    return (
        <input onChange={(event) => handleSearch(event.target?.value)} />
    )
}

export default Throttleing