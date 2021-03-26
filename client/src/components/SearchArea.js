import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../styles/SearchArea.css'
import TicketList from './TicketList';


export default function SearchArea() {

  const [ticketList, setTicketList] = useState([]);
  const [hideCounter, setHideCounter] = useState(0);
  const [restoredList, setRestoredList] = useState([]);
  const [ticketsShown, setTicketsShown] = useState(0);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const requestList = await axios.get('/api/tickets');
        await setTicketList(requestList.data);
        setRestoredList(requestList.data.slice());
        setTicketsShown(requestList.data.length);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []); 

  async function filterTicketList(e) {
    try {
      const requestList = await axios.get(`/api/tickets?searchText=${e.target.value}`);
      setTicketList(requestList.data);
      setTicketsShown(requestList.data.length)
    } catch (e) {
      console.log(e);
    }
  }

  function hideTicket(title) {
    const index = ticketList.findIndex((ticket) => ticket.title === title);
    ticketList[index].hidden = true;
    const visableTickets = ticketList.filter((ticket) => ticket.hidden !== true);
    setTicketList(visableTickets);
    setHideCounter(hideCounter + 1);
    setTicketsShown(ticketsShown - 1);
  }

  function restoreHidden() {

    setTicketList(restoredList);
    setTicketsShown(restoredList.length);
    setHideCounter(0);
  }

  return (
    <>
      <div className={'div-title'}>
        <h1 className={'search-title'}>Tickets Manager</h1>
      </div>
      <div className={'search-container'}>
        <input className={'search-input'} placeholder={'Search a ticket :)'} onChange={filterTicketList} id={'searchInput'} />
        <div className={'showing-and-restore-area'}>
          <span className={'count-span'}>Showing {ticketsShown} results</span>
          <div className={'restore-area'}>
            <span className={'count-span'}>hidden tickets: </span>
            <span id={'hideTicketsCounter'} className={'count-span'} >{hideCounter}</span>
            <span id={'restoreHideTickets'} className={'count-span button'} onClick={restoreHidden}>restore</span>
          </div>
        </div>
      </div>
      <TicketList ticketList={ticketList} hideFunction={hideTicket} />
    </>
  );
}