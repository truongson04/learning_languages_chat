import NavBar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout({ children, showSideBar = true }) {
  return (
    <div className={`drawer ${showSideBar ? "lg:drawer-open" : ""}`}>
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen bg-base-100">
        <NavBar showSideBar={showSideBar} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      {showSideBar && (
        <div className="drawer-side z-40">
          <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <Sidebar />
        </div>
      )}
    </div>
  );
}
