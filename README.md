# AWS Lambda nodejs bootstrap

A simple nodejs bootstrap that lets you quickly get started with developing & deploying AWS Lambda functions.

## What is provided out of the box?
The bootstrap provides out of the box a "Hello World!" AWS Lambda function integrated with 

- ES Lint for lint validations
- Jasmine for unit testing and mocking
- Istanbul for code coverage


## How to setup code
Clone the repo and run the following commands from root of the folder

`npm install --global gulp`

`npm install`

## How to build the code locally
From the root folder of the repo run the following commands to generate a zip file that is ready to upload to AWS Lambda for deployment

`gulp`
