import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
  getRoadmap,
  getMilestones,
  deleteRoadmap,
  deleteMilestone,
} from "../../services/roadmap/roadmapService";

import Loader from "../../components/ui/Loader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import SectionTitle from "../../components/ui/SectionTitle";

import StatusBadge from "../../components/roadmap/StatusBadge";
import RoadmapProgress from "../../components/roadmap/RoadmapProgress";
import MilestoneCard from "../../components/roadmap/MilestoneCard";

export default function RoadmapDetailsPage() {

  const navigate =
    useNavigate();

  const queryClient =
    useQueryClient();

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

  const {
    data: milestones,
  } = useQuery({
    queryKey: [
      "milestones",
      roadmapId,
    ],
    queryFn: () =>
      getMilestones(
        roadmapId!
      ),
  });

  const deleteRoadmapMutation =
    useMutation({

      mutationFn: () =>
        deleteRoadmap(
          roadmapId!
        ),

      onSuccess: () => {

        toast.success(
          "Roadmap deleted"
        );

        navigate(
          "/roadmaps"
        );

      },

    });

  const deleteMilestoneMutation =
    useMutation({

      mutationFn:
        deleteMilestone,

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: [
            "milestones",
            roadmapId,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "roadmap",
            roadmapId,
          ],
        });

        toast.success(
          "Milestone deleted"
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

  const progress =
    roadmap.totalMilestones === 0
      ? 0
      : Math.round(
          roadmap.completedMilestones *
            100 /
            roadmap.totalMilestones
        );

  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <SectionTitle
          title={roadmap.title}
          subtitle={
            roadmap.description ??
            "No description"
          }
        />

        <div className="flex gap-3">

          <Button
            variant="secondary"
            onClick={() =>
              navigate(
                `/roadmaps/${roadmapId}/edit`
              )
            }
          >

            <Pencil size={18} />

            Edit

          </Button>

          <Button
            variant="danger"
            onClick={() => {

              if (
                window.confirm(
                  "Delete roadmap?"
                )
              ) {

                deleteRoadmapMutation.mutate();

              }

            }}
          >

            <Trash2 size={18} />

            Delete

          </Button>

        </div>

      </div>

      <Card className="space-y-5">

        <div className="flex items-center justify-between">

          <StatusBadge
            status={
              roadmap.status
            }
          />

          <p className="text-sm text-slate-500">

            Target:

            {" "}

            {roadmap.targetDate ??
              "Not set"}

          </p>

        </div>

        <RoadmapProgress
          value={progress}
        />

        <p className="text-sm text-slate-500">

          {roadmap.completedMilestones}

          /

          {roadmap.totalMilestones}

          {" "}

          milestones completed

        </p>

      </Card>

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Milestones
        </h2>

        <Button
          onClick={() =>
            navigate(
              `/roadmaps/${roadmapId}/milestones/create`
            )
          }
        >

          <Plus size={18} />

          Add Milestone

        </Button>

      </div>

      <div className="space-y-4">

        {milestones?.length === 0 && (

          <Card>

            <p className="text-center text-slate-500">

              No milestones added yet.

            </p>

          </Card>

        )}

        {milestones?.map(
          milestone => (

            <MilestoneCard

              key={
                milestone.id
              }

              milestone={
                milestone
              }

              onEdit={() =>
                navigate(
                  `/milestones/${milestone.id}/edit`,
                  {
                    state:
                      milestone,
                  }
                )
              }

              onDelete={() => {

                if (
                  window.confirm(
                    "Delete milestone?"
                  )
                ) {

                  deleteMilestoneMutation.mutate(
                    milestone.id
                  );

                }

              }}

            />

          )
        )}

      </div>

    </div>

  );

}