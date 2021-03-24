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
    <div className={'search-container'}>
      <h1 className={'search-title'}>Look for a ticket</h1>
      <input className={'search-input'} placeholder={'Look for a ticket :)'} onChange={filterTicketList} id={'searchInput'} />
    </div>
    <p id={'hideTicketsCounter'}>{hideCounter}</p>
    <button id={'restoreHideTickets'} onClick={restoreHidden}>restore</button>
    <TicketList ticketList={ticketList} hideFunction={hideTicket} />
    </>
  );
}