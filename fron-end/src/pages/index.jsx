import Login from "@/components/auth/Login";
import Layout from "@/components/layout/App/layout";
import axios from "@/components/utils/axios";

import { getHeaderConfigAxios } from "@/components/utils/getHeaderConfigAxios";
import { hasCookie, setCookie } from "cookies-next";

export default function Index() {
  return (
    <div>
      <Login />
    </div>
  );
}
Index.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async ({ req, res, query }) => {
  const { access_token, refresh_token } = query;

  if (hasCookie("access_token", { req, res })) {
    return {
      redirect: {
        destination: "/about", // Replace with your desired path
        permanent: false,
      },
    };
  }

  if (access_token && refresh_token) {
    setCookie("access_token", access_token, { req, res, maxAge: 60 * 24 });
    setCookie("refresh_token", refresh_token, {
      req,
      res,
      maxAge: 60 * 6 * 24,
    });
    const { data } = (await axios.get("/users", getHeaderConfigAxios(req, res)))
      .data;
    setCookie("user", data, {
      req,
      res,
      maxAge: 60 * 24,
    });
    setCookie("provider", "google", {
      req,
      res,
      maxAge: 60 * 24,
    });
    return {
      redirect: {
        destination: "/about", // Replace with your desired path
        permanent: false,
      },
    };
  }

  return {
    props: {}, // Pass any required props to the component
  };
};
