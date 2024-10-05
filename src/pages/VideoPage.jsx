import { useParams } from 'react-router-dom';

export default function VideoPage() {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl">Video Details for ID: {id}</h1>

    </div>
  );
}
