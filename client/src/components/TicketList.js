import React, {useState} from 'react';
import Ticket from './Ticket'
import '../styles/ticketList.css';

function formatDate(date) {
  return new Date(date).toISOString().slice(0, 19).replace("T", " ");
}

const colors = ['#FF9933', '#14AAF5', '#7ECC49', '#DB4035', '#FAD000', '#7FFF00', '#00008B', '#9932CC', '#FF1493', '#00BFFF', '#B22222', '#FFD700', '#FF69B4', '#87CEFA', '#00FF00', '#000080'];

export default function TicketList( {ticketList, hideFunction} ) {

  const [startSlice, setStartSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(6);
  const [nextHidden, setNextHidden] = useState(false);
  const [prevHidden, setPrevHidden] = useState(true);
  const [labelsList, setLabelsList] = useState({});

  function nextPage() {
    if (startSlice <= 6) {
      setPrevHidden(false);
    } 
    if (startSlice >= ticketElementList.length - 10) {
      setNextHidden(true);
    }
    setStartSlice(startSlice + 6);
    setEndSlice(endSlice + 6);
  }
  function prevPage() {
    if (startSlice <= 6) {
      setPrevHidden(true);
    }
    if (startSlice >= ticketElementList.length - 10) {
      setNextHidden(false);
    }
      setStartSlice(startSlice - 6);
      setEndSlice(endSlice - 6);
  }

  const ticketElementList = ticketList.map((ticket, index) => {
      return(
      <li key={index} className={'ticket'}>
        <Ticket key={index} title={ticket.title} content={ticket.content} email={ticket.userEmail} done={ticket.done} creationTime={formatDate(ticket.creationTime)} labels={ticket.labels} hideFunction={hideFunction} labelsList={labelsList} setLabelsList={setLabelsList} colors={colors} />
      </li>
      );
  });

  return (
    <div className={'ticket-list'}>
          <div className={'next-prev-div'}>
        <span className={'next-prev-buttons'} hidden={nextHidden} onClick={() => nextPage()}>next page</span>
        <span className={'next-prev-buttons'} hidden={prevHidden} onClick={() => prevPage()}>previous page</span>
      </div>
      <ul className={'tickets-list'}>
        {ticketElementList.slice(startSlice, endSlice)}
      </ul>
      <div className={'next-prev-div'}>
        <span className={'next-prev-buttons'} hidden={nextHidden} onClick={() => nextPage()}>next page</span>
        <span className={'next-prev-buttons'} hidden={prevHidden} onClick={() => prevPage()}>previous page</span>
      </div>
    </div>
  );
}