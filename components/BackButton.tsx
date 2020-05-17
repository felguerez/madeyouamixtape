import Router from "next/router";
import styled from "@emotion/styled";
import { ButtonLink } from "./SwapManager";

export const BackButton = () => {
  return (
    <Container>
      <i className="material-icons" onClick={Router.back}>
        arrow_back
      </i>
    </Container>
  );
};

const Container = styled(ButtonLink)`
  margin-top: -1rem;
  max-height: 24px;
  line-height: 1.5rem;
`;
