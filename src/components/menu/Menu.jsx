'use client';
import React, { useState, useEffect, useRef } from 'react'
import './menu.css';
import Link from 'next/link'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';



const menuItems = [
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'Work',
        link: '/work'
    },
    {
        name: 'About',
        link: '/about'
    },
    {
        name: 'Contact',
        link: '/contact'
    }
];



const Menu = () => {
    const container = useRef()
    const [isOpen, setIsOpen] = useState(false);

    const tl = useRef();

    useGSAP(() => {
        gsap.set(".menu-link-item-holder", { y: 75})
        
        tl.current = gsap.timeline({
            paused: true
        })
            .to(".menu-overlay", {
                duration: 1.25,
                clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
                ease: "power4.inOut",
            })
            .to(".menu-link-item-holder", {
                duration: 1.25,
                y: 0,
                ease: "power4.inOut",
                stagger: 0.1,
                delay: -0.75,
                // stagger:{
                //     each:0.25
                // }
            });
    }, {
        scope: container
    })

    useEffect(() => {
        if (isOpen) {
            tl.current.play();
        } else {
            tl.current.reverse()
        }
    }, [isOpen])



    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className='menu-container' ref={container}>
            <div className="menu-bar">
                <div className="menu-logo">
                    <Link href={"/"}>Name</Link>
                </div>
                <div className="menu-open" onClick={toggleMenu}>
                    <p>Menu</p>
                </div>
            </div>


            <div className="menu-overlay">
                <div className="menu-overlay-bar">
                    <div className="menu-logo">
                        <Link href={"/"}>Name</Link>
                    </div>
                    <div className="menu-close" onClick={toggleMenu}>
                        <p>Close</p>
                    </div>
                </div>

                <div className="menu-close-icon">
                    <p>&#x2715;</p>
                </div>
                <div className="menu-copy">

                    <div className="menu-links">
                        {
                            menuItems.map((item, index) => {
                                return (
                                    <div className="menu-link-item" key={index}>
                                        <div className="menu-link-item-holder" onClick={toggleMenu}>
                                            <Link href={item.link} className='menu-link'>{item.name}</Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="menu-info">
                        <div className="menu-info-col">
                            <a href="#">X &#8599;</a>
                            <a href="#">Instagram &#8599;</a>
                            <a href="#">LinkedIn &#8599;</a>
                            <a href="#">Behance &#8599;</a>
                            <a href="#">Dribbble &#8599;</a>
                        </div>
                        <div className="menu-info-col">
                            <p>info@emailId.com</p>
                            <p>+91 00000000</p>
                        </div>
                    </div>

                </div>
                <div className="menu-preview">
                    <p>view preview</p>
                </div>
            </div>
        </div>
    )
}

export default Menu
