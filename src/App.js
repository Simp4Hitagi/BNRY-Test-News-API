import React, { useEffect, useState } from 'react';
// import React, { useState } from 'react';
import { Navbar, Nav, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from "react-router-dom";
// import NavbarComp, { search } from './components/NavbarComponent';


function App() {
  const [search, setSearch] = useState('');
  console.log(search);

  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Call API when component mounts
  useEffect(() => {
    fetch('https://newsapi.org/v2/everything?q=tesla&from=2023-03-20&sortBy=publishedAt&apiKey=9bd2f1c3020c48ff8cc54997bbcafb52')
      .then(response => response.json())
      .then(data => {
        setIsLoaded(true);
        setItems(data.articles);
        console.log(data);
      });
  }, []);

  // Return JSX to render on the page
  return (
    <div className="App">
      <Navbar bg="light" expand="lg" sticky="top" scrolling>
      <Container fluid>
        <Navbar.Brand href="#"><img src="" alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="./pages/Articles.jsx">Articles</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control type="search" onChange={(event) => setSearch(event.target.value)} placeholder="Search" className="me-2" aria-label="Search" />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>


      {isLoaded ? (
        // empty tag is a fragment
        <>
          <h3>Data successfully loaded</h3>
          {/* creates new array to display selected data */}
          <ul>
            {items.filter((item) => {
              return search.toLowerCase() === '' 
              ? item 
              : item.title.toLowerCase().includes(search)
            } ).map(item => (
              <li key={item.title}>{item.title}</li>
            ))}
          </ul>
        </>
      ) : (
        <h5>Loading data...</h5>
      )}
    </div>
  );
}

export default App;