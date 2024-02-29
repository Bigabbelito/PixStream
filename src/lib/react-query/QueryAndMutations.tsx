import{
useQuery,
useMutation,
useQueryClient,
useInfiniteQuery,
} from '@tanstack/react-query'
import { creatUserAccount, signInAccount, signOutAccount } from '../appwrite/api'
import { INewUser } from '@/types'



export const userCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => creatUserAccount(user)
    })
}

export const usesignInAccount = () => {
    return useMutation({
        mutationFn: (user: { 
            email: string; 
            password: string
        }) => signInAccount(user)
    })
}

export const usesignOutAccount = () => {
    return useMutation({
        mutationFn:  signOutAccount
    })
}