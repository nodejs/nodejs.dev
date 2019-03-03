import React from 'react';

type Props = {
  title: string;
}

const Hero = ({ title }: Props) => (
  <div className="hero">
    <h1>{title}</h1>
    <div className="diagonal-hero-bg">
      <div className="stars">
        <div className="small"/>
        <div className="medium"/>
        <div className="big"/>
      </div>
    </div>
  </div>
)

export default Hero
