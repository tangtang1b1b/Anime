import people from '@/server/models/people.model'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { _id } = body
  await people.deleteOne({ _id })
  return { success: true }
})
