// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name,id,email){
        this.id = id ; 
        this.name = name ; 
        this.email = email
    }

    getName(){
        return this.name
    }; 

    getId(){
        return this.id
    }; 

    getEmail(){
        return this.email
    }

    getRole(){
        if (this.Role === undefined){
            return 'Employee'
        } else {
            return this.Role
        }
    }

};

module.exports = Employee ;

/*
const x = new Employee(1,'Troy Lochner','troy.lochner@wwecorp.com') ;
x.getName()
x.getId()
x.getEmail()
x.getRole()
*/

