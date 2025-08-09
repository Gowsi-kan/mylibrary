import React from "react";

const page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
        Too Many Requests
      </h1>
      <p className="mt-3 max-w-xl text-light-400">
        You’ve hit the request limit. Please wait a few minutes before trying
        again.
      </p>
    </main>
  );
};

export default page;
