import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import Auth from './components/Auth';
import ExpenseTracker from './components/ExpenseTracker';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check for an active session on app load
    const currentSession = supabase.auth.getSession().then(({ data }) => setSession(data?.session));

    // Listen for session changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
      </header>

      <main className="container mx-auto p-4">
        {session ? (
          // Render Expense Tracker if user is logged in
          <ExpenseTracker />
        ) : (
          // Render Auth component for login/sign-up
          <Auth />
        )}
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} Expense Tracker</p>
      </footer>
    </div>
  );
}

export default App;
