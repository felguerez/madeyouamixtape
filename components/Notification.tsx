import styled from "@emotion/styled";
import { DARK_BLUE, GRAY } from "../shared/styles";

export const NotificationContainer = styled.p`
  border-radius: 0.5rem;
  padding: 1rem;
  color: ${GRAY};
  background-color: ${DARK_BLUE};
  display: flex;
  span {
    margin-left: 0.5rem;
  }
`;
export const Notification = ({ notification, setNotification }) => {
  return (
    <NotificationContainer onClick={() => setNotification("")}>
      <i className="material-icons">check_circle</i>
      <span>{notification}</span>
    </NotificationContainer>
  );
};
