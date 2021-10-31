const q = require('q');
const spawn = require('child_process').spawnSync;
const BufferList = require('bl')
/**
 * Executes shell command as it would happen in BASH script
 * @param {string} command
 * @param {Object} [options] Object with options. Set `capture` to TRUE, to capture and return stdout. 
 *                           Set `echo` to TRUE, to echo command passed.
 * @returns {Promise<{code: number, data: string | undefined, error: Object}>}
 */
module.exports.myExec = function (command, { capture = false, echo = true } = {}, path = null) {
    command = command.replace(/\\?\n/g, ''); // need to merge multi-line commands into one string

    if (echo) {
        let commandLog = command.split("|")
        console.log("------------------Command--------------------");
        console.log(commandLog[1]);
        console.log("---------------------------------------------");
    }
    let dir
    if (path)
        dir = `${process.cwd()}${path}`
    else dir = process.cwd()

    let defer = q.defer()

    try {
        const child = spawn('bash', ['-c', command]);
        // const child = spawn('bash', ['-c', command], { stdio: capture ?  'inherit' : 'pipe', cwd: dir });
        const childPrint = spawn('bash', ['-c', command], { stdio:  'inherit' });

        if(child.status==0){
            defer.resolve({
                stdout: child.stdout.toString()
            })
        }
        else{
            defer.reject({
                stdout: child.stderr.toString()
            })
        }

    } catch (error) {
        defer.reject(error.message)
    }
    return defer.promise;

};