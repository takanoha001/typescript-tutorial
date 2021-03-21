import React from 'react';


function show (result: string){
  return `show() ${result}`;
}


/**
 * 
 * types
 * 
 */

function TestTypes() {

let name: string ="string-test";
let num: number = 3;
let bol: boolean = true;
let ha: any = "string-test2";

let dataArr = [name, num,bol, ha];
const NAME: string = "Daisuke";

enum Color {
  Red = "Red",
  Green = "Green",
  Blue = "Blue",  
}

let col:Color = Color.Blue;
let tupleData: [string, number, boolean] = ["name",1234,true];

//special types
let data: string| boolean;
data= 'abc'; //ok
data= false; //ok

//abc123abc
let data1: (string| number)[] = ['abc', 123, 'abc'];

//overload union
function square(value: number):number | boolean {
  if (value < 0){
    return false;
  }
  else{
    return Math.sqrt(value);
  }
}

  return (
    <div className="TestTypes">
      <header className="TestTypes-header">
    <p>

      {name} {/** string-test */} 
      <br/> 
      {dataArr[0]} {/** string-test */}
      <br/>
      {ha} {/** string-test2 */}
      <br/>
      {show("i am funny.")} {/** show() i am funny */}
      <br/>
      {NAME} {/** Daisuke */}
      <br/>
      {col}  {/** blue */}
      <br/>
      {tupleData[0] }{" "} {tupleData[1] }{" "} {tupleData[2].toString() }{" "}  {/** name 1234 true */}
      <br/>
      {data1}
      <br/>
      {square(3)}
      <br/>
     
    </p>
      </header>
    </div>
  );
}

export default TestTypes;
