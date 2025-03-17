import people from '@/server/models/people.model'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { name, email, age } = body
    const peopleData = new people({ name, email, age })
    await peopleData.save()
    return {
      success: true,
      body,
    }
  } catch (err) {
    return {
      success: false,
      body: err,
    }
  }
})
