// src/pages/Help.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  color: #002B5C;
`;

const Section = styled.div`
  max-width: 800px;
  margin: 2rem auto;
`;

const FAQTitle = styled.h2`
  margin-bottom: 1rem;
`;

const FAQItem = styled.div`
  margin-bottom: 1rem;
  cursor: pointer;
`;

const Question = styled.div`
  font-weight: bold;
  background-color: #f2f2f2;
  padding: 1rem;
  border-radius: 5px;
`;

const Answer = styled.p`
  margin: 0.5rem 1rem 1rem 1rem;
  background-color: #e9f5ff;
  padding: 1rem;
  border-left: 4px solid #002B5C;
`;

function Help() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Title>Help Center</Title>
        <Section>
          <FAQTitle>Frequently Asked Questions</FAQTitle>

          {/* FAQ 1 */}
          <FAQItem onClick={() => toggleFAQ(1)}>
            <Question>Where do I look for the predictions from Campus?</Question>
            {openFAQ === 1 && (
              <Answer>
                Click the top-left icon to go to the homepage. <br />
                The panel will show predictions for Blue Route (OSW10), Green Route (OSW11), OSW1A, OSW2A.
              </Answer>
            )}
          </FAQItem>

          {/* FAQ 2 */}
          <FAQItem onClick={() => toggleFAQ(2)}>
            <Question>Where can I find scheduled times for my bus?</Question>
            {openFAQ === 2 && (
              <Answer>
                - Click the top-left icon to return home. <br />
                - Top-right corner: click "Schedule", then select your route from the dropdown.
              </Answer>
            )}
          </FAQItem>

          {/* Add more FAQs here using the same pattern */}
        </Section>
      </Container>
    </>
  );
}

export default Help;

