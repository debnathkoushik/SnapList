import Express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import {} from "dotenv/config";
import authVerification from "./auth-verification.mjs";
import {
  createTaskHandler,
  getTaskListHandler,
  updateTaskHandler,
  deleteTaskHandler,
  signUpUsingEmailTaskHandler,
} from "./controller.mjs";

const port = process.env.PORT || 4000;
const app = Express();

//using morgan for logs
app.use(morgan("combined"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//api endpoint to for creating a record in the DB
app.post("/createTask", authVerification, createTaskHandler);

//api endpoint to for reading data from DB
app.get("/getTaskList", getTaskListHandler);

//api endpoint to update a particular row in the database
app.put("/updateTask", updateTaskHandler);

//api endpoint to delete a particular row from DB
app.delete("/deleteTask", authVerification, deleteTaskHandler);

//api endpoint for signing up using email
app.post("/signUpUsingEmail", signUpUsingEmailTaskHandler);

//setting up the server to listen to a particular port
app.listen(3000, () => {
  console.log(`> Ready on http://localhost:${port}`);
});

/***
 * 1. Add authVerification for all routes (done)
 * 2. Check every handler for edge case. Server SHOULD NOT crash
 * 3. Add environment variables. Move Supabase API keys to .env file. DO NOT push .env file into Github (done)
 *
 *
 */
