import styled from 'styled-components';
import { useUser } from './useUser';

const StyledUserAvatar = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--c-white-100);
  margin-right: 1.2rem;

`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user } = useUser();
  const firstName = user?.firstName;
  const imageUrl = user?.imageUrl;

  return (
    <StyledUserAvatar>
      <Avatar
        src={imageUrl || 'default-user.jpg'}
        alt={`Avatar of ${firstName}`}
      />
      <p>{firstName}</p>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
