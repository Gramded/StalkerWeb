export default class Fight {
    constructor(user, enemy, range) {
        this.user = user;
        this.enemy = enemy;
        this.range = range;
    }

    userShotRes = function () {
        if ((this.user.gun.mag > 0) && (this.enemy.hp > 0)) {
            this.user.gun.mag -= 1;
            this.enemy.hp = this.enemy.hp - this.user.gun.damage;
            this.range = this.range - this.enemy.moveSpeed;
            if (this.range <= this.enemy.attackRange) {
                this.user.hp = this.user.hp - this.enemy.damage;
            }
        }
        if (this.enemy.hp <= 0) {
            return true
        } else if (this.user.gun.mag <= 0) {
            return `Братан, нужна перезарядка!`
        } else if ((this.user.gun.mag > 0) && (this.enemy.hp > 0)) {
            return [this.enemy.hp, 'Тварюга ещё жива!', this.user.hp, this.range]
        }
    }
}

// this.enemy.hp <= 0 ? true :  this.enemy.hp