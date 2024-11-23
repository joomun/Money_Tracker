import React from 'react';
import { supabase } from '../supabase';

const Auth = () => {
  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) console.error(error);
    else alert('Signed in successfully!');
  };

  const signUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) console.error(error);
    else alert('Sign-up successful!');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign In / Sign Up</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = e.target.email.value;
          const password = e.target.password.value;
          const type = e.target.type.value;
          type === 'signup' ? signUp(email, password) : signIn(email, password);
        }}
        className="space-y-4"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <select
          name="type"
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="signin">Sign In</option>
          <option value="signup">Sign Up</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Auth;
