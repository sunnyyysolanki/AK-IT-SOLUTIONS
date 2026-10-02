import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between border-2 px-2 py-2">
      <p>Stock Master</p>
      <button className="cursor-pointer" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
