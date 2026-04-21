import { GROUP } from "./constants.js";

export let DEFAULTS = null;

Hooks.once("tokenActionHudCoreApiReady", async coreModule => {
  const groups = structuredClone(GROUP);

  Object.values(groups).forEach(group => {
    group.listName = `Group: ${group.name}`;
  });

  const groupsArray = Object.values(groups);

  DEFAULTS = {
    layout: [
      {
        nestId: "attacks",
        id: "attacks",
        name: "Attacks",
        groups: [
          { ...groups.attacks, nestId: "attacks_attacks" }
        ]
      },
      {
        nestId: "spells",
        id: "spells",
        name: "Spells",
        groups: [
          { ...groups.spells, nestId: "spells_spells" }
        ]
      },
      {
        nestId: "checks",
        id: "checks",
        name: "Checks",
        groups: [
          { ...groups.checks, nestId: "checks_checks" }
        ]
      },
      {
        nestId: "saves",
        id: "saves",
        name: "Saves",
        groups: [
          { ...groups.saves, nestId: "saves_saves" }
        ]
      },
      {
        nestId: "adventuring",
        id: "adventuring",
        name: "Adventuring",
        groups: [
          { ...groups.adventuring, nestId: "adventuring_adventuring" }
        ]
      },
     {
        nestId: "proficiencies",
        id: "proficiencies",
        name: "Proficiencies",
        groups: [
          {...groups.proficiencies, nestId: "proficiencies_proficiencies" }
        ]
     },
      {
        nestId: "utility",
        id: "utility",
        name: "Utility",
        groups: [
          { ...groups.utility, nestId: "utility_utility" }
        ]
      }
    ],
    groups: groupsArray
  };
});
