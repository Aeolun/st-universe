export function slicePage<T>(data: T[], page: number, limit: number) {
  return data.slice((page-1) * limit, (page) * limit)
}