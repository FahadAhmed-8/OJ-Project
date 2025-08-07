// server/compiler/executeCode.js
import { exec } from "child_process";

export const executeCode = (filepath, input, language) => {
    // The Docker image name we built earlier (e.g., "cpp-runner")
    const imageName = `${language}-runner`;

    // The name of the code file inside the container
    const codeFileName = `code.${language}`;

    // The docker command to run. This is the key part.
    // --rm: Automatically remove the container when it exits.
    // -i: Keep STDIN open so we can pipe input to it.
    // --memory="256m": Limit the RAM the container can use.
    // --cpus="0.5": Limit the CPU usage to half a core.
    // -v: Mounts your code file into the container's filesystem.
    const dockerCommand = `docker run --rm -i --memory="256m" --cpus="0.5" -v "${filepath}":"/usr/src/app/${codeFileName}" ${imageName}`;

    return new Promise((resolve, reject) => {
        // We set a 5-second timeout directly in the exec options.
        const child = exec(dockerCommand, { timeout: 5000 }, (error, stdout, stderr) => {
            if (error) {
                // Check if the error is because the process was killed by the timeout
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

        // This is the most reliable way to pass input.
        // We write the test case input directly to the container's standard input stream.
        child.stdin.write(input);
        child.stdin.end();
    });
};