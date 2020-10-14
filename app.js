//LIB MODULES
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//ADDITIONAL NODE MODULES
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//DEFINING OUTPUT
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

//ITTERATIVE ID
var xid = 1001

const addUser = () => {
    return inquirer
        .prompt([{
                type: "input",
                message: "Employee Name : ",
                name: "name",
                default: "John Doe"
            },
            {
                type: "input",
                message: "Employee Email",
                name: "email",
                default: "John.Doe@email.com"
            },
            {
                type: "list",
                message: "What is the job role?",
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
                        xid,
                        data.email,
                        data.officeNumber
                    )
                    team.push(addManager);
                    break;
                case "Engineer":
                    console.log('Engineer');
                    const addEngineer = new Engineer(
                        data.name,
                        xid,
                        data.email,
                        data.github
                    )
                    team.push(addEngineer);

                    break;
                case "Intern":
                    console.log('Intern');
                    const addIntern = new Intern(
                        data.name,
                        xid,
                        data.email,
                        data.school
                    )
                    team.push(addIntern);
                    break;
            };
            switch (data.addMore) {
                case "Yes":
                    console.log('Adding another');
                    xid ++;
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
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath,render(team),"utf-8");
}

addUser();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```