// server/compiler/executeCode.js

import { executeCpp } from './executeCpp.js';
import { executePy } from './executePy.js';

export const executeCode = (filepath, input, language = 'cpp') => {
    switch (language) {
        case 'cpp':
            return executeCpp(filepath, input);
        case 'py':
            return executePy(filepath, input);
        default:
            return Promise.reject(new Error(`Language ${language} not supported.`));
    }
};