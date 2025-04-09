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

const scheduleData = {
  "OSW10": {
    title: "OSW10 SUNY Oswego Blue Route - Oswego - From Campus (04/01/2025)",
    stops: [
      "SUNY Oswego Campus Center",
      "Rudolph St & Centennial Dr",
      "SUNY Oswego New Campus",
      "SUNY Oswego The Village Residence"
    ],
    rows: [
      ["07:46 AM", "07:48 AM", "07:52 AM", "07:56 AM"],
      ["08:20 AM", "08:22 AM", "08:26 AM", "08:30 AM"],
      ["08:40 AM", "08:42 AM", "08:46 AM", "08:50 AM"],
      ["09:00 AM", "09:02 AM", "09:06 AM", "09:10 AM"],
      ["09:20 AM", "09:22 AM", "09:26 AM", "09:30 AM"],
      ["09:40 AM", "09:42 AM", "09:46 AM", "09:50 AM"],
      ["10:00 AM", "10:02 AM", "10:06 AM", "10:10 AM"],
      ["10:20 AM", "10:22 AM", "10:26 AM", "10:30 AM"],
      ["10:40 AM", "10:42 AM", "10:46 AM", "10:50 AM"],
      ["11:00 AM", "11:02 AM", "11:06 AM", "11:10 AM"]
    ]
  }
};

function ScheduleTable({ route }) {
  const schedule = scheduleData[route];

  if (!schedule) {
    return <NoScheduleMessage>No schedule available for this route.</NoScheduleMessage>;
  }

  const { title, stops, rows } = schedule;

  return (
    <TableWrapper>
      <TableTitle>{title}</TableTitle>
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
