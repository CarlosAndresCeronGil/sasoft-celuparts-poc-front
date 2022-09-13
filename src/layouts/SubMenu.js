import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function SubMenu({ navi }) {

    const [subNav, setSubnav] = useState(false)
    let location = useLocation();

    const showSubnav = (e) => {
        e.preventDefault()
        setSubnav(!subNav)
    }

    return (
        <>
            <Link
                to={navi.href}
                className={
                    location.pathname === navi.href
                        ? "active nav-link py-3"
                        : "nav-link text-secondary py-3"
                }
                onClick={navi.subNav && showSubnav}
            >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
                {navi.subNav && subNav
                    ? <i className={navi.iconOpened}></i>
                    : navi.subNav ? <i className={navi.iconClosed}></i>
                        : null
                }
            </Link>
            {
                subNav && navi.subNav.map((item, index) => {
                    return (
                        <Link
                            to={item.href}
                            key={index}
                            className={
                                location.pathname === item.href
                                    ? "active nav-link py-3"
                                    : "nav-link text-secondary py-3"
                            }
                        >
                            <div className='sidebar-label'>
                                {item.title}
                            </div>
                        </Link>
                    )
                })
            }
        </>
    )
}
