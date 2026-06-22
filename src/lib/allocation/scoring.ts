import type { NeedAssessment } from "@/lib/validations/allocation";

const INCOME_SCORES: Record<NeedAssessment["incomeBracket"], number> = {
  below_50k: 40,
  "50k_100k": 30,
  "100k_200k": 15,
  above_200k: 5,
};

const DISTANCE_SCORES: Record<NeedAssessment["distanceCategory"], number> = {
  onsite: 5,
  nearby: 20,
  far: 35,
};

const GUARDIAN_SCORES: Record<NeedAssessment["guardianStatus"], number> = {
  orphan: 25,
  single_parent: 15,
  both_parents: 5,
};

export function computeNeedScore(assessment: NeedAssessment): number {
  return (
    INCOME_SCORES[assessment.incomeBracket] +
    DISTANCE_SCORES[assessment.distanceCategory] +
    GUARDIAN_SCORES[assessment.guardianStatus]
  );
}

export function getScoreBreakdown(assessment: NeedAssessment) {
  return {
    income: INCOME_SCORES[assessment.incomeBracket],
    distance: DISTANCE_SCORES[assessment.distanceCategory],
    guardian: GUARDIAN_SCORES[assessment.guardianStatus],
    total: computeNeedScore(assessment),
  };
}
