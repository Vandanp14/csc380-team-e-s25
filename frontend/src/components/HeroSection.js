import React from 'react';
import styled from 'styled-components';
import heroImage from './Hero.png';

const HeroWrapper = styled.section`
  position: relative;
  height: 80vh;
  background-image: url(${heroImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #fff;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 2rem;
  max-width: 500px;
  margin-left: 3rem;

  @media (max-width: 768px) {
    margin-left: 1rem;
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #FFC107;
  color: #1e1e2f;
  font-size: 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e0ac07;
  }
`;

function HeroSection() {
  return (
    <HeroWrapper>
      <Overlay />
      <HeroContent>
        <Title>SUNY Oswego Bus Predictor</Title>
        <Subtitle>Real-time Bus Tracking for Students</Subtitle>
        <CTAButton href="/tracker">Track Your Bus</CTAButton>
      </HeroContent>
    </HeroWrapper>
  );
}

export default HeroSection;
