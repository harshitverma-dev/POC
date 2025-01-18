import React from 'react'
import { Skeleton } from 'primereact/skeleton';

const PresentersListSkeleton: React.FC = () => {
    return (
        <>
            {
                Array.from({ length: 12 }).map((_,index) => <Skeleton key={index} height="14.5rem" borderRadius="16px"></Skeleton>)
            }
        </>
    )
}

export default PresentersListSkeleton
