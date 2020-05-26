import { useSwaps, useUser } from "../lib/hooks";
import { SwapList } from "../components/SwapList";
import { SecretlyButton } from "../components/SwapManager";
import { useState } from "react";
import Form from "../components/home/form";
import { User } from "../lib/models/user";
import Router from "next/router";
import { Button, CopyContainer } from "../shared/styles";
import styled from "@emotion/styled";
import { ModalForm } from "../components/home/ModalForm";

const Swaps = () => {
  const swaps = useSwaps() || [];
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Headline>
        Made You A Mixtape{" "}
        <AddButton onClick={() => setIsOpen((isOpen) => !isOpen)}>
          <SwapIcon className="material-icons">queue</SwapIcon> New Swap Group
        </AddButton>
      </Headline>
      <p>
        Share some music with people you know or random strangers. Join an
        existing playlist exchange group below or start your own.
      </p>
      {swaps.length ? (
        <SwapTitle>
          The following {swaps.length} swap{" "}
          {swaps.length > 1 ? "groups" : "group"} are happening right now:
        </SwapTitle>
      ) : (
        <SwapTitle>Loading groups</SwapTitle>
      )}
      <NewSwapContainer>
        {isOpen && <ModalForm user={user} setIsOpen={setIsOpen} />}
      </NewSwapContainer>
      {swaps ? <SwapList swaps={swaps} /> : <p>Loading...</p>}
    </>
  );
};

const SwapIcon = styled.i`
  margin-right: 1rem;
`;

const NewSwapContainer = styled.div`
  margin-bottom: 1rem;
`;

const Headline = styled.h1`
  display: flex;
  justify-content: space-between;
`;

const AddButton = styled(Button)`
  display: flex;
  justify-content: center;
`;

const SwapTitle = styled.h4`
  margin-top: 0;
`;

export default Swaps;
