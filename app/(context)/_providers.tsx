import { AccountProvider } from "./account.context";
import { ClerkConvexProvider } from "./clerk-convex.context";
// import { GameProvider } from "./game.context";
import { SuspectProvider } from "./suspect.context";
// import { UserProvider } from './user.context'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkConvexProvider>
        <SuspectProvider>{children}</SuspectProvider>
    </ClerkConvexProvider>
  );
};

{
  /* <UserProvider></UserProvider> */
}
{
  /* <AccountProvider></AccountProvider> */
}
