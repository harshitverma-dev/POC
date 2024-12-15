import React from 'react'
import { Skeleton } from 'primereact/skeleton';

const PresentersListSkeleton: React.FC = () => {
    return (
        <>
            {
                Array.from({ length: 15 }).map((_,index) => <Skeleton key={index} height="18rem" borderRadius="16px"></Skeleton>)
            }
        </>
    )
}

export default PresentersListSkeleton
