// eslint-disable-next-line no-shadow
export enum PageType {
  NEXT = 'NEXT',
  NUM = 'NUM',
  PREV = 'PREV',
}

export interface PageModel {
  className?: string;
  type: PageType;
  num: number;
  disabled?: boolean;
  selected?: boolean;
}
