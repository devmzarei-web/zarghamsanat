import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getPayloadClient() {
  return await getPayload({ config: configPromise })
}
