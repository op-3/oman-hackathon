import HackathonGrid from "@/components/public/hackathon-grid";
import Filters from "@/components/public/filters";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">الهاكاثونات في عُمان</h1>
        <p className="text-gray-600 mb-8">
          اكتشف جميع الهاكاثونات المتاحة في سلطنة عمان
        </p>

        <Filters />

        <div className="mt-6">
          <HackathonGrid />
        </div>
      </div>
    </main>
  );
}
