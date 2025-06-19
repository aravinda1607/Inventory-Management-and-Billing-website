const LocalStrategy = require('passport-local').Strategy;

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);

    if (user == null) {
      return done(null, false, { message: 'No user with that email' });
    }

    try {
      console.log("\nSubmitted password:", password);
      console.log("Stored hashed password:", user.password);

      if (password === user.password) {
        console.log("✅ Passwords match");
        return done(null, user);
      } else {
        console.log("❌ Passwords do not match");
        return done(null, false, { message: 'Password incorrect' });

      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = initialize;


