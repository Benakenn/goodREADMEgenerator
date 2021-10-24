const fs = require('fs')
const { prompt } = require('inquirer')
const prependFile = require('prepend-file')

const displayContactInformation = title => {

  prompt([
    {
      type: 'input',
      name: `title`,
      message: 'Enter your email: '
    }
  ])
    .then(answers => {
      fs.appendFile('README.md', `\n\n## ${title}\n\nContact me with questions about the project at my contact info below.
  
  - Email: ${answers.title}`, error => {
        if (error) { console.log(error) }
      })
    })

}

// Get contribution guidelines from user.
const getTestInstructions = title => {

  prompt([
    {
      type: 'input',
      name: `title`,
      message: 'Enter testing instructions: '
    }
  ])
    .then(answers => {
      fs.appendFile('README.md', `\n\n## ${title}\n\n${answers.title}`, error => {
        if (error) { console.log(error) }
      })
      // Next function.
      displayContactInformation('Questions')
    })
    .catch(error => console.log(error))

}

// Get contribution guidelines from user.
const getContributionGuidelines = title => {

  prompt([
    {
      type: 'input',
      name: `title`,
      message: 'Enter guidlines to contributing: '
    }
  ])
    .then(answers => {
      fs.appendFile('README.md', `\n\n## ${title}\n\n${answers.title}`, error => {
        if (error) { console.log(error) }
      })
      // Get test instructions from the user.
      getTestInstructions('Tests')
    })
    .catch(error => console.log(error))

}

// Get a license selection from the user, print the selection inside section, and print the badge at the top of the file.
const getLicenseInformation = title => {
  prompt([
    {
      type: 'list',
      name: 'title',
      message: 'Which license would you like to use?',
      choices: ['GitHub MIT', 'Apache-2.0', 'Unlicensed']
    }
  ])
    .then(answers => {
      // Use prepend package to prepend the selected license badge to the top of the file.
      switch (answers.title) {
        case 'GitHub MIT':
          prependFile('README.md', `![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)\n\n`)
          fs.appendFile('README.md', `\n\n## ${title}\n\nThe MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`, error => {
            if (error) { console.log(error) }
          })
          break
        case 'Apache-2.0':
          prependFile('README.md', `![Npm package license](https://badgen.net/npm/license/discord.js)\n\n`)
          fs.appendFile('README.md', `\n\n## ${title}\n\nThe Apach-2.0 License

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`, error => {
            if (error) { console.log(error) }
          })
          break
        case 'Unlicensed':
          prependFile('README.md', `![Unlicense](https://img.shields.io/badge/License-Unlicense-blue.svg)\n\n`)
          fs.appendFile('README.md', `\n\n## ${title}\n\nThis is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.`, error => {
            if (error) { console.log(error) }
          })
          break
      }
      // Get contribution guidelines from the user.
      getContributionGuidelines('Contributing')
    })
    .catch(error => console.log(error))
}

// Function that gets usage information for the project.
const getUsageInformation = title => {

  prompt([
    {
      type: 'input',
      name: `title`,
      message: 'Enter usage information: '
    }
  ])
    .then(answers => {
      fs.appendFile('README.md', `\n\n## ${title}\n\n${answers.title}`, error => {
        if (error) { console.log(error) }
      })
      // Get a license selection from the user.
      getLicenseInformation('License')
    })
    .catch(error => console.log(error))

}

// Function that asks if the user would like to add another bullet point.
const nextBulletPoint = count => {
  console.log(count)
  prompt([
    {
      type: 'confirm',
      name: 'addAnother',
      message: 'Add another bullet point? (y/n): '
    }
  ])
    .then(({ addAnother }) => {
      if (addAnother) {
        getInstallationInstructions('Installation Instructions', count)
      }
      else {
        getUsageInformation('Usage')
      }
    })
    .catch(error => console.log(error))

}

const getInstallationInstructions = (title, count) => {

  // Log instructions about entering installation information.
  console.log('Enter installation instructions in bullet point format below.')

  prompt([
    {
      type: 'input',
      name: `title`,
      message: 'Enter an instruction: '
    }
  ])
    .then(answers => {
      // If first this is the first time in the funtion, add title and bullet point.
      if (count < 1) {
        fs.appendFile('README.md', `\n\n## ${title}\n\n- ${answers.title}`, error => {
          if (error) { console.log(error) }
        })
        count++
        // Prompt the user if they want to add another instruction.
        nextBulletPoint(count)
      }
      else {
        fs.appendFile('README.md', `\n- ${answers.title}`, error => {
          if (error) { console.log(error) }
        })
        // Prompt the user if they want to add another instruction.
        nextBulletPoint(count)
      }
    })
    .catch(error => console.log(error))

}

// Function that prompts user to enter TOB in bullet format.
const displayTableOfContents = () => {

  fs.appendFile('README.md', `\n\n## Table of Contents\n
  - [Installation](#Installation)\n
  - [Usage](#Usage)\n
  - [License](#License)\n
  - [Contributing](#Contributing)\n
  - [Tests](#Tests)\n
  - [Questions](#Questions)`, error => {
    if (error) {console.log(err)}
  })

  // Get installation instructions from the user.
  getInstallationInstructions('Installation', 0)

}

// Function that gets a description of the project.
const getDescription = title => {

  prompt([
    {
      type: 'input',
      name: `title`,
      message: 'Enter a project description: '
    }
  ])
    .then(answers => {
      fs.appendFile('README.md', `\n\n## ${title}\n\n${answers.title}`, error => {
        if (error) { console.log(error) }
      })
      // Display the table of contents.
      displayTableOfContents()
    })
    .catch(error => console.log(error))

}

// Function that gets a title from the user.
const getTitle = () => {

  // Prompt user for a title.
  prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of your project: '
    }
  ])
    .then(answers => {
      console.log(`README Title: ${answers.title}`)
      fs.writeFile('README.md', `# ${answers.title}`, error => {
        if (error) { console.log(error) }
      })
      // Go to get description prompts
      getDescription('Description')
    })
    .catch(error => console.log(error))

}

module.exports = getTitle