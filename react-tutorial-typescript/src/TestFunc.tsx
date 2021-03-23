import React from 'react';

/**
 * 
 * functions
 * 
 */

function triangleA(base: number, height: number): number{
  return base* height/2;
}

let triangleB = function(base: number, height: number): number {
  return base* height /2;
}

let triangleC: (base: number, height: number) => number = 
function(base: number, height: number):number{
  return base* height /2;
}

//** const is faster
let triangleD = (base: number, height: number): number =>{
  return base* height /2;
}


// let pad = padding(1,2,3,4);

// console.log("pad.bottom: " + pad.bottom?.toString()); //returns 3
function padding(a: number, b?: number, c?: number, d?: any) {
  if (b === undefined && c === undefined && d === undefined) {
      b = c = d = a;
  }
  else if (c === undefined && d === undefined) {
      c = a;
      d = b;
  }
  return {
      top: a,
      right: b,
      bottom: c,
      left: d
  };
}



// prints  [undefined]
function showMessageNullCheck(message?:string){
  return `showMessageNullCheck =[${message}]`;
}

// error
function showMessageWONullCheck(message:string){
  return `showMessageWONullCheck =[${message}]`;
}

// infinite input parameters
function sum(...values: number[]){
  let result =0;
  for (let value of values){
    result += value;
  }
  return result;
}

//overload 
function show(value: number): void; //return void
function show(value: boolean): void;
function show(value: any): void{
  if(typeof value === 'number'){
    console.log(value.toFixed(0));
  }else{
    console.log(value? `true`:`false`);
  }
}

function TestFunc() {
 

  let pad = padding(1,2,3,4);


  return (
    <div className="TestFunc">
      <header className="TestFunc-header">
    <p>
      {triangleA(3,5)}
      <br/>
      {triangleB(3,5)}
      <br/>
      {triangleC(3,5)}
      <br/>
      {triangleD(3,5)}
      <br/>
      {"arrow function is the simplest"}
      <br/>
      {showMessageNullCheck()} {"this prints [undefined]"}
      <br/>
      {sum(1,2,3,4,5)}
      <br/>
      {show(10.123)}
      <br/>
      {show(false)}
      <br/>
      {pad.bottom?.toString() + " " + pad.top?.toString() }
    </p>
      </header>
    </div>
  );
}

export default TestFunc;
