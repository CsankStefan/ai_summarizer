import React from 'react'
import Particles from "react-tsparticles";

const particleBackgorund = () => {
    return (
        <Particles
        id="tsparticles"
        options={{
          particles: {
            number: {
              value: 50,
            },
            size: {
              value: 3,
            },
          },
        }}
      />
    )   
}

export default particleBackgorund;