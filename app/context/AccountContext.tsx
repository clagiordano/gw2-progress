"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Account } from "@/models/account";
import { getAccountInfo } from "@/app/actions";
import { initialAccountState } from "@/app/lib/defaults/account";

interface AccountContextProps {
  account: Account;
  setAccount: (data: Account) => void;
  loading: boolean;
  error: string | null;
}

const AccountContext = createContext<AccountContextProps | undefined>(undefined);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<Account>(initialAccountState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchAccount = async () => {
    try {
      setLoading(true);
      const data = await getAccountInfo();
      setAccount(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setAccount(initialAccountState);
      setError("Failed to load account");
    } finally {
      setLoading(false);
    }
  };

  fetchAccount();
}, []);

  return (
    <AccountContext.Provider value={{ account, setAccount, loading, error }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) throw new Error("useAccount must be used within AccountProvider");
  return context;
};
