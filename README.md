# Frontend Setup

Follow these steps to set up and run the frontend of the project:

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and npm (Node Package Manager) installed on your system.

## Installation and Running

1. Navigate to the frontend directory:

   ```
   cd front-end
   ```

2. Start the development server:

   ```
   npm start
   ```

   This command will start the frontend application. Once it's running, you can usually access it by opening a web browser and going to `http://localhost:3000` (unless a different port is specified).

## Additional Information

- The `npm start` command typically runs the app in development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- The page will reload if you make edits.
- You will also see any lint errors in the console.

#

# Backend Setup

## .evn

```
GOOGLE_CLIENT_ID=679437230257-8mk036mjbq9jtbragfmlph8uc91pephc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
FRONTEND_URL=http://localhost:3000
```

## .backend/src/modules/auth/config/passport.config
```
// src/config/passport.config.ts
import * as passport from 'passport';
import * as dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:5000/auth/google/callback',
      scope: ['profile', 'email'],  // Thêm scope vào đây
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        console.log('Google Profile:', profile);
        const googleUser = {
          googleId: profile.id,
          email: profile.emails![0].value,
          username: profile.displayName,
        };
        done(null, googleUser);
      } catch (error) {
        console.error('GoogleStrategy Error:', error);
        done(error as Error, undefined);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});
```

Happy coding!
