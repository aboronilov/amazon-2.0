import React from 'react';
import { Icategory } from '@/types/category.interface';
import { IProduct } from '@/types/product.interface';
import Meta from '@/ui/Meta';
import Layout from '@/ui/layout/layout';
import Catalog from '@/ui/catalog/Catalog';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CategoryService } from '@/services/category.service';
import { ProductService } from '@/services/product/product.service';


type Props = {
    products: IProduct[],
    category: Icategory
}

const CategoryPage = ({ products, category }: Props) => {
	return (
        <Meta title={category.name}>
            <Layout>
                <Catalog products={products || []} title={`${category.name} products`} />
            </Layout>
        </Meta>
    )
}

export default CategoryPage

export const getStaticPaths: GetStaticPaths = async () => {
    const categories = await CategoryService.getAll()

    const paths = categories.data.map(item => {
        return {
            params: {slug: item.slug}
        }
    })

    return {paths, fallback: "blocking"}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {data: products} = await ProductService.getByCategory(params?.slug as string)

    const {data: category} = await CategoryService.getBySlug(params?.slug as string)

    return {
        props: {
            products,
            category
        }
    }
}