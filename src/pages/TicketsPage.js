import { Link } from 'react-router-dom';

export default function TicketsPage() {
  return (
    <div>
      <h1>Hello</h1>
      <button>
        <Link to={'new'}>New ticket</Link>
      </button>
    </div>
  );
}
