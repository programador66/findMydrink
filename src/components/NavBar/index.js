import React, { useCallback, useEffect, useState } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { useDrink } from "../../hooks/DrinkContext";
import SearchServices from "../../services/SearchServices";

export function NavBar() {
  const { handleSetDrinks, changeLoading, handleSetSearchDrink } = useDrink();
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

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

  const handleSearchByName = useCallback(
    async (e) => {
      e.preventDefault();
      if (search.length === 0) {
        Swal.fire({
          title: "Alerta!",
          text: "Digite um nome para a busca!",
          icon: "error",
          confirmButtonText: "Fechar",
          confirmButtonColor: "#CB1240",
        });

        return 0;
      }
      changeLoading(true);
      await SearchServices.getDrinkByName(search)
        .then(async (response) => {
          await handleSetSearchDrink(search);
          await handleSetDrinks(response.data.drinks);
          changeLoading(false);
        })
        .catch((e) => {
          changeLoading(false);
          Swal.fire({
            title: "Alerta!",
            text: e.response.message || "Erro ao processar a busca!",
            icon: "error",
            confirmButtonText: "Fechar",
            confirmButtonColor: "#CB1240",
          });
        });
    },
    [search, changeLoading, handleSetDrinks, handleSetSearchDrink]
  );

  const handleGetCategory = useCallback(
    async (category) => {
      changeLoading(true);
      await SearchServices.filterCategoryByName(category)
        .then(async (response) => {
          await handleSetSearchDrink(category);
          await handleSetDrinks(response.data.drinks);
          changeLoading(false);
        })
        .catch((e) => {
          changeLoading(false);
        });
    },
    [handleSetSearchDrink, handleSetDrinks, changeLoading]
  );

  return (
    <Navbar bg="light" expand="lg" color="orange">
      <Navbar.Brand href="/" style={{ marginLeft: "8px" }}>
        FINDMYDRINK
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "100px", marginLeft: "1rem" }}
          navbarScroll
        >
          <NavDropdown title="Category" id="navbarScrollingDropdown">
            {categories.map((category, index) => (
              <span key={index}>
                <NavDropdown.Item
                  href="#findByCategory"
                  onClick={() => handleGetCategory(category.strCategory)}
                >
                  {category.strCategory}
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </span>
            ))}
          </NavDropdown>
        </Nav>
        <Form
          className="d-flex"
          style={{ marginLeft: "2rem" }}
          onSubmit={(e) => handleSearchByName(e)}
        >
          <FormControl
            type="search"
            placeholder="Search by drink name"
            className="mr-2"
            aria-label="Search"
            style={{ width: "400px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="warning"
            style={{ marginLeft: "4px", color: "#FFF" }}
            onClick={handleSearchByName}
          >
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
