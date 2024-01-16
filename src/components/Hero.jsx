import React from "react";
import "./hero.css";   
import logo from "../assets/logo.png";

const Hero = () => {
  return (
    <header className='header'>
      <nav className='navbar'>
        <img src={logo} alt='sumz_logo' className='logo' />
        <h1 className="logo_text">QuickGist</h1>
      </nav>

      <h1 className='head_text'>
        Summarize Articles with <br className='max-md:hidden' />
        <span className='orange_gradient '>OpenAI GPT-4</span>
      </h1>
      <h2 className='desc'>
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
