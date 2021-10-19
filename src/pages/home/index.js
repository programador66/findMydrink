import React, { useCallback, useEffect } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import Loading from "../../components/Loading";
import { useDrink } from "../../hooks/DrinkContext";
import { useHistory } from "react-router-dom";

import SearchServices from "../../services/SearchServices";
import NavBar from "../../components/NavBar";

const Home = () => {
  const { drinks, handleSetDrinks, loading, changeLoading, searchDrink } =
    useDrink();

  const history = useHistory();

  const searchDrinkByLetter = useCallback(async () => {
    changeLoading(true);
    await SearchServices.getDrinkByFirstLetter("a")
      .then((response) => {
        handleSetDrinks(response.data?.drinks);
        changeLoading(false);
      })
      .catch((e) => {
        changeLoading(false);
      });
  }, [handleSetDrinks, changeLoading]);

  useEffect(() => {
    searchDrinkByLetter();
  }, [searchDrinkByLetter]);

  return (
    <>
      <NavBar />
      <Container style={{ padding: "8px" }}>
        {loading && <Loading />}
        <Row>
          <Col className="mt-2">
            {searchDrink !== "" ? (
              <h3>Resultado para: {searchDrink}</h3>
            ) : (
              <h3>Recomendações</h3>
            )}
          </Col>
        </Row>
        <Row>
          {drinks?.map((drink, index) => (
            <Col className="mt-4" key={index}>
              <Card style={{ width: "20rem" }}>
                <Card.Img variant="top" src={drink.strDrinkThumb} />
                <Card.Body>
                  <Card.Title>{drink.strGlass || drink.strDrink}</Card.Title>
                  <Card.Text>
                    {drink?.strInstructions
                      ? drink?.strInstructions.substring(0, 30)
                      : ""}{" "}
                    ...
                  </Card.Text>
                  <Button
                    variant="warning"
                    style={{ color: "#FFF" }}
                    onClick={() =>
                      history.push("/detail-drinks/" + drink.idDrink)
                    }
                  >
                    Go More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
