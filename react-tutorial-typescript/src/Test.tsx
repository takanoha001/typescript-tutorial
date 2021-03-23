import { spawnSync } from "child_process";
import { SSL_OP_EPHEMERAL_RSA } from "constants";

const childProcess = require('child_process');
const { spawn } = require('child_process')

const kill = require ('tree-kill');

console.log('------ start program ------ ');

const paramsToString = (params: string[]) => {
    return params.toString().replace(/\,/g, " ");
  };

//const { exec, execSync, spawn, spawnSync } = require("child_process");

/**
sleep.sh

      a=0
      while [ $a -lt 1000  ]
      do
          sleep 1
          echo $a
          a=`expr $a + 1`
      done
 */

let cmd = "bash sleep.sh";

// ----- Spawn ----- a
// STDOUT [object Object]
// STDERR [object Object]
// ----- Spawn ----- x
// console.log("----- Spawn ----- a");
// const spawn = childProcess.spawn('$cmd', { shell: true });
// console.log('STDOUT', spawn.stdout.toString());  // Buffer
// console.log('STDERR', spawn.stderr.toString());  // Buffer
// console.log("----- Spawn ----- x");

// can't find it from "ps -al"
// ----- spawnSync ----- a
// STDOUT 
// STDERR 
// ----- spawnSync ----- x
// console.log("----- spawnSync ----- a");
// const spawn = childProcess.spawnSync('$cmd', { shell: true });
// console.log('STDOUT', spawn.stdout.toString());  // Buffer
// console.log('STDERR', spawn.stderr.toString());  // Buffer
// console.log("----- spawnSync ----- x");


// ps displays
// console is taken
// callCommand('bash sleep.sh');
// function callCommand(command: string){
//     childProcess.exec(command, (error: { message: any; }, stdout: any, stderr: any) => {

//     //callback so after this command ends then the following will get called
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });  
// }

let callCommandSpawn = ():number =>{
    console.log("callCommandSpawn -a");

    const chd = spawn('bash', ['sleep.sh']);
    //const chd = spawn('bash sleep.sh'); //error

    console.log('process id: ' + process.pid + " typeof:"+ typeof(process.pid));
    console.log('child process id:' + chd.pid + " typeof:"+ typeof(chd.pid));

    //callback
    chd.stdout.on('data', (chunk: string | any[]) => {
    //  console.log(new Date())
    //console.log(chunk.length) //prints 2, 3,...
     console.log(new Date() + ":  " + chunk.toString()) //prints 1,2,3,4 properly
    }) 

    console.log("callCommandSpawn -x");

    return chd.pid;
}
 

//prints 
let callCommandSpawnSync = ():number =>{
    console.log("callCommandSpawnSync -a");
    //const chd = spawnSync('bash', ['sleep.sh']); //this will be stuck
    const chd = spawnSync('ls', ['-alF']);
    console.log('process id: ' + process.pid + " typeof:"+ typeof(process.pid));
    console.log('child process id:' + chd.pid + " typeof:"+ typeof(chd.pid));
    //console.log('chd.output.toString()', chd.output.toString());  // this results the same as ls -alF output
    // console.log('STDOUT', chd.stdout.toString());  // ls -alF output
    // console.log('STDERR', chd.stderr.toString());  // empty
    // console.log('chd.output', chd.output);  // <Buffer 232 23 23 23 22 bytes >  
    // console.log('chd.signal?.toString()', chd.signal?.toString());  // undefined 
    // console.log('chd.signal', chd.signal);  // nul 

    console.log("callCommandSpawnSync -b");

    return chd.pid
}


let callSpawn = () =>{

    const cmd = "bash";
    const params = ['sleep.sh', "312"];

    console.log("callSpawn -a");
    const chd = spawn(cmd, params);

    chd.stdout.on('data', (chunk: string | any[]) => {
     console.log(new Date() + ":  " + chunk.toString()) //prints 1,2,3,4 properly
    }) 
    console.log("callSpawn -x");
    return {
        command: `command:  ${cmd} ${paramsToString(params)}`,
        pid: chd.pid
    };
}


/**
 * callSpawnSync 
 * 
 * eg.
 
let spawnProcess1 = callSpawnSync();
console.log("pid: "+ spawnProcess1.pid);
console.log("command: "+ spawnProcess1.command);
console.log("output: "+ spawnProcess1.output);

// would print
pid: 9781
command: command:  ls -a -l -F
output: ,total 240
drwxr-xr-x  26 Dicekay  staff    884 23 Mar 21:40 ./
drwxr-xr-x  11 Dicekay  staff    374 17 Mar 20:59 ../

 * 
 */
let callSpawnSync = () =>{

    let cmd = "ls";
    let params = ["-a",  "-l", "-F"];

    console.log("callSpawnSync -a");
    const chd = spawnSync(cmd, params);
    console.log("callSpawnSync -b");

    return {
        command: `command:  ${cmd} ${paramsToString(params)}`,
        pid: chd.pid,
        output: chd.output.toString()
    };
}



//GOOD

//var pa:string[] = new Array ("-l", "-f");





let spawnProcess = callSpawn();
console.log("pid: "+ spawnProcess.pid);
console.log("command: "+ spawnProcess.command);


console.log('lalala --- a');
setTimeout(() => {
    console.log('sleep -- a');
    setTimeout(() => {
        console.log('sleep -- x');
        
        console.log('=== killing: ' + spawnProcess.pid);
        console.log('typeof ..: '+typeof(spawnProcess.pid));
        kill(spawnProcess.pid);

        console.log('=== killed');
    }, 5000);
}, 2000);


console.log('------ end of program ------ ');
