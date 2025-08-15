// server/compiler/executeCode.js
import { exec } from "child_process";

export const executeCode = (filepath, input, language) => {
    // The Docker image name we built earlier (e.g., "cpp-runner")
    const imageName = `${language}-runner`;

    // The name of the file inside the container
    const codeFileName = `code.${language}`;

    // This is the corrected and simplified Docker command.
    // It mounts your specific code file directly to the expected path inside the container.
    const dockerCommand = `docker run --rm -i --memory="256m" --cpus="0.5" -v "${filepath}":"/usr/src/app/${codeFileName}" ${imageName}`;

    return new Promise((resolve, reject) => {
        // We set a 5-second timeout directly in the exec options.
        const child = exec(dockerCommand, { timeout: 5000 }, (error, stdout, stderr) => {
            if (error) {
                if (error.killed) {
                    return reject("Time Limit Exceeded");
                }
                return reject({ error, stderr });
            }
            if (stderr) {
                return reject(stderr);
            }
            resolve(stdout);
        });

        // Pipe the test case input directly to the container's standard input.
        child.stdin.write(input);
        child.stdin.end();
    });
};