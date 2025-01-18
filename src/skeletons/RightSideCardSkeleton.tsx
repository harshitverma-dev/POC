import { Skeleton } from 'primereact/skeleton'
import React from 'react'

const RightSideCardSkeleton: React.FC = () => {
    return (
        <div>
            <>
                {
                    Array.from({ length: 10 }).map((_, index) => <Skeleton className='mb-3' key={index} height="11rem" borderRadius="20px"></Skeleton>)
                }
            </>
        </div>
    )
}

export default RightSideCardSkeleton
