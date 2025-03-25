import { EmailTypeEnum } from '../enums/email-type.enum';
import { EmailCombinePayloadType } from './email-combined-payload.type';
import { PickRequired } from './pick-required.type';

export type EmailTypeToPayloadType ={
    [EmailTypeEnum.WELCOME]: PickRequired<EmailCombinePayloadType, 'name' | 'frontUrl'>
    [EmailTypeEnum.OLD_VISIT]: PickRequired<EmailCombinePayloadType, 'email' | 'frontUrl'>
    [EmailTypeEnum.FORGOT_PASSWORD]: PickRequired<EmailCombinePayloadType, 'frontUrl' | 'actionToken' | 'name'>
}