import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthenticationContext";
import './SideBar.css'
import avatar from '../../assets/avatars/avatar.jfif'
import DashBoardIcon from '../../assets/icons/Dashboard_active.png'
import OrderIcon from '../../assets/icons/Order_active.png'
import MenuIcon from '../../assets/icons/Menu_active.png'
import CustomerIcon from '../../assets/icons/Customer_active.png'
import DashBoardIcon_u from '../../assets/icons/Dashboard_unactive.png'
import OrderIcon_u from '../../assets/icons/Order_unactive.png'
import MenuIcon_u from '../../assets/icons/Menu_unactive.png'
import CustomerIcon_u from '../../assets/icons/Customer_unactive.png'
import { toast } from "react-toastify";

function SideBar() {

  const [active, setActive] = useState("/");

  const { logout } = useContext(AuthContext)

  const handleLogOut = () => {
    logout()
    toast.warning('Đã đăng xuất')
  }

  const buttons = [
    { id: "/", label: "Dashboard", active_icon: DashBoardIcon, unactive_icon: DashBoardIcon_u },
    { id: "Orders", label: "Orders", active_icon: OrderIcon, unactive_icon: OrderIcon_u },
    { id: "Restaurants", label: "Restaurants", active_icon: MenuIcon, unactive_icon: MenuIcon_u },
    { id: "Customers", label: "Customers", active_icon: CustomerIcon, unactive_icon: CustomerIcon_u },
    { id: "Drone", label: "Drone", active_icon: CustomerIcon, unactive_icon: CustomerIcon_u }
  ];

  return (
    <div className="main-side-bar">
      <div className="account-info">
        <Image
          src={avatar}
          roundedCircle
          alt="avatar"
          style={{ width: 'auto', height: '100px' }} />
        <p>N.V.An</p>
      </div>
      <div className="navigator">
        {buttons.map((btn) => (
          <Button
            className={`sidebar-btn ${active === btn.id ? "active" : ""}`}
            onClick={() => setActive(btn.id)}
            as={NavLink} to={btn.id}>
            {active === btn.id ?
              <img src={btn.active_icon} style={{ height: '30px' }}></img>
              : <img src={btn.unactive_icon} style={{ height: '30px' }}></img>
            }
            {btn.id === '/' ? <span style={{ marginLeft: '20px' }}>Dashboard</span> : <span style={{ marginLeft: '20px' }}>{btn.label}</span>}

          </Button>
        ))}
      </div>
      <div>
        <Button onClick={handleLogOut}>
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}

export default SideBar;
