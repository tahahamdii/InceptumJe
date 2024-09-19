import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { secret } from "../middlewares/auth.js";
import User from "../models/user.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingMember = await User.findOne({ email });

    if (!existingMember)
      return res.status(404).json({ message: "Aucun compte n'existe pour cet email" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingMember.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Mauvais mot de passe." });

    const token = jwt.sign(
      {
        email: existingMember.email,
        id: existingMember._id,
        role: existingMember.role,
      },
      secret,
      { expiresIn: "24h" }
    );

    return res.status(200).json({ result: existingMember, token });
  } catch (error) {
    res.status(500).json({ message: "Une erreur s'est produite. Veuillez réessayer!" });
    console.log(error);
  }
};