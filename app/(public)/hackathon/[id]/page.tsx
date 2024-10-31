import { Suspense } from "react";

interface Props {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: Props) {
  const { id } = params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1>Hackathon {id}</h1>
      </div>
    </Suspense>
  );
}
