import people from '@/server/models/people.model'

export default defineEventHandler(async (event) => {
  const peopleData = await people.find()
  return peopleData
})