import { EmailTypeEnum } from '../enums/email-type.enum';

export const emailConstants: Record<EmailTypeEnum, { subject: string; template: string }> = {
  [EmailTypeEnum.WELCOME]: {
    subject: 'Welcome subject',
    template: 'welcome'
  },
  [EmailTypeEnum.OLD_VISIT]: {
    subject: 'Old Visit subject',
    template: 'old-visit'
  },
  [EmailTypeEnum.FORGOT_PASSWORD]: {
    subject: 'Forgot Password subject',
    template: 'forgot-password'
  }
};
