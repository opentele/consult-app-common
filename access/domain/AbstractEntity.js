import _ from "lodash";
import moment from "moment";

class AbstractEntity {
    id;
    createdBy;
    lastModifiedBy;
    createdOn;
    updatedOn;

    modifiedBySomeoneElse() {
        return this.lastModifiedBy !== this.createdBy;
    }

    isNew() {
        return _.isNil(this.id) || this.id === 0;
    }

    _getDateForDisplay(date) {
        return moment(date, moment.ISO_8601).format("YYYY-MM-DD HH:mm");
    }

    get createdOnForDisplay() {
        return this._getDateForDisplay(this.createdOn);
    }

    get updatedOnForDisplay() {
        return this._getDateForDisplay(this.updatedOn);
    }

    static fromResource(resource, entity) {
        entity.id = resource.id;
        entity.createdBy = resource.createdBy;
        entity.lastModifiedBy = resource.lastModifiedBy;
        entity.createdOn = resource.createdOn;
        entity.updatedOn = resource.updatedOn;
        return entity;
    }
}

export default AbstractEntity;
