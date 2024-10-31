interface PageProps {
  params: {
    id: string;
  };
}

export default function HackathonPage({ params }: PageProps) {
  const { id } = params;

  return (
    <div>
      <h1>Hackathon {id}</h1>
    </div>
  );
}
