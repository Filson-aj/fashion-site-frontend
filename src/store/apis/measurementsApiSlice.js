import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from './apiSlice'

const drugsAdapter = createEntityAdapter({})

const initialState = drugsAdapter.getInitialState()

export const drugsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getDrugs: builder.query({
            query: () =>({ 
                url: '/drugs',
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
                const loadedDrugs = sortedData?.map(drug =>{
                    drug.id = drug._id
                    drug.sn = count++
                    return drug
                })
                return drugsAdapter.setAll(initialState, loadedDrugs)
            },
            providesTags: (result, error, arg) =>{
                if(result?.ids){
                    return [
                        {type: 'Drug', id: 'LIST'},
                        ...result.ids.map(id =>({ type: 'Drug', id }))
                    ]
                }else return [{ type: 'Drugs', id: 'LIST'}]
            },
        }),
        addNewDrug: builder.mutation({
            query: initialDrugData =>({
                url: '/drugs',
                method: 'POST', 
                body: {
                    ...initialDrugData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Drug', id: arg.id }
            ]
        }),
        updateDrug: builder.mutation({
            query: initialDrugData =>({
                url: '/drugs',
                method: 'PATCH', 
                body: {
                    ...initialDrugData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Drug', id: arg.id }
            ]
        }),
        deleteDrug: builder.mutation({
            query: ({ id }) =>({
                url: `/drugs/${id}`,
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Drug', id: arg.id }
            ]
        }),
        deleteDrugs: builder.mutation({
            query: () =>({
                url: '/drugs',
                method: 'DELETE', 
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Drug', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetDrugsQuery,
    useAddNewDrugMutation,
    useUpdateDrugMutation,
    useDeleteDrugMutation,
    useDeleteDrugsMutation
} = drugsApiSlice

//returns the query result object
export const selectDrugResult= apiSlice.endpoints.getDrugs.select()

//creates memoized selector
const selectDrugData = createSelector(
    selectDrugResult, 
    drugsResult => drugsResult.data // state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllDrugs,
    selectById: selectDrugById,
    selectIds: selectDrugIds,
    //pass in a selector that returns the drugs slice of state
} = drugsAdapter.getSelectors(state => selectDrugData(state) ?? initialState)