
export class LoginInfoPlayerDto {
    playerId: number;
    username: string;
    token: string;

    constructor(id: number, un: string, jwt: string) {
        this.playerId = id;
        this.username = un;
        this.token = jwt;
    }
}