'use strict';
var inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

console.log('Hi, welcome to the readme generator!');

function promptUser() {

    return inquirer.prompt([
        {
        type: 'input',
        name: 'title',
        message: 'Please enter a project title.',
        default: 'Project Title',
        },
        {
        type: "checkbox",
        message: "Please select a license:",
        choices: [
            "Apache",
            "MIT",
            "ISC",
            "GNU GPLv3"
        ],
        name: "license"
        },
        {
        type: 'input',
        name: 'description',
        message: 'Please enter a project description',
        default: 'Project Description',
        },
        {
        type: 'input',
        name: 'usage',
        message: 'Please enter project usage info',
        default: 'Project Usage info',
        },
        {
        type: 'input',
        name: 'contribution',
        message: 'Please enter project contribution guidelines',
        default: 'Project Contribtion Guidlines',
        },
        {
        type: 'input',
        name: 'test',
        message: 'Please enter a project test instructions',
        default: 'Project Test Instructions',
        },
        {
        type: 'input',
        name: 'github',
        message: 'Please your Github profile name',
        },
        {
        type: 'input',
        name: 'email',
        message: 'Please your email address',
        },
    ]);
} 


const generateReadMe = (response) => {
    return `# ${response.title}
![License](https://img.shields.io/badge/License-${response.license}-blue.svg "License Badge")

### Table Of Contents

[Description](#description)

[Usage](#usage-info)

[Contribution Guidelines](#contribution-guidelines)

[Test Info](#test-info)

[Questions](#questions)

#### Description:

${response.description}

#### Useage Info:

${response.usage}

#### Contribution Guidelines:

${response.contribution}

#### Test Info:

${response.test}

#### Questions:

[https://github.com/${response.github}](https://github.com/${response.github})


Email: ${response.email}`;
}
  
async function init() {
    try {
        const response = await promptUser();

        const readMe = generateReadMe(response);

        await writeFile("output/README.md", readMe);
        console.log("success!");
    } catch (err){
        console.log(err);
    }
}

init();


