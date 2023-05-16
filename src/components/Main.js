// src/main/frontend/src/App.js
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, Route, useLocation } from 'react-router-dom';

const Main = () => {
  const [text, SetText] = useState('');
  const [data, Setdata] = useState([]);
  const {state} = useLocation();
  
  const onChange = (e) => {
    const {target: {value}} = e;
    SetText(value);
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    getUserData();
  }

  const getUserData = () => {
    axios.post(
      '/api/search', null,
      { params: {
         summonerName: text
       }})
     .then(function (response) { 
        Setdata(response.data);
     })
     .catch(function (error) {
       if(error.response.status === 500) alert("소환사를 찾을 수 없습니다.")
     });
  }
  return (
      <div>
        <Link to="/">Test페이지</Link>
        <form onSubmit={onSubmit}>
          <input type='text' placeholder='소환사 검색' onChange={onChange} value={text} />
          <input type='submit' value="검색" /> 
        </form>
          <p> accountId : {data.accountId}</p>
          <p> id : {data.id}</p>
          <p> name : {data.name}</p>
          <p> profileIconId : {data.profileIconId}</p>
          <p> puuid : {data.puuid}</p>
          <p> revisionDate : {data.revisionDate}</p>
          <p> summonerLevel : {data.summonerLevel}</p>
      </div>
  );
}

export default Main;