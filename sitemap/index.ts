import calculator from './calculator'

export default async () => {
  const sitemapList = [calculator()]

  const rawData = await Promise.all(sitemapList)
  return rawData.flat()
}
