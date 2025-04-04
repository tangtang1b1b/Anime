import people from '@/server/models/people.model'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { _id, name } = body
    const oldData = await people.findOne({ _id })
    await people.updateOne(oldData, { name })

    return {
      success: true,
    }
  } catch (err) {
    return {
      success: false,
    }
  }
})
