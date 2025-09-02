"use client";
import "./FeaturedProjectsPin.css";
import featuredProjectsContent from "./featured-projects-content";

import { useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FeaturedProjectsPin = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const featuredProjectImg = gsap.utils.toArray(".featured-project-card-img");

    featuredProjectImg.forEach((featuredProjectImg, index) => {
      if (index < featuredProjectImg.length - 1) {
        const featuredProjectContainer = gsap.utils.querySelector(".featured-project-card");

        const isMobile = window.innerWidth <= 1000;

        let tl = gsap.timeline ({
          scrollTrigger: {
            trigger: featuredProjectContainer,
            start: "center center",
            // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
            end: () => "+=" + featuredProjectContainer.offsetWidth, 
            scrub: true,
            pin: true,
            anticipatePin: 1
          },
          defaults: {ease: "none"}
        });

        tl.fromTo(gsap.utils.querySelector(".featured-project-card-img"), { xPercent: 100, x: 0}, {xPercent: 0})// ...and the image the opposite way (at the same time)
	      .fromTo(gsap.utils.querySelector(".featured-project-card-img img"), {xPercent: -100, x: 0}, {xPercent: 0}, 0);


        
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div className="featured-projects">
        
          <div className="featured-project-card">
            <div className="featured-project-card-inner">
              <div className="featured-project-card-content">
                <div className="featured-project-card-info">
                  {/* <p>{project.info}</p> */}
                  <p>test</p>
                </div>
                <div className="featured-project-card-content-main">
                  <div className="featured-project-card-title">
                    {/* <h2>{project.title}</h2> */}
                    <h2>test</h2>
                  </div>
                  <div className="featured-project-card-description">
                    {/* <p className="lg">{project.description}</p> */}
                    <p className="lg">test</p>
                  </div>
                </div>
              </div>
              {featuredProjectsContent.map((project, index) => (
              <div key={index} className="featured-project-card-img">
                <img src={project.image} alt={project.title} />
              </div>
              ))}
            </div>
          </div>
      </div>
    </>
  );
};

export default FeaturedProjectsPin;
