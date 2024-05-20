import useLogin from "@/components/hooks/useLogin";
import { useAuth } from "../context/AuthContext";
export default function FormLogin() {
  const googleLogoUrl =
    "https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg";

  const { setValueState, loginGoggle, login, loading, error, formLogin } =
    useLogin();

  const { setDataUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(setDataUser);
  };
  return (
    <>
      {error && (
        <button
          type="button"
          className="fixed right-4 top-11 z-50 rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
        >
          <div className="flex items-center space-x-2">
            <p className="font-bold">{error?.message}</p>
          </div>
        </button>
      )}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              value={formLogin.email}
              onChange={setValueState}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formLogin.password}
              onChange={setValueState}
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center"></div>

          <div className="text-sm"></div>
        </div>
        <div className="flex flex-col justify-center gap-y-2">
          <button
            onClick={loginGoggle}
            type="button"
            className="flex items-center bg-blue-500 text-white rounded-md shadow-md "
          >
            <div className="bg-blue-700 rounded-md p-3">
              <img
                src={googleLogoUrl}
                alt="Google Logo"
                className="h-full w-full"
              />
            </div>
            <span className="ml-2  pr-2 text-lg">Sign In with Google</span>
          </button>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log in
          </button>
        </div>
      </form>
    </>
  );
}
