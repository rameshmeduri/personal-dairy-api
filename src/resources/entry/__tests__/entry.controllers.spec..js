import controllers from '../entry.controllers';
import { isFunction } from 'lodash';

describe('entry controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = [
      'getOne',
      'getMany',
      'createOne',
      'removeOne',
      'updateOne'
    ];

    crudMethods.forEach((name) =>
      expect(isFunction(controllers[name])).toBe(true)
    );
  });
});
