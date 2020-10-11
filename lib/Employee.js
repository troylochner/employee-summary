// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name,id,email){
        this.id = id ; 
        this.name = name ; 
        this.email = email
    }

    getName(){
        console.log(this.name);
        return this.name
    }; 

    getID(){
        console.log(this.id);
        return this.id
    }; 

    getEmail(){
        console.log(this.email);
        return this.Email
    }

    getRole(){
        console.log(this.role);
        return this.role  
    }

};

module.exports = Employee ;


const x = new Employee(1,'Troy Lochner','troy.lochner@wwecorp.com') ;
x.getName()
x.getID()
x.getEmail()
x.getRole()

