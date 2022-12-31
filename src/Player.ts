export default class Player {
    public ID: number;
    public name: string;
    public team: number;
    public faction: string;
    public score: number = 0;

    public pendingShips: string[];
    public controledShips = [];
    public selectedShip;

    constructor(JSONconfig) {
        return Object.assign(this,JSONconfig);
    }
}