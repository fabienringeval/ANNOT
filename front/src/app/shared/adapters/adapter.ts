import * as _ from 'underscore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Adapter {
    buildRelations(relationships, included, adapter) {
        return relationships && included ?
            _.chain(included)
                .filter(el => _.some(relationships.data, relation => relation.id === el.id))
                .map(el => adapter.adapt(el, included))
                .value() : null;
    }

    buildSingleRelation(relationship, included, adapter) {
        return relationship && included ?
            _.chain(included)
                .filter(el => relationship.data.id === el.id)
                .map(el => adapter.adapt(el, included))
                .value() : null;
    }
}
