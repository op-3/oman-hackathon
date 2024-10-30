interface HackathonData {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  organizer: string;
  registrationLink: string;
  status: string;
  imageUrl: string;
}

interface PageProps {
  params: { id: string };
}

export default function EditHackathonPage({ params }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">تعديل الهاكاثون</h1>
        <EditHackathonForm id={params.id} />
      </div>
    </div>
  );
}
