import { ProductService } from "@/services/product/product.service"
import { TypePaginationProducts } from "@/types/product.interface"
import Meta from "@/ui/Meta"
// import Catalog from "@/ui/catalog/CatalogPagination"
import Catalog from "@/ui/catalog/Catalog"
import Layout from "@/ui/layout/layout"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const Search = () => {
    const {query} = useRouter()
    const {data} = useQuery(
        ['search products', query.term],
        () => ProductService.getAll({
            searchTerm: query.term as string
        })
    )
  return (
    <Meta title="Search">
        <Layout>
            <Catalog
                products={data?.products || [] }
                title={`Search by term '${query.term || ""}'`}
            />
        </Layout>
    </Meta>
  )
}

export default Search