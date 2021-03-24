import React from 'react';
import Ticket from './Ticket'
import '../styles/ticketList.css';

function formatDate(date) {
  return new Date(date).toISOString().slice(0, 19).replace("T", " ");
}

export default function TicketList( {ticketList, hideFunction} ) {
  const ticketElementList = ticketList.map((ticket, index) => {
      return(
      <li>
        <Ticket key={index} title={ticket.title} content={ticket.content} email={ticket.userEmail} done={ticket.done} creationTime={formatDate(ticket.creationTime)} labels={ticket.labels} hideFunction={hideFunction} />
      </li>
      );
  });
  return (
    <div>
      <ul>
        {ticketElementList}
      </ul>
    </div>
  );
}