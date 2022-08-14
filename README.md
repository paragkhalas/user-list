# User List Application using REACT

This project displays user list in table structure with pagination, sorting and filter option. Also applied canvas chart to display demogrraphic information regarding most 5 favorite country in which users belongs to. Displays other countries as well in the chart.

## Available Scripts

In the project directory, you can run:

1. npm test : To test an application. Applied sample test case with 2 test files
2. npm run start : To start an application.
3. npm run format : To format entire application source code using prettier package.
4. npm run lint : To display eslint errors
5. npm run lint:fix : To fix eslint errors

### Require configurations files

1. .env.local
2. .eslintrc
3. .babelrc
4. .prettierrc
5. .eslintignore
6. .prettierignore
7. .ediotrignore

### To create docker build

run 'docker build -t <DOCKER_USERNAME>/<APPLICATION_NAME> -f Dockerfile.dev .'

### To check docker images

run 'docker images'

### To Run docker build

docker run -it -p 3000:3000 <IMAGE_TAG>
