import { getOne, getMany, createOne, updateOne, removeOne } from '../crud';
import { Link } from '../../resources/link/link.model';
import { User } from '../../resources/user/user.model';
import mongoose from 'mongoose';

describe('crud controllers', () => {
  describe('getOne', async () => {
    test('finds by authenticated user and id', async () => {
      expect.assertions(2);

      const user = mongoose.Types.ObjectId();
      const link = await Link.create({ name: 'link', createdBy: user });

      const req = {
        params: {
          id: link._id
        },
        user: {
          _id: user
        }
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(result) {
          expect(result.data._id.toString()).toBe(link._id.toString());
        }
      };

      await getOne(Link)(req, res);
    });

    test('404 if no doc was found', async () => {
      expect.assertions(2);

      const user = mongoose.Types.ObjectId();

      const req = {
        params: {
          id: mongoose.Types.ObjectId()
        },
        user: {
          _id: user
        }
      };

      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },
        end() {
          expect(true).toBe(true);
        }
      };

      await getOne(Link)(req, res);
    });
  });

  describe('getMany', () => {
    test('finds array of docs by authenticated user', async () => {
      expect.assertions(4);

      const user = mongoose.Types.ObjectId();
      await Link.create([
        { name: 'link', createdBy: user },
        { name: 'other', createdBy: user },
        { name: 'link', createdBy: mongoose.Types.ObjectId() }
      ]);

      const req = {
        user: {
          _id: user
        }
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(result) {
          expect(result.data).toHaveLength(2);
          result.data.forEach((doc) =>
            expect(`${doc.createdBy}`).toBe(`${user}`)
          );
        }
      };

      await getMany(Link)(req, res);
    });
  });

  describe('createOne', () => {
    test('creates a new doc', async () => {
      expect.assertions(2);

      const user = mongoose.Types.ObjectId();
      const body = { name: 'name' };

      const req = {
        user: { _id: user },
        body
      };

      const res = {
        status(status) {
          expect(status).toBe(201);
          return this;
        },
        json(results) {
          expect(results.data.name).toBe(body.name);
        }
      };

      await createOne(Link)(req, res);
    });

    test('createdBy should be the authenticated user', async () => {
      expect.assertions(2);

      const user = mongoose.Types.ObjectId();
      const body = { name: 'name' };

      const req = {
        user: { _id: user },
        body
      };

      const res = {
        status(status) {
          expect(status).toBe(201);
          return this;
        },
        json(results) {
          expect(`${results.data.createdBy}`).toBe(`${user}`);
        }
      };

      await createOne(Link)(req, res);
    });
  });

  describe('updateOne', () => {
    test('finds doc by authenticated user and id to update', async () => {
      expect.assertions(3);

      const user = mongoose.Types.ObjectId();
      const link = await Link.create({ name: 'name', createdBy: user });
      const update = { name: 'hello' };

      const req = {
        params: { id: link._id },
        user: { _id: user },
        body: update
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(results) {
          expect(`${results.data._id}`).toBe(`${link._id}`);
          expect(results.data.name).toBe(update.name);
        }
      };

      await updateOne(Link)(req, res);
    });

    test('400 if no doc', async () => {
      expect.assertions(2);

      const user = mongoose.Types.ObjectId();
      const update = { name: 'hello' };

      const req = {
        params: { id: mongoose.Types.ObjectId() },
        user: { _id: user },
        body: update
      };

      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },
        end() {
          expect(true).toBe(true);
        }
      };

      await updateOne(Link)(req, res);
    });
  });

  describe('removeOne', () => {
    test('first doc by authenticated user and id to remove', async () => {
      expect.assertions(2);

      const user = mongoose.Types.ObjectId();
      const link = await Link.create({ name: 'name', createdBy: user });

      const req = {
        params: { id: link._id },
        user: { _id: user }
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(results) {
          expect(`${results.data._id}`).toBe(`${link._id}`);
        }
      };

      await removeOne(Link)(req, res);
    });

    test('400 if no doc', async () => {
      expect.assertions(2);
      const user = mongoose.Types.ObjectId();

      const req = {
        params: { id: mongoose.Types.ObjectId() },
        user: { _id: user }
      };

      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },
        end() {
          expect(true).toBe(true);
        }
      };

      await removeOne(Link)(req, res);
    });
  });
});
