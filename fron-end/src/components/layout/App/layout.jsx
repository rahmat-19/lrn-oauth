import Navbar from "@/components/layout/Navbar/Navbar";
import { AuthProvider } from "../../context/AuthContext";
import { ThemeProvider } from "next-themes";
const Layout = ({ children, path, user }) => {
  return (
    <div>
      <AuthProvider>
        <ThemeProvider attribute="class">
          <Navbar />
          {children}
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
};

export default Layout;
