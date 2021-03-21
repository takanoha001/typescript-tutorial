import React from 'react';


class Person {
  name: string;
  age: number;

  constructor(name: string, age: number){
    this.name = name;
    this.age = age;
  }

  public show():string{
    return this.prt();
  }

  private prt():string{
    return `${this.name} is ${this.age} years old.`;
  }
}



class TestObject extends React.Component {

  testFunction():string{
    let p = new Person("lala", 123);
    return p.name;
  }
  
  render()
  {
   return <div> hello {`${this.testFunction()}`}</div>;
   }
  
  
}
 
 export default TestObject;
 