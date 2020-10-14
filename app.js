//LIB MODULES
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//ADDITIONAL NODE MODULES
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

//DEFINING OUTPUT
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");


//START USERID AT 1001 AND MAKE AN EMPTY TEAM ; USERIDS WILL BE AUTOMATICALLY GENERATED - THIS WILL AVOID ANY POTENTIAL DUPLICATES FROM BEING CREATED ; switching ids to uuids to be extra.
const team = [];
//var userID = 1001

const addUser = () => {
    return inquirer
        .prompt([{
                type: "list",
                message: "What type of user would you like to add?",
                name: "roleType",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern"
                ],
                default: "Employee"
            },
            {
                type: "input",
                message: "Employee Name : ",
                name: "name",
                default: "John Doe"
            },
            {
                type: "input",
                message: "Employee Email",
                name: "email",
                default: "John.Doe@email.com",
                //EMAIL VALIDATION REGEX CREDIT GOES TO Amitabh-K ON GITHUB @ https://gist.github.com/Amitabh-K/ae073eea3d5207efaddffde19b1618e8
                validate : function (email){
                    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

                    if (valid) {
                          return true;
                      } else {
                          console.log(".  Please enter a valid email")
                          return false;
                      }
                }
                
            },

            {
                type: "input",
                message: "Office Extension : ",
                name: "officeNumber",
                default: "3345",
                when: (answers) => answers.roleType === 'Manager'
            },
            {
                type: "input",
                message: "GitHub UserName : ",
                name: "github",
                default: "troylochner",
                when: (answers) => answers.roleType === 'Engineer'
            },
            {
                type: "input",
                message: "University: ",
                name: "school",
                default: "St. John's",
                when: (answers) => answers.roleType === 'Intern'
            },
            {
                type: "list",
                message: "Would you like to add another team member?",
                name: "addMore",
                choices: [
                    "Yes",
                    "No"
                ],
                default: "Yes"
            }
        ])
        .then((data) => {
            switch (data.roleType) {
                case "Manager":
                    console.log('Manager');
                    const addManager = new Manager(
                        data.name,
                        uuid.v4(),
                        data.email,
                        data.officeNumber
                    )
                    team.push(addManager);
                    break;
                case "Engineer":
                    console.log('Engineer');
                    const addEngineer = new Engineer(
                        data.name,
                        uuid.v4(),
                        data.email,
                        data.github
                    )
                    team.push(addEngineer);

                    break;
                case "Intern":
                    console.log('Intern');
                    const addIntern = new Intern(
                        data.name,
                        uuid.v4(),
                        data.email,
                        data.school
                    )
                    team.push(addIntern);
                    break;
            };
            switch (data.addMore) {
                case "Yes":
                    console.log('Adding another');
                    //userID++;
                    addUser();
                    break;
                case "No":
                    console.log('Stopping');
                    console.log(team);
                    console.log("This is where HTML should get rendered.")
                    renderHTML();
                    //RENDER HTML;
                    break;
            }

        })
}
const renderHTML = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(team), "utf-8");
}
addUser();