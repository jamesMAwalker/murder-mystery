import { AccountProvider } from "./account.context";
import { ClerkConvexProvider } from "./clerk-convex.context";
// import { GameProvider } from "./game.context";
import { SuspectProvider } from "./suspect.context";
// import { UserProvider } from './user.context'
import { ModalProvider } from "./modal.context";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalProvider>
      <ClerkConvexProvider>
        <SuspectProvider>{children}</SuspectProvider>
      </ClerkConvexProvider>
    </ModalProvider>
  );
};

{
  /* <UserProvider></UserProvider> */
}
{
  /* <AccountProvider></AccountProvider> */
}
