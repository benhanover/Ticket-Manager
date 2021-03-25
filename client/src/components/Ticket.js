import React from "react";
import '../styles/ticket.css';

export default function Ticket ( {title, content, email, done, creationTime, labels, hideFunction} ) {
    let labelsElements = [];
    if (labels) {
       labelsElements = labels.map((label) => {
        return <p className={'ticket-labels label'}>{label}</p>
      });
    } 
  
  return (
    <div className={'ticket-div'}>
      <div className={'ticket'}>
        <h2 className={'ticket-title'}>{title}</h2>
        <p className={'ticket-content'}>{content}</p>
        <div className={'email-date-div'}>
          <p className={'ticket-user-email'}>by {email}</p>
          <p className={'ticket-done'}>{done}</p>
          <p className={'ticket-creation-time'}>{creationTime}</p>
        </div>
        <div className={'labels'}>
          {labelsElements}  
        </div>
        <button className={'hideTicketButton'} onClick={() => hideFunction(title)}>hide</button>
      </div>
    </div>
  );
}