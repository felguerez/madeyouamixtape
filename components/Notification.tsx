import styled from "@emotion/styled";

export const NotificationContainer = styled.p`
  border-radius: 0.5rem;
  padding: 1rem;
  color: rgba(172, 234, 110);
  background-color: #282828;
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
