// server/compiler/executePy.js

import { exec } from "child_process";

export const executePy = (filepath, input) => {
    return new Promise((resolve, reject) => {
        const child = exec(`python "${filepath}"`, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stderr });
            }
            if (stderr) {
                reject(stderr);
            }
            resolve(stdout);
        });

        child.stdin.write(input);
        child.stdin.end();
    });
};