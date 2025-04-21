import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  margin-top: 1rem;
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableTitle = styled.h3`
  color: #002B5C;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding: 0 1rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 0;
`;

const Caption = styled.caption`
  font-weight: 500;
  color: #666;
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
`;

const Th = styled.th`
  background-color: #f8f9fa;
  color: #002B5C;
  font-weight: 600;
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #e9ecef;
  white-space: nowrap;
  
  &:first-child {
    border-top-left-radius: 8px;
  }
  
  &:last-child {
    border-top-right-radius: 8px;
  }
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  color: #333;
  
  &:first-child {
    font-weight: 500;
  }
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f8f9fa;
  }
  
  &:last-child td {
    border-bottom: none;
  }
`;

const NoScheduleMessage = styled.p`
  text-align: center;
  color: #666;
  padding: 2rem;
  font-size: 1.1rem;
`;

function ScheduleTable({ scheduleData, loading }) {
  if (loading) {
    return <NoScheduleMessage>Loading schedule...</NoScheduleMessage>;
  }

  if (!scheduleData || scheduleData.length === 0) {
    return <NoScheduleMessage>No schedule available for this route.</NoScheduleMessage>;
  }

  const stops = scheduleData.stops || [];
  const rows = scheduleData.rows || [];

  return (
    <TableWrapper>
      <TableTitle>Scheduled Arrival Times</TableTitle>
      <StyledTable>
        <Caption>Scheduled Arrival Times</Caption>
        <thead>
          <tr>
            {stops.map((stop, index) => (
              <Th key={index}>{stop}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {row.map((time, cellIndex) => (
                <Td key={cellIndex}>{time}</Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
}

export default ScheduleTable;
