// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { compareSync, hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

const user = {
  name: "daniel",
  email: "teste@kenzie.com.br",
  password: hashSync("1234", 10),
};

const login = (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  const verifyPassword = compareSync(password, user.password);
  if (email != user.email || !verifyPassword) {
    res.status(401).json({ message: "invalid credendials" });
  }
  const token = sign({}, "secret_key", { expiresIn: "1h" });
  return res.status(200).json({ token, userName:user.name });
};




