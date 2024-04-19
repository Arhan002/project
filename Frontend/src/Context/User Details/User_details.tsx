import { createContext, useState } from "react";

type user = {
  user: string;
  password: string;
  store: string;
  payment: string;
  product: string;
  customer: string;
};

export const usercontext = createContext<user | any>(null);

const User_details = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({
    user: "",
    password: "",
    store: "",
    payment: "",
    product: "",
    customer: "",
  });
  return (
    <usercontext.Provider value={[user, setUser]}>
      {children}
    </usercontext.Provider>
  );
};

export default User_details;
