import React, { useEffect } from 'react';
import './ParticlesBackground.css'; // Custom styles if needed

const ParticlesBackground = () => {
  useEffect(() => {
    // Check if particlesJS is available in the global window object
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#6e7bff",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
            random: true,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
            },
          },
          size: {
            value: 3,
            random: true,
            animation: {
              enable: true,
              speed: 40,
              minimumValue: 0.1,
            },
          },
          move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: false,
            straight: false,
            outMode: "out",
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
        },
      });
    }
  }, []);

  return (
    <div
      id="particles-js"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // To keep the particles behind the content
      }}
    />
  );
};

export default ParticlesBackground;
