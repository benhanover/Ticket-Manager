import React from 'react';
import Ticket from './Ticket'
import '../styles/ticketList.css';

export default function TicketList( {ticketList} ) {
  console.log(ticketList);
  const ticketElementList = ticketList.map((ticket, index) => {
    return(
    <li>
      <Ticket key={index} title={ticket.title} content={ticket.content} email={ticket.userEmail} done={ticket.done} creationTime={ticket.creationTime} labels={ticket.labels} />
    </li>
    );
  })
  return (
    <div>
      <ul>
        {ticketElementList}
      </ul>
    </div>
  );
}