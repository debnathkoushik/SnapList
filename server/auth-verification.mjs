//middleware which handles verification

import {} from "dotenv/config";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.DATABASE_URL, process.env.SECRET_KEY);

export default async function authVerification(req, res, next) {
  //console.log("req.headers: ", req.headers);

  //if authorization property is not available value assigned will be null
  const token = req.headers["authorization"];
  let authResponse = null;
  authResponse = await supabase.auth.getUser(token);

  const { data: { user } = {}, error } = authResponse;
  if (!user) {
    res.status(401);
    res.send({ message: error });
    return;
  }
  next();
}
