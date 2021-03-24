import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../styles/SearchArea.css'
import TicketList from './TicketList';


export default function SearchArea() {

  const [inputStr, setInputStr] = useState('');
  const [ticketList, setTicketList] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const requestList = await axios.get('http://localhost:8080/api/tickets');
      setTicketList(requestList.data);
    }
    fetchData();
  }, []); 


  const changeInputStr = async (e) => {
    setInputStr(e.target.value);
    const requestList = await axios.get(`http://localhost:8080/api/tickets?searchText=${e.target.value}`);
    setTicketList(requestList.data);
  }


  return (
    <>
    <div className={'search-container'}>
      <h1 className={'search-title'}>Look for a ticket</h1>
      <input className={'search-input'} placeholder={'Look for a ticket :)'} onChange={changeInputStr}/>
    </div>
    <TicketList ticketList={ticketList}/>
    </>
  );
}