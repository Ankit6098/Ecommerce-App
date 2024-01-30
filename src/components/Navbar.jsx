import '../styles/navbar.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons'

function Navbar() {

    const [userData, setUserData] = useState(null);
    const [showUserActions, setShowUserActions] = useState(false);

    const getUser = async () => {
        const response = await fetch("http://localhost:8000/user/get-user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (response.status === 200) {
            const result = await response.json();
            console.log("User data:", result);
            setUserData(result);
        }
    }

    useEffect(() => {
        getUser();
    },[])

    const handleLogout = async () => {
        const response = await fetch("http://localhost:8000/user/sign-out", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (response.status === 200) {
            setUserData(null);
        } else {
            console.log("Error logging out!");
        }
    }

    const handleUserImgClick = () => {
        setShowUserActions(!showUserActions);
    }

    return (
        <nav>
            <h1>Shopit</h1>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/checkout">Checkout</Link>
            </div>
            <div className="other-links">
                {userData ? (
                    <>
                        <img src={userData.avatar} alt="" className='user-img' onClick={handleUserImgClick}/>
                        {showUserActions && (
                            <div className="user-actions">
                                <p>{userData.name}</p>
                                <p>profile</p>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                        <FontAwesomeIcon icon={faHeart} />
                        <FontAwesomeIcon icon={faCartShopping} />
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/sign-up">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;