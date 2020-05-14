import styled from "@emotion/styled";
import {DARK_BLUE, LIGHT_GREEN} from "../../shared/styles";

const Members = ({ swap }) => {
  return (
    <BodyContent>
      <h2>Members</h2>
      <p>
        These people are swapping playlists with each other and finding new cool
        music.
      </p>
      <Container>
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
      </Container>
    </BodyContent>
  );
};

export default Members;

const Container = styled.ul`
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
