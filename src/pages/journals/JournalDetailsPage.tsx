import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
  getJournal,
  deleteJournal,
} from "../../services/journal/journalService";

import ResourceSection from "../../components/resources/ResourceSection";
import AttachmentSection from "../../components/attachments/AttachmentSection";

import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import SectionTitle from "../../components/ui/SectionTitle";

export default function JournalDetailsPage() {

  const navigate = useNavigate();

  const queryClient =
    useQueryClient();

  const { journalId } =
    useParams();

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "journal",
      journalId,
    ],
    queryFn: () =>
      getJournal(
        journalId!
      ),
  });

  const deleteMutation =
    useMutation({

      mutationFn: () =>
        deleteJournal(
          journalId!
        ),

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: ["journals"],
        });

        toast.success(
          "Journal deleted successfully"
        );

        navigate(
          "/journals"
        );
      },

      onError: () => {

        toast.error(
          "Failed to delete journal"
        );
      },
    });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return (
      <p className="text-red-500">
        Journal not found
      </p>
    );
  }

  return (
    <div>

      <SectionTitle
        title={data.title}
        subtitle={data.entryDate}
      />

      <Card>

        <div className="flex flex-wrap gap-3">

          <Button
            onClick={() =>
              navigate(
                `/journals/${journalId}/edit`
              )
            }
          >
            Edit Journal
          </Button>

          <Button
            onClick={() => {

              const confirmed =
                window.confirm(
                  "Delete this journal?"
                );

              if (confirmed) {
                deleteMutation.mutate();
              }
            }}
          >
            Delete Journal
          </Button>

        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">

          <div>

            <p className="text-sm text-slate-500">
              Mood
            </p>

            <p className="font-semibold">
              {data.mood}
            </p>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Hours Spent
            </p>

            <p className="font-semibold">
              {data.hoursSpent}
            </p>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Entry Date
            </p>

            <p className="font-semibold">
              {data.entryDate}
            </p>

          </div>

        </div>

      </Card>

      <Card className="mt-6">

        <h2 className="mb-3 text-xl font-semibold">
          Summary
        </h2>

        <p>
          {data.summary}
        </p>

      </Card>

      <Card className="mt-6">

        <h2 className="mb-3 text-xl font-semibold">
          Notes
        </h2>

        <p className="whitespace-pre-wrap">
          {data.notes}
        </p>

      </Card>

      <div className="mt-6">

        <ResourceSection
          journalId={journalId!}
        />

      </div>

      <div className="mt-6">

        <AttachmentSection
          journalId={journalId!}
        />

      </div>

    </div>
  );
}