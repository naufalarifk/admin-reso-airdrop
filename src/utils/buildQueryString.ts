/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Builds a query string array from data.
 * @param data The data used to build the query string array.
 * @returns The generated query string array.
 */
export function buildQueryArray(data: [string, string[]] | undefined): string {
   let queryArray = '';

   if (data && data[0] && data[1]) {
      data[1].reduce((acc, cur) => {
         queryArray = `${queryArray}${data[0]}[]=${encodeURIComponent(cur)}&`;

         return acc;
      }, {});
      queryArray = queryArray.substring(0, queryArray.length - 1);
   }

   return queryArray;
}

/**
 * Builds a query string from an action object.
 * @param action The action object used to build the query string.
 * @returns The generated query string.
 */
export function buildQueryString<T extends object | string | undefined>(action: T) {
   return Object.entries(action!)
      .filter(w => w[1] !== '')
      .map((k: any) =>
         Array.isArray(k[1])
            ? buildQueryArray(k as [string, string[]])
            : `${k[0]}=${encodeURIComponent(k[1])}`,
      )
      .join('&');
}
