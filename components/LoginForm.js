// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
// import { signIn } from 'next-auth/react';

// const LoginForm = ({ switchToSignup }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const result = await signIn('credentials', {
//       redirect: false,
//       email,
//       password,
//     });

//     if (result.error) {
//       console.error(result.error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form className="bg-white p-6 rounded shadow-md" onSubmit={handleLogin}>
//         <h2 className="text-2xl mb-4">Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="mb-4 p-2 w-full"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="mb-4 p-2 w-full"
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
//         <p>
//           Don't have an account?{' '}
//           <a onClick={switchToSignup} className="cursor-pointer text-blue-500">Signup</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
