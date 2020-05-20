import styled from "@emotion/styled";
import { Button, ContentCard, LIGHT_GREEN } from "../../shared/styles";
import Link from "next/link";
import { SwapManager } from "../SwapManager";
import React from "react";
import { css } from "@emotion/core";

const Members = ({ swap, currentSwapMember }) => {
  return (
    <>
      <ContentCard
        css={css`
          display: block;
        `}
      >
        <List>
          {swap.members.map((member) => {
            const readyToShare = Boolean(member.selected_playlist_id);
            return (
              <li key={member.id}>
                <MemberName>
                  <Icon className="material-icons" readyToShare={readyToShare}>
                    {readyToShare ? "done_outline" : "radio_button_unchecked"}
                  </Icon>
                  <Link
                    href="/users/[spotify_id]"
                    as={`/users/${member.spotify_id}`}
                  >
                    <a>{member.display_name}</a>
                  </Link>
                  <Status>
                    {readyToShare
                      ? " is ready to swap"
                      : " is still picking the right playlist"}
                  </Status>
                </MemberName>
              </li>
            );
          })}
        </List>
        {!currentSwapMember.isEnrolled && (
          <Button>
            <SwapManager action="join" id={swap.id}>
              <span
                css={css`
                  color: white;
                  font-weight: normal;
                `}
              >
                You aren't enrolled. Join now.
              </span>
            </SwapManager>
          </Button>
        )}
      </ContentCard>
    </>
  );
};

export default Members;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const MemberName = styled.h4`
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
`;

const Icon = styled.i<{ readyToShare: boolean }>`
  font-size: 1rem;
  cursor: default;
  color: ${({ readyToShare }) =>
    readyToShare ? LIGHT_GREEN : `rgba(230, 50, 115, 1)`};
  margin-right: 0.5rem;
`;

const Status = styled.span`
  display: inline-block;
  margin-left: 0.25rem;
  font-weight: normal;
`;
