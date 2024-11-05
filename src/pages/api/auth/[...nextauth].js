// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import connectDB from '../../../../lib/connectDB'; // Ensure this path is correct
// import User from '../../../../models/User'; // Ensure this path is correct
// import bcrypt from 'bcryptjs';

// connectDB(); // Connect to your MongoDB database

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials) => {
//         try {
//           const user = await User.findOne({ email: credentials.email });
//           if (!user) {
//             throw new Error('No user found with this email');
//           }

//           const isValid = await bcrypt.compare(credentials.password, user.password);
//           if (!isValid) {
//             throw new Error('Invalid password');
//           }

//           return user;
//         } catch (error) {
//           console.error(error);
//           throw new Error('Authentication failed');
//         }
//       }
//     }),
//   ],
//   callbacks: {
//     async session({ session, token, user }) {
//       session.user = token.user; // Customize session data
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user; // Customize JWT token
//       }
//       return token;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: '/auth/signin',  // Custom sign-in page
//     error: '/auth/error',    // Error redirect page
//   },
// });
