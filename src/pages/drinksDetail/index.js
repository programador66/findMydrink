import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import SearchServices from "../../services/SearchServices";

const DrinksDetail = () => {
  const history = useHistory();
  const { id } = useParams();

  const [drink, setDrink] = useState({});

  const getDrinkDetail = useCallback(async () => {
    await SearchServices.getDrinkDetailById(id)
      .then((response) => {
        setDrink(response.data.drinks[0]);
      })
      .catch((e) => {
        Swal.fire({
          title: "Alerta!",
          text: e.response || "Não foi possivel buscar os detalhes desse item!",
          icon: "error",
          confirmButtonText: "Fechar",
          confirmButtonColor: "#CB1240",
        });
        history.push("/");
      });
  }, [id, history]);

  useEffect(() => {
    getDrinkDetail();
  }, [getDrinkDetail]);

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Detalhes do item</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={drink.strDrinkThumb} />
        </Card>

        <Col>
          <Row>
            <Col>
              <h3>Drink: {drink?.strDrink}</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Categoria: {drink.strCategory}</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>
                Ingredientes: {drink?.strIngredient1 || ""} /{" "}
                {drink?.strIngredient1 || ""} / {drink?.strIngredient3 || ""}
              </strong>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Instruções: </h4>
              <p>{drink.strInstructions}</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Button
            variant="secondary"
            style={{ color: "#FFF" }}
            onClick={() => history.push("/")}
          >
            {" << Back to Home"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DrinksDetail;
