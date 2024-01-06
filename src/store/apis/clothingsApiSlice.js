import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from './apiSlice'

const clothingsAdapter = createEntityAdapter({})

const initialState = clothingsAdapter.getInitialState()

export const clothingsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getClothings: builder.query({
            query: () =>({ 
                url: '/clothings',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            /* keepUnusedDataFor: 5, */
            transformResponse: responseData =>{
                const sortedData = responseData?.data
                sortedData?.sort((a, b) => {
                    const idA = parseInt(a._id, 16),
                        idB = parseInt(b._id, 16)
                    return idB - idA
                })

                let count = 1
                const loadedClothings = sortedData?.map(clothing =>{
                    clothing.id = clothing._id
                    clothing.sn = count++
                    return clothing
                })
                return clothingsAdapter.setAll(initialState, loadedClothings)
            },
            providesTags: (result, error, arg) =>{
                if(result?.ids){
                    return [
                        {type: 'Clothing', id: 'LIST'},
                        ...result.ids.map(id =>({ type: 'Clothing', id }))
                    ]
                }else return [{ type: 'Clothings', id: 'LIST'}]
            },
        }),
        addNewClothing: builder.mutation({
            query: initialClothingData =>{
                const formData = new FormData()
                formData.append('name', initialClothingData.name)
                formData.append('price', initialClothingData.price)
                formData.append('description', initialClothingData.description)
                formData.append('color', initialClothingData.color)
                formData.append('style', initialClothingData.style)
                formData.append('category', initialClothingData.category)
                formData.append('image', initialClothingData.image[0])
                console.log(formData)
                return {
                    url: '/clothings',
                    method: 'POST', 
                    body: formData,
                }
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'Clothing', id: arg.id }
            ]
        }),
        updateClothing: builder.mutation({
            query: initialClothingData =>{
                const formData = new FormData()
                formData.append('name', initialClothingData.name)
                formData.append('price', initialClothingData.price)
                formData.append('description', initialClothingData.description)
                formData.append('color', initialClothingData.color)
                formData.append('style', initialClothingData.style)
                formData.append('category', initialClothingData.category)
                formData.append('image', initialClothingData.image[0])
                return {
                    url: '/clothings',
                    method: 'PATCH', 
                    body: formData
                }
                
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'Clothing', id: arg.id }
            ]
        }),
        deleteClothing: builder.mutation({
            query: ({ id }) =>({
                url: `/clothings/${id}`,
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Clothing', id: arg.id }
            ]
        }),
        deleteClothings: builder.mutation({
            query: () =>({
                url: '/clothings',
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Clothing', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetClothingsQuery,
    useAddNewClothingMutation,
    useUpdateClothingMutation,
    useDeleteClothingMutation,
    useDeleteClothingsMutation
} = clothingsApiSlice

//returns the query result object
export const selectClothingResult= apiSlice.endpoints.getClothings.select()

//creates memoized selector
const selectClothingData = createSelector(
    selectClothingResult, 
    clothingsResult => clothingsResult.data // state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllClothings,
    selectById: selectClothingById,
    selectIds: selectClothingIds,
    //pass in a selector that returns the clothings slice of state
} = clothingsAdapter.getSelectors(state => selectClothingData(state) ?? initialState)