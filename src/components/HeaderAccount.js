import '../scss/HeaderAccount.scss';
import { useSelector } from 'react-redux';

export default function HeaderAccount() {
  const user = useSelector((state) => state.user.name);
  const userName = user.displayName;
  const userAvatar = user.photoURL;
  const click = () => {
    console.log(user);
  };

  return (
    <div className="account">
      <span className="account__name">{userName}</span>
      <div className="account__avatar">
        <img src={userAvatar} alt="" />
      </div>
      <button onClick={click}>Click</button>
    </div>
  );
}
