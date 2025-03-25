import { EmailTypeEnum } from '../enums/email-type.enum';

export const emailConstants: Record<EmailTypeEnum, { subject: string; template: string }> = {
  [EmailTypeEnum.WELCOME]: {
    subject: 'Welcome',
    template: 'welcome'
  }
};
