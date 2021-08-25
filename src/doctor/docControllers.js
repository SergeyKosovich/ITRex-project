/* eslint prefer-destructuring: ["error", {AssignmentExpression: {object: true}}] */
/* eslint operator-linebreak: ["error", "after"] */

import Service from './docService.js';
import currentStorageMethods from '../storageClasses/storageFactory.js';
import { TtlDefaultInSeconds } from '../config.js';

const service = new Service();

export default class Controller {
  getByName = async (req, res) => {
    const isResolutionInStorage =
      await currentStorageMethods.getResolutionInStorage(req.query.name);
    if (isResolutionInStorage) {
      res.status(200).json(isResolutionInStorage);
    } else {
      res.status(204).send();
    }
  };

  patchResolution = async (req, res) => {
    const name = req.body.name;
    const resolution = req.body.resolution;
    const ttl = req.body.ttl || TtlDefaultInSeconds;
    await service.setResolution(name, resolution);
    if (ttl) {
      setTimeout(async () => {
        await currentStorageMethods.deleteResolutionInStorage(name);
      }, ttl * 1000);
    }
    res.status(200).send();
  };

  deleteRes = async (req, res) => {
    const isResolutionInStorage =
      await currentStorageMethods.getResolutionInStorage(req.body.name);
    if (!isResolutionInStorage) {
      res.status(404).send();
    }
    await currentStorageMethods.deleteResolutionInStorage(req.body.name);
    res.status(200).send();
  };
}
