import { useState } from "react";

const useThrottle = (func, delay) => {
    const [timeout, saveTimeout] = useState(null);

    const throttle = (func, wait) => (...args) => {
        if (timeout) {
            clearTimeout(timeout);
        }

        const newTimeout = setTimeout(() => {
            func(...args);
            if (newTimeout === timeout) {
                saveTimeout(null);
            }
        }, delay);
        saveTimeout(newTimeout);
    }

    return { throttle };
}

export default useThrottle;