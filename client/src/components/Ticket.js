import React, {useState} from 'react';
import '../styles/ticket.css';

export default function Ticket ( {title, content, email, done, creationTime, labels, hideFunction} ) {

    const colors = ['black', 'red', 'blue', 'green', 'pink', 'brown', 'yellow'];
    function getRandomLabelColor() {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const index = colors.findIndex(colorInTheList => colorInTheList === color);
      colors.splice(index, 1);
      console.log(color);
      return color;
    }
    const labelsList = {};

   

    let labelsElements = [];
    if (labels) {
       labelsElements = labels.map((label) => {
        if(!labelsList[label]) {
          labelsList[label] = getRandomLabelColor();
        } 

        return <p className={'label'} style={{backgroundColor: labelsList[label]}}>{label}</p>
      });
    } 

    const [ticketContent, setTicketContent] = useState(content.slice(0, 100));
    const [showMoreOrLess, setShowMoreOrLess] = useState('show more...');

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
          <div className={'email-date-div'}>
            <p className={'ticket-user-email'}>by <span className={'email'}>{email} </span></p>
            <p className={'ticket-done'}>{done}</p>
            <p className={'ticket-creation-time'}>' created at {creationTime}</p>
          </div>
          <div className={'labels'}>
            {labelsElements}  
          </div>
        <span className={'hideTicketButton'} onClick={() => hideFunction(title)}>hide</span>
      </>
  );
}