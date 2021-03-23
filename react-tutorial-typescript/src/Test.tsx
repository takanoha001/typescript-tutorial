import { spawnSync } from "child_process";
import { SSL_OP_EPHEMERAL_RSA } from "constants";

const childProcess = require('child_process');
const { spawn } = require('child_process')

const kill = require ('tree-kill');

console.log('------ start program ------ ');

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

// GOOD
//
// let pid = callCommandSpawn();
// console.log("pid: "+ pid);

// console.log('lalala --- a');
// setTimeout(() => {
//     console.log('sleep -- a');
//     setTimeout(() => {
//         console.log('sleep -- x');
        
//         console.log('=== killing: ' + pid);
//         console.log('typeof ..: '+typeof(pid));
//         kill(pid);

//         console.log('=== killed');
//     }, 5000);
// }, 2000);


console.log('------ end of program ------ ');
