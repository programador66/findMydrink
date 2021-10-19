import React, { useCallback, useEffect, useState } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import SearchServices from "../../services/SearchServices";

export function NavBar() {
  const [categories, setCategories] = useState([]);

  const getCategories = useCallback(async () => {
    await SearchServices.getCategories()
      .then((response) => {
        setCategories(response.data.drinks);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Navbar bg="light" expand="lg" color="orange">
      <Navbar.Brand href="#" style={{ marginLeft: "8px" }}>
        FINDMYDRINK
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link href="#action2">Drinks</Nav.Link>
          <NavDropdown title="Category" id="navbarScrollingDropdown">
            {categories.map((category, index) => (
              <span key={index}>
                <NavDropdown.Item href="#action3">
                  {category.strCategory}
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </span>
            ))}
          </NavDropdown>
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search by drink name"
            className="mr-2"
            aria-label="Search"
            style={{ width: "400px" }}
          />
          <Button
            variant="warning"
            style={{ marginLeft: "4px", color: "#FFF" }}
          >
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
