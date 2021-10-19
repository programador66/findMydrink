import React, { useCallback, useEffect } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import Loading from "../../components/Loading";
import { useDrink } from "../../hooks/DrinkContext";

import SearchServices from "../../services/SearchServices";

const Home = () => {
  const { drinks, handleSetDrinks, loading, changeLoading } = useDrink();

  const searchDrinkByLetter = useCallback(async () => {
    changeLoading(true);
    await SearchServices.getDrinkByFirstLetter("a")
      .then((response) => {
        handleSetDrinks(response.data?.drinks);
        changeLoading(false);
      })
      .catch((e) => {
        console.log(e);
        changeLoading(false);
      });
  }, [handleSetDrinks, changeLoading]);

  useEffect(() => {
    searchDrinkByLetter();
  }, [searchDrinkByLetter]);

  return (
    <Container style={{ padding: "8px" }}>
      {loading && <Loading />}
      <Row>
        {drinks?.map((drink, index) => (
          <Col className="mt-4" key={index}>
            <Card style={{ width: "20rem" }}>
              <Card.Img variant="top" src={drink.strDrinkThumb} />
              <Card.Body>
                <Card.Title>{drink.strGlass}</Card.Title>
                <Card.Text>
                  {drink.strInstructions.substring(0, 50)} ...
                </Card.Text>
                <Button variant="warning" style={{ color: "#FFF" }}>
                  Go More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
