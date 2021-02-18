const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const employees = []

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

start()
// Write code to use inquirer to gather information about the development team members,
function start() {
    welcome();
    inquirer.prompt({
        name: "startOption",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add a new Employee", "Exit"]
    })

    .then(function(answer) {
        console.clear();

        // ADD NEW EMPLOYEE
        if (answer.startOption === "Add a new Employee") {
            addEmployee()
        }
    })


}
// =============================
// ADD EMPLOYEE FUNCTION
// =============================

function addEmployee(){
    console.clear();
    employeeWelcome();
    inquirer.prompt({
        name: "employeeType",
        type: "list",
        message: "What position will the employee have",
        choices: ["Engineer", "Intern", "Manager"]
    })

    .then(function(answer) {
        const type = answer.employeeType;
        console.clear();
            console.log("You selected '" + type +"'")
            if (type === "Engineer") {
                inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "what is the employee's name?"
                    },
                    {
                        name: "id",
                        type: "input",
                        message: "What is their ID number?"   
                    },
                    {
                        name: "email",
                        type: "input",
                        message: "what is the employee's email?"
                    },
                    {
                        name: "github",
                        type: "input",
                        message: "what is the employee's github name?  It will display as 'https://github.com/GITHUBNAME'"
                    },
                ])
                .then(function(answer) {
                    let github = ("https://github.com/" + answer.github)
                    console.log(answer.name + " " + answer.id + " " + answer.email + " " + github)
                    let employee = new Engineer(answer.name, answer.id, answer.email, github);
                    
                    employees.push(employee)
                    console.log(employee)
                    inquirer.prompt({
                        name: "another",
                        type: "list",
                        message: "Would you like to add another employee?",
                        choices: ["Yes", "No"]
                    })

                    .then(function(answer) {
                        if (answer.another === "Yes") {
                            addEmployee();
                        } else {
                            renderHtml();
                                console.log("File is created successfully")
                        }
                    })
                })

            } else if (type === "Intern") {
                inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "what is the interns name?"
                    },
                    {
                        name: "id",
                        type: "input",
                        message: "What is the intern's ID number?"   
                    },
                    {
                        name: "email",
                        type: "input",
                        message: "what is the intern's email?"
                    },
                    {
                        name: "school",
                        type: "input",
                        message: "what is the intern's school's name?"
                    },
                ])
                .then(function(answer) {
                    console.log(answer.name + " " + answer.id + " " + answer.email + " " + answer.school)
                    let employee = new Intern(answer.name, answer.id, answer.email, answer.school);
                    
                    employees.push(employee)
                    console.log(employee)
                    inquirer.prompt({
                        name: "another",
                        type: "list",
                        message: "Would you like to add another employee?",
                        choices: ["Yes", "No"]
                    })

                    .then(function(answer) {
                        if (answer.another === "Yes") {
                            addEmployee();
                        } else {
                            renderHtml();
                            console.log("File is created successfully")
                        }
                    })
                })
            } else if (type === "Manager") {
                inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "what is the manager's name?"
                    },
                    {
                        name: "id",
                        type: "input",
                        message: "What is the mangager's ID number?"   
                    },
                    {
                        name: "email",
                        type: "input",
                        message: "what is the manager's email?"
                    },
                    {
                        name: "officeNumber",
                        type: "input",
                        message: "what is the manager's office number?"
                    },
                ])
                .then(function(answer) {
                    console.log(answer.name + " " + answer.id + " " + answer.email + " " + answer.officeNumber)
                    let employee = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
                    
                   employees.push(employee)
                    console.log(employee)
                    inquirer.prompt({
                        name: "another",
                        type: "list",
                        message: "Would you like to add another employee?",
                        choices: ["Yes", "No"]
                    })

                    .then(function(answer) {
                        if (answer.another === "Yes") {
                            addEmployee();
                        } else {
                            renderHtml();
                                console.log("File is created successfully")
                            }
                        }
                    )
                })
            }
            
            

    })
}

function welcome(){
    console.clear();
    console.log(".----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------. ");
    console.log("| .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |");
    console.log("| | _____  _____ | || |  _________   | || |   _____      | || |     ______   | || |     ____     | || | ____    ____ | || |  _________   | |");
    console.log("| ||_   _||_   _|| || | |_   ___  |  | || |  |_   _|     | || |   .' ___  |  | || |   .'    `.   | || ||_   \\  /   _|| || | |_   ___  |  | |");
    console.log("| |  | | /\\ | |  | || |   | |_  \\_|  | || |    | |       | || |  / .'   \\_|  | || |  /  .--.  \\  | || |  |   \\/   |  | || |   | |_  \\_|  | |");
    console.log("| |  | |/  \\| |  | || |   |  _|  _   | || |    | |   _   | || |  | |         | || |  | |    | |  | || |  | |\\  /| |  | || |   |  _|  _   | |");
    console.log("| |  |   /\\   |  | || |  _| |___/ |  | || |   _| |__/ |  | || |  \\ `.___.'\\  | || |  \\  `--'  /  | || | _| |_\\/_| |_ | || |  _| |___/ |  | |");
    console.log("| |  |__/  \\__|  | || | |_________|  | || |  |________|  | || |   `._____.'  | || |   `.____.'   | || ||_____||_____|| || | |_________|  | |");
    console.log("| |              | || |              | || |              | || |              | || |              | || |              | || |              | |");
    console.log("| '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |");
    console.log("'----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------' ");   
}

function employeeWelcome() {
    console.log("   __    ____   ____     ____  __  __  ____  __    _____  _  _  ____  ____ ");
    console.log("  /__\\  (  _ \\ (  _ \\   ( ___)(  \\/  )(  _ \\(  )  (  _  )( \\/ )( ___)( ___)");
    console.log(" /(__)\\  )(_) ) )(_) )   )__)  )    (  )___/ )(__  )(_)(  \\  /  )__)  )__) ");
    console.log("(__)(__)(____/ (____/   (____)(_/\\/\\_)(__)  (____)(_____) (__) (____)(____)");
}

function renderHtml() {
    let html = render(employees);
    fs.writeFileSync(outputPath, html, function (err) {
    if (err) throw err;}
    );
}





// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above and pass in an array containing all employee objects; the `render` function will
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
