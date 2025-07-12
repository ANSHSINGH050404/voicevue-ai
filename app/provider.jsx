"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { UserDetailContext } from "@/context/UserDetainContext";

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session on mount
    checkAuthAndCreateUser();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        if (event === 'SIGNED_IN' && session?.user) {
          await createNewUser(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkAuthAndCreateUser = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        setLoading(false);
        return;
      }
      
      if (session?.user) {
        await createNewUser(session.user);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setLoading(false);
    }
  };

  const createNewUser = async (authUser) => {
    try {
      console.log("Auth User:", authUser);
      
      // Check if user exists
      const { data: existingUsers, error: selectError } = await supabase
        .from("Users")
        .select("*")
        .eq("email", authUser.email);
      
      if (selectError) {
        console.error("Error checking user existence:", selectError);
        setLoading(false);
        return;
      }
      
      console.log("Existing users:", existingUsers);
      
      let userData;
      
      // If user doesn't exist, create new user
      if (existingUsers?.length === 0) {
        console.log("Creating new user...");
        
        const { data: newUser, error: insertError } = await supabase
          .from("Users")
          .insert([
            {
              name: authUser.user_metadata?.name || authUser.email,
              picture: authUser.user_metadata?.picture || null,
              email: authUser.email,
            },
          ])
          .select() // Important: Add .select() to return the inserted data
          .single(); // Get single object instead of array
        
        if (insertError) {
          console.error("Error creating user:", insertError);
          setLoading(false);
          return;
        }
        
        console.log("New user created:", newUser);
        userData = newUser;
      } else {
        console.log("User already exists");
        userData = existingUsers[0];
      }
      
      setUser(userData);
      setLoading(false);
      
    } catch (error) {
      console.error("Unexpected error:", error);
      setLoading(false);
    }
  };

  // Alternative using upsert (recommended)
  const createNewUserUpsert = async (authUser) => {
    try {
      const { data, error } = await supabase
        .from("Users")
        .upsert([
          {
            email: authUser.email,
            name: authUser.user_metadata?.name || authUser.email,
            picture: authUser.user_metadata?.picture || null,
          }
        ], {
          onConflict: 'email',
          ignoreDuplicates: false
        })
        .select()
        .single();

      if (error) {
        console.error('Error upserting user:', error);
        setLoading(false);
        return;
      }

      console.log('User upserted successfully:', data);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error('Unexpected error:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error('useUser must be used within a Provider');
  }
  return context;
};