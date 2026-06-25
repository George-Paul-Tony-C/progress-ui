import { useNavigate } from "react-router-dom";

import { useJournals } from "../../hooks/useJournals";

import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import SectionTitle from "../../components/ui/SectionTitle";

export default function JournalListPage() {

  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
  } = useJournals();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <p className="text-red-500">
        Failed to load journals
      </p>
    );
  }

  return (
    <div>

      <div className="mb-6 flex items-center justify-between">

        <SectionTitle
          title="Journals"
          subtitle="Track your learning journey"
        />

        <Button
          onClick={() =>
            navigate("/journals/create")
          }
        >
          Create Journal
        </Button>

      </div>

      {data?.content.length === 0 ? (

        <Card>

          <p className="text-slate-500">
            No journals found.
          </p>

        </Card>

      ) : (

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {data?.content.map(
            (journal) => (

              <Card
                key={journal.id}
              >

                <h3 className="text-lg font-semibold">
                  {journal.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {journal.mood}
                  {" • "}
                  {journal.hoursSpent}
                  {" Hours"}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {journal.entryDate}
                </p>

                <p className="mt-4 line-clamp-3">
                  {journal.summary}
                </p>

                <Button
                  className="mt-4"
                  onClick={() =>
                    navigate(
                      `/journals/${journal.id}`
                    )
                  }
                >
                  View Journal
                </Button>

              </Card>

            )
          )}

        </div>

      )}

    </div>
  );
}