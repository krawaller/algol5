import { AlgolSectionOrders } from './section.interface';

export function isAlgolSectionOrders(section): section is AlgolSectionOrders {
  return (section as AlgolSectionOrders).orders !== undefined;
}
