import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";

interface Props {
  journal: any;
}

export default function JournalCard({
  journal,
}: Props) {

  const navigate =
    useNavigate();

  return (
    <Card>

      <h3 className="text-lg font-semibold">
        {journal.title}
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        {journal.mood} • {journal.hoursSpent} Hours
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {journal.entryDate}
      </p>

      <p className="mt-4">
        {journal.summary}
      </p>

      <button
        className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white"
        onClick={() =>
          navigate(
            `/journals/${journal.id}`
          )
        }
      >
        View Journal
      </button>

    </Card>
  );
}