import Meta from "@/ui/Meta";
import Catalog from "@/ui/catalog/Catalog";
import Layout from "@/ui/layout/layout";
import { userProfile } from "@/hooks/useProfile";


type Props = {}

const Favorites = (props: Props) => {
    const { profile } = userProfile()
  return (
    <Meta title="favorites">
        <Layout>
            <Catalog products={profile?.favorites || []} title="Favorites"/>
        </Layout>
    </Meta>
  )
}

Favorites.isOnlyUser = true

export default Favorites