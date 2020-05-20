import Router from "next/router";
import styled from "@emotion/styled";
import { SecretlyButton } from "./SwapManager";
import { DARK_GREEN } from "../shared/styles";

export const BackButton = () => {
  return (
    <Container>
      <i className="material-icons" onClick={Router.back}>
        arrow_back
      </i>
    </Container>
  );
};

const Container = styled(SecretlyButton)`
  margin-top: -1rem;
  max-height: 24px;
  line-height: 1.5rem;
  color: ${DARK_GREEN};
`;
