// src/pages/Help.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';


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
                  Where do I look for different routes from Campus?
                </FAQQuestion>
                {openFAQ === 1 && (
                  <FAQAnswer>
                    - Click on "Home" at the top right corner. It will re-direct you to the home page that displays all routes from the campus centre.  <br />
                    - The predicted arrival times for the next arriving bus to the MCC Bus Stop will be displayed for each available routes.
                  </FAQAnswer>
                )}
              </FAQItem>

              <FAQItem>
                <FAQQuestion onClick={() => toggleFAQ(2)}>
                  Where can I find Scheduled times for my bus?
                </FAQQuestion>
                {openFAQ === 2 && (
                  <FAQAnswer>
                    - On the top right, click "Schedule". <br />
                    - Select your bus route from the drop down.<br />
                    - It will pop open the PDF containing all scheduled times.
                  </FAQAnswer>
                )}
              </FAQItem>
               <FAQItem>
                <FAQQuestion onClick={() => toggleFAQ(3)}>
                  Where does it say there is No Prediction Available?
                </FAQQuestion>
                {openFAQ === 3 && (
                    <FAQAnswer>
                      - There are two possible reasons for this: <br/>
                      - 1) There is no bus scheduled for a while for that route and stop.<br/>
                      - 2) Bus data not available yet.
                      - 3) Server Error.<br/>
                      - Retry again in a couple minutes or check official schedule pdf.
                    </FAQAnswer>
                )}
              </FAQItem>

              <FAQItem>
                <FAQQuestion onClick={() => toggleFAQ(4)}>
                  How do I see the different stop in the map?
                </FAQQuestion>
                {openFAQ === 4 && (
                  <FAQAnswer>
                    - On the top right, click "Map". <br />
                    - Select Route from the drop down. <br />
                    - The Red Pinpoint are the stops for the selected route.<br />
                    - If you click on the stops, you can view the names of the stop and the next arrival time.
                  </FAQAnswer>
                )}
              </FAQItem>

              <FAQItem>
                <FAQQuestion onClick={() => toggleFAQ(5)}>
                  Where do I look for the prediction for my stop?
                </FAQQuestion>
                {openFAQ === 5 && (
                  <FAQAnswer>
                    - On the top right, click "Home" <br />
                    - From the panel displayed for different buses, click on your Bus Route. <br />
                    - Select Direction and Stop. This will give you the next arrival time.<br />
                    - Check the box that appears and select the time you want the prediction for. This will display the predicted time.
                  </FAQAnswer>
                )}
              </FAQItem>

              <FAQItem>
                <FAQQuestion onClick={() => toggleFAQ(6)}>
                  What do the different colors in the homepage panel mean?
                </FAQQuestion>
                {openFAQ === 6 && (
                  <FAQAnswer>
                    - Red: Delay <br />
                    - Green: On time <br />
                    - Yellow: Approaching right now
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


