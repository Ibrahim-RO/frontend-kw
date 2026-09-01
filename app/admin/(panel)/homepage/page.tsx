import { HomepageEditor } from '@/src/features/admin/homepage/components/HomepageEditor'
import { getHomepageSettings } from '@/src/features/admin/homepage/dal/homepage.dal'
export default async function HomepageAdminPage() { return <HomepageEditor initial={await getHomepageSettings()} /> }
