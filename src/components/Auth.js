import { supabase } from '../supabase';

const Auth = () => {
  const signIn = async (email, password) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) console.error(error);
    else console.log('Signed in:', user);
  };

  const signUp = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) console.error(error);
    else console.log('Signed up:', user);
  };

  return (
    <div>
      <h2>Sign In / Sign Up</h2>
      {/* Form Logic for Sign In/Sign Up */}
    </div>
  );
};

export default Auth;
