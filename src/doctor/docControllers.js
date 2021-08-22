/* eslint prefer-destructuring: ["error", {AssignmentExpression: {object: true}}] */
/* eslint operator-linebreak: ["error", "after"] */

import Service from './docService.js';
import currentStorageMethods from '../storageClasses/storageFactory.js';
import { TtldefaultInSeconds } from '../config.js';

const service = new Service();

export default class Controller {
  getbyName = async (req, res) => {
    const isResolutionInstorage =
      await currentStorageMethods.getResolutionInStorage(req.query.name);
    if (isResolutionInstorage) {
      res.status(200).json(isResolutionInstorage);
    } else {
      res.status(204).send();
    }
  };

  patchResolution = async (req, res) => {
    const name = req.body.name;
    const resolution = req.body.resolution;
    const ttl = req.body.ttl || TtldefaultInSeconds;
    await service.setResolution(name, resolution);
    if (ttl) {
      setTimeout(async () => {
        await currentStorageMethods.deleteResolutionInstorage(name);
      }, ttl * 1000);
    }
    res.status(200).send();
  };

  deleteRes = async (req, res) => {
    const isResolutionInstorage =
      await currentStorageMethods.getResolutionInStorage(req.body.name);
    if (!isResolutionInstorage) {
      res.status(404).send();
    }
    await currentStorageMethods.deleteResolutionInstorage(req.body.name);
    res.status(200).send();
  };
}
