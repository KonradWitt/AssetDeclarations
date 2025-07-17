import { MatPaginatorIntl } from '@angular/material/paginator';

export function getPolishPaginatorIntl(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Wyników na stronę:';
  paginatorIntl.nextPageLabel = 'Następna strona';
  paginatorIntl.previousPageLabel = 'Poprzednia strona';
  paginatorIntl.firstPageLabel = 'Pierwsza strona';
  paginatorIntl.lastPageLabel = 'Ostatnia strona';

  paginatorIntl.getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ) => {
    if (length === 0 || pageSize === 0) {
      return `0 z ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1}–${endIndex} z ${length}`;
  };

  return paginatorIntl;
}
