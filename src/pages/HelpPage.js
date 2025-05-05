// src/pages/Help.js
import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import ScheduleTable from '../components/ScheduleTable';
import NextBusCard from '../components/NextBusCard';
import TripContext from '../TripContext';

const HelpContainer = styled.div`
  background-color: #f7fafc;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(11, 102, 52, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FAQSection = styled.div`
  margin-top: 2rem;
`;

const FAQTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1.5rem;
`;

const FAQList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const FAQItem = styled.li`
  margin-bottom: 1rem;
`;

const FAQQuestion = styled.div`
  background-color: #edf2f7;
  padding: 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover {
    border-color: #4299e1;
    transform: scale(1.05);
  }
`;

const FAQAnswer = styled.p`
  margin-top: 1rem;
  color: #718096;
  padding: 1rem;
  background-color: #f7fafc;
  border-left: 4px solid #4c51bf;
  border-radius: 4px;
`;

function HelpPage() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <HelpContainer>
        <ContentWrapper>
          <Title>Help Center</Title>
          <FAQSection>
            <FAQTitle>Frequently Asked Questions</FAQTitle>
            <FAQList>
              <FAQItem>
                <FAQQuestion onClick={() => toggleFAQ(1)}>
                  Where do I look for the predictions from Campus?
                </FAQQuestion>
                {openFAQ === 1 && (
                  <FAQAnswer>
                    Click on the top left icon to go to homepage. <br />
                    Then, the prediction for the next available bus for Blue Route (OSW10), Green Route (OSW11), OSW1A, OSW2A is displayed on the panel.
                  </FAQAnswer>
                )}
              </FAQItem>

              <FAQItem>
                <FAQQuestion onClick={() => toggleFAQ(2)}>
                  Where can I find Scheduled times for my bus?
                </FAQQuestion>
                {openFAQ === 2 && (
                  <FAQAnswer>
                    - Click on the top left icon to go to homepage. <br />
                    - On the top right, click schedule. <br />
                    - Select your bus route from the drop down.
                  </FAQAnswer>
                )}
              </FAQItem>

              <FAQItem>
                <FAQQuestion onClick={() => toggleFAQ(3)}>
                  Where do I see the live map of the bus?
                </FAQQuestion>
                {openFAQ === 3 && (
                  <FAQAnswer>
                    - Click on the top left icon to go to homepage. <br />
                    - On the top right, click schedule. <br />
                    - Select Route, Direction and Stop. <br />
                    - Click on Search.
                  </FAQAnswer>
                )}
              </FAQItem>

              <FAQItem>
                <FAQQuestion onClick={() => toggleFAQ(4)}>
                  Where do I look for the prediction for my stop?
                </FAQQuestion>
                {openFAQ === 4 && (
                  <FAQAnswer>
                    - Click on the top left icon to go to homepage. <br />
                    - From the panel displayed for different buses, click on your bus route. <br />
                    - Select Direction, Stop, and the time you want the prediction for.
                  </FAQAnswer>
                )}
              </FAQItem>

              <FAQItem>
                <FAQQuestion onClick={() => toggleFAQ(5)}>
                  What do the different colors in the homepage panel mean?
                </FAQQuestion>
                {openFAQ === 5 && (
                  <FAQAnswer>
                    - Red: Delay <br />
                    - Green: On time <br />
                    - Yellow: Caution (e.g., possible minor delay or uncertainty)
                  </FAQAnswer>
                )}
              </FAQItem>
            </FAQList>
          </FAQSection>
        </ContentWrapper>
      </HelpContainer>
    </>
  );
}

export default HelpPage;


