import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ButtonTheme from "./ButtonThem";

export default function InfoAuth() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center gap-x-1">
      {user && (
        <>
          <p className="mr-4 block cursor-pointer py-1.5 font-sans text-base text-bl font-medium leading-relaxed text-inherit antialiased">
            {user?.name}
          </p>
          <button
            onClick={logout}
            className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
            type="button"
          >
            <span>Log Out</span>
          </button>
        </>
      )}
      <ButtonTheme />
    </div>
  );
}
