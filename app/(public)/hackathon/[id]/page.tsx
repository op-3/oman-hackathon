type Props = {
  params: {
    id: string;
  };
};

async function HackathonPage({ params }: Props) {
  return (
    <div>
      <h1>Hackathon {params.id}</h1>
    </div>
  );
}

export default HackathonPage;
