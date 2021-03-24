import React, {useState} from 'react';
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
   
  const [startSlice, setStartSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(6);
  const nextButton = document.getElementById('next-button');
  const prevButton = document.getElementById('prev-button');

  function nextPage() {
    if (startSlice <= 6) {
      prevButton.hidden = false;
    } 
    setStartSlice(startSlice + 6);
    setEndSlice(endSlice + 6);
  }
  function prevPage() {
    if (startSlice <= 6) {
      prevButton.hidden = true;
    }
      setStartSlice(startSlice - 6);
      setEndSlice(endSlice - 6);
  }



  return (
    <div>
      {/* <button id={'next-button'}onClick={() => nextPage()}>next page</button>
      <button id={'prev-button'} hidden onClick={() => prevPage()}>previous page</button> */}
      <ul>
        {/* {ticketElementList.slice(startSlice, endSlice)} */}
        {ticketElementList}
      </ul>
    </div>
  );
}