export let RollHandler = null;

Hooks.once("tokenActionHudCoreApiReady", async coreModule => {
  RollHandler = class RollHandler extends coreModule.api.RollHandler {
    async handleActionClick(event) {
      const { actionType, actionId } = this.action.system;
      if (!this.actor) return;

      switch (actionType) {
        case "weapon":
          return this.useWeapon(this.actor, actionId);

        case "spell":
          return this.useSpell(this.actor, actionId);

        case "check":
          return this.rollCheck(this.actor, actionId);

        case "save":
          return this.rollSave(this.actor, actionId);

        case "adventuring":
          return this.rollAdventuring(this.actor, actionId);

        case "proficiency":
          return this.rollProficiency(this.actor, actionId);

        case "utility":
          return this.performUtilityAction(this.actor, this.token, actionId);
      }
    }

    useWeapon(actor, actionId) {
      const item = actor.items.get(actionId);
      if (!item) return;
      if (typeof item.rollWeapon === "function") return item.rollWeapon();
      if (typeof item.use === "function") return item.use();
      if (typeof item.show === "function") return item.show();
      return item.sheet?.render(true);
    }
 
    useSpell(actor, actionId) {
       const item = actor.items.get(actionId);
       if (!item) return;

       if (typeof item.use === "function") return item.use();
       if (typeof item.spendSpell === "function") return item.spendSpell();
       if (typeof item.show === "function") return item.show();

       return item.sheet?.render(true);
    }

    rollCheck(actor, actionId) {
      if (typeof actor.rollCheck === "function") {
        return actor.rollCheck(actionId);
      }
    }

    rollSave(actor, actionId) {
      if (typeof actor.rollSave === "function") {
        return actor.rollSave(actionId);
      }
    }

    rollAdventuring(actor, actionId) {
      if (typeof actor.rollAdventuring === "function") {
        return actor.rollAdventuring(actionId);
      }
    }

    rollProficiency(actor, actionId) {
      const item = actor.items.get(actionId);
      if (!item) return;

      if (typeof item.rollFormula === "function" && item.system?.roll) {
        return item.rollFormula();
      }

      return item.sheet?.render(true);
    }

    async performUtilityAction(actor, token, actionId) {
      switch (actionId) {
        case "sheet":
          return actor.sheet?.render(true);

        case "initiative": {
          const activeToken = token ?? actor.getActiveTokens()?.[0];
          if (!activeToken) {
            ui.notifications?.warn("No active token found for initiative.");
            return;
          }

          if (!game.combat) {
            ui.notifications?.warn("No active combat.");
            return;
          }

          const combatant = game.combat.combatants.find(c => c.tokenId === activeToken.id);
          if (!combatant) {
            ui.notifications?.warn("Token is not in the current combat.");
            return;
          }

          return game.combat.rollInitiative([combatant.id]);
        }
      }
    }
  };
});
