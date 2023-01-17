import { useQuery, useMutation, QueryKey } from 'react-query'
import { ShopperBaskets, ShopperProducts } from 'commerce-sdk-isomorphic'

const config = {
    headers: {},
    parameters: {
      clientId: '<your-client-id>',
      organizationId: '<your-org-id>',
      shortCode: '<your-short-code>',
      siteId: '<your-site-id>',
    },
    throwOnBadResponse: true,
};

const basketClient = new ShopperBaskets(config)
const productClient = new ShopperProducts(config)

// **************** Queries ***********************//
const useBasket = () => {
    return useQuery(
        ['basket'],
        () => basketClient.getBasket({parameters: {basketId: '123'}}),
        {
            onSuccess: () => {console.log('success!')}
        }
    )
}

const useProduct = () => {
    return useQuery(['product'], () => productClient.getProduct({parameters: {id: '123'}}))
}

// Challenge #1: How do we DRY query implementation?
const createQuery = (queryKey: QueryKey, queryFn, args, options) => {
    return () => useQuery(queryKey, () => queryFn(args))
}

const useBasket = createQuery(['basket'], basketClient.getBasket, {onSuccess: () => console.log('success')})
const useProduct = createQuery(['product'], productClient.getProduct, {onSuccess: () => console.log('success')})








// **************** Mutation ***********************//
const MUTATIONS = {
    CreateBasket: 'createBasket',
    AddItemToBasket: 'addItemToBasket',
    // more...
}
const useShopperBasketsMutations = (action) => {
    return useMutation((variables) => basketClient[action](variables))
}

useShopperBasketsMutations('addItemToBasket')

