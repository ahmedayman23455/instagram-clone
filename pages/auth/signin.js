import React from "react";
import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";
import SigninWrapper from "../../components/SigninWrapper";

function SignIn({ providers }) {
  return (
    <>
      <Header />
      <SigninWrapper>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </SigninWrapper>
    </>
  );
}

export default SignIn;

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};
