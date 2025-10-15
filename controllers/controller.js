import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import User from '../models/model.js';

// signup API

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'User exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name, email, password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({ message: "User created successfuly" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// login API

// const jwtSecret = process.env.JWT_SECRET || 'dev_secret_change_this';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = JWT.sign(
      { id: user.id, email: user.email, password: user.password },  
         process.env.JWT_SECRET,  // jwtSecret          
      { expiresIn: "1h" }             
    );
    return res.status(200).json({message: "Login successfully", token, user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

