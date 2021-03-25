import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../styles/SearchArea.css'
import TicketList from './TicketList';


export default function SearchArea() {

  const [ticketList, setTicketList] = useState([]);
  const [hideCounter, setHideCounter] = useState(0);
  const [restoredList, setRestoredList] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const requestList = await axios.get('/api/tickets');
        await setTicketList(requestList.data);
        setRestoredList(requestList.data.slice());
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []); 


  const filterTicketList = async (e) => {
    try {
      const requestList = await axios.get(`/api/tickets?searchText=${e.target.value}`);
      setTicketList(requestList.data);
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
  }

  function restoreHidden() {
    setTicketList(restoredList);
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
        <span className={'count-span'}>Showing {ticketList.filter(ticket => ticket.hidden === false).length} results</span>
        <div className={'restore-area'}>
          <span className={'count-span'}>hidden tickets: </span>
          <span id={'hideTicketsCounter'} className={'count-span'} >{hideCounter}</span>
          <button id={'restoreHideTickets'} className={'count-span'} onClick={restoreHidden}>restore</button>
        </div>
      </div>
    </div>
    <TicketList ticketList={ticketList} hideFunction={hideTicket} />
    </>
  );
}