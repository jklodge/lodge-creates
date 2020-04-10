import admin from "../firebase-admin/admin";

export const createUser = async (req, res) => {
  const { email, password, name } = req.body;

  const user = await admin.auth().createUser({
    email,
    password,
    displayName: `${name}`
  });

  return res.send(user);
};
