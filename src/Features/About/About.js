import React from 'react';

import "./About.css";
import { Title } from '../../components/Title/Title';

export const About = () => {


    return (
        <div className='about-page page'
        style={{
            height: 'auto',
            marginTop: 100
        }}
        >
            <Title title={"ABOUT"} />
            <p 
            style={{marginTop: 100}}
            >
                    As a freelance web developer, I specialize in creating unique websites tailored for niche projects, ensuring that your business stands out online. I kick off the design process using Figma, where I collaborate with you to craft visually stunning and user-friendly layouts, bringing your vision to life. Once we finalize the aesthetics, I transition to the production phase using the powerful MERN stack combining MongoDB for robust database management, Express.js for seamless server-side operations, React for dynamic user interfaces, and Node.js for efficient backend development. I also integrate effective SEO strategies to ensure your site ranks well in search engines, driving targeted traffic to your business. Let's build something amazing together!
            </p>
            <p>
            If you're seeking a more budget-friendly project, I offer services in both WordPress and Wix, which are great for simpler website needs.
            </p>
            <p style={{marginBottom: 100}}>
            For more complex projects, I have experience in developing social platforms in the example of  
             <span> <a  rel="noreferrer" target="_blank" href='https://bubble-sharing.netlify.app/'>Bubble</a></span>, enabling features like voice, video, and real-time chat. Additionally, I can build desktop applications with Electron and create native modules using C++, providing a range of tailored solutions to fit various project requirements.
            </p>
            <div style={{height: 10}} />
        </div>
    )
}
