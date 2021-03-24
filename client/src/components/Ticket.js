import React from "react";
import '../styles/ticket.css';

export default function Ticket ( {title, content, userEmail, done, creationTime, labels, hidden, hideFunction} ) {
    
    let labelsElements = [];
    if (labels) {
       labelsElements = labels.map((label) => {
        return <p className={'ticket-labels label'}>{label}</p>
      });
    } 
  
  return (
    <div className={'ticket'}>
      <h3 className={'ticket-title'}>{title}</h3>
      <p className={'ticket-content'}>{content}</p>
      <p className={'ticket-user-email'}>{userEmail}</p>
      <p className={'ticket-done'}>{done}</p>
      <p className={'ticket-creation-time'}>{creationTime}</p>
      {labelsElements}
      <button className={'hideTicketButton'} onClick={() => hideFunction(title)}>hide</button>
    </div>
  );
}