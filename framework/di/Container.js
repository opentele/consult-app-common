import _ from "lodash";

class Container {
    static beans = new Map();

    static add(type, obj) {
        this.beans.put(type, obj);
    }

    static get(type) {
        this.beans.get(type);
    }
}

export default Container;
