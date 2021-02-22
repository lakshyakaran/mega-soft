// const menuData = {
//   "ms-menu": [
//     {
//       role: "Employee",
//       "menu-items": [
//         "appraisal.setup",
//         "appraisal.goal-setting",
//         "appraisal.self-assessment",
//         "confirmation.letter",
//       ],
//     },
//     {
//       role: "Manager",
//       "menu-items": [
//         "appraisal.setup",
//         "appraisal.team-goal-setting",
//         "appraisal.team-assessment",
//       ],
//     },
//     {
//       role: "HR Contact",
//       "menu-items": ["appraisal.setup", "confirmation.letter"],
//     },
//   ],
// };
// export default menuData;

const menuData = {
  "ms-menu": [
    {
      role: "Employee",
      "menu-items": [
        "sidebar_menu.appraisal.setup",
        "sidebar_menu.appraisal.goal-setting",
        "sidebar_menu.appraisal.self-assessment",
        "confirmation.letter",
      ],
    },
    {
      role: "Manager",
      "menu-items": [
        "sidebar_menu.appraisal.setup",
        "sidebar_menu.appraisal.team-goal-setting",
        "sidebar_menu.appraisal.team-assessment",
      ],
    },
    {
      role: "HR Contact",
      "menu-items": ["sidebar_menu.appraisal.setup", "confirmation.letter"],
    },
  ],
};
export default menuData;
