import { HasherService } from '@/4-framework/services/hasher/hasher.service';

export const hasherServiceInject = {
  provide: HasherService,
  useFactory: () => {
    return new HasherService();
  },
};
