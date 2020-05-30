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
  User: UserModel as IUserModel & IUserModelConstructor,
  Guild: GuildModel as IGuildModel & IGuildModelConstructor,
  OpenSourceProject: OpenSourceProjectModel as IOpenSourceProjectModel &
    IOpenSourceProjectModelConstructor,
  Device: DeviceModel as IDeviceModel & IDeviceModelConstructor,
  Event: EventModel as IEventModel & IEventConstructor,
  Product: ProductModel as IProductModel & IProductConstructor,
  Company: CompanyModel as ICompanyModel & ICompanyModelConstructor,
};

(Object.keys(models) as (keyof ProjectModelsStore)[]).forEach((modelName) => {
  models[modelName].associate && models[modelName].associate(models);
});
