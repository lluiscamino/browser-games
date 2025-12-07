import './style.css'
import {GameUI} from "./ui/game_ui.ts";
import {GameController} from "./game/controller.ts";

const gameController = GameController.createNew();
const ui = new GameUI(gameController, window.document);
ui.init();
