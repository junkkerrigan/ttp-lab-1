import { User, IUser, IUserConstructor } from './models/User';
import { Guild, IGuild, IGuildConstructor } from './models/Guild';
import {
  OpenSourceProject,
  IOpenSourceProject,
  IOpenSourceProjectConstructor,
} from './models/OpenSourceProject';
import { Device, IDevice, IDeviceConstructor } from './models/Device';
import { Event, IEvent, IEventConstructor } from './models/Event';
import { Product, IProduct, IProductConstructor } from './models/Product';
import { Company, ICompany, ICompanyConstructor } from './models/Company';

export interface ProjectModelsStore {
  User: IUser & IUserConstructor;
  Guild: IGuild & IGuildConstructor;
  OpenSourceProject: IOpenSourceProject & IOpenSourceProjectConstructor;
  Device: IDevice & IDeviceConstructor;
  Event: IEvent & IEventConstructor;
  Product: IProduct & IProductConstructor;
  Company: ICompany & ICompanyConstructor;
}

export const models: ProjectModelsStore = {
  User: (User as unknown) as IUser & IUserConstructor,
  Guild: (Guild as unknown) as IGuild & IGuildConstructor,
  OpenSourceProject: (OpenSourceProject as unknown) as IOpenSourceProject &
    IOpenSourceProjectConstructor,
  Device: (Device as unknown) as IDevice & IDeviceConstructor,
  Event: (Event as unknown) as IEvent & IEventConstructor,
  Product: (Product as unknown) as IProduct & IProductConstructor,
  Company: (Company as unknown) as ICompany & ICompanyConstructor,
};

(Object.keys(models) as (keyof ProjectModelsStore)[]).forEach((modelName) => {
  models[modelName].associate && models[modelName].associate(models);
});
