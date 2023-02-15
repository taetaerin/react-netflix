import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Nav.css"
export default function Nav() {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`)
    };

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                setShow(true);
            }else {
                setShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll", () => {});
        }
    }, [])

    return (
        <nav className={`nav ${show && "nav_black"}`}>
            <img 
               alt = "Netflix logo"
               src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/640px-Netflix_2015_logo.svg.png"
               className = "nav_logo"
            //    onClick={() => window.location.reload()}
               onClick={() => (window.location.href="/")}
            />
            
            <input 
                value={searchValue}
                onChange={handleChange}
                className="nav_input"
                type="text"
                placeholder="검색하세요."
            />
            <img 
               alt = "User logged"
               src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Netflix-avatar.png/640px-Netflix-avatar.png"
               className = "nav_avatar"
            />
        </nav>
    )
}
