import NavBar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout({ children, showSideBar = true }) {
  return (
    <div className="min-h-screen">
      <div className="flex ">
        {showSideBar && <Sidebar />}
        <div className="flex flex-1 flex-col">
          <NavBar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
