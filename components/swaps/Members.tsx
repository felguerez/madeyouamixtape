import styled from "@emotion/styled";
import { ContentCard, LIGHT_GREEN } from "../../shared/styles";

const Members = ({ swap }) => {
  return (
    <>
      <h2>Members</h2>
      <ContentCard>
        <List>
          {swap.members.map((member) => {
            return (
              <li key={member.id}>
                <MemberName>
                  {member.display_name}
                  {member.selected_playlist_id && (
                    <ReadyToShareStatus>
                      <Icon className="material-icons">done_outline</Icon>
                    </ReadyToShareStatus>
                  )}
                </MemberName>
              </li>
            );
          })}
        </List>
      </ContentCard>
    </>
  );
};

export default Members;

const List = styled.ul`
  max-width: 240px;
  list-style: none;
  padding-left: 0;
`;

const ReadyToShareStatus = styled.span`
  color: ${LIGHT_GREEN};
  font-weight: normal;
  margin-left: 0.5rem;
`;

const MemberName = styled.h4`
  margin: 0;
`;

const Icon = styled.i`
  font-size: 1rem;
`;
