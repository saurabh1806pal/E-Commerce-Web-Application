import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // initially true

  // 1️⃣ Check session on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:4000/me", {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data.user); // null if not logged in
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // 2️⃣ Login method
  const login = async (email, password) => {
    setLoading(true);

    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!data.success) {
      setLoading(false);
      throw new Error(data.message);
    }

    // Get user after login
    const meRes = await fetch("http://localhost:4000/me", {
      credentials: "include",
    });
    const meData = await meRes.json();

    setUser(meData.user);
    console.log(meData.user);
    setLoading(false);

    return data.userType;
  };

  // 3️⃣ Signup method
  const signup = async ({ name, email, password, confirmPassword }) => {
    setLoading(true);

    const res = await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      if (data.errors && data.errors.length > 0)
        throw new Error(data.errors[0].msg);
      else throw new Error(data.message);
    }

    return data; // success message
  };

  // 4️⃣ Logout method
  const logout = async () => {
    await fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        setUser, // optional if you want to manually update user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
