import { useAuth } from '../../store/auth-context';

const Messages = () => {
  const { user } = useAuth();
  console.log(user.email);
  return (
    <div>
      <h1>{user.email}</h1>
    </div>
  );
}

export default Messages;