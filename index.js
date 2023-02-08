import { prompt } from "inquirer";
import { writeFileSync } from "fs";
import generateTeam from "./src/page-template.js";


import Engineer from "./lib/Engineer";
import Intern from "./lib/Intern";
import Manager from "./lib/Manager";


const newStaffMemberData = [];


const questions = async () => {
  const answers = await prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your ID number?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your email?",
        name: "email",
      },
      {
        type: "list",
        message: "What is your role?",
        name: "role",
        choices: ["Engineer", "Intern", "Manager"],
      },
    ])


    
  
      if (answers.role === "Manager") {
        const managerAns = await prompt([
            {
              type: "input",
              message: "What is your office number",
              name: "officeNumber",
            },
          ])
          const newManager = new Manager(
            answers.name,
            answers.id,
            answers.email,
            managerAns.officeNumber
          );
          newStaffMemberData.push(newManager);
          
     
      } else if (answers.role === "Engineer") {
        const githubAns = await prompt([
            {
              type: "input",
              message: "What is your GitHub user name?",
              name: "github",
            }
          ])
            const newEngineer = new Engineer(
              answers.name,
              answers.id,
              answers.email,
              githubAns.github
            );
            newStaffMemberData.push(newEngineer);
          
     
      } else if (answers.role === "Intern") {
        const internAns = await prompt([
            {
              type: "input",
              message: "What university did you attend?",
              name: "school",
            },
          ])
          
          const newIntern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            internAns.school
          );
          newStaffMemberData.push(newIntern);          
      } 

}; 

async function promptQuestions() {
  await questions()
    
  
  const addMemberAns = await prompt([
      {
        name:'addMember',
        type: 'list',
        choices: ['Add a new member', 'Create team'],
        message: "What would you like to do next?"
      }
    ])

    if (addMemberAns.addMember === 'Add a new member') {
      return promptQuestions()
    }
    return createTeam();
}  

promptQuestions();

function createTeam () {
  console.log("new guy", newStaffMemberData)
  writeFileSync(
    "./output/index.html",
    generateTeam(newStaffMemberData),
    "utf-8"
  );
}