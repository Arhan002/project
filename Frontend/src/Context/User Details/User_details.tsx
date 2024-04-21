import { createContext, useState } from "react";

type user = {
  user: number;
  store: number;
  payment: number;
  product: number;
  customer: number;
};

export const usercontext = createContext<user | any>(null);

const User_details = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({
    user: 0,
    store: 0,
    payment: 0,
    product: 0,
    customer: 0,
  });
  return (
    <usercontext.Provider value={[user, setUser]}>
      {children}
    </usercontext.Provider>
  );
};

export default User_details;
