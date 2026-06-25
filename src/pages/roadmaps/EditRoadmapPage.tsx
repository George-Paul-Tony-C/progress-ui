import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
  getRoadmap,
  updateRoadmap,
} from "../../services/roadmap/roadmapService";

import Loader from "../../components/ui/Loader";
import SectionTitle from "../../components/ui/SectionTitle";

import RoadmapForm from "../../components/roadmap/RoadmapForm";

export default function EditRoadmapPage() {

  const navigate =
    useNavigate();

  const { roadmapId } =
    useParams();

  const {
    data: roadmap,
    isLoading,
  } = useQuery({

    queryKey: [
      "roadmap",
      roadmapId,
    ],

    queryFn: () =>
      getRoadmap(
        roadmapId!
      ),

  });

  const mutation =
    useMutation({

      mutationFn: (data: {
        title: string;
        description: string;
        targetDate: string;
        status: any;
      }) =>
        updateRoadmap(
          roadmapId!,
          data
        ),

      onSuccess: () => {

        toast.success(
          "Roadmap updated successfully"
        );

        navigate(
          `/roadmaps/${roadmapId}`
        );

      },

      onError: () => {

        toast.error(
          "Failed to update roadmap"
        );

      },

    });

  if (isLoading) {
    return <Loader />;
  }

  if (!roadmap) {
    return (
      <p>
        Roadmap not found.
      </p>
    );
  }

  return (

    <div className="space-y-6">

      <SectionTitle
        title="Edit Roadmap"
        subtitle="Update your learning roadmap."
      />

      <RoadmapForm

        initialTitle={
          roadmap.title
        }

        initialDescription={
          roadmap.description ?? ""
        }

        initialTargetDate={
          roadmap.targetDate ?? ""
        }

        initialStatus={
          roadmap.status
        }

        submitText="Save Changes"

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