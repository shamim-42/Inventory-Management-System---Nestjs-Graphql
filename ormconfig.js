/*****************

WE ARE USING THE TYPEORM CONFIGURATION INSIDE THE APPMODULE. SO THE BELOW CONFIG IS COMMENTED HERE.
I PREVIOUSLY TRIED TO WORK WITH THIS BELOW CONFIGURATION BUT A LOT OF TIME WASTED TO FINDOUT THE ROOT REASON
WHY THE PROJECT IS NOT RUNNING. ANYWAY, AFTER COPPYING THESE CONFIG FROM HERE TO APPMODULE NOW PROJECT IS 
RUNNING. 
MY SUGGESTION IS USE THE TYPEORM CONFIG INSIDE THE APPMODULE. IF YOU WANT TO USE ormconfig.js LIKE FILE THEN
YOU CAN TRY WITH YOUR OWN RISK. YOU CAN ALSO TRY WITH ormconfig.json AS WELL.  .json FILE CAN SOLVE THE ERROR
WHAT IS RAISED BY .json (thats my own prediction, not proved.)

*****************/






// require('dotenv').config();

// module.exports = {
//   name: 'default',
//   type: 'mysql',
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   synchronize: true,
//   dropSchema: false,
//   logging: true,
//   // entities: ['*/**/*.entity.ts', 'dist/**/*.entity.js'],
// };
