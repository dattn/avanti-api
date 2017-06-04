export default class Public extends Error {

    constructor() {
        super(...arguments);
        this.status = 500;
    }

    withStatus(status) {
        this.status = status;
        return this;
    }

}
