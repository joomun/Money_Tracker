import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import Auth from './components/Auth';
import ExpenseTracker from './components/ExpenseTracker';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data?.session));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
      </header>
      <main className="container mx-auto p-4">
        {session ? <ExpenseTracker /> : <Auth />}
      </main>
    </div>
  );
}

export default App;
