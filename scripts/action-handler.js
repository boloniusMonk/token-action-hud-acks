import { GROUP } from "./constants.js";

export let ActionHandler = null;

Hooks.once("tokenActionHudCoreApiReady", async coreModule => {
  ActionHandler = class ActionHandler extends coreModule.api.ActionHandler {
    async buildSystemActions(groupIds) {
      this.actorType = this.actor?.type;
      this.items = this.actor?.items ?? [];

      if (!this.actor) return;

      this.#buildAttackActions();
      this.#buildSpellActions();
      this.#buildCheckActions();
      this.#buildSaveActions();
      this.#buildAdventuringActions();
      this.#buildProficiencyActions();	    
      this.#buildUtilityActions();	    
    }

    #buildAttackActions() {
      const weapons = this.items.filter(item => item.type === "weapon");
      if (!weapons.length) return;

      const actions = weapons.map(item => ({
        id: item.id,
        name: item.name,
        img: item.img,
        system: {
          actionType: "weapon",
          actionId: item.id
        }
      }));

      this.addActions(actions, { id: GROUP.attacks.id });
    }

#buildSpellActions() {
  const spells = this.items
    .filter(item => item.type === "spell")
    .sort((a, b) => a.name.localeCompare(b.name));

  if (!spells.length) return;

  const actions = spells.map(item => ({
    id: item.id,
    name: item.name,
    img: item.img,
    system: {
      actionType: "spell",
      actionId: item.id
    }
  }));

  this.addActions(actions, { id: GROUP.spells.id });
}

#buildCheckActions() {
  const scores = this.actor?.system?.scores;
  if (!scores) return;

  const labels = {
    str: "STR",
    int: "INT",
    wis: "WIL",
    dex: "DEX",
    con: "CON",
    cha: "CHA"
  };

  const order = ["str", "int", "wis", "dex", "con", "cha"];

  const actions = order
    .filter(id => scores[id])
    .map(id => ({
      id,
      name: labels[id],
      info1: { text: String(scores[id].value ?? "") },
      info2: { text: String(scores[id].mod ?? "") },
      system: {
        actionType: "check",
        actionId: id
      }
    }));

  this.addActions(actions, { id: GROUP.checks.id });
}

#buildSaveActions() {
  const saves = this.actor?.system?.saves;
  if (!saves) return;

  const labels = {
    paralysis: "Paralysis",
    death: "Death",
    breath: "Blast",
    implements: "Implements",
    spell: "Spells",
    wand: "Wands"
  };

  const order = ["paralysis", "death", "breath", "implements", "spell", "wand"];

  const actions = order
    .filter(id => saves[id])
    .map(id => ({
      id,
      name: labels[id],
      info1: { text: String(saves[id].value ?? "") },
      system: {
        actionType: "save",
        actionId: id
      }
    }));

  this.addActions(actions, { id: GROUP.saves.id });
}

#buildAdventuringActions() {
  const adv = this.actor?.system?.adventuring;
  if (!adv) return;

  const labels = {
    dungeonbashing: "Dungeonbash",
    climb: "Climb",
    listening: "Listen",
    searching: "Search",
    trapbreaking: "Trapbreak"
  };

  const order = ["dungeonbashing", "climb", "listening", "searching", "trapbreaking"];

  const actions = order
    .filter(id => adv[id] !== undefined)
    .map(id => ({
      id,
      name: labels[id],
      info1: { text: String(adv[id]) },
      system: {
        actionType: "adventuring",
        actionId: id
      }
    }));

  this.addActions(actions, { id: GROUP.adventuring.id });
}

#buildProficiencyActions() {
  const proficiencies = this.items
    .filter(item =>
      item.type === "ability" &&
      typeof item.rollFormula === "function" &&
      item.system?.roll
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  if (!proficiencies.length) return;

  const actions = proficiencies.map(item => ({
    id: item.id,
    name: item.name,
    img: item.img,
    info1: item.system?.rollTarget !== undefined
      ? { text: `${item.system.rollTarget}+` }
      : undefined,
    system: {
      actionType: "proficiency",
      actionId: item.id
    }
  }));

  this.addActions(actions, { id: GROUP.proficiencies.id });
}

    #buildUtilityActions() {
      const actions = [
        {
          id: "sheet",
          name: "Open Sheet",
          system: {
            actionType: "utility",
            actionId: "sheet"
          }
        }
      ];

  if (game.combat) {
    actions.push({
      id: "initiative",
      name: "Roll Initiative",
      system: {
        actionType: "utility",
        actionId: "initiative"
      }
    });
  }
      this.addActions(actions, { id: GROUP.utility.id });
    }
  };
});
