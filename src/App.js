import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [data, setData] = useState([]);
  const [index, setindex] = useState();
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const filteredData = data.filter((el) => {
    if (search === "") {
      return el;
    } else {
      return el.name.common.toLowerCase().includes(search.toLocaleLowerCase());
    }
  });

  useEffect(() => {
    axios("https://restcountries.com/v3.1/all?fields=name,flags,continents")
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => console.log(error));
  }, [])

  return (
    <main>
      <div className='holdList'>
        <div className='holdList1'>
          <div className='holdList2'>

            <input
              type="search"
              placeholder="Search by country name..."
              onChange={(e) => setSearch(e.target.value)}
              className='holdList3'
            />
            <button className='holdSearch'>Search...</button>

          </div>

          {
            filteredData.map((item, index) => {

              return (
                <div className='holdContent' key={index}>
                  <div className='holdContent2'>
                    <img src={item.flags.png} alt="Flag" />
                    <h1>{item.name.common}</h1>
                  </div>
                  <p><span>Continents: </span><span>{item.continents[0]}</span></p>
                  <button
                    onClick={() => {
                      setShow(true);
                      setindex(JSON.stringify(item));
                    }}
                  >
                    Details...
                  </button>
                </div>
              )
            })
          }

        </div>
      </div>

      {
        show &&

        <div className='modal'>
          <div className='modal2'>
            <img src={JSON.parse(index).flags.png} alt="Flags" className='modalImg' />

            <div className='modalContent'>

              <h3>
                <span>Country: </span>
                <span>{JSON.parse(index).name.common}</span>
              </h3>

              <p>
                <span>Official: </span>
                <span>{JSON.parse(index).name.official}</span>
              </p>

              <p>
                <span>Continents: </span>
                <span>{JSON.parse(index).continents[0]}</span>
              </p>

              <button onClick={() => setShow(false)}>Close</button>

            </div>
          </div>
        </div>

      }

    </main>
  );
}

export default App;
