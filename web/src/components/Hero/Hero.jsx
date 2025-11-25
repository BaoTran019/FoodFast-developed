import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "./Hero.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { motion } from "framer-motion";
import hero_img from "../../assets/hero/chiqby.png"

export default function Hero() {

    const fadeInLeft = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    };
    const fadeInRight = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <>
            <section className='hero'>
                <div className='hero-wrapper container d-flex flex-wrap justify-content-center align-items-center'>
                    <div className='hero-content'>
                        <motion.p className="hero-subtitle"
                            variants={fadeInLeft}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.3 }}
                        >Your favorite dishes, delivered to you.
                        </motion.p>
                        <motion.h1 className="hero-title"
                            variants={fadeInLeft}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.4 }}
                        >Fast & Fresh Meals
                        </motion.h1>
                        <motion.p className="hero-description"
                            variants={fadeInLeft}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.6 }}
                        >Freshly cooked and delivered in minutes</motion.p>{/* Đang ảnh hưởng đển div -> cần thu ngắn p lại */}
                        <motion variants={fadeInLeft}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.8 }}>
                            <Button className="btn btn-primary btn-lg mt-3 hero-btn"
                                as={NavLink} to='/restaurants'
                                onClick={() => window.scrollTo(0, 0)}>
                                Đặt hàng ngay
                            </Button>
                        </motion>
                    </div>
                    <div>
                        <motion.img className="hero-img" src={hero_img} alt="hero-img"
                            animate={{ y: [0, -13, 0] }}   // di chuyển lên -15px rồi xuống lại
                            transition={{
                                duration: 3,    // thời gian 1 chu kỳ
                                repeat: Infinity, // lặp vô hạn
                                ease: "easeInOut"
                            }} />
                    </div>
                </div>
            </section >
        </>
    )
}
