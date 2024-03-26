import {} from "dotenv/config";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.DATABASE_URL, process.env.SECRET_KEY);

export const createTaskHandler = async (req, res) => {
  const task = req.body.task;
  const remarks = req.body.remarks;

  //check for null, undefined and empty params in request object
  if (task === null || undefined || "") {
    res.send("Invalid format");
  } else {
    const { data, error } = await supabase
      .from("to-do-list")
      .insert({
        task,
        date: new Date(),
        status: `Pending`,
        remarks,
      })
      .select();
    if (error) {
      res.send(error);
    }
    res.send(
      JSON.stringify({
        "Task created with id ": data[0].id,
      })
    );
  }
};

export const getTaskListHandler = async (req, res) => {
  const { data, error } = await supabase.from("to-do-list").select();
  res.send(data);
};

export const updateTaskHandler = async (req, res) => {
  const task = req.body.task;
  const remarks = req.body.remarks;
  const status = req.body.status;
  const id = req.body.id;

  //checks for null, undefined and empty task
  if (task === null || undefined || "") {
    res.send("Invalid format");
  } else {
    const { data, error } = await supabase
      .from("to-do-list")
      .update({
        task,
        date: new Date(),
        status,
        remarks,
      })
      .eq("id", id)
      .select();

    if (error) {
      res.send(error);
    }

    res.send(
      JSON.stringify({
        "Task updated for id ": data[0].id,
      })
    );
  }
};

export const deleteTaskHandler = async (req, res) => {
  const id = req.body.id;

  //issue: if wrong id is passed the connection is getting closed
  //solution: use try and catch block
  const { data, error } = await supabase
    .from("to-do-list")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    res.send(error);
  }

  res.send(
    JSON.stringify({
      "Task deleted having id ": data[0].id,
    })
  );
};

export const signUpUsingEmailTaskHandler = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:3000/getTaskList",
    },
  });

  res.send(data);
};
