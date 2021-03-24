import { spawnSync, spawn } from "child_process";
import { notDeepEqual } from "node:assert";
import { pathToFileURL } from "url";

const kill = require ('tree-kill');

console.log('------ start program ------ ');

/************************ todo /************************/

/**
features:
- search the jacktrip and jackd path and store in the path variable
- output the log to some kind of buffer 
- programatically find out if jacktrip is running or not

functions:
x- start jacklsp (programatically find out if jackd is running or not with jacklsp)
x- check version info for jackd and jacktrip 
x- start jackdmp 
x- start jacktrip
- killing mechanism to kill all the offspinrg with "tree-kill". store pids used for jackd and jacktrip 


 */
/************************ DEBUG FUNCTIONS begin /************************/

// let SleepAndKill = (pid: number, sleepMilliSec: number) => {
//   console.log(pid +' sleep -- a' + sleepMilliSec);
//   setTimeout(() => {
    
//     setTimeout(() => {
//         console.log(pid +'sleep -- x');
//         console.log(pid +'=== killing: ' + pid);
//         console.log(pid +'typeof ..: '+typeof(pid));
//         kill(pid);
//         console.log(pid +'=== killed');
//     }, 3000);
//   }, sleepMilliSec);

//   console.log(pid +'sleep -- x' + sleepMilliSec);
// }



/**
 * callSpawn
 * 
 * eg.
 * 
 
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

 */
// let callSpawn = () =>{

//   const cmd = "bash";
//   const params = ['sleep.sh', "312"];

//   console.log("callSpawn -a");
//   const chd = spawn(cmd, params);

//   chd.stdout.on('data', (chunk: string | any[]) => {
//    console.log(new Date() + ":  " + chunk.toString()) //prints 1,2,3,4 properly
//   }) 
//   console.log("callSpawn -x");
//   return {
//       command: `command:  ${cmd} ${paramsToString(params)}`,
//       pid: chd.pid
//   };
// }


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
// let callSpawnSync = () =>{

//   let cmd = "ls";
//   let params = ["-a",  "-l", "-F"];

//   console.log("callSpawnSync -a");
//   const chd = spawnSync(cmd, params);
//   console.log("callSpawnSync -b");

//   return {
//       command: `command:  ${cmd} ${paramsToString(params)}`,
//       pid: chd.pid,
//       output: chd.output.toString()
//   };
// }



let SleepTimeoutKill = (sleepInMs:number, pid:number) => {

  setTimeout(function () {
    console.log(pid +'=== SleepTimeoutKill -- x');
    console.log(pid +'=== killing: ' + pid);
    let a = kill(pid);
    console.log(pid +'=== killed ' + a);

  }, sleepInMs); 
}


/**---------------------------------------------------------------------------------------- */

//////// garbage
/**
 *  for the first time it works but for the 2nd run it doesn't... why ?
 *  jackd: prints  CoreAudio driver is running... then we can call jacktrip ?
 *  jacktrip
 */
// function main1 () {

//   console.log ("----------- jackd start ---------------");
//   let spawnProcess1 = JackdStart();
//   console.log("pid: "+ spawnProcess1.pid);
//   console.log("command: "+ spawnProcess1.command);
//   let s = SleepAndKill(spawnProcess1.pid, 15000);
  
//   console.log ("-----------1 consume some time ---------------");
//   for (let i = 0; i < 10000000; i++) {
//     let a = i+i;
//   }
//   console.log ("-----------1 jacktrip start ---------------");
//   let spawnProcess = JackTripStart();
//   console.log("pid: "+ spawnProcess.pid);
//   console.log("command: "+ spawnProcess.command);
//   let lala = SleepAndKill(spawnProcess.pid, 5000);

// }


/************************ DEBUG FUNCTIONS end /************************/


/************************ PUBLIC FUNCTIONS begin /************************/

/**
 * paramToString
 * 
 * convert string array to a string
 * 
 * @param params string array
 */
const paramsToString = (params: string[]) => {
    return params.toString().replace(/\,/g, " ");
  };

/**
 * JackdVersion
 * 
 * returns jackd version
 */
let JackdVersion = () =>{
  let cmd = "jackd";
  let params = ["-v"];

  const chd = spawnSync(cmd, params);

  //eg. ",jackdmp 1.9.11" we want 1.9.11
  const words = chd.output.toString().split(' ');
  const version = words[1].replace('Copyright','').replace(/(^[ \t]*\n)/gm, "");

  return version;
}

/**
 * JacktripVersion
 * 
 * returns jacktrip version
 */
let JacktripVersion = () =>{
  let cmd = "jacktrip";
  let params = ["-v"];

  const chd = spawnSync(cmd, params);

  //eg. ",JackTrip VERSION: 1.1" we want 1.1
  const words = chd.output.toString().split(' ');
  const version = words[2].replace('Copyright','').replace(/(^[ \t]*\n)/gm, "");

  return version;
}

/**
 * JackdStart
 * 
 * starts jackdmp
 * 
 * returns: command+args and pid
 * prerequisite: jackd or jackdmp must be installed
 * 
 * 

eg.
let spawnProcess = JackdStart();
console.log("pid: "+ spawnProcess.pid);
console.log("command: "+ spawnProcess.command);
let lala = SleepAndKill(spawnProcess.pid, 10000);

jackd -d coreaudio -p 2 -p 256 -r 48000

 * 
 */
let JackdStart = () =>{
  const cmd = "jackd";
  const params = ['-d', 'coreaudio', '-p', '2', '-p', '256', '-r', '48000',];

  const chd = spawn(cmd, params);

  chd.stdout.on('data', (chunk: string | any[]) => {
   // todo: push this output to a logger
   // console.log(new Date() + ":  " + chunk.toString());
  })
  return {
      command: `command:  ${cmd} ${paramsToString(params)}`,
      pid: chd.pid
  };
}



/**
 * JackTripStart
 * 
 * starts jacktrip
 * 
 * returns: command+args and pid
 * prerequisite: jackd must be started
 * 
 * 
 jacktrip -n 1 -z -q 4 -b 16 -r 1 -C 66.42.72.238

eg.
let spawnProcess = JackdStart();
console.log("pid: "+ spawnProcess.pid);
console.log("command: "+ spawnProcess.command);
let lala = SleepAndKill(spawnProcess.pid, 10000);
 * 
 */
let JackTripStart = () =>{
  const cmd = "jacktrip";
  const params = ['-n', '1', '-z', '-q', '4', '-b', '16', '-r', '1', '-C', '66.42.72.238'];

  const chd = spawn(cmd, params);

  chd.stdout.on('data', (chunk: string | any[]) => {
  // todo: push this output to a logger
   //console.log(new Date() + ":  " + chunk.toString());
  })
  return {
      command: `command:  ${cmd} ${paramsToString(params)}`,
      pid: chd.pid
  };
}

/**
 * IsJackServerRunning
 * 
 * check if jackd is running successfully or not
 * 
 */
export const IsJackServerRunning = () => {
  // jack_lsp will return an error if jack server isn't running
  const cmd = "jack_lsp";
  const proc = spawnSync(cmd);
  return proc.status === 0;
};




/**
 *  working example
 * 
 * notes:
 * - from the console jacktrip pid is seen but not jackdmp pid. 
 *   this node process probably contains jackdmp pid
 * - killing the process used to run this command works to kill
 * 
 * hack:
 * - because it asynchronously call jacktrip jacktrip_pid won't be updated.
 * killing jackd pid actually kills jacktrip as well - is it meant to be ?
 * 
 */
function main2 (){

  let jackd_pid = 99;
  let jacktrip_pid = 99;


  console.log ("----------- jackd start ---------------a ");
  let spawnProcess1 = JackdStart();
  console.log("=== pid jackd "+ spawnProcess1.pid)

  jackd_pid = spawnProcess1.pid;

  let i = 0;
  let a = setInterval( () => {
    if(IsJackServerRunning()){
      console.log("running ")
      let spawnProcess = JackTripStart();
      clearInterval(a); 

      jacktrip_pid = spawnProcess.pid;
      console.log("=== pid jacktrip "+ spawnProcess.pid + "  " +jacktrip_pid)
      console.log("out of interval")
    }
  }, 1000); //every one second check to see if it is runnning or not

  console.log(" &&&&&&&&&&&&  jacktrip pid to be killed in 10 sec: pid= " + jacktrip_pid);
  SleepTimeoutKill(10000, jacktrip_pid);

  console.log(" &&&&&&&&&&&&  jackd pid to be killed in 20 sec: pid= " + jackd_pid);
  SleepTimeoutKill(20000, jackd_pid);


console.log ("----------- jackd end ---------------x");
}

// works
function main3(){
  console.log(JacktripVersion());
  console.log(JackdVersion());
}

/**---------------------------------------------------------------------------------------- */


//////////

main3();
main2();