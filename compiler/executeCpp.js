// server/compiler/executeCpp.js

// --- Change these lines ---
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// --- Add these lines ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

export const executeCpp = (filepath, input) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);

    return new Promise((resolve, reject) => {
        const command = `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && ".\\${jobId}.exe"`;

        const child = exec(command, (error, stdout, stderr) => {
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

// --- Remove the old module.exports line ---