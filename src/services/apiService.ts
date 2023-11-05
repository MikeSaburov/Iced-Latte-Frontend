export async function getAllProducts(url: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST_REMOTE}/${url}`)

    if (res.status !== 200) {
      throw new Error(res.statusText)
    }

    return res.json()
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
    else throw new Error('Something went wrong')
  }
}