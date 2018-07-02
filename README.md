# backend

## Description

The season  hunt

## Installation

```bash
$ npm install
```

## Running the web app

```bash
# development
$ npm run start-web

# watch mode
$ npm run start:dev-web

# production mode
npm run start:prod-web
```

## Running the admin app

```bash
# development
$ npm run start-admin

# watch mode
$ npm run start:dev-admin

# production mode
npm run start:prod-admin
```

## Running the file app

```bash
# development
$ npm run start-file

# watch mode
$ npm run start:dev-file

# production mode
npm run start:prod-file
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Module

```
Module structure
|-admins
    |- interfaces    
        |- admin.interface.ts
    |- admin.controller.ts 
    |- admin.module.ts     
    |- admin.service.ts

    Note: Each module should be register in `app.module.ts` for using this features. If you want to share the `AdminService` instance between few other modules. In order to do that, we need to put the AdminsService into `exports` array.        
```


// Mongoose Schemas
```
Each schema file map with mongoDB collection and defines shape of the documents with that collections
```