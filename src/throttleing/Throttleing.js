import React, { useState, useCallback, useRef, useEffect, Fragment } from 'react';
import { throttle } from "lodash"
import axios from 'axios';
import useThrottle from './useThrottle'
import { OutlinedInput, Typography } from '@mui/material';

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
        console.log(inputVal)
        try {
            if (inputVal !== '') {
                const { data } = await axios.get(`${BASE_URL}${inputVal}`);
                setData(data)
            } else {
                console.log('initial')
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleSearch = useCallback(throttle(inputVal => fetchNameResults(inputVal), 500), []);

    useEffect(() => {
        fetchNameResults()
        console.table(data);
    }, [/* data */]);

    return (
        <Fragment>
            <Typography>Throttleing</Typography>
            <OutlinedInput fullWidth onChange={(event) => handleSearch(event.target?.value)} />
        </Fragment>
    )
}

export default Throttleing