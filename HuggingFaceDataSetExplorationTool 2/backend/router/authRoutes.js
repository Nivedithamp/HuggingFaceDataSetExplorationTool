import express from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import LocalStrategy from 'passport-local';

const router = express.Router();

// Mock database (replace this with your actual database setup)
const users = [{ id: 1, email: 'test123@test.com', password: '$2a$10$5TzNfSaPxYCwpRjfehq/yO6ujs5a0MbpdfFK6uYh8rL8RDFrO4Fhe'}];

// Configure Passport Local strategy for authentication
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // Find user by email
    
    const user = users.find((user) => user.email === email);
    console.log(user);
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }

  
    // Check password using bcrypt
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err;
      console.log(password);
      console.log(user.password);
      console.log(result);

      if (result) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  }),
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);
  done(null, user);
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = { id: users.length + 1, email, password: hashedPassword };
    users.push(newUser);
    console.log(hashedPassword);

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Login route
router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
  console.log(req.user);
  res.status(200).json({ message: 'Login successful.', user: req.user, success: true});
});

export default router;
