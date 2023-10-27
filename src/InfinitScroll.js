import { Box, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

const InfinitScroll = () => {
    const [posts, setPosts] = useState([{}]);
    const [page, setPage] = useState(1)

    const getPosts = async (pages) => {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_limit=25&_page=${pages}`
        );
        const data = await response.json();
        setPosts([...posts, ...data]);
    };

    useEffect(() => {
        getPosts(page);
    }, //eslint-disable-next-line
        [page]
    );

    return (
        <Fragment>
            <InfiniteScroll
                dataLength={posts?.length}
                next={() => setPage(page + 1)}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                refreshFunction={() => { console.log(1) }}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                }

            >
                {posts?.map((value, index) => {
                    return (
                        <Box key={index} sx={{ display: "flex", alignItems: 'center', gap: '10px' }}>
                            <Typography variant='h5' sx={{ fontSize: "14px" }}>
                                {value?.id}
                            </Typography>
                            <Typography variant='h6' sx={{ fontSize: "14px" }}>
                                {value?.title}
                            </Typography>
                        </Box>
                    )
                })}
            </InfiniteScroll>
        </Fragment>
    )
}

export default InfinitScroll