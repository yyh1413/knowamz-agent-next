import React, { memo } from "react";
import type { EdgeProps } from "reactflow";
import { BaseEdge, getBezierPath } from "reactflow";
import type { WorkflowEdge } from "../../types/workflow";

const edgeColors = {
  running: "yellow",
  success: "green",
  failure: "red",
};

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  ...props
}: EdgeProps<WorkflowEdge>) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: props.data?.status ? edgeColors[props.data.status] || "black" : "black",
          transition: "stroke 0.2s ease",
        }}
      />
    </>
  );
};

export default memo(CustomEdge);
