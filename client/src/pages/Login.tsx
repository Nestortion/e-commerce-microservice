import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

function Login() {
  return (
    <div>
      <SignedOut>
        <SignIn />
      </SignedOut>

      <SignedIn>
        <Navigate to={"/"} />
      </SignedIn>
    </div>
  );
}

export default Login;
