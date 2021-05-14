import amazons from "../../../dist/apis/amazons/static";
import { randomEndTurn } from "./randomEndTurn";

describe("the randomEndTurnPath helper", () => {
  describe("for amazons", () => {
    it("consistently finds path to next turn", () => {
      let battle = amazons.newBattle(amazons.variants[0].code);
      battle = randomEndTurn(amazons, battle);
      expect(battle.turnNumber).toBe(1);
      expect(battle.player).toBe(2);
      battle = randomEndTurn(amazons, battle);
      expect(battle.turnNumber).toBe(2);
      expect(battle.player).toBe(1);
      battle = randomEndTurn(amazons, battle);
      expect(battle.turnNumber).toBe(2);
      expect(battle.player).toBe(2);
      battle = randomEndTurn(amazons, battle);
      expect(battle.turnNumber).toBe(3);
      expect(battle.player).toBe(1);
      battle = randomEndTurn(amazons, battle);
      expect(battle.turnNumber).toBe(3);
      expect(battle.player).toBe(2);
    });
  });
});
