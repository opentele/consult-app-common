import UserService from "./access/service/UserService.js";
import i18n, {i18nPromise} from './i18n/loc.js';
import ProviderType from './access/domain/ProviderType.js';
import UserValidator from './access/UserValidator.js';
import User from './access/domain/User.js';
import AbstractEntity from './access/domain/AbstractEntity.js';
import Language from "./i18n/Language.js";

const Languages = [
    new Language("en", "english"),
    new Language("hi", "hindi")];

export {
    UserService,
    i18n,
    i18nPromise,
    Languages,
    ProviderType,
    UserValidator,
    User,
    AbstractEntity
};
