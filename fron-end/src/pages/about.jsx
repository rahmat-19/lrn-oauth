import Layout from "@/components/layout/App/layout";

export default function Index() {
  return (
    <div>
      <p>INI HALAMAN ABOUT</p>
    </div>
  );
}

Index.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
