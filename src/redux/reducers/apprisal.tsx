var initailState = {
  id: "",
  description: "1",
  appraisal_description: "",
  review_from: "",
  appraisal_to: "",
  review_frequency: "",
  type: "",
  format_type: "",
  kra_settings_tab_goals: false,
  kra_settings_tab_competencies: false,
  kra_settings_tab_development_plan: false,
  kra_settings_tab_summary: false,
  assessment_tab_goals: false,
  assessment_tab_development_plan: false,
  assessment_tab_competencies: false,
  assessment_tab_summary: false,
  appraisal_owner: "",
  route: "",
};

export default function Appraisal(
  state = initailState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "ADD_APPRISAL": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
