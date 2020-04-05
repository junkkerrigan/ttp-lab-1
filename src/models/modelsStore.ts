import { User, IUser, IUserConstructor } from './User';
import { Guild, IGuild, IGuildConstructor } from './Guild';
import { OpenSourceProject, IOpenSourceProject, IOpenSourceProjectConstructor } from './OpenSourceProject';
import { Device, IDevice, IDeviceConstructor } from './Device';
import { Event, IEvent, IEventConstructor  } from './Event';
import { Product, IProduct, IProductConstructor } from './Product';
import { Company, ICompany, ICompanyConstructor } from './Company';

export interface ProjectModelsStore {
    User: IUser & IUserConstructor,
    Guild: IGuild & IGuildConstructor,
    OpenSourceProject: IOpenSourceProject & IOpenSourceProjectConstructor,
    Device: IDevice & IDeviceConstructor,
    Event: IEvent & IEventConstructor,
    Product: IProduct & IProductConstructor,
    Company: ICompany & ICompanyConstructor,
}

export const models: ProjectModelsStore = {
    User: User as unknown as (IUser & IUserConstructor),
    Guild: Guild as unknown as (IGuild & IGuildConstructor),
    OpenSourceProject: OpenSourceProject as unknown as (IOpenSourceProject &  IOpenSourceProjectConstructor),
    Device: Device as unknown as (IDevice & IDeviceConstructor),
    Event: Event as unknown as (IEvent & IEventConstructor),
    Product: Product as unknown as (IProduct & IProductConstructor),
    Company: Company as unknown as (ICompany & ICompanyConstructor)
};

(Object.keys(models) as (keyof ProjectModelsStore)[]).forEach(modelName => {
    try {
        models[modelName].associate && models[modelName].associate(models);
    } catch (e) {
        console.log(e);
    }
});
