import { createContext, useState, ReactNode } from "react";

/**
 * For using TypeScript and the Context API,
 * @see https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context
 */

/**
 * This needs to match whatever is placed inside the "value" below.
 * @see <AccessTokenContext.Provider value={{ ... }) >
 */
type AccessTokenContextType = {
  getToken: () => string;
  hasToken: () => boolean;
  login: (token: string) => void;
  logout: () => void;
};

type AccessTokenProviderProps = {
  children: ReactNode;
};

export const AccessTokenContext = createContext<AccessTokenContextType>(
  {} as AccessTokenContextType
);

export function AccessTokenProvider({ children }: AccessTokenProviderProps) {
  /**
   * @returns JWT token. Use to determine if the user is logged in.
   */
  const getToken = () => localStorage.getItem("token") ?? "";
  /**
   *
   * @returns {boolean} whether or not the token is stored in the Context API.
   * In other words, whether or not the user is logged in.
   */
  const hasToken = (): boolean => !!getToken();

  /**
   * We login by setting the token.
   * @param {string} token
   */
  const login = (token: string) => {
    localStorage.setItem("token", token);
  };
  /**
   * Logs the user out by clearing the token from state
   */
  const logout = () => {
    localStorage.clear();
  };

  return (
    <AccessTokenContext.Provider
      value={{
        getToken,
        hasToken,
        login,
        logout,
      }}
    >
      {children}
    </AccessTokenContext.Provider>
  );
}