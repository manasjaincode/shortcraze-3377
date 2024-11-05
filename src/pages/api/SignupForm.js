// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
// // import { signIn } from 'next-auth/react';

// const SignupForm = ({ switchToLogin }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     const res = await fetch('/api/auth/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name, email, password }),
//     });

//     if (res.ok) {
//       // Automatically sign in after signup
//       signIn('credentials', { redirect: false, email, password });
//     } else {
//       console.error(await res.json());
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSignup}>
//         <h2 className="text-2xl mb-4">Sign Up</h2>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="mb-4 p-2 w-full"
//         />
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
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
//         <p>
//           Already have an account?{' '}
//           <a onClick={switchToLogin} className="cursor-pointer text-blue-500">Login</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default SignupForm;  heres my signup code in pages folder I commented that rn'