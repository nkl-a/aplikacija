export class JwtDataPlayerDto {
    playerId: number;
    username: string;
    ext: number;
    ip: string;
    ua: string;

    toPlainObj() {
        return {
            playerId: this.playerId,
            username: this.username,
            ext: this.ext,
            ip: this.ip,
            ua: this.ua
        }
    }
}