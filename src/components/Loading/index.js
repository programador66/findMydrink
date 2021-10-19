import React from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 300;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  label {
    color: #fff;
  }
`;

const Loading = () => {
  return (
    <Container>
      <Spinner animation="border" variant="warning" />
      <label>Carregando ...</label>
    </Container>
  );
};

export default Loading;
