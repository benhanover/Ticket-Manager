import React, {useEffect, useLayoutEffect, useState} from 'react';
import '../styles/ticket.css';

export default function Ticket ( {title, content, email, done, creationTime, labels, hideFunction, labelsList, setLabelsList, colors} ) {

    const [ticketContent, setTicketContent] = useState(content.slice(0, 100));
    const [showMoreOrLess, setShowMoreOrLess] = useState('show more...');
    let labelsElements = [];

    function getRandomLabelColor() {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const index = colors.findIndex(colorInTheList => colorInTheList === color);
      colors.splice(index, 1);
      console.log(colors);
      return color;
    }

      if (labels) {
        labelsElements = labels.map((label, index) => {
          if(!labelsList[label]) {
            labelsList[label] = getRandomLabelColor();
            setLabelsList({...labelsList});
          } 
          return <p key={index} className={'label'} style={{backgroundColor: labelsList[label]}}>{label}</p>
        });
      } 

    function setContent(content) {
      if(ticketContent.length < 101) {
        setShowMoreOrLess(' show less...');
        setTicketContent(content);
      } else {
        setShowMoreOrLess(' show more...');
        setTicketContent(content.slice(0, 100));
      }
    }
  
  return (
      <>
        <h2 className={'ticket-title'}>{title}</h2>
        <p className={'ticket-content'}>{ticketContent} <span className={'more-or-less'} onClick={() => setContent(content)}> {showMoreOrLess}</span></p>
        <div className={'ticket-footer'}>
          <div className={'labels'}>
            {labelsElements}  
          </div>
          <div className={'email-date-div'}>
            <p className={'ticket-user-email'}>by <span className={'email'}>{email} </span></p>
            <p className={'ticket-done'}>{done}</p>
            <p className={'ticket-creation-time'}>created at {creationTime}</p>
          </div>
        </div>
        <span className={'hideTicketButton'} onClick={() => hideFunction(title)}>hide</span>
      </>
  );
}