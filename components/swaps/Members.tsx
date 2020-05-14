import styled from "@emotion/styled";
import { LIGHT_GREEN } from "../../shared/styles";

const Members = ({ swap }) => {
  return (
    <Container>
      <h2>Members</h2>
      <List>
        {swap.members.map((member) => {
          return (
            <li key={member.id}>
              <MemberName>
                {member.display_name}
                {member.selected_playlist_id && (
                  <ReadyToShareStatus>Ready to share</ReadyToShareStatus>
                )}
              </MemberName>
            </li>
          );
        })}
      </List>
    </Container>
  );
};

export default Members;

const Container = styled.div`
  max-width: 240px;
`;
const List = styled.ul`
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

const BodyContent = styled.div`
  padding: 2rem 0;
`;
