import {
  UserModel,
  IUserModel,
  IUserModelConstructor,
} from './models/UserModel';
import {
  GuildModel,
  IGuildModel,
  IGuildModelConstructor,
} from './models/GuildModel';
import {
  OpenSourceProjectModel,
  IOpenSourceProjectModel,
  IOpenSourceProjectModelConstructor,
} from './models/OpenSourceProjectModel';
import {
  DeviceModel,
  IDeviceModel,
  IDeviceModelConstructor,
} from './models/DeviceModel';
import {
  EventModel,
  IEventModel,
  IEventConstructor,
} from './models/EventModel';
import {
  ProductModel,
  IProductModel,
  IProductConstructor,
} from './models/ProductModel';
import {
  CompanyModel,
  ICompanyModel,
  ICompanyModelConstructor,
} from './models/CompanyModel';

export interface ProjectModelsStore {
  User: IUserModel & IUserModelConstructor;
  Guild: IGuildModel & IGuildModelConstructor;
  OpenSourceProject: IOpenSourceProjectModel &
    IOpenSourceProjectModelConstructor;
  Device: IDeviceModel & IDeviceModelConstructor;
  Event: IEventModel & IEventConstructor;
  Product: IProductModel & IProductConstructor;
  Company: ICompanyModel & ICompanyModelConstructor;
}

export const models: ProjectModelsStore = {
  User: (UserModel as unknown) as IUserModel & IUserModelConstructor,
  Guild: (GuildModel as unknown) as IGuildModel & IGuildModelConstructor,
  OpenSourceProject: (OpenSourceProjectModel as unknown) as IOpenSourceProjectModel &
    IOpenSourceProjectModelConstructor,
  Device: (DeviceModel as unknown) as IDeviceModel & IDeviceModelConstructor,
  Event: (EventModel as unknown) as IEventModel & IEventConstructor,
  Product: (ProductModel as unknown) as IProductModel & IProductConstructor,
  Company: (CompanyModel as unknown) as ICompanyModel &
    ICompanyModelConstructor,
};

(Object.keys(models) as (keyof ProjectModelsStore)[]).forEach((modelName) => {
  models[modelName].associate && models[modelName].associate(models);
});
