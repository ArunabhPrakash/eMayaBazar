// import jwt from 'jsonwebtoken';

// export const generateToken = (user) => {
//   return jwt.sign(
//     {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     },
//     `${process.env.JWT_SECRET}`,
//     {
//       expiresIn: '30d',
//     }
//   );
// };

// export const isAuth = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   if (authorization) {
//     const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
//     jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
//       if (err) {
//         res.status(401).send({ message: 'Invalid Token' });
//       } else {
//         req.user = decode;
//         next();
//       }
//     });
//   } else {
//     res.status(401).send({ message: 'No Token' });
//   }
// };
/*
This is a module that exports two functions:
1. `generateToken(user)`: This function takes a user object and generates a JSON web token (JWT) using the `jsonwebtoken` package. The token contains the user's ID, name, email, and admin status, as well as an expiration time of 30 days.
2. `isAuth(req, res, next)`: This is an Express middleware function that checks if the request has a valid JWT in its `Authorization` header. If the token is valid, it decodes it and sets `req.user` to the decoded object, and calls the next middleware function. If the token is invalid, it sends a 401 Unauthorized response with a message "Invalid Token". If there is no token in the header, it sends a 401 Unauthorized response with a message "No Token".

The `JWT_SECRET_KEY` is a secret key used for generating and verifying JSON Web Tokens (JWTs) in the code. 
JWT is a stateless authentication mechanism that allows the server to generate a token and send it to the client-side upon successful authentication. The client can then use this token to access protected routes and resources on the server.
In this code, the `JWT_SECRET_KEY` is used to generate a JWT token in the `generateToken` function by signing the payload (user data) with this key. It is also used in the `isAuth` function to verify the authenticity of the token sent from the client-side by decoding it with the same key.
It is important to keep the `JWT_SECRET_KEY` secret and secure, as anyone who has access to it can generate or decode JWT tokens. Therefore, it is usually stored in an environment variable rather than being hard-coded in the code.
*/
import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    `${process.env.JWT_SECRET_KEY}`,
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
