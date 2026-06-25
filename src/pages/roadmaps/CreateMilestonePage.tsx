import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  createMilestone,
} from "../../services/roadmap/roadmapService";

import MilestoneForm from "../../components/roadmap/MilestoneForm";

import SectionTitle from "../../components/ui/SectionTitle";

export default function CreateMilestonePage() {

  const navigate =
    useNavigate();

  const { roadmapId } =
    useParams();

  const mutation =
    useMutation({

      mutationFn: (data: {
        title: string;
        description: string;
      }) =>
        createMilestone(
          roadmapId!,
          data
        ),

      onSuccess: () => {

        toast.success(
          "Milestone created successfully"
        );

        navigate(
          `/roadmaps/${roadmapId}`
        );

      },

      onError: () => {

        toast.error(
          "Failed to create milestone"
        );

      },

    });

  return (

    <div className="space-y-6">

      <SectionTitle
        title="Create Milestone"
        subtitle="Add a milestone to your roadmap."
      />

      <MilestoneForm

        submitText="Create Milestone"

        loading={
          mutation.isPending
        }

        onSubmit={(data) =>
          mutation.mutate(data)
        }

      />

    </div>

  );

}