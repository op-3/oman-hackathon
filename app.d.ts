declare namespace App {
  interface PageProps {
    params: {
      id: string;
    };
    searchParams?: { [key: string]: string | string[] | undefined };
  }
}
